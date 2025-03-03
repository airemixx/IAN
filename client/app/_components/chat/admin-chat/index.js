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

export default function AdminChatWidget() {
  const [isOpen, setIsOpen] = useState(true)
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "陳曉明", 
      avatar: "/images/user.png", 
      lastMessage: "請問商品什麼時候能到貨？",
      time: new Date(Date.now() - 1000 * 60 * 15),
      unread: 3,
      online: true
    },
    { 
      id: 2, 
      name: "林小美", 
      avatar: "/images/user.png", 
      lastMessage: "謝謝您的協助！",
      time: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unread: 0,
      online: false
    },
    { 
      id: 3, 
      name: "王大華", 
      avatar: "/images/user.png", 
      lastMessage: "我想退貨，可以嗎？",
      time: new Date(Date.now() - 1000 * 60 * 30),
      unread: 1,
      online: true
    },
    { 
      id: 4, 
      name: "張小菁", 
      avatar: "/images/user.png", 
      lastMessage: "好的，我等您的通知",
      time: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unread: 0,
      online: false
    },
    { 
      id: 5, 
      name: "李大明", 
      avatar: "/images/user.png", 
      lastMessage: "有優惠活動嗎？",
      time: new Date(Date.now() - 1000 * 60 * 55),
      unread: 2,
      online: true
    }
  ])
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [userMessages, setUserMessages] = useState({})
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const chatBodyRef = useRef(null)
  const nodeRef = useRef(null)
  const [isNearBottom, setIsNearBottom] = useState(true);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isEmojiHovered, setIsEmojiHovered] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [enlargeImage, setEnlargeImage] = useState(null);

  // 初始化每個用戶的訊息
  useEffect(() => {
    const initialMessages = {};
    users.forEach(user => {
      initialMessages[user.id] = [
        {
          id: "system-" + user.id,
          text: `您已經開始和 ${user.name} 的對話。`,
          sender: "system",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true,
        },
        {
          id: "user-" + user.id,
          text: user.lastMessage,
          sender: "user",
          timestamp: user.time,
          read: !user.unread,
        }
      ];
    });
    setUserMessages(initialMessages);
  }, []);

  // 選擇用戶
  const selectUser = (user) => {
    setSelectedUser(user);
    
    // 標記該用戶訊息為已讀
    if (user) {
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, unread: 0 };
        }
        return u;
      });
      setUsers(updatedUsers);
      
      // 標記對話訊息為已讀
      if (userMessages[user.id]) {
        setUserMessages(prev => ({
          ...prev,
          [user.id]: prev[user.id].map(msg => 
            msg.sender === "user" ? { ...msg, read: true } : msg
          )
        }));
      }
    }
  };

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

  // 選擇用戶後滾動到底部
  useEffect(() => {
    if (selectedUser) {
      setTimeout(scrollToBottom, 100);
    }
  }, [selectedUser]);

  // 監控訊息變化，滾動到底部
  useEffect(() => {
    if (selectedUser && isNearBottom) {
      setTimeout(scrollToBottom, 100);
    }
  }, [userMessages, selectedUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    // 檢查是否有文字消息或文件
    const hasText = newMessage.trim() !== "";
    const hasFiles = selectedFiles.length > 0;

    if (!hasText && !hasFiles) return;

    // 如果有文字消息，先發送文字
    if (hasText) {
      const agentMessage = {
        id: Date.now().toString(),
        text: newMessage,
        sender: "agent",
        timestamp: new Date(),
        read: true,
      };

      setUserMessages(prev => ({
        ...prev,
        [selectedUser.id]: [...prev[selectedUser.id], agentMessage]
      }));
      setNewMessage("");
    }

    // 如果有文件，發送所有文件
    if (hasFiles) {
      const fileMessages = selectedFiles.map((fileObj, index) => ({
        id: Date.now().toString() + index,
        text: fileObj.type === 'image' ? '圖片訊息' : '影片訊息',
        fileUrl: fileObj.url,
        fileType: fileObj.type,
        sender: "agent",
        timestamp: new Date(Date.now() + index * 100),
        read: true,
      }));

      setUserMessages(prev => ({
        ...prev,
        [selectedUser.id]: [...prev[selectedUser.id], ...fileMessages]
      }));

      // 清空文件列表並關閉預覽
      setSelectedFiles([]);
      setIsPreviewOpen(false);
    }
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

  // 過濾用戶列表
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.adminChatContainer}>
      <div className={styles.adminChatWindow}>
        {/* 左側用戶列表 */}
        <div className={styles.userListSection}>
          <div className={styles.userListHeader}>
            <h4>客戶列表</h4>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="搜尋用戶..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>
          
          <div className={styles.userList}>
            {filteredUsers.map(user => (
              <div 
                key={user.id} 
                className={`${styles.userItem} ${selectedUser?.id === user.id ? styles.activeUser : ''}`}
                onClick={() => selectUser(user)}
              >
                <div className={styles.userAvatar}>
                  <img src={user.avatar} alt={user.name} />
                  {user.online && <span className={styles.onlineIndicator}></span>}
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userNameRow}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.messageTime}>
                      {formatMessageTime(user.time)}
                    </span>
                  </div>
                  <div className={styles.lastMessageRow}>
                    <span className={styles.lastMessage}>{user.lastMessage}</span>
                    {user.unread > 0 && (
                      <span className={styles.unreadBadge}>{user.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右側聊天區域 */}
        <div className={styles.chatSection}>
          {selectedUser ? (
            <>
              <div className={styles.chatHeader}>
                <div className={styles.headerUserInfo}>
                  <div className={styles.userAvatar}>
                    <img src={selectedUser.avatar} alt={selectedUser.name} />
                    {selectedUser.online && <span className={styles.onlineIndicator}></span>}
                  </div>
                  <div className={styles.userName}>{selectedUser.name}</div>
                </div>
              </div>

              <div className={styles.chatBody} ref={chatBodyRef}>
                <div className={styles.messagesContainer}>
                  {userMessages[selectedUser.id]?.map((message, index) => {
                    const messages = userMessages[selectedUser.id];
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

                    // 系統訊息特殊處理
                    if (message.sender === "system") {
                      return (
                        <div key={message.id} className={styles.systemMessage}>
                          {message.text}
                        </div>
                      );
                    }

                    return (
                      <React.Fragment key={message.id}>
                        {/* 時間標記 */}
                        {shouldShowTime && (
                          <div className={styles.timeLabel}>
                            {formatMessageTime(message.timestamp)}
                          </div>
                        )}

                        {/* 訊息行 */}
                        <div
                          className={`${styles.messageRow} ${message.sender === "user" ? styles.userMessageRow : styles.agentMessageRow}`}
                        >
                          {message.sender === "user" && showAvatar && (
                            <div className={styles.avatarContainer}>
                              <img
                                src={selectedUser.avatar}
                                alt={selectedUser.name}
                                className={styles.avatar}
                              />
                            </div>
                          )}

                          <div
                            className={`${styles.message} ${message.sender === "user" ? styles.userMessage : styles.agentMessage} ${styles[`bubble-${bubblePosition}`]}`}
                          >
                            {/* 已讀標誌 */}
                            {message.sender === "agent" && (
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
                  <div className="d-flex align-items-center">
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
                            theme="light"
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
              <img src="/images/chatRoom/select-user-icon.svg" alt="選擇用戶" />
              <p>請從左側選擇一位用戶開始對話</p>
            </div>
          )}
        </div>
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