"use client"

import React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "react-bootstrap"
import { X, Check, CheckAll } from "react-bootstrap-icons"
import { CSSTransition } from "react-transition-group"
import styles from "./index.module.scss"
import EmojiPicker, { SkinTones } from 'emoji-picker-react';
import emojiRegex from 'emoji-regex';
import { Squeeze } from 'hamburger-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSocket } from '../context/socketContext';

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
  const isSameDay = isSameYear &&
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

// 使用者列表：相對時間格式
const formatRelativeMessageTime = (timestamp) => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now - messageDate) / 1000);

  if (diffInSeconds < 10) return "剛剛";
  if (diffInSeconds < 60) return `${diffInSeconds}秒前`;

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}分前`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}小時前`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}日前`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}周前`;
};

// 訊息視窗：絕對時間格式
const formatDateTime = (date, includeYear = true) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return includeYear
    ? `${year}-${month}-${day} ${hours}:${minutes}`
    : `${month}-${day} ${hours}:${minutes}`;
};

const formatAbsoluteMessageTime = (timestamp) => {
  const now = new Date();
  const messageDate = new Date(timestamp);
  const oneMonthMs = 30 * 24 * 3600 * 1000;

  // 同一天僅顯示 hh:mm
  if (isSameDay(now, messageDate)) {
    const hours = messageDate.getHours().toString().padStart(2, '0');
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // 超過 1 個月以上，顯示完整年份：yyyy-mm-dd hh:mm
  if (now - messageDate >= oneMonthMs) {
    return formatDateTime(messageDate, true);
  }

  // 超過 1 天但小於 1 個月，省略年份：mm-dd hh:mm
  return formatDateTime(messageDate, false);
};

const captureEmojiRegex = new RegExp(`(${emojiRegex().source})`, 'gu');

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false) // hamburger 狀態
  
  // 使用 Socket 上下文
  const { 
    messages, 
    userList, 
    selectedUser, 
    selectUser, 
    sendMessage, 
    markAsRead, 
    isConnected 
  } = useSocket();
  
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
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [messages]);

  // 單獨處理已讀狀態更新
  useEffect(() => {
    if (messages.length > 0) {
      // 尋找未讀的客服訊息
      const hasUnreadAgentMessages = messages.some(msg => msg.sender === "agent" && !msg.read);

      if (hasUnreadAgentMessages) {
        const timer = setTimeout(() => {
          setMessages((prevMessages) => prevMessages.map((msg) =>
            (msg.sender === "agent" && !msg.read) ? { ...msg, read: true } : msg
          ));
        }, 500);
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

  // 修改發送消息函數，使用 Socket.IO
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!selectedUser) {
      alert('請先選擇一位用戶');
      return;
    }

    // 檢查是否有文字消息或文件
    const hasText = newMessage.trim() !== "";
    const hasFiles = selectedFiles.length > 0;

    if (!hasText && !hasFiles) return;

    // 如果有文字消息，通過 Socket.IO 發送
    if (hasText) {
      sendMessage(newMessage);
      setNewMessage("");
    }

    // 如果有文件，將其通過 Socket.IO 發送
    if (hasFiles) {
      selectedFiles.forEach(fileObj => {
        sendMessage("", fileObj.url, fileObj.type);
      });

      // 清空文件列表並關閉預覽
      setSelectedFiles([]);
      setIsPreviewOpen(false);
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

  // 過濾當前選擇用戶的訊息
  const filteredMessages = selectedUser 
    ? messages.filter(msg => 
        msg.sender === selectedUser.userId || 
        (msg.senderType === 'admin' && msg.to === selectedUser.userId)
      )
    : [];

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
            {/* 用戶列表側欄 */}
            <div className={`${styles.userListPanel} ${isMenuOpen ? styles.show : ''}`}>
              <div className={styles.userListHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => setIsMenuOpen(false)}
                  aria-label="返回"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h5>聊天列表</h5>
                <button className={styles.iconButton} onClick={toggleChat}>
                  <X size={24} />
                </button>
              </div>
              <div className={styles.userList}>
                {/* 使用來自 Socket.IO 的用戶列表 */}
                {userList.length > 0 ? userList.map(user => (
                  <div
                    key={user.userId}
                    className={`${styles.userItem} ${selectedUser && selectedUser.userId === user.userId ? styles.active : ''}`}
                    onClick={() => selectUser(user)}
                  >
                    <div className={styles.userAvatar}>
                      <img src={user.avatar || "/images/chatRoom/user1.jpg"} alt={user.name} />
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userInfoHeader}>
                        <span className={styles.userName}>{user.name}</span>
                        <small className={styles.messageTime}>
                          {user.timestamp ? formatRelativeMessageTime(new Date(user.timestamp)) : ''}
                        </small>
                      </div>
                      <div className={styles.lastMessageRow}>
                        <p className={styles.userLastMessage}>
                          {user.lastMessageType === 'text'
                            ? user.lastMessage
                            : user.lastMessageType === 'image'
                              ? `已傳送圖片`
                              : user.lastMessageType === 'video'
                                ? `已傳送影片`
                                : '新對話'}
                        </p>
                        {user.unreadCount > 0 && (
                          <span className={styles.unreadBadge}>
                            {user.unreadCount > 99 ? "99+" : user.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className={styles.noUsers}>尚無用戶連線</div>
                )}
              </div>
            </div>

            {/* 聊天區域 */}
            <div className={`${styles.chatArea} ${isMenuOpen ? styles.shifted : ''}`}>
              <div className={styles.chatHeader}>
                {/* Hamburger 按鈕 */}
                <div className={styles.hamburgerContainer}>
                  <Squeeze
                    size={16}
                    color="white"
                    duration={0.3}
                    toggled={isMenuOpen}
                    toggle={() => setIsMenuOpen(!isMenuOpen)}
                    easing="ease-in"
                    label="顯示選單"
                  />
                </div>

                <div className={styles.headerUserInfo}>
                  <div className={styles.headerUserName}>
                    {selectedUser ? selectedUser.name : '請選擇用戶'}
                  </div>
                </div>

                <button className={styles.iconButton} onClick={toggleChat}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.chatBody} ref={chatBodyRef}>
                <div className={styles.messagesContainer}>
                  {!selectedUser ? (
                    <div className={styles.noUserSelected}>
                      請從左側選擇一位用戶開始聊天
                    </div>
                  ) : !isConnected ? (
                    <div className={styles.connectionError}>
                      正在連接到聊天服務器...
                    </div>
                  ) : filteredMessages.length === 0 ? (
                    <div className={styles.noMessages}>
                      尚無訊息，開始聊天吧！
                    </div>
                  ) : (
                    filteredMessages.map((message, index) => {
                      const isPrevSameSender = index > 0 && filteredMessages[index - 1].sender === message.sender;
                      const isNextSameSender = index < filteredMessages.length - 1 && filteredMessages[index + 1].sender === message.sender;

                      // 檢查是否需要顯示時間標記 - 當發送者改變時
                      const isPrevDifferentSender = index > 0 && filteredMessages[index - 1].sender !== message.sender;

                      // 檢查是否與前一則訊息日期不同 - 跨天顯示
                      const isPrevDifferentDay = index > 0 &&
                        !isSameDay(new Date(filteredMessages[index - 1].timestamp), new Date(message.timestamp));

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
                      // 判斷是否為用戶訊息或管理員訊息
                      const isUserMessage = message.senderType !== 'admin';

                      return (
                        <React.Fragment key={message.id}>
                          {/* 時間標記 */}
                          {shouldShowTime && (
                            <div className={styles.timeLabel}>
                              {formatAbsoluteMessageTime(message.timestamp)}
                            </div>
                          )}

                          {/* 訊息行 */}
                          <div
                            className={`${styles.messageRow} ${isUserMessage ? styles.userMessageRow : styles.agentMessageRow}`}
                          >
                            {/* 用戶頭像 */}
                            {isUserMessage && showAvatar && (
                              <div className={styles.avatarContainer}>
                                <img
                                  src={message.senderAvatar || "/images/chatRoom/user1.jpg"}
                                  alt="User"
                                  className={styles.avatar}
                                />
                              </div>
                            )}

                            <div
                              className={`${styles.message} ${isUserMessage ? styles.userMessage : styles.agentMessage} ${styles[`bubble-${bubblePosition}`]}`}
                            >
                              {/* 已讀通知 */}
                              {!isUserMessage && (
                                <div className={styles.messageStatus}>
                                  {message.read ? (
                                    <CheckAll size={16} className={styles.readIcon} />
                                  ) : (
                                    <Check size={16} className={styles.unreadIcon} />
                                  )}
                                </div>
                              )}
                              <div className={styles.messageContent}>
                                {message.fileUrl ? (
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
                    })
                  )}
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
                      placeholder={selectedUser ? "輸入訊息..." : "請先選擇用戶..."}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className={styles.messageInput}
                      disabled={!selectedUser}
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
                        disabled={!selectedUser}
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
                        disabled={!selectedUser}
                      />
                      <button
                        type="button"
                        className={styles.imageButton}
                        onMouseEnter={() => setIsImageHovered(true)}
                        onMouseLeave={() => setIsImageHovered(false)}
                        onClick={() => fileInputRef.current.click()}
                        disabled={!selectedUser}
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
                      disabled={!selectedUser || (newMessage.trim() === "" && selectedFiles.length === 0)}
                    >
                      <img src="/images/chatRoom/send-origin.svg" alt="" />
                    </button>
                  </div>
                </form>
              </div>
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

