"use client"

import React, { useCallback } from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "react-bootstrap"
import { X, Check, CheckAll, ChevronDown } from "react-bootstrap-icons"
import { CSSTransition } from "react-transition-group"
import styles from "./index.module.scss"
import EmojiPicker, { SkinTones } from 'emoji-picker-react';
import emojiRegex from 'emoji-regex';
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
  const isSameYearAndDay = isSameYear &&
    now.getMonth() === messageDate.getMonth() &&
    now.getDate() === messageDate.getDate();

  // 格式化時間
  const hours = messageDate.getHours().toString().padStart(2, '0');
  const minutes = messageDate.getMinutes().toString().padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  if (isSameYearAndDay) {
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
  // 先獲取 socket context，只調用一次 useSocket
  const socketContext = useSocket();

  // 解構賦值，提供預設值（修改這部分）
  const {
    messages,  // 直接從 context 獲取最新的訊息狀態
    sendMessage: socketSendMessage = () => { }, // 重命名為 socketSendMessagee
    markAsRead = () => { },
    isConnected = false,
    typingUsers = {},
    notifyTyping = () => { },
    setMessages = () => { } // 添加這行來解構 setMessages
  } = socketContext || {};

  // 檢查上下文是否可用
  useEffect(() => {
    if (!socketContext) {
      console.error('Socket上下文不可用。請確保ChatWidget組件已被SocketProvider包裹。');
    }
  }, [socketContext]);

  const [isOpen, setIsOpen] = useState(false)
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
  const [uploading, setUploading] = useState(false); // 添加上傳狀態
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToBottom = useCallback(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (chatBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
      const bottom = scrollHeight - scrollTop - clientHeight < 20;
      setIsNearBottom(bottom);
      setShowScrollButton(!bottom);
    }
  }, []);

  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (chatBody) {
      chatBody.addEventListener('scroll', handleScroll);
      return () => chatBody.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

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
  }, [messages, isNearBottom, scrollToBottom]);


  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 300);
    }
  }, [isOpen, scrollToBottom]);

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  // 修改發送消息的處理函數
  const handleSendMessage = (e) => {
    e.preventDefault();

    const hasText = newMessage.trim() !== "";
    const hasFiles = selectedFiles.length > 0;

    if (!hasText && !hasFiles) return;

    // 發送文字消息
    if (hasText) {
      // 按照伺服器期望的格式構造消息對象
      const messageData = {
        message: {
          text: newMessage,
          // 如果有其他屬性，例如 fileUrl, fileType 放這裡
        }
        // 普通用戶不需要指定 to
      };

      socketSendMessage(messageData);
      setNewMessage("");
    }

    // 處理文件發送
    if (hasFiles) {
      selectedFiles.forEach(fileObj => {
        // 不需要再次使用 FileReader，直接使用預覽 URL
        sendFileMessage(fileObj);
      });

      setSelectedFiles([]);
      setIsPreviewOpen(false);
    }

    setTimeout(scrollToBottom, 100);
  };

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

  // 發送文件消息函數
  const sendFileMessage = async (fileObj) => {
    const isImage = fileObj.type === 'image';

    try {
      setUploading(true); // 添加上傳狀態

      // 創建 FormData 對象
      const formData = new FormData();
      formData.append('file', fileObj.file); // 添加文件

      // 發送到服務器
      const response = await fetch('http://localhost:8000/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
        // 成功上傳後，發送消息
        const messageData = {
          message: {
            // text: isImage ? '圖片訊息' : '影片訊息',
            fileUrl: result.file.url, // 使用服務器返回的 URL
            fileType: result.file.type
          }
        };

        socketSendMessage(messageData);

      } else {
        console.error('文件上傳失敗:', result.message);
        alert('文件上傳失敗，請重試');
      }
    } catch (error) {
      console.error('上傳檔案時出錯:', error);
      alert('檔案上傳出錯，請重試');
    } finally {
      setUploading(false);
    }

    // 重置選擇的文件
    setSelectedFiles(prev => prev.filter(file => file.id !== fileObj.id));
    if (selectedFiles.length <= 1) {
      setIsPreviewOpen(false);
    }
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
      prev.substring(0, document.getElementById('messageInput').selectionEnd)
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

  // 處理輸入中顯示
  const handleInputFocus = () => {
    notifyTyping(true);
  };

  const handleInputBlur = () => {
    notifyTyping(false);
  };

  // 在現有函數中添加這個函數
  const renderMessageContent = (message) => {
    // 如果消息包含文件URL
    if (message.fileUrl) {
      if (message.fileType === 'image') {
        return (
          <div className={styles.imageContainer}>
            <img
              src={message.fileUrl}
              alt="圖片消息"
              className={styles.messageImage}
              onClick={() => handleImageClick(message.fileUrl)} // 改為使用預覽功能
            />
            {message.text && <div className={styles.imageCaption}>{message.text}</div>}
          </div>
        );
      } else if (message.fileType === 'video') {
        return (
          <div className={styles.videoContainer}>
            <video
              src={message.fileUrl}
              controls
              className={styles.messageVideo}
              onError={(e) => console.error("影片加載錯誤", e)}
            />
            {message.text && <div className={styles.videoCaption}>{message.text}</div>}
          </div>
        );
      }
    }

    // 處理文本消息，支持表情符號
    return (
      <div>
        {message.text.split(captureEmojiRegex).map((part, index) => {
          return captureEmojiRegex.test(part) ? (
            <span key={index} className={styles.emoji}>{part}</span>
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    if (!socketContext || !socketContext.socket) return;

    // 直接監聽 messages_read 事件
    socketContext.socket.on('messages_read', (messageIds) => {
      console.log('收到訊息已讀更新(user端):', messageIds);

      // 強制更新UI
      setMessages(prevMessages => prevMessages.map(msg =>
        Array.isArray(messageIds) && messageIds.includes(msg.id)
          ? { ...msg, read: true }
          : (messageIds.messageIds && messageIds.messageIds.includes(msg.id))
            ? { ...msg, read: true }
            : msg
      ));
    });

    return () => {
      if (socketContext.socket) {
        socketContext.socket.off('messages_read');
      }
    };
  }, [socketContext, setMessages]);

  // 添加在 useEffect 裡，當用戶打開聊天室或訊息更新時自動標記已讀

  // 在聊天窗口打開時自動標記已讀
  useEffect(() => {
    if (isOpen && messages.length > 0 && markAsRead) {
      // 用戶打開聊天視窗時，標記所有客服訊息為已讀
      markAsRead(); // 用戶端不需要指定 userId
    }
  }, [isOpen, messages, markAsRead]);

  // 添加滾動監聽，當用戶查看訊息時標記為已讀
  useEffect(() => {
    const handleScroll = () => {
      if (chatBodyRef.current) {
        // 使用 IntersectionObserver 或類似技術可以更精確判斷
        // 這裡簡單實作：當滾動發生時標記訊息
        if (isOpen && markAsRead) {
          markAsRead();
        }
      }
    };

    const chatBody = chatBodyRef.current;
    if (chatBody) {
      chatBody.addEventListener('scroll', handleScroll);
      return () => chatBody.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen, markAsRead]);

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

            <div className={styles.chatBody} ref={chatBodyRef} onScroll={handleScroll}>
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
                            {message.fileType ? (
                              message.fileType === 'image' ? (
                                <img
                                  src={message.fileUrl}
                                  alt="圖片訊息"
                                  className={styles.messageImage}
                                  onClick={() => handleImageClick(message.fileUrl)} // 確保這裡也使用預覽功能
                                />
                              ) : (
                                <video controls className={styles.messageVideo}>
                                  <source src={message.fileUrl} type="video/mp4" />
                                  您的瀏覽器不支持影片播放
                                </video>
                              )
                            ) : (
                              <div className={styles.messageText}>
                                {renderMessageContent(message)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                {showScrollButton && (
                  <button 
                    className={`${styles.scrollToBottomButton} ${styles.visible}`}
                    onClick={scrollToBottom}
                    aria-label="滾動到底部"
                  >
                    <ChevronDown />
                  </button>
                )}
                <div ref={messagesEndRef} />
                {Object.keys(typingUsers).length > 0 && (
                  <div className={styles.typingIndicator}>
                    <div className={styles.typingDots}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span>客服人員正在輸入...</span>
                  </div>
                )}
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
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    className={styles.messageInput}
                    autoComplete="off"
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

