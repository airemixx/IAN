"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "react-bootstrap"
import { X, Check, CheckAll } from "react-bootstrap-icons"
import { CSSTransition } from "react-transition-group"
import styles from "./index.module.scss"

// 檢查兩個日期是否是同一天
const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
};

// 根據時間差異格式化訊息時間
const formatMessageTime = (timestamp) => {
  const now = new Date();
  const messageDate = new Date(timestamp);

  // 檢查是否同一年
  const isSameYear = now.getFullYear() === messageDate.getFullYear();

  // 檢查是否同一天
  const isSameDay =
    isSameYear &&
    now.getMonth() === messageDate.getMonth() &&
    now.getDate() === messageDate.getDate();

  // 格式化時間
  const hours = messageDate.getHours().toString().padStart(2, '0');
  const minutes = messageDate.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  if (isSameDay) {
    return timeStr;
  } else if (isSameYear) {
    const month = messageDate.getMonth() + 1;
    const day = messageDate.getDate();
    return `${month}月${day}日 ${timeStr}`;
  } else {
    const year = messageDate.getFullYear();
    const month = messageDate.getMonth() + 1;
    const day = messageDate.getDate();
    return `${year}年${month}月${day}日 ${timeStr}`;
  }
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "您好！很高興為您服務。",
      sender: "agent",
      timestamp: new Date(),
      read: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const chatBodyRef = useRef(null)
  const nodeRef = useRef(null)
  const buttonRef = useRef(null)
  const [isNearBottom, setIsNearBottom] = useState(true);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }

  const handleScroll = () => {
    if (chatBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
      const bottom = scrollHeight - scrollTop - clientHeight < 20;
      setIsNearBottom(bottom);
    }
  }

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (chatBody) {
      chatBody.addEventListener('scroll', handleScroll);
      return () => chatBody.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // 分離滾動邏輯
  useEffect(() => {
    if (messages.length > 0) {
      // 只有當用戶在底部附近或新增用戶訊息時才滾動
      const lastMessageIsNew = messages[messages.length - 1].id === Date.now().toString();
      const lastMessageIsFromUser = messages[messages.length - 1].sender === 'user';

      if (isNearBottom && (lastMessageIsNew || lastMessageIsFromUser)) {
        scrollToBottom();
      }
    }
  }, [messages]);

  // 單獨處理已讀狀態更新
  useEffect(() => {
    if (messages.length > 0) {
      // 尋找未讀的用戶訊息
      const hasUnreadUserMessages = messages.some(msg => msg.sender === "user" && !msg.read);

      if (hasUnreadUserMessages) {
        const timer = setTimeout(() => {
          setMessages((prevMessages) => prevMessages.map((msg) =>
            (msg.sender === "user" && !msg.read) ? { ...msg, read: true } : msg
          ));
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 300);
    }
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const userMessage = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
      read: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsNearBottom(true);

    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        text: "收到您的訊息，我們會盡快處理。",
        sender: "agent",
        timestamp: new Date(),
        read: true,
      }
      setMessages((prev) => [...prev, agentMessage])
    }, 1000)
  }

  return (
    <div className={styles.chatWidgetContainer}>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames={{
          enter: styles.chatWindowEnter,
          enterActive: styles.chatWindowEnterActive,
          exit: styles.chatWindowExit,
          exitActive: styles.chatWindowExitActive,
        }}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef} className={styles.chatWindow}>
          <div className={styles.mainChat}>
            <div className={styles.chatHeader}>
              <div className={styles.headerUserInfo}>
                <div className={styles.userName}>客服中心</div>
              </div>
              <button className={styles.iconButton} onClick={toggleChat}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.chatBody} ref={chatBodyRef}>
              <div className={styles.messagesContainer}>
                {messages.map((message, index) => {
                  const isPrevSameSender = index > 0 && messages[index - 1].sender === message.sender;
                  const isNextSameSender = index < messages.length - 1 && messages[index + 1].sender === message.sender;

                  // 檢查是否需要顯示時間標記 - 當發送者改變時
                  const isPrevDifferentSender = index > 0 && messages[index - 1].sender !== message.sender;

                  // 檢查是否與前一則訊息日期不同 - 跨天顯示
                  const isPrevDifferentDay = index > 0 &&
                    !isSameDay(new Date(messages[index - 1].timestamp), new Date(message.timestamp));

                  // 顯示時間的條件：發送者變更或跨天
                  const shouldShowTime = isPrevDifferentSender || isPrevDifferentDay;

                  // 決定氣泡類型
                  let bubblePosition = '';
                  if (!isPrevSameSender && !isNextSameSender) {
                    bubblePosition = 'single';
                  } else if (!isPrevSameSender && isNextSameSender) {
                    bubblePosition = 'first';
                  } else if (isPrevSameSender && isNextSameSender) {
                    bubblePosition = 'middle';
                  } else {
                    bubblePosition = 'last';
                  }

                  const showAvatar = !isNextSameSender;

                  return (
                    <React.Fragment key={message.id}>
                      {/* 時間標記 */}
                      {shouldShowTime && (
                        <div className={styles.timeLabel}>
                          {formatMessageTime(message.timestamp)}
                        </div>
                      )}

                      {/* 原本的訊息行 */}
                      <div
                        className={`${styles.messageRow} ${message.sender === "user" ? styles.userMessageRow : styles.agentMessageRow}`}
                      >
                        {message.sender === "agent" && showAvatar && (
                          <div className={styles.avatarContainer}>
                            <img
                              src={message.avatar || "/images/chatRoom/server.jpg"}
                              alt="Agent"
                              className={styles.avatar}
                            />
                          </div>
                        )}

                          <div
                            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.agentMessage} ${styles[`bubble-${bubblePosition}`]}`}
                          >
                            {/* 已讀標誌放在這裡，直接在訊息行內部 */}
                            {message.sender === "user" && (
                              <div className={styles.messageStatus}>
                                {message.read ? (
                                  <CheckAll size={18} className={styles.readIcon} />
                                ) : (
                                  <Check size={18} className={styles.unreadIcon} />
                                )}
                              </div>
                            )}
                            <div className={styles.messageContent}>
                              <div className={styles.messageText}>{message.text}</div>
                            </div>
                          </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className={styles.chatFooter}>
              <form onSubmit={handleSendMessage} className={styles.messageForm}>
                <div className={styles.inputContainer}>
                  <input
                    type="text"
                    placeholder="輸入訊息..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={styles.messageInput}
                  />
                </div>
                <div className="image-send-emoji-btn d-flex align-items-center">
                  <button type="button" className={styles.emojiButton}>
                    <img src="/images/chatRoom/emoji-origin.svg" alt="" />
                  </button>
                  <button type="button" className={styles.imageButton}>
                    <img src="/images/chatRoom/image-update-origin.svg" alt="" />
                  </button>
                  <button type="submit" className={styles.sendButton} disabled={newMessage.trim() === ""}>
                    <img src="/images/chatRoom/send-origin.svg" alt="" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </CSSTransition>

      <div className={styles.chatButtonWrapper}>
        <CSSTransition
          in={!isOpen}
          timeout={300}
          classNames={{
            enter: styles.chatButtonEnter,
            enterActive: styles.chatButtonEnterActive,
            exit: styles.chatButtonExit,
            exitActive: styles.chatButtonExitActive,
          }}
          unmountOnExit
          nodeRef={buttonRef}
        >
          <Button ref={buttonRef} variant="primary" className={styles.chatButton} onClick={toggleChat}>
            <img src="/images/chatRoom/server-origin.svg" alt="" />
          </Button>
        </CSSTransition>
      </div>
    </div>
  )
}

