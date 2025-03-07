"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

// 記憶體中儲存的 token (用於無痕模式)
let sessionTokenInMemory = null;

// 修改 token 獲取邏輯
const getStoredToken = () => {
  try {
    // 嘗試從 localStorage 獲取
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = window.localStorage.getItem('authToken');
      if (token) return token;
    }
  } catch (e) {
    console.log('無法從 localStorage 獲取 token:', e);
  }
  
  try {
    // 嘗試從 cookies 獲取
    const token = Cookies.get('authToken');
    if (token) return token;
  } catch (e) {
    console.log('無法從 cookies 獲取 token:', e);
  }
  
  // 無痕模式下使用記憶體存儲
  return sessionTokenInMemory || null;
};

export function SocketProvider({ children, user = null, isAdmin = false }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [typingUsers, setTypingUsers] = useState({});
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  // 建立 Socket 連接
  useEffect(() => {
    console.log('正在初始化Socket連接...');

    // 如果沒有用戶，創建臨時訪客用戶
    const tempUser = user || {
      id: 'visitor-' + Date.now(),
      name: '訪客',
      token: 'visitor-token-' + Date.now()
    };

    // 更新 token 獲取邏輯
    const token = tempUser.token || getStoredToken() || `visitor-token-${Date.now()}`;
    sessionTokenInMemory = token; // 保存到記憶體

    // 清理前一個連接
    if (socket) {
      socket.disconnect();
    }
    
    try {
      console.log('嘗試建立Socket.io連接...');
      
      // 建立新連接
      const newSocket = io('http://localhost:8001', {
        transports: ['websocket', 'polling'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        timeout: 10000
      });
      
      newSocket.on('connect', () => {
        console.log('Socket連接成功, ID:', newSocket.id);
        setIsConnected(true);
        setError(null);
        setConnectionAttempts(0);
        
        // 發送認證數據
        const authData = {
          auth: {
            token: token,
            isAdmin: isAdmin,
            userId: tempUser.id,
            userName: tempUser.name
          }
        };
        
        console.log('發送認證數據:', authData);
        newSocket.emit('authenticate', authData);
      });
      
      // 監聽認證成功
      newSocket.on('auth_success', (userData) => {
        console.log('認證成功:', userData);
      });
      
      // 監聽連接錯誤
      newSocket.on('connect_error', (err) => {
        console.error('Socket連接錯誤:', err.message);
        setError(`連接錯誤: ${err.message}`);
        setConnectionAttempts(prev => prev + 1);
      });
      
      // 監聽斷開連接
      newSocket.on('disconnect', (reason) => {
        console.log('Socket連接斷開:', reason);
        setIsConnected(false);
      });
      
      // 設置 socket 實例
      setSocket(newSocket);
      
      // 接收消息處理
      newSocket.on('receive_message', (message) => {
        console.log('收到新消息:', message);
        setMessages(prev => [...prev, message]);
      });
      
      // 監聽用戶清單更新 (僅管理員)
      if (isAdmin) {
        newSocket.on('active_users', (users) => {
          console.log('收到活躍用戶清單:', users);
          setUserList(users);
        });
      }
      
      // 監聽聊天歷史
      newSocket.on('chat_history', (history) => {
        console.log('收到聊天歷史:', history);
        setMessages(history || []);
      });
      
      // 監聽輸入狀態
      newSocket.on('typing_start', ({ userId, userName }) => {
        setTypingUsers(prev => ({ ...prev, [userId]: userName }));
      });
      
      newSocket.on('typing_end', ({ userId }) => {
        setTypingUsers(prev => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
      });
      
      // 清理函數
      return () => {
        console.log('清理Socket連接');
        newSocket.disconnect();
      };
    } catch (e) {
      console.error('創建Socket實例失敗:', e);
      setError(`Socket創建錯誤: ${e.message}`);
      setConnectionAttempts(prev => prev + 1);
    }
  }, [user, isAdmin, connectionAttempts >= 5 ? null : connectionAttempts]);

  // 發送消息函數
  const sendMessage = useCallback((messageData) => {
    if (!socket) {
      console.error('Socket不存在，無法發送消息');
      setError('Socket不存在，請重新載入頁面');
      return;
    }
    
    if (!isConnected) {
      console.error('Socket未連接，無法發送消息');
      
      // 嘗試重新連接
      try {
        socket.connect();
        
        // 將消息加入待發送隊列，顯示為待發送狀態
        const pendingMessage = {
          id: Date.now().toString(),
          text: messageData.message?.text || '',
          sender: 'user',
          timestamp: new Date(),
          read: false,
          pending: true
        };
        
        setMessages(prev => [...prev, pendingMessage]);
      } catch (e) {
        console.error('重新連接失敗:', e);
        setError('連接失敗，請重新載入頁面');
      }
      
      return;
    }
    
    try {
      // 發送消息
      console.log('發送消息:', messageData);
      socket.emit('send_message', messageData);
      
      // 將消息添加到本地狀態以立即顯示
      const localMessage = {
        id: Date.now().toString() + '-' + Math.random().toString(36).substring(2, 10),
        text: messageData.message?.text || '',
        sender: isAdmin ? 'agent' : 'user',
        timestamp: new Date(),
        read: false,
        fileUrl: messageData.message?.fileUrl,
        fileType: messageData.message?.fileType
      };
      
      // 添加到本地消息
      setMessages(prev => [...prev, localMessage]);
      
      return localMessage;
    } catch (e) {
      console.error('發送消息失敗:', e);
      setError(`發送失敗: ${e.message}`);
    }
  }, [socket, isConnected]);

  // 選擇用戶函數 (僅管理員)
  const selectUser = useCallback((userId) => {
    if (!socket || !isConnected) {
      console.error('Socket未連接，無法選擇用戶');
      return;
    }
    
    try {
      socket.emit('select_user', userId);
      setSelectedUser(userId);
    } catch (e) {
      console.error('選擇用戶失敗:', e);
    }
  }, [socket, isConnected]);

  // 標記消息已讀
  const markAsRead = useCallback((messageIds, userId) => {
    if (!socket || !isConnected || !messageIds.length) return;
    
    try {
      socket.emit('mark_as_read', { messageIds, userId });
      
      // 更新本地消息狀態
      setMessages(prev => 
        prev.map(msg => messageIds.includes(msg.id) ? { ...msg, read: true } : msg)
      );
    } catch (e) {
      console.error('標記消息已讀失敗:', e);
    }
  }, [socket, isConnected]);

  // 通知輸入狀態
  const notifyTyping = useCallback((isTyping) => {
    if (!socket || !isConnected) return;
    
    try {
      socket.emit(isTyping ? 'typing_start' : 'typing_end');
    } catch (e) {
      console.error('發送輸入狀態失敗:', e);
    }
  }, [socket, isConnected]);

  // 强制重連函數，可以在UI上使用
  const reconnect = useCallback(() => {
    setConnectionAttempts(prev => prev + 1);
  }, []);

  const contextValue = {
    socket,
    isConnected,
    messages,
    userList,
    selectedUser,
    error,
    unreadCount,
    typingUsers,
    sendMessage,
    markAsRead,
    notifyTyping,
    selectUser,
    setMessages,
    reconnect,
    setSelectedUser
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}