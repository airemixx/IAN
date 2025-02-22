'use client'

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

const ListCard = ({ article, onTagClick, searchTerm }) => {
  const [imageLoaded, setImageLoaded] = useState(false) // 文章圖片
  const [authorImageLoaded, setAuthorImageLoaded] = useState(false) // 作者圖片
  const [authorDetail, setAuthorDetail] = useState(null) // 取得使用者資料

  const rawTags = article.tags ? article.tags.split(',').map((tag) => tag.trim()) : []
  const uniqueTags = Array.from(new Set(rawTags))

  const handleImageLoaded = () => {
    setImageLoaded(true)
  }

  const handleAuthorImageLoaded = () => {
    setAuthorImageLoaded(true)
  }

  // 當 article.user_id 存在時，去取得使用者的 nickname 與 head 圖片
  useEffect(() => {
    if (article.user_id) {
      fetch(`http://localhost:8000/api/users/${article.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log('使用者資料：', data) // 檢查回傳
          setAuthorDetail(data.data) // 如果後端包在 data.data 裡，請確保對應到正確屬性
        })
        .catch((error) => console.error('取得作者資料錯誤:', error))
    }
  }, [article.user_id])

  return (
    <div className={`${styles['y-list-card-area']}`}>
      <div className={`card ${styles['y-card']}`}>
        <img
          src={article.image_path || '/images/article/social.jpg'}
          className={`card-img-top ${styles['y-card-img-top-css']} ${styles['fade-in']} ${imageLoaded ? styles['loaded'] : ''}`}
          alt={article.title}
          onLoad={handleImageLoaded}
        />
        <div className={`px-0 card-body ${styles['y-card-body-css']}`}>
          <div className={`mb-3 ${styles['y-article-list-tag']} d-flex justify-content-between`}>
            <p className="mb-0">{article.category_name || '未分類'}</p>
          </div>
          <div className={`mb-5 ${styles['y-list-card-content']}`}>
            <Link href={`/article/${article.id}`} className="text-decoration-none">
              <h5 className="card-title">{article.title}</h5>
              <p className={`${styles['card-sub-title']} ${styles['one-line-ellipsis']}`}>
                {article.subtitle}
              </p>
            </Link>
          </div>
          <div className={`${styles['y-tag-area']} mb-3`}>
            {uniqueTags.map((tag, idx) => (
              <button key={idx} onClick={() => onTagClick(tag)}>
                {tag}
              </button>
            ))}
          </div>
          <div className={styles['y-author-date']}>
            <p className="mb-0">
              <img
                className={`mb-2 ${styles['y-user-list-profile']} rounded-pill me-2 ${styles['fade-in']} ${authorImageLoaded ? styles['loaded'] : ''
                  }`}
                src={
                  // 優先使用取得的使用者 head，若無則使用原本的圖片
                  (authorDetail && authorDetail.head) ||
                  article.authorImageUrl ||
                  '/images/article/user (1).jpg'
                }
                alt={article.author}
                onLoad={handleAuthorImageLoaded}
              />
              {authorDetail
                ? authorDetail.nickname || authorDetail.name
                : '編輯部'}
            </p>
            <p>
              {new Date(article.created_at).toLocaleDateString('zh-tw', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) || '未知日期'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListCard