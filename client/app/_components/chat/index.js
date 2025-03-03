"use client"

import React from "react";
import AdminChatWidget from "./admin-chat";
import ChatWidget from "./user-chat";

/**
 * 聊天室選擇器組件
 * 根據用戶等級決定顯示哪種聊天室介面
 * 
 * @param {Object} props 組件屬性
 * @param {number} props.userLevel 用戶等級 (2為管理員，其他為普通用戶)
 * @returns {JSX.Element} 相應的聊天室組件
 */
export default function Chat({ userLevel }) {
  // 根據用戶等級決定使用哪個聊天室組件
  return userLevel === 2 ? <AdminChatWidget /> : <ChatWidget />;
}