'use client'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import StarRating from '@/app/courses/_components/star-rating/page'
import styles from './course-comment.module.scss'

export default function CourseComment({
  name,
  date,
  rating,
  title,
  content,
  imgSrc,
  isModal = false,
  onShowAllComments,
}) {
  const [isExpanded, setIsExpanded] = useState(false) // ✅ 控制是否展開完整內容

  return (
    <div className={`${isModal ? 'col-12' : 'col-md-6 col-sm-12'} mt-0 my-3`} data-aos="fade-up">
      <div className={`${styles['course-comment']} ${isModal ? styles['modal-comment'] : ''}`}>
        <div className={styles['comment-card-nav']}>
          <div className={styles['commenter']}>
            <div className={styles['commenter-img']}>
              <img src={imgSrc} alt={`${name} 的頭像`} />
            </div>
            <div className={styles['commenter-info']}>
              <p className={styles['commenter-name']}>{name}</p>
              <p className={styles['commenter-time']}>{date}</p>
            </div>
          </div>
          <StarRating rating={rating} />
        </div>
        <div className={styles['comment-card-content']}>
          <p className={styles['title']}>{title}</p>
          <p className={`${styles['content']} ${isExpanded ? styles['expanded'] : ''}`}>
            {isExpanded || !isModal ? content : `${content.slice(0, 100)}...`} 
          </p>
        </div>
        
        {/* ✅ 這個「查看更多」按鈕的行為 */}
        <div className={styles['go-page-link']}>
          {isModal ? (
            <button onClick={() => setIsExpanded(!isExpanded)} className={styles['show-all-btn']}>
              {isExpanded ? '收起內容' : '查看更多'} 
              {isExpanded ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
            </button>
          ) : (
            <button onClick={onShowAllComments} className={styles['show-all-btn']}>
              查看更多 <FaChevronDown size={10} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
