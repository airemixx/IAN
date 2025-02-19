'use client'

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

// 假設 currentUserId 可從某處獲取，這裡暫時硬編碼為 1
const currentUserId = 1

export default function TagLikeShareBtnIndex({ articleId }) {
  const [tags, setTags] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0) // 初始值從後端取得
  const [isHovered, setIsHovered] = useState(false) // 追蹤滑鼠是否懸停
  const [isClicked, setIsClicked] = useState(false) // 追蹤 active 狀態下按鈕點擊效果

  useEffect(() => {
    // 取得標籤
    const fetchTags = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}/tags`)
        if (!response.ok) {
          console.log('response', response)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setTags(data)
      } catch (error) {
        console.error('Could not fetch tags:', error)
      }
    }

    // 取得文章的初始 like_count
    const fetchArticleLikeCount = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        // 假設後端回傳 { like_count: 數量, ... }
        // 使用 Number() 轉換，避免 NaN
        setLikeCount(Number(data.like_count) || 0)
      } catch (error) {
        console.error('Could not fetch article like count:', error)
      }
    }

    fetchTags()
    fetchArticleLikeCount()
  }, [articleId])

  // 當使用者按讚，僅能按一次
  const handleLike = async () => {
    if (isLiked) return // 已按讚，不重複
    setIsLiked(true)
    const newLikeCount = Number(likeCount) + 1
    setLikeCount(newLikeCount)
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 300)

    try {
      const response = await fetch(`/api/likes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          likeableId: articleId,
          likeableType: 'article',
          newLikeCount,
          userId: currentUserId, // 使用已定義 currentUserId
        }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error updating like count:', error)
    }
  }

  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles['y-tag-like-comment-share-fav-area']}`}
    >
      <div className={`${styles['y-tag-area']}`}>
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/article?tag=&search=%23${tag.tag_name.replace('#', '')}`}
            className="text-decoration-none"
          >
            <button className="py-sm-1 px-sm-3 ms-sm-1 fw-medium rounded-pill">
              {tag.tag_name}
            </button>
          </Link>
        ))}
      </div>
      <div className={`${styles['y-like-comment-share-fav']} d-flex`}>
        <button
          className="py-sm-2 px-sm-2 d-flex align-items-center fw-medium rounded-pill"
          onClick={handleLike}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={
              isLiked
                ? '/images/article/thumb-up-red.svg'
                : isHovered
                ? '/images/article/thumb-up-gray.svg'
                : '/images/article/thumb-up-black.svg'
            }
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            style={{
              transform: isClicked ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
            alt="Like"
          />
          {/* 使用模板字串確保呈現數字 */}
          <span
            className={`${styles['y-count-num-pc']}`}
          >{`${likeCount}`}</span>
          <img
            src={
              isLiked
                ? '/images/article/thumb-up-red.svg'
                : isHovered
                ? '/images/article/thumb-up-gray.svg'
                : '/images/article/thumb-up-black.svg'
            }
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            style={{
              transform: isClicked ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.3s ease',
            }}
            alt="Like"
          />
          <span className={`${styles['y-count-num']}`}>{`${likeCount}`}</span>
        </button>

        <button className="py-sm-2 px-sm-2 d-flex align-items-center fw-medium rounded-pill">
          <img
            src="/images/article/share.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            alt="Share"
          />
          <img
            src="/images/article/share.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            alt="Share"
          />
        </button>

        <button className="py-sm-2 px-sm-2 d-flex align-items-center fw-medium rounded-pill">
          <img
            src="/images/article/favourite.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            alt="Favorite"
          />
          <img
            src="/images/article/favourite.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  )
}
