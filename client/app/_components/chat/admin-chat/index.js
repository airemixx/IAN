"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "react-bootstrap"
import { X, Check, CheckAll, Search } from "react-bootstrap-icons"
import { CSSTransition } from "react-transition-group"
import styles from "./index.module.scss"
import EmojiPicker, { SkinTones } from 'emoji-picker-react';
import emojiRegex from 'emoji-regex';

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

const captureEmojiRegex = new RegExp(`(${emojiRegex().source})`, 'gu');

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeUser, setActiveUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  // 模擬用戶列表數據
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "陳小明",
      avatar: "/images/chatRoom/user1.jpg",
      online: true,
      lastMessage: "您好！請問有什麼問題嗎？",
      lastMessageTime: new Date(Date.now() - 5 * 60000), // 5分鐘前
      unreadCount: 2,
    },
    {
      id: 2,
      name: "林美玲",
      avatar: "/images/chatRoom/user2.jpg",
      online: false,
      lastMessage: "謝謝您的協助，問題已經解決！",
      lastMessageTime: new Date(Date.now() - 3 * 3600000), // 3小時前
      unreadCount: 0,
    },
    {
      id: 3,
      name: "王大華",
      avatar: "/images/chatRoom/user3.jpg",
      online: true,
      lastMessage: "我想瞭解更多關於鏡框保養的資訊",
      lastMessageTime: new Date(Date.now() - 2 * 86400000), // 2天前
      unreadCount: 0,
    }
  ])

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
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [enlargeImage, setEnlargeImage] = useState(null);

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

    // 如果沒有選擇用戶，無法發送訊息
    if (!activeUser) return

    // 檢查是否有文字消息或文件
    const hasText = newMessage.trim() !== "";
    const hasFiles = selectedFiles.length > 0;

    if (!hasText && !hasFiles) return;

    // 如果有文字消息，先發送文字
    if (hasText) {
      const textMessage = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "agent",
        timestamp: new Date(),
        read: false,
      };

      setMessages(prev => [...prev, textMessage]);

      // 更新用戶列表中的最後訊息
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === activeUser.id
            ? {
              ...user,
              lastMessage: newMessage,
              lastMessageTime: new Date()
            }
            : user
        )
      )

      setNewMessage("");
    }

    // 如果有文件，發送所有文件
    if (hasFiles) {
      const fileMessages = selectedFiles.map((fileObj, index) => ({
        id: Date.now().toString() + index,
        text: fileObj.type === 'image' ? '圖片訊息' : '影片訊息',
        fileUrl: fileObj.url,
        fileType: fileObj.type,
        sender: "user",
        timestamp: new Date(Date.now() + index * 100), // 略微錯開時間戳避免ID衝突
        read: false,
      }));

      setMessages(prev => [...prev, ...fileMessages]);

      // 清空文件列表並關閉預覽
      setSelectedFiles([]);
      setIsPreviewOpen(false);

      // 為每個發送的文件添加客服回覆
      setTimeout(() => {
        const agentMessage = {
          id: (Date.now() + 1000).toString(),
          text: fileMessages.length > 1
            ? `收到您的${fileMessages.length}張圖片/影片`
            : fileMessages[0].fileType === 'image' ? "收到您的圖片" : "收到您的影片",
          sender: "agent",
          timestamp: new Date(Date.now() + 1000),
          read: true,
        };
        setMessages(prev => [...prev, agentMessage]);
      }, 1000);
    }

    // 滾動到底部
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    // 檢查並處理文件
    const validFiles = files.filter(file => {
      // 驗證文件類型
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      // 如果是影片，檢查是否已有影片文件
      if (isVideo && (selectedFiles.some(f => f.type.startsWith('video/')) || files.filter(f => f.type.startsWith('video/')).length > 1)) {
        alert('一次只能上傳一個影片');
        return false;
      }

      return isImage || isVideo;
    });

    // 為每個文件添加 URL 和 ID
    const filesWithPreview = validFiles.map(file => ({
      file,
      id: Date.now() + Math.random().toString(36).substring(2),
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));

    setSelectedFiles(prev => [...prev, ...filesWithPreview]);
    setIsPreviewOpen(true);

    // 清空 input 以便重複選擇相同文件
    e.target.value = null;
  };

  const removeFile = (id) => {
    setSelectedFiles(prev => {
      const filtered = prev.filter(file => file.id !== id);
      if (filtered.length === 0) {
        setIsPreviewOpen(false);
      }
      return filtered;
    });
  };

  const sendFileMessage = (fileObj) => {
    const isImage = fileObj.type === 'image';

    const fileMessage = {
      id: Date.now().toString(),
      text: isImage ? '圖片訊息' : '影片訊息',
      fileUrl: fileObj.url,
      fileType: fileObj.type,
      sender: "user",
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [...prev, fileMessage]);

    // 移除已發送的文件
    setSelectedFiles(prev => prev.filter(file => file.id !== fileObj.id));

    // 如果沒有剩餘文件，關閉預覽
    if (selectedFiles.length <= 1) {
      setIsPreviewOpen(false);
    }

    // 添加模擬客服回覆
    setTimeout(() => {
      const agentMessage = {
        id: (Date.now() + 1).toString(),
        text: isImage ? "收到您的圖片" : "收到您的影片",
        sender: "agent",
        timestamp: new Date(),
        read: true,
      };
      setMessages(prev => [...prev, agentMessage]);
    }, 1000);
  };

  const handleImageClick = (imageUrl) => {
    setEnlargeImage(imageUrl);
  };

  const closeImageViewer = () => {
    setEnlargeImage(null);
  };

  const onEmojiClick = (emojiData) => {
    // 在游標位置插入 emoji
    setNewMessage(prev =>
      prev.substring(0, document.getElementById('messageInput').selectionStart) +
      emojiData.emoji +
      prev.substring(document.getElementById('messageInput').selectionEnd)
    );
  };

  const toggleEmojiPicker = (e) => {
    e.preventDefault();
    setShowEmojiPicker(!showEmojiPicker);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target) &&
        !e.target.classList.contains(styles.emojiButton) &&
        !e.target.closest(`.${styles.emojiButton}`)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handleUserSelect = (user) => {
    setActiveUser(user)
    // 在實際應用中，這裡可以獲取與該用戶的聊天歷史

    // 模擬獲取聊天記錄
    if (user.id === 1) {
      setMessages([
        {
          id: "1",
          text: "您好！很高興為您服務。",
          sender: "agent",
          timestamp: new Date(Date.now() - 10 * 60000),
          read: true,
        },
        {
          id: "2",
          text: "您好，我想詢問眼鏡的尺寸問題",
          sender: "user",
          timestamp: new Date(Date.now() - 8 * 60000),
          read: true,
        },
        {
          id: "3",
          text: "當然可以，請問您需要瞭解哪款眼鏡的尺寸呢？",
          sender: "agent",
          timestamp: new Date(Date.now() - 7 * 60000),
          read: true,
        },
        {
          id: "4",
          text: "我在考慮購買那款新出的太陽眼鏡",
          sender: "user",
          timestamp: new Date(Date.now() - 5 * 60000),
          read: true,
        },
      ])
    } else if (user.id === 2) {
      setMessages([
        {
          id: "1",
          text: "林小姐您好，很高興為您服務。",
          sender: "agent",
          timestamp: new Date(Date.now() - 5 * 3600000),
          read: true,
        },
        {
          id: "2",
          text: "我剛買的眼鏡有點鬆，可以調整嗎？",
          sender: "user",
          timestamp: new Date(Date.now() - 4 * 3600000),
          read: true,
        },
        {
          id: "3",
          text: "是的，您可以帶到我們店裡來，我們可以免費為您調整。",
          sender: "agent",
          timestamp: new Date(Date.now() - 3.5 * 3600000),
          read: true,
        },
        {
          id: "4",
          text: "謝謝您的協助，問題已經解決！",
          sender: "user",
          timestamp: new Date(Date.now() - 3 * 3600000),
          read: true,
        },
      ])
    } else {
      setMessages([
        {
          id: "1",
          text: "王先生您好，很高興為您服務。",
          sender: "agent",
          timestamp: new Date(Date.now() - 3 * 86400000),
          read: true,
        },
        {
          id: "2",
          text: "您好，我想瞭解更多關於鏡框保養的資訊",
          sender: "user",
          timestamp: new Date(Date.now() - 2 * 86400000),
          read: true,
        },
      ])
    }

    // 清除未讀訊息計數
    setUsers(prevUsers =>
      prevUsers.map(u =>
        u.id === user.id ? { ...u, unreadCount: 0 } : u
      )
    )
  }

  // 搜尋用戶
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            {/* 左側用戶列表 */}
            <div className={styles.userListSection}>
              <div className={styles.userListHeader}>
                <h4>用戶列表</h4>
                <div className={styles.searchContainer}>
                  <Search className={styles.searchIcon} />
                  <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="搜尋用戶..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.userList}>
                {filteredUsers.map(user => (
                  <div
                    key={user.id}
                    className={`${styles.userItem} ${activeUser?.id === user.id ? styles.activeUser : ''}`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className={styles.userAvatar}>
                      <img src={user.avatar || "/images/chatRoom/default-user.jpg"} alt={user.name} />
                      <div className={`${styles.onlineStatus} ${user.online ? styles.online : styles.offline}`}></div>
                    </div>

                    <div className={styles.userInfo}>
                      <div className={styles.userNameRow}>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.messageTime}>
                          {formatMessageTime(user.lastMessageTime)}
                        </div>
                      </div>

                      <div className={styles.lastMessageRow}>
                        <div className={styles.lastMessage}>{user.lastMessage}</div>
                        {user.unreadCount > 0 && (
                          <div className={styles.unreadBadge}>{user.unreadCount}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 右側聊天區域 */}
            <div className={styles.chatSection}>
              {activeUser ? (
                <>
                  <div className={styles.chatHeader}>
                    <div className={styles.headerUserInfo}>
                      <div className={styles.userName}>{activeUser.name}</div>
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

                        const regex = emojiRegex();

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
                              {/* 只有用戶消息顯示頭像，且在左邊 */}
                              {message.sender === "user" && showAvatar && (
                                <div className={styles.avatarContainer}>
                                  <img
                                    src={activeUser.avatar || "/images/chatRoom/user1.jpg"}
                                    alt={activeUser.name}
                                    className={styles.avatar}
                                  />
                                </div>
                              )}
                              {/* 移除 agent 頭像顯示部分 */}

                              <div
                                className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.agentMessage} ${styles[`bubble-${bubblePosition}`]}`}
                              >
                                {/* 已讀標誌只顯示在用戶訊息 */}
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
                                  {message.fileType ? (
                                    message.fileType === 'image' ? (
                                      <img
                                        src={message.fileUrl}
                                        alt="圖片訊息"
                                        className={styles.messageImage}
                                        onClick={() => handleImageClick(message.fileUrl)}
                                      />
                                    ) : (
                                      <video controls className={styles.messageVideo}>
                                        <source src={message.fileUrl} type="video/mp4" />
                                        您的瀏覽器不支持影片播放
                                      </video>
                                    )
                                  ) : (
                                    <div className={styles.messageText}>
                                      {
                                        // 使用更精確的替換方案
                                        (() => {
                                          // 先找出所有的 emoji 位置
                                          const emojis = [];
                                          const regex = emojiRegex();
                                          let match;
                                          while ((match = regex.exec(message.text)) !== null) {
                                            emojis.push({
                                              emoji: match[0],
                                              index: match.index,
                                              length: match[0].length
                                            });
                                          }

                                          // 如果沒有 emoji，直接返回文字
                                          if (emojis.length === 0) {
                                            return <span className={styles.plainText}>{message.text}</span>;
                                          }

                                          // 有 emoji 的情況，組合文字和表情符號
                                          const result = [];
                                          let lastIndex = 0;

                                          emojis.forEach((item, i) => {
                                            // 添加 emoji 前面的純文字
                                            if (lastIndex < item.index) {
                                              result.push(
                                                <span key={`text-${i}`} className={styles.plainText}>
                                                  {message.text.substring(lastIndex, item.index)}
                                                </span>
                                              );
                                            }

                                            // 添加 emoji
                                            result.push(
                                              <span key={`emoji-${i}`} className={styles.emoji}>
                                                {item.emoji}
                                              </span>
                                            );

                                            lastIndex = item.index + item.length;
                                          });

                                          // 添加最後一段純文字 (如果有的話)
                                          if (lastIndex < message.text.length) {
                                            result.push(
                                              <span key={`text-last`} className={styles.plainText}>
                                                {message.text.substring(lastIndex)}
                                              </span>
                                            );
                                          }

                                          return result;
                                        })()
                                      }
                                    </div>
                                  )}
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
                    {isPreviewOpen && (
                      <div className={styles.filePreviewArea}>
                        {selectedFiles.map((fileObj) => (
                          <div key={fileObj.id} className={styles.filePreviewItem}>
                            <button
                              className={styles.removeFileButton}
                              onClick={() => removeFile(fileObj.id)}
                            >
                              <X size={14} />
                            </button>
                            {fileObj.type === 'image' ? (
                              <img src={fileObj.url} alt="預覽" />
                            ) : (
                              <video>
                                <source src={fileObj.url} type={fileObj.file.type} />
                                您的瀏覽器不支持影片預覽
                              </video>
                            )}
                            {/* 移除單獨的發送按鈕 */}
                          </div>
                        ))}
                      </div>
                    )}
                    <form onSubmit={handleSendMessage} className={styles.messageForm}>
                      <div className={styles.inputContainer}>
                        <input
                          id="messageInput"
                          type="text"
                          placeholder="輸入訊息..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className={styles.messageInput}
                        />
                      </div>
                      <div className="image-send-emoji-btn d-flex align-items-center">
                        <div className={styles.emojiButtonContainer}>
                          <button
                            type="button"
                            className={styles.emojiButton}
                            onMouseEnter={() => setIsEmojiHovered(true)}
                            onMouseLeave={() => setIsEmojiHovered(false)}
                            onClick={toggleEmojiPicker}
                          >
                            <img
                              src={isEmojiHovered
                                ? "/images/chatRoom/emoji-active.svg"
                                : "/images/chatRoom/emoji-origin.svg"}
                              alt=""
                            />
                          </button>
                          {showEmojiPicker && (
                            <div className={styles.emojiPickerContainer} ref={emojiPickerRef}>
                              <EmojiPicker
                                onEmojiClick={onEmojiClick}
                                width={300}
                                height={400}
                                defaultSkinTone={SkinTones.MEDIUM}
                                searchDisabled
                                previewConfig={{ showPreview: false }}
                                theme="light" // 或 'dark' 或 'auto'
                                emojiStyle="native"
                                categories={['smileys_people', 'animals_nature', 'food_drink', 'travel_places', 'activities', 'objects', 'symbols', 'flags']}
                              />
                            </div>
                          )}
                        </div>
                        <>
                          <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileSelect}
                            style={{ display: 'none' }}
                          />
                          <button
                            type="button"
                            className={styles.imageButton}
                            onMouseEnter={() => setIsImageHovered(true)}
                            onMouseLeave={() => setIsImageHovered(false)}
                            onClick={() => fileInputRef.current.click()}
                          >
                            <img
                              src={isImageHovered
                                ? "/images/chatRoom/image-update-active.svg"
                                : "/images/chatRoom/image-update-origin.svg"}
                              alt="上傳圖片或影片"
                            />
                          </button>
                        </>
                        <button
                          type="submit"
                          className={styles.sendButton}
                          disabled={newMessage.trim() === "" && selectedFiles.length === 0}
                        >
                          <img src="/images/chatRoom/send-origin.svg" alt="" />
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <div className={styles.noUserSelected}>
                  <img src="/images/chatRoom/select-user.svg" alt="選擇用戶" width="120" />
                  <p>請選擇一位用戶開始聊天</p>
                </div>
              )}
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

      {enlargeImage && (
        <div className={styles.imageViewerOverlay} onClick={closeImageViewer}>
          <div className={styles.imageViewerContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.imageViewerClose} onClick={closeImageViewer}>
              <X size={24} />
            </button>
            <img src={enlargeImage} alt="放大圖片" className={styles.enlargedImage} />
          </div>
        </div>
      )}
    </div>
  )
}

