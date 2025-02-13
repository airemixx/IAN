'use client'

import { useState, useEffect } from 'react'
import styles from './course-rating.module.scss'
import CourseComment from '../course-comment/page'
import StarRating from '@/app/courses/_components/star-rating/page'
import { useParams } from 'next/navigation'

export default function CourseRating() {
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAllComments, setShowAllComments] = useState(false) // ✅ 控制彈出視窗

  useEffect(() => {
    if (!id) return
  
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/courses/${id}/comments`)
        if (!res.ok) throw new Error('無法獲取評論資料')
  
        const data = await res.json()
        console.log('🔍 從 API 獲取的評論數據:', data) // ✅ 檢查 API 回傳資料
  
        setComments(data)
  
        // ✅ 確保所有 `rating` 值都是數字
        const validRatings = data
          .map(comment => parseFloat(comment.rating)) // 轉換成數字
          .filter(rating => !isNaN(rating)) // 移除 `NaN` 值
  
        console.log('✅ 有效的評分數據:', validRatings)
  
        // ✅ 計算平均評分
        const avg = validRatings.length
          ? validRatings.reduce((sum, rating) => sum + rating, 0) / validRatings.length
          : 0
  
        console.log('⭐ 最終計算的 `averageRating`:', avg) // 檢查計算結果
        setAverageRating(avg.toFixed(1)) // ✅ 設定評分，確保它是數字
      } catch (err) {
        console.error('❌ 載入評論失敗:', err.message)
      } finally {
        setLoading(false)
      }
    }
  
    fetchComments()
  }, [id])
  

  return (
    <section className={styles['course-rating-container']}>
      <div className={styles['section-detail-title']} data-aos="fade-right">
        <div className={styles['title-block']}></div>
        <h2>課程評價</h2>
      </div>
      <div className={styles['course-rating']} data-aos="fade-up">
        <div className={styles['rating-left']}>
          <div className={styles['score-area']}>
            <p className={styles['score']}>{averageRating}</p>
            <p className={styles['total-score']}>/ 5.0</p>
          </div>
          <div className={styles['star-area']}>
            <div className={styles['rating']}>
              <StarRating rating={averageRating} />
            </div>
            <div className={styles['rating-count']}>
              {comments.length} 則評價
            </div>
          </div>
        </div>
      </div>

      {/* 評論區 - 只顯示前 4 則評論 */}
      <div className="row g-3">
        {loading ? (
          <p>載入中...</p>
        ) : (
          comments
            .slice(0, 4)
            .map((comment, index) => <CourseComment key={index} {...comment} />)
        )}
      </div>

      {/* 所有評價按鈕（打開彈出視窗） */}
      {comments.length > 4 && (
        <div className={styles['all-comment-link']}>
          <button onClick={() => setShowAllComments(true)}>
            所有評價 <img src="/images/icon/all-comment.svg" alt="所有評價" />
          </button>
        </div>
      )}

      {/* 彈出視窗 - 顯示所有評論 */}
      {showAllComments && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <button
              className={styles['close-btn']}
              onClick={() => setShowAllComments(false)}
            >
              ✖
            </button>
            <h2>所有評論</h2>
            <div className={styles['modal-content']}>
              {comments.map((comment, index) => (
                <CourseComment key={index} {...comment} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
