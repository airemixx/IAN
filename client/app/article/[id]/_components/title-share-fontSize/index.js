'use client'

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss' // SCSS 模組

export default function TitleShareFontSize({
  categoryName = '未分類',
  articleTitle = '載入中...',
  articleSubTitle = '',
  createdAt = '載入中...', // 添加 createdAt prop
  imagePath = '/images/article/default-Img.jpg', // 添加 imagePath prop 並設定預設值
}) {
  const [fontSize, setFontSize] = useState('medium') // 預設字體大小
  const [isImageVisible, setIsImageVisible] = useState(false);

  // 字體大小對應的 px 值
  const fontSizes = {
    small: '14px',
    medium: '16px',
    large: '18px',
  }

  /**
   * 更改字體大小
   * @param {string} size - 字體大小 (small, medium, large)
   */
  const changeFontSize = (size) => {
    setFontSize(size) // 更新狀態
  }

  // 使用 useEffect 監聽 fontSize 變化，並更新段落字體大小
  useEffect(() => {
    const paragraphs = document.querySelectorAll('article p') // 選取所有文章段落
    paragraphs.forEach((p) => {
      p.style.fontSize = fontSizes[fontSize] // 設定對應的字體大小
    })
  }, [fontSize]) // 當 fontSize 改變時觸發

  // 格式化日期的函數
  const formatDate = (dateString) => {
    if (!dateString) return '載入中...'
    const date = new Date(dateString)
    return date.toISOString().split('T')[0] // 格式化為 YYYY-MM-DD
  }

  useEffect(() => {
    // 建立 IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    // 取得主圖片元素
    const mainImage = document.querySelector(`.${styles['main-image']}`);
    if (mainImage) {
      observer.observe(mainImage);
    }

    return () => observer.disconnect();
  }, [imagePath]);

  return (
    <>
      {/* 標題與分享區塊 */}
      <div
        className={`mb-2 ${styles['y-tag-date-share']} d-sm-flex justify-content-between align-items-end`}
      >
        <div className={`${styles['y-tag-date']} d-flex align-items-center`}>
          <div className={`px-3 py-1 ${styles['y-article-tag']}`}>
            {categoryName}
          </div>
          <div className="ms-2">
            <p className="mb-0 y-article-date">{formatDate(createdAt)}</p>
          </div>
        </div>
      </div>

      {/* 主標題 */}
      <h1 className={`mb-sm-2 ${styles['y-tag-date-share-h1']}`}>
        {articleTitle}
      </h1>

      {/* 只在有副標題時才顯示 */}
      {articleSubTitle && (
        <p className={`mb-sm-4 ${styles['y-tag-date-share-subtitle']}`}>
          {articleSubTitle}
        </p>
      )}

      {/* 分隔線 */}
      <div className={`mb-5 ${styles['y-title-line']}`}></div>

      {/* 使用者資訊與字體控制區塊 */}
      <div className="mb-4 d-flex align-items-center justify-content-between text-muted">
        <div className="d-flex align-items-center me-3">
          {/* 使用者頭像 */}
          <img
            src="/images/article/user (1).jpg"
            alt="Avatar"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <span className="ms-2">編輯部</span>
        </div>

        {/* 字體大小控制 */}
        <div className="y-font-size-control ms-3">
          字級：
          <button
            className={`p-0 btn btn-link ${fontSize === 'small' ? 'text-muted' : ''
              }`}
            style={{
              color: fontSize === 'small' ? '#8F8F8F' : '#143146',
              textDecoration: fontSize === 'small' ? 'none' : 'underline',
            }}
            onClick={() => changeFontSize('small')}
          >
            小
          </button>
          /
          <button
            className={`p-0 btn btn-link ${fontSize === 'medium' ? 'text-muted' : ''
              }`}
            style={{
              color: fontSize === 'medium' ? '#8F8F8F' : '#143146',
              textDecoration: fontSize === 'medium' ? 'none' : 'underline',
            }}
            onClick={() => changeFontSize('medium')}
          >
            中
          </button>
          /
          <button
            className={`p-0 btn btn-link ${fontSize === 'large' ? 'text-muted' : ''
              }`}
            style={{
              color: fontSize === 'large' ? '#8F8F8F' : '#143146',
              textDecoration: fontSize === 'large' ? 'none' : 'underline',
            }}
            onClick={() => changeFontSize('large')}
          >
            大
          </button>
        </div>
      </div>

      {/* 主圖片 */}
      {imagePath && (
        <img
          src={imagePath}
          className={`mb-4 border rounded y-img-fluid ${styles['y-container']} ${styles['main-image']
            } ${isImageVisible ? styles['article-image-fade'] : ''}`}
          alt={articleTitle}
          style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
        />
      )}
    </>
  )
}
