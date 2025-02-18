'use client'

import React, { useState } from 'react'
import axios from 'axios'
import styles from './index.module.scss'

export default function ReplyInput({ articleId, parentId }) {
  const [comment, setComment] = useState('')
  const userId = 1 // TODO: 從登入狀態取得使用者 ID
  // const parentId = null // 如果是回覆中的回覆，則會傳入父留言的 id

  const handleSubmit = async () => {
    if (!comment.trim()) return

    try {
      const response = await axios.post(
        'http://localhost:8000/api/comments',
        {
          content: comment,
          articleId: articleId,
          userId: userId,
          parentId: parentId // 如果是回覆中的回覆，則會傳入父留言的 id
        },
        { withCredentials: true } // 確保跨域請求能夠傳送 cookie
      )
      console.log('留言新增成功：', response.data)
      setComment('') // 清空留言輸入框
    } catch (error) {
      console.error('留言送出失敗：', error)
    }
  }

  return (
    <div className={`p-3 bg-white border border-secondary ${styles['y-comment-area']}`}>
      <input
        type="text"
        id="comment"
        className="p-2 py-3"
        placeholder="留言"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className={`mt-2 d-flex justify-content-end ${styles['y-comment-area-icons']}`}>
        <div className="d-flex">
          <button className="p-1">
            <img src="/images/article/image-03.svg" alt="圖片" />
          </button>
          <button className="p-1" onClick={handleSubmit}>
            <img src="/images/article/send-01.svg" alt="發送" />
          </button>
        </div>
      </div>
    </div>
  )
}
