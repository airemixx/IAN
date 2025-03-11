'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './support-chat.module.scss'
import { io } from 'socket.io-client'
import { LuSend } from 'react-icons/lu'
import Lottie from 'lottie-react'
import typingAnimation from '@/public/animations/typing.json'

export default function SupportChat() {
  const [userRole, setUserRole] = useState(null)
  const [conversations, setConversations] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const [userId, setUserId] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const chatBodyRef = useRef(null)
  const [initialLoadDone, setInitialLoadDone] = useState(false)

  // 🔹 FAQ 快速回覆選單
  const FAQ = [
    {
      question: '如何上架新課程？',
      answer:
        '請至「課程管理」頁面，點擊「新增課程」，填寫課程資訊即可上架課程。',
    },
    {
      question: '如何查看學生報名狀況？',
      answer: '請至「我的課程」頁面，您可以查看報名的學生數量。',
    },
    {
      question: '如何設定課程價格？',
      answer: '在上架課程時，您可以自行設定課程價格。',
    },
    {
      question: '如何獲得課程收益？',
      answer:
        '您的課程收益將累積至帳戶，每月 15 日結算，請至「收益管理」查看明細。',
    },
  ]

  const welcomeMessage =
    '歡迎來到 LENSTUDIO 客服中心！請留下您的訊息，我們將盡快回覆您😊✨'

  const handleQuestionClick = async (question, answer) => {
    await sendMessageToDatabase(question)

    setIsTyping(true)

    setTimeout(async () => {
      await sendBotMessageToDatabase(answer)
      setIsTyping(false)
    }, 1000)
  }

  // 🔹 發送機器人訊息到資料庫
  const sendBotMessageToDatabase = async (text) => {
    if (!selectedChat?.id) return

    const token = localStorage.getItem('loginWithToken')
    if (!token) return

    try {
      const messageData = {
        chatId: selectedChat.id,
        text: text,
        sender_id: 'bot',
        is_bot: true,
      }

      const res = await fetch('http://localhost:8000/api/support/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(`API 回應錯誤: ${data.error}`)
    } catch (error) {
      console.error('❌ 機器人訊息發送錯誤:', error)
    }
  }

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1] // 取得 payload 部分
      if (!base64Url) throw new Error('Token 無效')

      // Base64Url 轉 Base64
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

      // 解析 JSON
      return JSON.parse(decodeURIComponent(escape(atob(base64))))
    } catch (error) {
      console.error('❌ JWT 解析錯誤:', error)
      return null
    }
  }

  const handleChatSelect = (chat) => {
    console.log('🟢 選擇的聊天室:', chat)

    if (!chat || !chat.id) {
      console.warn('⚠️ 選擇的聊天室無效')
      return
    }

    setSelectedChat(chat) // ✅ 設定選中的聊天室
    // fetchMessages(chat.id) // ✅ 載入該聊天室的訊息
  }

  const fetchMessages = async (chatId) => {
    if (!chatId) {
      return
    }

    try {
      const token = localStorage.getItem('loginWithToken')
      if (!token) {
        console.warn('❌ 無法取得 Token，請重新登入')
        return
      }

      console.log(`📡 正在請求對話 ${chatId} 的所有訊息...`)
      const res = await fetch(
        `http://localhost:8000/api/support/messages/${chatId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) throw new Error(`無法取得歷史訊息 (錯誤碼: ${res.status})`)

      const data = await res.json()
      console.log(`✅ 取得 chat_id ${chatId} 的歷史訊息:`, data)

      // 若沒有任何訊息，就自動發送歡迎訊息
      if (data.length === 0) {
        console.log('該聊天室沒有訊息，自動發送歡迎訊息...')
        await sendWelcomeMessage(chatId)
        // 也可以選擇重新載入訊息列表
        // fetchMessages(chatId);
      } else {
        setMessages(data)
      }
    } catch (error) {
      console.error('❌ 無法取得歷史訊息:', error)
    }
  }

  // 🔹 自動滾動到最新訊息
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight
    }
  }, [messages])

  // 🔹 當選擇聊天室變更時，載入聊天室訊息
  // useEffect(() => {
  //   if (selectedChat?.id) {
  //     console.log(
  //       '📡 `selectedChat` 變更，載入聊天室歷史訊息...',
  //       selectedChat.id
  //     )
  //     fetchMessages(selectedChat.id)
  //   }
  // }, [selectedChat])

  // 🔹 解析 JWT，取得 `userId`
  useEffect(() => {
    const token = localStorage.getItem('loginWithToken')
    if (token) {
      const decoded = parseJwt(token)
      if (decoded?.id) {
        setUserId(decoded.id)
        console.log('✅ 設定 userId:', decoded.id)
      }
    }
  }, [])

  // 🔹 讀取 `userRole`
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole')
    if (storedRole) {
      setUserRole(
        storedRole === '1'
          ? 'teacher'
          : storedRole === '88'
          ? 'admin'
          : storedRole
      )
    }
  }, [])

  useEffect(() => {
    console.log("嘗試建立 socket 連線...");
    const newSocket = io("http://localhost:8000");
    console.log("建立 socket 成功:", newSocket.id);
  
    setSocket(newSocket);
  
    // 組件卸載時斷開連線
    return () => {
      console.log("斷開 socket 連線:", newSocket.id);
      newSocket.disconnect();
    };
  }, []);
  
  // 🔹 監聽 WebSocket 訊息
  useEffect(() => {
    if (!socket) return
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    }
    socket.on('newMessage', handleNewMessage)
    return () => socket.off('newMessage', handleNewMessage)
  }, [socket])



  // 🔹 處理首次載入
  useEffect(() => {
    if (userRole && userId && !initialLoadDone) {
      fetchConversations()
      setInitialLoadDone(true)
    }
  }, [userRole, userId, initialLoadDone])

  // 🔹 發送歡迎訊息
  const sendWelcomeMessage = async (chatId) => {
    if (!chatId) return

    const token = localStorage.getItem('loginWithToken')
    if (!token) return

    try {
      const messageData = {
        chatId: chatId,
        text: welcomeMessage,
        sender_id: 'admin', // 使用 admin 作為發送者
        is_bot: true, // 標記為自動訊息
      }

      const res = await fetch('http://localhost:8000/api/support/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(`API 回應錯誤: ${data.error}`)

      console.log('✅ 歡迎訊息成功送出:', data)

      // 移除直接更新 UI 的部分，讓 socket 廣播來處理更新
      // setMessages([{ chatId: chatId, sender_id: "admin", text: welcomeMessage }]);
    } catch (error) {
      console.error('❌ 歡迎訊息發送錯誤:', error)
    }
  }

  // 🔹 創建新聊天室並發送歡迎訊息
  const createNewChatForTeacher = async () => {
    if (userRole !== 'teacher' || !userId) return

    const token = localStorage.getItem('loginWithToken')
    if (!token) return

    try {
      // 建立新聊天室
      const res = await fetch(
        'http://localhost:8000/api/support/conversations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      )

      const data = await res.json()
      if (!res.ok) throw new Error(`API 回應錯誤: ${data.error}`)

      console.log('✅ 成功建立新聊天室:', data)

      // 設置當前聊天室
      setSelectedChat({ id: data.id })

      // 發送歡迎訊息
      await sendWelcomeMessage(data.id)
    } catch (error) {
      console.error('❌ 無法建立新聊天室:', error)
    }
  }

  // 🔹 取得對話列表（如果老師沒有對話，則建立新聊天室）
  const fetchConversations = async () => {
    if (!userRole || !userId) return

    try {
      const token = localStorage.getItem('loginWithToken')
      const res = await fetch(
        'http://localhost:8000/api/support/conversations',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!res.ok) throw new Error(`無法載入對話列表 (錯誤碼: ${res.status})`)

      let data = await res.json()
      console.log('✅ 取得對話列表:', data)

      if (data.length > 0) {
        setConversations(data)
        console.log('🟢 設定 `selectedChat`: ', data[0])
        setSelectedChat(data[0]) // ✅ 設定聊天室
        fetchMessages(data[0].id) // ✅ 確保載入第一個聊天室訊息
      } else {
        setConversations([])
        setSelectedChat(null)

        // 如果是老師且沒有聊天室，則建立新聊天室
        if (userRole === 'teacher') {
          console.log('🟠 老師沒有聊天室，建立新聊天室...')
          createNewChatForTeacher()
        }
      }
    } catch (error) {
      console.error('❌ 無法取得對話列表:', error)
    }
  }

  // 🔹 發送訊息到資料庫
  // 🔹 發送訊息到資料庫
  const sendMessageToDatabase = async (text) => {
    const token = localStorage.getItem('loginWithToken')
    if (!token) {
      console.warn('❌ 沒有 Token，請先登入')
      return null
    }

    if (!text.trim()) {
      console.warn('❌ 訊息不可為空')
      return null
    }

    const messageData = {
      chatId: selectedChat?.id || null, // 讓後端決定是否建立新對話
      text: text,
    }

    console.log('📩 準備發送訊息:', messageData)

    try {
      const res = await fetch('http://localhost:8000/api/support/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(messageData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(`API 回應錯誤: ${data.error}`)

      console.log('✅ 訊息成功送出:', data)

      // 如果是新聊天室，更新 selectedChat，但不直接更新訊息列表或發送歡迎訊息
      if (!selectedChat?.id && data.chatId) {
        setSelectedChat({ id: data.chatId })
        // 不在這裡呼叫 sendWelcomeMessage，避免重複送出
      }

      return data.chatId
    } catch (error) {
      console.error('❌ 訊息發送錯誤:', error)
      return null
    }
  }

  // 🔹 發送訊息
  const sendMessage = async () => {
    if (!newMessage.trim()) return

    // 只發送訊息到資料庫，不進行樂觀更新
    const chatId = await sendMessageToDatabase(newMessage)

    // 清空輸入框
    setNewMessage('')

    // 如果有特殊邏輯需要（例如首次歡迎訊息），可以在這裡判斷
    if (userRole === 'teacher' && chatId && messages.length === 0) {
      console.log('🟠 老師首次發送訊息，發送歡迎訊息...')
      await sendWelcomeMessage(chatId)
    }
  }

  // 🔹 監聽 Enter 鍵發送訊息c8 8c 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }


  return (
    <div className="container">
      <h1 className={styles.supportTitle}>客服中心</h1>
      <div className="row">
        {/* ✅ 左側：管理員才能看到對話列表 */}
        {userRole === 'admin' && (
          <div className="col-md-4">
            <div className={styles.chatList}>
              {conversations.map((chat) => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${
                    selectedChat?.id === chat.id ? styles.active : ''
                  }`}
                  onClick={() => handleChatSelect(chat)}
                >
                  <div className={styles.chatInfo}>
                    <img
                      src={
                        chat.user_avatar
                          ? `http://localhost:3000${chat.user_avatar}`
                          : 'http://localhost:3000/uploads/1741674302756-lenstudio.jpg'
                      }
                      className={styles.infoAvatar}
                      alt="User Avatar"
                    />
                    <div className={styles.chatInfoText}>
                      <h4 className={styles.chatName}>
                        {chat.user_name || `訪客 #${chat.id}`}
                      </h4>
                      <p className={styles.chatText}>{chat.lastMessage}</p>{' '}
                    </div>
                  </div>
                  <span className={styles.timestamp}>
                    {chat.lastMessageTime
                      ? new Date(chat.lastMessageTime).toLocaleString('zh-TW', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false, // 24 小時制
                        })
                      : '無紀錄'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ 右側：對話視窗 */}
        <div className={userRole === 'admin' ? 'col-md-8' : 'col-12'}>
          <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
              <h4>
                {selectedChat?.user_name
                  ? selectedChat.user_name
                  : userRole === 'teacher'
                  ? 'Hi, 需要幫忙嗎？'
                  : userRole === 'admin'
                  ? '請選擇聊天室'
                  : '聊天室'}
              </h4>
            </div>

            <div className={styles.chatBody} ref={chatBodyRef}>
              {messages.map((msg, index) => {
                const isSender = msg.sender_id === userId
                return (
                  <div
                    key={index}
                    className={`${styles.messageWrapper} ${
                      isSender ? styles.sent : styles.received
                    }`}
                  >
                    {!isSender && (
                      <img
                        src={
                          msg.user_avatar
                            ? `http://localhost:3000${msg.user_avatar}`
                            : 'http://localhost:3000/uploads/1741674302756-lenstudio.jpg'
                        }
                        className={styles.avatar}
                        alt="User Avatar"
                      />
                    )}

                    <div className={styles.messageBox}>
                      <div className={styles.text}>{msg.text}</div>
                    </div>

                    <div className={styles.timestamp}>
                      {msg.created_at
                        ? new Date(msg.created_at).toLocaleString('zh-TW', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })
                        : new Date().toLocaleString('zh-TW', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                          })}
                    </div>
                  </div>
                )
              })}
              {isTyping && (
                <div className={styles.typingAnimation}>
                  <Lottie animationData={typingAnimation} loop={true} />
                </div>
              )}
            </div>

            {/* FAQ 快速回應按鈕 */}
            {userRole === 'teacher' && (
              <div className={styles.quickReplies}>
                {FAQ.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleQuestionClick(item.question, item.answer)
                    }
                  >
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
                onKeyPress={handleKeyPress}
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
  )
}
