'use client'
import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import ShowReply from '../show-reply'

export default function CommentsArea({ articleId, commentCount: initialCount }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [count, setCount] = useState(initialCount ?? 0)

  const toggleComments = () => setIsCollapsed(prev => !prev)

  useEffect(() => {
    if (!articleId) return
    // 從後端取得該文章的留言數量
    fetch(`http://localhost:8000/api/comments/count?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) {
          setCount(data.count)
        }
      })
      .catch((err) => {
        console.error('取得留言數量失敗：', err)
      })
  }, [articleId])

  return (
    <div>
      <div className={styles['y-all-comment-btn']}>
        <button onClick={toggleComments}>
          {isCollapsed ? `- 顯示全部(${count})留言 -` : `- 摺疊全部(${count})留言 -`}
        </button>
      </div>
      {/* 當展開留言時同時顯示排序下拉選單與留言內容 */}
      {!isCollapsed && (
        <>
          <div className={`${styles['y-sort-dropdown']} my-4`}>
            <select id="sort-comments" name="sort-comments" className="form-select">
              <option value="1">由新到舊</option>
              <option value="2">由舊到新</option>
              <option value="3">熱門留言</option>
            </select>
          </div>
          <ShowReply />
        </>
      )}
    </div>
  )
}