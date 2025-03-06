"use client"

import React, { useEffect, useState } from "react";
import AdminChatWidget from "./admin-chat";
import ChatWidget from "./user-chat";
import { SocketProvider } from "./context/socketContext";

/**
 * 聊天室選擇器組件
 * 根據用戶等級決定顯示哪種聊天室介面
 * 
 * @param {Object} props 組件屬性
 * @param {number} props.userLevel 用戶等級 (2為管理員，其他為普通用戶)
 * @returns {JSX.Element} 相應的聊天室組件
 */
export default function Chat({ userLevel }) {
  // 從 localStorage 或 API 獲取當前用戶資訊
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // 從 localStorage 獲取用戶資訊和 token
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // 確保用戶有必須的欄位
        setUser({
          ...userData,
          level: userLevel, // 使用傳入的 userLevel
          token: localStorage.getItem('token') || userData.token
        });
      } catch (e) {
        console.error('解析用戶資料失敗', e);
      }
    }
  }, [userLevel]);
  
  if (!user) return <div>載入中...</div>;
  
  return (
    <SocketProvider user={user}>
      {userLevel === 2 ? <AdminChatWidget /> : <ChatWidget />}
    </SocketProvider>
  );
}