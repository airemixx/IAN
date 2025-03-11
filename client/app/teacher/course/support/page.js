"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./support-chat.module.scss";
import { io } from "socket.io-client";
import { LuSend } from "react-icons/lu";
import Lottie from "lottie-react";
import typingAnimation from "@/public/animations/typing.json";

export default function SupportChat() {
  const [userRole, setUserRole] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([
    { text: "歡迎來到 LENSTUDIO 客服中心！請留下您的訊息，我們將盡快回覆您😊✨", sender_id: "admin" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef(null);

  // 🔹 FAQ 快速回覆選單
  const FAQ = [
    { question: "如何上架新課程？", answer: "請至「課程管理」頁面，點擊「新增課程」，填寫課程資訊即可上架課程。" },
    { question: "如何查看學生報名狀況？", answer: "請至「我的課程」頁面，您可以查看報名的學生數量。" },
    { question: "如何設定課程價格？", answer: "在上架課程時，您可以自行設定課程價格。" },
    { question: "如何獲得課程收益？", answer: "您的課程收益將累積至帳戶，每月 15 日結算，請至「收益管理」查看明細。" }
  ];

  // 🔹 當老師點擊 FAQ 問題時，顯示「輸入中」動畫並自動回覆
  const handleQuestionClick = (question, answer) => {
    setMessages(prev => [...prev, { text: question, sender_id: userId }]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { text: answer, sender_id: "bot" }]);
      setIsTyping(false);
    }, 1000);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1]; // 取得 payload 部分
      if (!base64Url) throw new Error("Token 無效");

      // Base64Url 轉 Base64
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

      // 解析 JSON
      return JSON.parse(decodeURIComponent(escape(atob(base64))));
    } catch (error) {
      console.error("❌ JWT 解析錯誤:", error);
      return null;
    }
  };


  const handleChatSelect = (chat) => {
    console.log("🟢 選擇的聊天室:", chat);

    if (!chat || !chat.id) {
      console.warn("⚠️ 選擇的聊天室無效");
      return;
    }

    setSelectedChat(chat); // ✅ 設定選中的聊天室
    fetchMessages(chat.id); // ✅ 載入該聊天室的訊息
  };

  const fetchMessages = async (chatId) => {

    if (!chatId) {
      // console.warn("⚠️ chatId 不存在，無法載入訊息");
      return;
    }
    // console.log(`📡 正在載入 chat_id: ${chatId} 的歷史訊息...`);

    try {
      const token = localStorage.getItem("loginWithToken");
      if (!token) {
        console.warn("❌ 無法取得 Token，請重新登入");
        return;
      }

      console.log(`📡 正在請求對話 ${chatId} 的所有訊息...`);
      const res = await fetch(`http://localhost:8000/api/support/messages/${chatId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // ✅ 確保有附帶 Token
        },
      });

      if (!res.ok) throw new Error(`無法取得歷史訊息 (錯誤碼: ${res.status})`);

      const data = await res.json();
      console.log(`✅ 取得 chat_id ${chatId} 的歷史訊息:`, data);

      setMessages(data);  // **確保更新 messages 狀態**
    } catch (error) {
      console.error("❌ 無法取得歷史訊息:", error);
    }
  };

  useEffect(() => {
    if (selectedChat?.id) {
      console.log("📡 `selectedChat` 變更，載入聊天室歷史訊息...", selectedChat.id);
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);


  // 🔹 解析 JWT，取得 `userId`
  useEffect(() => {
    const token = localStorage.getItem("loginWithToken");
    if (token) {
      const decoded = parseJwt(token);
      if (decoded?.id) {
        setUserId(decoded.id);
        console.log("✅ 設定 userId:", decoded.id);
      }
    }
  }, []);

  // 🔹 讀取 `userRole`
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole === "1" ? "teacher" : storedRole === "88" ? "admin" : storedRole);
    }
  }, []);

  // 🔹 建立 WebSocket 連線
  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  // 🔹 監聽 WebSocket 訊息
  useEffect(() => {
    if (!socket) return;
    const handleNewMessage = message => {
      setMessages(prevMessages => [...prevMessages, message]);
    };
    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket]);

  // 🔹 取得對話列表
  useEffect(() => {
    if (userRole && userId) {
      fetchConversations();
    }
  }, [userRole, userId]);

  // 🔹 取得對話列表（如果老師沒有對話，則建立新聊天室）
  const fetchConversations = async () => {
    if (!userRole || !userId) return;

    try {
      const token = localStorage.getItem("loginWithToken");
      const res = await fetch("http://localhost:8000/api/support/conversations", {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
      });

      if (!res.ok) throw new Error(`無法載入對話列表 (錯誤碼: ${res.status})`);

      let data = await res.json();
      console.log("✅ 取得對話列表:", data);

      if (data.length > 0) {
        setConversations(data);
        console.log("🟢 設定 `selectedChat`: ", data[0]);
        setSelectedChat(data[0]);  // ✅ 設定聊天室
        fetchMessages(data[0].id);  // ✅ **確保載入第一個聊天室訊息**
      } else {
        setConversations([]);
        setSelectedChat(null);
      }
    } catch (error) {
      console.error("❌ 無法取得對話列表:", error);
    }
  };



  // 🔹 發送訊息
  const sendMessage = async () => {
    console.log("📢 按鈕被點擊了！");
    console.log("🔍 selectedChat:", selectedChat);
    console.log("🔍 newMessage:", newMessage);

    const token = localStorage.getItem("loginWithToken");
    if (!token) {
      console.warn("❌ 沒有 Token，請先登入");
      return;
    }

    if (!newMessage.trim()) {
      console.warn("❌ 訊息不可為空");
      return;
    }

    const messageData = {
      chatId: selectedChat?.id || null, // ✅ 讓後端決定是否建立新對話
      text: newMessage,
    };

    console.log("📩 準備發送訊息:", messageData);

    try {
      const res = await fetch("http://localhost:8000/api/support/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(`API 回應錯誤: ${data.error}`);

      console.log("✅ 訊息成功送出:", data);

      // ✅ **確保 `chatId` 正確更新**
      if (!selectedChat?.id && data.chatId) {
        setSelectedChat({ id: data.chatId }); // **如果對話是剛建立的，則更新 `selectedChat`**
      }

      // ✅ **更新訊息列表**
      setMessages((prevMessages) => [
        ...prevMessages,
        { chatId: data.chatId, sender_id: userId, text: newMessage },
      ]);

    } catch (error) {
      console.error("❌ 訊息發送錯誤:", error);
    }

    setNewMessage(""); // 清空輸入框
  };


  return (
    <div className="container">
      <h1 className={styles.supportTitle}>客服中心</h1>
      <div className="row">
        {/* ✅ 左側：管理員才能看到對話列表 */}
        {userRole === "admin" && (
          <div className="col-md-4">
            <div className={styles.chatList}>
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${selectedChat?.id === chat.id ? styles.active : ""}`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className={styles.chatInfo}>
                    <img
                      src={chat.user_avatar ? `http://localhost:3000${chat.user_avatar}` : "http://localhost:3000/uploads/users.webp"}
                      className={styles.infoAvatar}
                      alt="User Avatar"
                    />
                    <div className={styles.chatInfoText}>
                      <h4 className={styles.chatName}>{chat.user_name || `訪客 #${chat.id}`}</h4>
                      <p className={styles.chatText}>{chat.lastMessage}</p> </div>
                  </div>
                  <span className={styles.timestamp}>
                    {chat.lastMessageTime
                      ? new Date(chat.lastMessageTime).toLocaleString("zh-TW", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false, // 24 小時制
                      })
                      : "無紀錄"}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ✅ 右側：對話視窗 */}
        <div className={userRole === "admin" ? "col-md-8" : "col-12"}>
          <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
              <h4>
                {selectedChat?.user_name
                  ? selectedChat.user_name
                  : userRole === "teacher"
                    ? "Hi, 需要幫忙嗎？"
                    : userRole === "admin"
                      ? "請選擇聊天室"
                      : "聊天室"}
              </h4>
            </div>


            <div className={styles.chatBody} ref={chatBodyRef}>
              {messages.map((msg, index) => {
                const isSender = msg.sender_id === userId;
                return (
                  <div key={index} className={`${styles.messageWrapper} ${isSender ? styles.sent : styles.received}`}>
                    {!isSender && (
                      <img
                        src={msg.user_avatar ? `http://localhost:3000${msg.user_avatar}` : "http://localhost:3000/uploads/1741674302756-lenstudio-05.jpg"}
                        className={styles.avatar}
                        alt="User Avatar"
                      />
                    )}

                    <div className={styles.messageBox}>
                      <div className={styles.text}>{msg.text}</div>
                    </div>

                    <div className={styles.timestamp}>
                      {new Date().toLocaleString("zh-TW", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false
                      })}
                    </div>
                  </div>
                );
              })}
              {isTyping && (
                <div className={styles.typingAnimation}>
                  <Lottie animationData={typingAnimation} loop={true} />
                </div>
              )}
            </div>

            {/* FAQ 快速回應按鈕 */}

            {userRole === "teacher" && (
              <div className={styles.quickReplies}>
                {FAQ.map((item, index) => (
                  <button key={index} onClick={() => handleQuestionClick(item.question, item.answer)}>
                    {item.question}
                  </button>
                ))}
              </div>
            )}



            {/* ✅ 訊息輸入框 */}
            <div className={styles.chatFooter}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="輸入訊息..."
                className={styles.inputField}
              />
              <button onClick={sendMessage} className={styles.sendButton}>
                <LuSend size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}