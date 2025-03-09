"use client";

import { useState, useEffect } from "react";
import styles from "./support-chat.module.scss";
import { io } from "socket.io-client";


export default function SupportChat({ userRole }) {
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socket = io("http://localhost:8000");

  // 連接後端
  socket.on("newMessage", (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  // 發送訊息
  const sendMessage = () => {
    socket.emit("sendMessage", { chatId, sender, text: newMessage });
  };

  // ✅ 老師端：每次開啟都是新的對話
  useEffect(() => {
    if (userRole === "teacher") {
      setMessages([]); // 老師開啟時清空訊息
      setSelectedChat({ id: "new", name: "管理員" });
    } else {
      fetchConversations();
    }
  }, [userRole]);

  // ✅ 只有管理員能讀取所有老師的歷史紀錄
  const fetchConversations = async () => {
    if (userRole !== "admin") return;

    try {
      const res = await fetch("http://localhost:8000/api/support/conversations");
      if (!res.ok) throw new Error("無法載入對話列表");
      const data = await res.json();
      setConversations(data);
      if (data.length > 0) setSelectedChat(data[0]);
    } catch (error) {
      console.error("❌ 無法取得對話列表:", error);
    }
  };

  // ✅ 只有管理員能讀取歷史訊息
  useEffect(() => {
    if (!selectedChat || userRole !== "admin") return;
    fetchMessages();
  }, [selectedChat]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/support/messages/${selectedChat.id}`);
      if (!res.ok) throw new Error("無法取得歷史訊息");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("❌ 無法取得歷史訊息:", error);
    }
  };

  // ✅ 發送訊息（老師的訊息不存入資料庫）
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      chatId: selectedChat.id,
      sender: userRole,
      text: newMessage,
    };

    setMessages([...messages, messageData]); // ✅ 更新前端顯示

    if (userRole === "admin") {
      try {
        const res = await fetch("http://localhost:8000/api/support/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(messageData),
        });

        if (!res.ok) throw new Error("無法發送訊息");
      } catch (error) {
        console.error("❌ 訊息發送錯誤:", error);
      }
    }

    setNewMessage("");
  };

  return (
    <div className="container">
      <h1 className={styles.supportTitle}>客服中心</h1>
      <div className="row">
        {/* 左側：管理員才能看到對話列表 */}
        {userRole === "admin" && (
          <div className="col-md-4">
            <div className={styles.chatList}>
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.active : ""}`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <h4>{chat.name}</h4>
                  <p>{chat.lastMessage}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 右側：對話視窗 */}
        <div className={userRole === "admin" ? "col-md-8" : "col-12"}>
          <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
              {/* ✅ 老師端直接顯示「管理員」，管理員端如果沒有選擇聊天室才顯示「請選擇聊天室」 */}
              <h4>
                {selectedChat
                  ? selectedChat.name
                  : userRole === "admin"
                    ? "請選擇聊天室"
                    : ""}
              </h4>
            </div>

            <div className={styles.chatBody}>
              {messages.map((msg, index) => (
                <div key={index} className={`${styles.message} ${msg.sender === userRole ? styles.teacher : styles.admin}`}>
                  {msg.text}
                </div>
              ))}
            </div>

            {/* 訊息輸入框 */}
            <div className={styles.chatFooter}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="輸入訊息..."
                className={styles.inputField}
              />
              <button onClick={handleSendMessage} className={styles.sendButton}>
                發送
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
