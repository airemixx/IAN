"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export function SocketProvider({ children, user }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || !user.token) return;
    
    // 創建 Socket 連接
    const newSocket = io('http://localhost:8000', {
      auth: {
        token: user.token
      }
    });
    
    // 連接事件處理
    newSocket.on('connect', () => {
      console.log('已連接到聊天伺服器');
      setIsConnected(true);
      setError(null);
    });
    
    newSocket.on('connect_error', (err) => {
      console.error('連接失敗：', err.message);
      setError(err.message);
      setIsConnected(false);
    });
    
    // 載入訊息歷史
    newSocket.on('message_history', (history) => {
      setMessages(history);
    });
    
    // 處理接收訊息
    newSocket.on('receive_message', (message) => {
      setMessages(prev => [...prev, message]);
    });
    
    // 處理訊息已讀狀態
    newSocket.on('messages_read', (messageIds) => {
      setMessages(prev => 
        prev.map(msg => 
          messageIds.includes(msg.id) ? { ...msg, read: true } : msg
        )
      );
    });
    
    // 管理員專用事件處理
    if (user.level === 2) {
      // 接收用戶列表
      newSocket.on('user_list', (users) => {
        setUserList(users);
        // 如果還沒有選擇用戶，並且有用戶，則選擇第一個
        if (!selectedUser && users.length > 0) {
          setSelectedUser(users[0]);
          // 通知伺服器選擇了這個用戶
          newSocket.emit('select_user', { userId: users[0].userId });
        }
      });
      
      // 新用戶連接
      newSocket.on('user_connected', (user) => {
        setUserList(prev => {
          // 檢查用戶是否已經在列表中
          const exists = prev.some(u => u.userId === user.userId);
          if (exists) return prev;
          return [...prev, user];
        });
      });
      
      // 用戶斷開連接
      newSocket.on('user_disconnected', (userId) => {
        setUserList(prev => prev.filter(user => user.userId !== userId));
        // 如果選中的用戶斷開了，清空選擇
        if (selectedUser && selectedUser.userId === userId) {
          setSelectedUser(null);
        }
      });
      
      // 更新用戶資訊
      newSocket.on('update_user', (userData) => {
        setUserList(prev => prev.map(user => 
          user.userId === userData.userId ? { ...user, ...userData } : user
        ));
      });
      
      // 用戶訊息已讀
      newSocket.on('user_messages_read', ({ userId, messageIds }) => {
        // 只更新特定用戶的訊息已讀狀態
        setMessages(prev => 
          prev.map(msg => 
            messageIds.includes(msg.id) && msg.sender === userId ? { ...msg, read: true } : msg
          )
        );
      });
    }
    
    setSocket(newSocket);

    // 清理函數
    return () => {
      if (newSocket) newSocket.disconnect();
    };
  }, [user]);

  // 處理發送訊息
  const sendMessage = (text, fileUrl, fileType) => {
    if (!socket || !isConnected) return;
    
    const messageData = {
      text: text || '',
      fileUrl,
      fileType
    };
    
    // 如果是管理員，需要指定接收用戶
    if (user.level === 2 && selectedUser) {
      messageData.to = selectedUser.userId;
    }
    
    socket.emit('send_message', messageData);
  };
  
  // 標記訊息為已讀
  const markAsRead = (messageIds) => {
    if (!socket || !isConnected) return;
    
    let userId;
    
    // 管理員標記來自特定用戶的訊息
    if (user.level === 2 && selectedUser) {
      userId = selectedUser.userId;
    } else {
      // 普通用戶標記來自客服的訊息
      userId = 'admin'; // 或使用實際的管理員 ID
    }
    
    socket.emit('mark_as_read', { userId, messageIds });
  };
  
  // 管理員選擇用戶
  const selectUser = (user) => {
    if (!socket || !isConnected || user.level !== 2) return;
    
    setSelectedUser(user);
    socket.emit('select_user', { userId: user.userId });
    
    // 標記該用戶的所有未讀訊息為已讀
    const unreadMessages = messages
      .filter(msg => msg.sender === user.userId && !msg.read)
      .map(msg => msg.id);
      
    if (unreadMessages.length > 0) {
      socket.emit('mark_as_read', { userId: user.userId, messageIds: unreadMessages });
    }
  };

  const contextValue = {
    socket,
    isConnected,
    messages,
    userList,
    selectedUser,
    error,
    sendMessage,
    markAsRead,
    selectUser,
    setSelectedUser,
  };

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}