'use client'
import { useState } from 'react'
import styles from './course-content.module.scss'

export default function CourseContent() {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className={styles['course-detail-container']}>
      <div className={styles['container']}>
        <div
          className={`${styles['course-detail-content']} ${
            isExpanded ? styles['expanded'] : ''
          }`}
        >
          <div className={styles['content-text']}>
            <h3>課程核心特色</h3>
            <p>
              了解拍攝的擺放邏輯，課程會實際操作與示範每一張美食攝影照後面如何選擇道具、配色、擺放的位置...
            </p>
            <img src="/images/course-content/content_1.jpg" alt="" />
            <h3>章節一：光線的基本介紹</h3>
            <p>
              每天的天氣都不同，光線是構成一張照片最主要的重點，如何運用晴天與陰天的陽光去拍攝...
            </p>
            <img src="/images/course-content/content_2.jpg" alt="" />
            <h3>章節二：自然光的實際操作</h3>
            <p>觀察光線後，我們將練習實際運用自然光拍攝...</p>
            <img src="/images/course-content/content_3.jpg" alt="" />
          </div>
          {/* ✅ 將 toggle-btn-container 放回 course-detail-content 內 */}
          <div className={styles['toggle-btn-container']}>
            <button className={styles['toggle-btn']} onClick={toggleExpand}>
              <span>{isExpanded ? '收起內容' : '更多課程內容'}</span>
              <img
                src="/images/arrow-down-white.svg"
                alt=""
                className={isExpanded ? styles['rotate'] : ''}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
