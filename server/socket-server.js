import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 儲存用戶連接信息
const connectedUsers = new Map(); // 用戶 ID -> socket ID
const adminSockets = new Map(); // 管理員 ID -> socket ID
const userChats = new Map(); // 用戶 ID -> 消息歷史記錄

// 驗證用戶身份
const authenticateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error("Token驗證失敗:", error.message);
    return null;
  }
};

io.on('connection', (socket) => {
  console.log('用戶連接:', socket.id);
  
  // 用戶認證
  socket.on('authenticate', async (data) => {
    console.log('收到認證數據:', data); // 調試日誌
    
    // 安全地獲取認證數據，確保不會因為缺少屬性而崩潰
    const auth = data?.auth || data || {};
    const token = auth.token || 'anonymous';
    const isAdmin = auth.isAdmin || false;
    const userId = auth.userId || `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const userName = auth.userName || '訪客';
    
    console.log(`認證信息: token=${token}, isAdmin=${isAdmin}, userId=${userId}, userName=${userName}`);
    
    // 驗證 token
    const user = authenticateToken(token);
    
    // 使用驗證後的用戶信息或提供的信息
    socket.userId = user?.id || userId;
    socket.userName = user?.name || userName;
    socket.userAvatar = user?.head || '/images/chatRoom/user1.jpg';
    socket.isAdmin = isAdmin || (user?.level === 2);
    
    console.log(`用戶已認證: ID=${socket.userId}, Name=${socket.userName}, isAdmin=${socket.isAdmin}`);
    
    // 認證成功事件
    socket.emit('auth_success', { 
      userId: socket.userId, 
      userName: socket.userName,
      isAdmin: socket.isAdmin // 確保返回 isAdmin 狀態
    });
    
    if (socket.isAdmin) {
      // 管理員登入處理...
      adminSockets.set(socket.userId, socket.id);
      console.log(`管理員 ${socket.userId} (${socket.userName}) 已連接`);
      
      // 向管理員發送當前所有活躍的用戶清單
      const activeUsers = [];
      for (const [userId, messages] of userChats.entries()) {
        const userSocket = [...connectedUsers.entries()]
          .find(([id, socketId]) => id === userId);
        
        const lastMessage = messages.length > 0 ? 
          messages[messages.length - 1] : null;
        
        // 只發送有聊天記錄的用戶
        if (messages.length > 0) {
          activeUsers.push({
            id: userId,
            name: userSocket ? io.sockets.sockets.get(userSocket[1])?.userName : '離線用戶',
            avatar: userSocket ? io.sockets.sockets.get(userSocket[1])?.userAvatar : '/images/chatRoom/user1.jpg',
            lastMessage: lastMessage?.text || '',
            lastMessageType: lastMessage?.fileUrl ? (lastMessage?.fileType || 'text') : 'text',
            mediaCount: lastMessage?.fileType ? 1 : 0,
            timestamp: lastMessage?.timestamp || new Date(),
            unreadCount: messages.filter(m => !m.read && m.sender === 'user').length || 0,
            online: !!userSocket
          });
        }
      }
      
      socket.emit('active_users', activeUsers);
      
      // 添加：發送現有消息歷史記錄
      if (userChats.size > 0) {
        for (const [userId, chatHistory] of userChats.entries()) {
          // 確保消息標記正確
          const verifiedHistory = chatHistory.map(msg => ({
            ...msg,
            // 確保 sender 標記正確 - 保持原來的 sender 值
            sender: msg.sender // 'agent' 或 'user'
          }));
          
          // 如果已選擇用戶，立即發送其聊天記錄
          if (socket.selectedUserId === userId) {
            socket.emit('chat_history', verifiedHistory);
          }
        }
      }
      
    } else {
      // 一般用戶登入處理...
      connectedUsers.set(socket.userId, socket.id);
      console.log(`用戶 ${socket.userId} (${socket.userName}) 已連接`);
      
      // 如果用戶之前有聊天記錄，發送給用戶
      if (userChats.has(socket.userId)) {
        socket.emit('chat_history', userChats.get(socket.userId));
      } else {
        // 初始化用戶聊天記錄
        userChats.set(socket.userId, []);
      }
      
      // 通知所有在線管理員有新用戶連接
      for (const [adminId, adminSocketId] of adminSockets.entries()) {
        const adminSocket = io.sockets.sockets.get(adminSocketId);
        if (adminSocket) {
          adminSocket.emit('user_connected', {
            id: socket.userId,
            name: socket.userName,
            avatar: socket.userAvatar,
            online: true,
            lastMessage: '',
            lastMessageType: 'text',
            timestamp: new Date(),
            unreadCount: 0
          });
        }
      }
      
      // 添加：發送用戶的消息歷史
      const chatHistory = userChats.get(socket.userId) || [];
      // 確保消息標記正確
      const verifiedHistory = chatHistory.map(msg => ({
        ...msg,
        // 確保 sender 標記正確
        sender: msg.sender // 'agent' 或 'user'
      }));
      socket.emit('chat_history', verifiedHistory);
    }
  });
  
  // 用戶發送消息
  socket.on('send_message', (data) => {
    console.log('收到消息:', data); // 調試日誌
    
    // 從請求中提取數據
    const { message, to } = data;
    
    if (!socket.userId) {
      console.log('未認證用戶嘗試發送消息');
      socket.emit('error', { message: '未認證，請先登入' });
      return;
    }
    
    // 檢查消息格式
    if (!message) {
      console.log('消息格式不正確:', data);
      socket.emit('error', { message: '消息格式不正確' });
      return;
    }
    
    // 創建消息對象 - 確保文件 URL 被保留
    const messageObject = {
      id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 9),
      text: message.text || '',
      fileUrl: message.fileUrl || null,  // 確保保留服務器文件 URL
      fileType: message.fileType || null,
      sender: socket.isAdmin ? 'agent' : 'user',
      senderName: socket.userName,
      timestamp: new Date(),
      read: false
    };
    
    // 處理用戶發送的消息
    if (!socket.isAdmin) {
      // 普通用戶發送消息 - 發送給所有管理員
      for (const [adminId, adminSocketId] of adminSockets.entries()) {
        io.to(adminSocketId).emit('receive_message', {
          ...messageObject,
          userId: socket.userId // 讓管理員知道是哪個用戶發送的消息
        });
      }
      
      // 同時發送確認給自己
      socket.emit('message_sent', { id: messageObject.id });
      
      // 將消息存儲到用戶聊天歷史
      if (!userChats.has(socket.userId)) {
        userChats.set(socket.userId, []);
      }
      userChats.get(socket.userId).push(messageObject);
    } else {
      // 管理員發送消息 - 發送給特定用戶
      if (!to) {
        console.log('管理員發送消息但未指定目標用戶');
        socket.emit('error', { message: '請指定目標用戶' });
        return;
      }
      
      // 查找用戶的socket
      const userSocketId = connectedUsers.get(to);
      if (userSocketId) {
        // 用戶在線，直接發送
        io.to(userSocketId).emit('receive_message', messageObject);
      }
      
      // 將消息存儲到用戶聊天歷史
      if (!userChats.has(to)) {
        userChats.set(to, []);
      }
      userChats.get(to).push(messageObject);
      
      // 發送確認給管理員
      socket.emit('message_sent', { id: messageObject.id, to });
    }
  });
  
  // 標記消息為已讀
  socket.on('mark_as_read', (data) => {
    const { messageIds, userId } = data;
    const currentUserId = socket.userId;
    
    if (!currentUserId) {
      socket.emit('error', { message: '未認證，請先登入' });
      return;
    }
    
    // 對應的聊天記錄
    const chatHistory = socket.isAdmin ? 
      (userId ? userChats.get(userId) : null) : 
      userChats.get(currentUserId);
    
    if (!chatHistory) return;
    
    // 更新已讀狀態
    for (const message of chatHistory) {
      if (messageIds.includes(message.id)) {
        message.read = true;
      }
    }
    
    // 通知相關方已讀狀態更新
    if (socket.isAdmin) {
      // 管理員標記，通知相應用戶
      const userSocketId = connectedUsers.get(userId);
      if (userSocketId) {
        io.to(userSocketId).emit('messages_read', messageIds);
      }
    } else {
      // 用戶標記，通知所有管理員
      for (const [adminId, adminSocketId] of adminSockets.entries()) {
        io.to(adminSocketId).emit('messages_read', {
          messageIds,
          userId: currentUserId
        });
        
        // 更新未讀數
        io.to(adminSocketId).emit('update_user_unread_count', {
          userId: currentUserId,
          unreadCount: chatHistory.filter(m => !m.read && m.sender === 'user').length
        });
      }
    }
  });
  
  // 當用戶開始輸入
  socket.on('typing_start', () => {
    const userId = socket.userId;
    if (!userId) return;
    
    if (socket.isAdmin) {
      // 管理員輸入中，通知相應用戶
      const targetUserId = socket.currentChatUser;
      if (!targetUserId) return;
      
      const userSocketId = connectedUsers.get(targetUserId);
      if (userSocketId) {
        io.to(userSocketId).emit('typing_start', { userId, userName: socket.userName });
      }
    } else {
      // 用戶輸入中，通知所有管理員
      for (const [adminId, adminSocketId] of adminSockets.entries()) {
        io.to(adminSocketId).emit('typing_start', { 
          userId, 
          userName: socket.userName 
        });
      }
    }
  });
  
  // 用戶停止輸入
  socket.on('typing_end', () => {
    const userId = socket.userId;
    if (!userId) return;
    
    if (socket.isAdmin) {
      // 管理員停止輸入，通知相應用戶
      const targetUserId = socket.currentChatUser;
      if (!targetUserId) return;
      
      const userSocketId = connectedUsers.get(targetUserId);
      if (userSocketId) {
        io.to(userSocketId).emit('typing_end', { userId });
      }
    } else {
      // 用戶停止輸入，通知所有管理員
      for (const [adminId, adminSocketId] of adminSockets.entries()) {
        io.to(adminSocketId).emit('typing_end', { userId });
      }
    }
  });
  
  // 管理員選擇聊天的用戶
  socket.on('select_user', (userId) => {
    if (!socket.isAdmin) return;
    
    socket.currentChatUser = userId;
    
    // 獲取該用戶的聊天歷史
    const chatHistory = userChats.get(userId) || [];
    socket.emit('chat_history', chatHistory);
    
    // 更新未讀消息狀態
    let unreadMessages = chatHistory.filter(m => !m.read && m.sender === 'user');
    if (unreadMessages.length > 0) {
      const messageIds = unreadMessages.map(m => m.id);
      socket.emit('update_user_unread_count', {
        userId,
        unreadCount: 0
      });
    }
  });
  
  // 用戶斷開連接
  socket.on('disconnect', () => {
    const userId = socket.userId;
    
    if (socket.isAdmin) {
      // 管理員斷開連接
      adminSockets.delete(userId);
      console.log(`管理員 ${userId} 已斷開連接`);
    } else if (userId) {
      // 普通用戶斷開連接
      connectedUsers.delete(userId);
      console.log(`用戶 ${userId} 已斷開連接`);
      
      // 通知所有管理員用戶離線
      for (const [adminId, adminSocketId] of adminSockets.entries()) {
        io.to(adminSocketId).emit('user_disconnected', userId);
      }
    }
  });
});

const PORT = process.env.SOCKET_PORT || 8001;
server.listen(PORT, () => {
  console.log(`Socket.io 伺服器運行在端口 ${PORT}`);
});

export default server;