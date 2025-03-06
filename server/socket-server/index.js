import jwt from 'jsonwebtoken';
import pool from '../db.js';

// 存儲活躍用戶連接
const activeUsers = new Map(); // 用户ID => socket
const activeAdmins = new Map(); // 管理員ID => socket
const userMessages = new Map(); // 用户ID => 訊息陣列

export default function initSocketServer(io) {
  // 驗證中間件，確保連接者已認證
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('認證失敗 - 未提供 Token'));
    }
    
    try {
      // 驗證 JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      socket.userId = decoded.id;
      socket.userLevel = decoded.level;
      socket.userName = decoded.name || decoded.nickname || '匿名用戶';
      socket.userAvatar = decoded.head || '/images/chatRoom/user1.jpg';
      
      // 確保連接者存在於資料庫中
      const [users] = await pool.query(
        'SELECT * FROM users WHERE id = ?',
        [socket.userId]
      );
      
      if (users.length === 0) {
        return next(new Error('認證失敗 - 用戶不存在'));
      }
      
      next();
    } catch (error) {
      console.error('Socket 認證錯誤:', error);
      next(new Error('認證失敗 - Token 無效'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`用戶已連接: ${socket.userId}, 等級: ${socket.userLevel}`);
    
    // 處理管理員或用戶連接
    if (socket.userLevel === 2) {
      // 管理員連接
      activeAdmins.set(socket.userId, socket);
      
      // 發送所有活躍用戶列表給管理員
      const usersList = Array.from(activeUsers.entries()).map(([userId, userSocket]) => ({
        userId,
        name: userSocket.userName,
        avatar: userSocket.userAvatar || '/images/chatRoom/user1.jpg',
        lastMessage: userSocket.lastMessage || '',
        lastMessageType: userSocket.lastMessageType || 'text',
        timestamp: userSocket.lastMessageTime || new Date(),
        unreadCount: userSocket.unreadCount || 0,
      }));
      
      socket.emit('user_list', usersList);
    } else {
      // 普通用戶連接
      activeUsers.set(socket.userId, socket);
      socket.unreadCount = 0;
      
      // 發送連接成功訊息
      socket.emit('connect_success', {
        userId: socket.userId,
        message: '連接成功！',
      });
      
      // 通知所有管理員有新用戶上線
      for (const [adminId, adminSocket] of activeAdmins) {
        adminSocket.emit('user_connected', {
          userId: socket.userId,
          name: socket.userName,
          avatar: socket.userAvatar || '/images/chatRoom/user1.jpg',
          lastMessage: '',
          lastMessageType: 'text',
          timestamp: new Date(),
          unreadCount: 0,
        });
      }
      
      // 載入用戶之前的訊息歷史
      const userHistory = userMessages.get(socket.userId) || [];
      if (userHistory.length > 0) {
        socket.emit('message_history', userHistory);
      }
    }

    // 處理發送訊息
    socket.on('send_message', (data) => {
      const { text, fileUrl, fileType } = data;
      
      // 創建訊息物件
      const message = {
        id: Date.now().toString(),
        text,
        sender: socket.userId,
        senderName: socket.userName,
        senderAvatar: socket.userAvatar,
        senderType: socket.userLevel === 2 ? 'admin' : 'user',
        timestamp: new Date(),
        read: false,
        fileUrl,
        fileType,
      };
      
      // 存儲訊息到歷史記錄
      if (!userMessages.has(socket.userId)) {
        userMessages.set(socket.userId, []);
      }
      userMessages.get(socket.userId).push(message);
      
      // 更新用戶的最後訊息資訊
      socket.lastMessage = text || (fileType === 'image' ? '圖片訊息' : '影片訊息');
      socket.lastMessageType = fileUrl ? fileType : 'text';
      socket.lastMessageTime = new Date();
      
      // 如果是用戶發送訊息，則發給所有管理員
      if (socket.userLevel !== 2) {
        socket.unreadCount = 0; // 用戶發送的訊息，重置自己的未讀數
        
        for (const [adminId, adminSocket] of activeAdmins) {
          adminSocket.emit('receive_message', {
            ...message,
            userId: socket.userId // 通知管理員這個訊息來自哪個用戶
          });
          
          // 更新用戶列表中的最後訊息
          adminSocket.emit('update_user', {
            userId: socket.userId,
            lastMessage: socket.lastMessage,
            lastMessageType: socket.lastMessageType,
            timestamp: socket.lastMessageTime,
            unreadCount: (adminSocket.unreadMessages && adminSocket.unreadMessages[socket.userId]) || 0
          });
        }
      } else {
        // 如果是管理員發送訊息，發給特定用戶
        const targetUserId = data.to;
        const targetUser = activeUsers.get(targetUserId);
        
        if (targetUser) {
          // 增加這個用戶的未讀訊息數
          targetUser.unreadCount = (targetUser.unreadCount || 0) + 1;
          
          targetUser.emit('receive_message', message);
        }
      }
    });

    // 處理已讀訊息
    socket.on('mark_as_read', (data) => {
      const { userId, messageIds } = data;
      
      // 更新訊息狀態
      const messages = userMessages.get(userId) || [];
      messages.forEach(msg => {
        if (messageIds.includes(msg.id)) {
          msg.read = true;
        }
      });
      
      // 如果是管理員標記已讀，通知用戶
      if (socket.userLevel === 2) {
        const userSocket = activeUsers.get(userId);
        if (userSocket) {
          userSocket.emit('messages_read', messageIds);
          
          // 重置未讀計數
          if (socket.unreadMessages) {
            socket.unreadMessages[userId] = 0;
            
            // 更新用戶列表中的未讀數
            socket.emit('update_user', {
              userId,
              unreadCount: 0
            });
          }
        }
      }
      
      // 如果是用戶標記已讀，通知所有管理員
      if (socket.userLevel !== 2) {
        socket.unreadCount = 0;
        
        for (const [adminId, adminSocket] of activeAdmins) {
          adminSocket.emit('user_messages_read', {
            userId: socket.userId,
            messageIds
          });
        }
      }
    });

    // 用戶選擇
    socket.on('select_user', (data) => {
      const { userId } = data;
      
      // 只有管理員能選擇用戶
      if (socket.userLevel !== 2) return;
      
      // 初始化未讀訊息計數結構
      if (!socket.unreadMessages) {
        socket.unreadMessages = {};
      }
      
      // 重置為該用戶的未讀訊息計數
      socket.unreadMessages[userId] = 0;
      
      // 更新用戶列表中的未讀數
      socket.emit('update_user', {
        userId,
        unreadCount: 0
      });
    });

    // 處理斷開連接
    socket.on('disconnect', () => {
      console.log(`用戶已斷開連接: ${socket.userId}, 等級: ${socket.userLevel}`);
      
      if (socket.userLevel === 2) {
        activeAdmins.delete(socket.userId);
      } else {
        activeUsers.delete(socket.userId);
        
        // 通知所有管理員用戶下線
        for (const [adminId, adminSocket] of activeAdmins) {
          adminSocket.emit('user_disconnected', socket.userId);
        }
      }
    });
  });
}