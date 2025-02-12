'use client'

import React, { useState, useEffect } from 'react'
import styles from './courses-card.module.scss'
import StarRating from '../star-rating/page.js'
import FavoriteButton from '../favorite-button/page'

export default function CourseList() {
  const [courses, setCourses] = useState([]) // ✅ 初始為空，等待 API 資料
  const [visibleCourses, setVisibleCourses] = useState(4) // ✅ 初始顯示課程數
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(true) // ✅ 加入 loading 狀態
  const [error, setError] = useState(null) // ✅ 加入錯誤處理

  // ✅ 請確保你的 API URL 是正確的
  const API_URL = 'http://localhost:8000/api/courses' // ⚠️ 請改成你的後端 URL

  // 🚀 **取得課程資料**
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) throw new Error('無法取得課程資料')

        const data = await response.json()
        setCourses(data) // ✅ 更新課程資料
      } catch (err) {
        console.error('載入課程失敗:', err)
        setError(err.message)
      } finally {
        setLoading(false) // ✅ 取消 loading 狀態
      }
    }

    fetchCourses()
  }, []) // ✅ 只在元件掛載時執行

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 576)
    }

    handleResize() // 初始化
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 載入更多課程
  const loadMoreCourses = () => {
    setVisibleCourses((prev) => prev + 4)
  }

  return (
    <section className={`container ${styles['course-list']}`}>
      {loading && <p>載入中...</p>} {/* ✅ 顯示 Loading 訊息 */}
      {error && <p className="text-danger">{error}</p>} {/* ✅ 顯示錯誤訊息 */}
      <div className="row mt-4">
        {!loading &&
          !error &&
          courses
            .slice(0, isMobile ? visibleCourses : courses.length)
            .map((course, index) => <CourseCard key={index} course={course} />)}
      </div>
      {isMobile && visibleCourses < courses.length && (
        <div className={styles['load-more-btn-container']}>
          <button className={styles['load-more-btn']} onClick={loadMoreCourses}>
            更多課程
          </button>
        </div>
      )}
    </section>
  )
}

export function CourseCard({ course }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="col-lg-3 col-sm-6 col-12" data-aos="fade-up">
      <a href="#" className={styles['course-card-link']}>
        <div className={`${styles['course-card']} mb-md-5 mb-4`}>
          <div className={styles['card-img']}>
            <img
              src={course.image_url} // ✅ 確保 `image_url` 來自資料庫
              alt={course.title}
              className="img-fluid"
            />
            <div className={styles['img-overlay']}></div>

            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={() => setIsFavorite(!isFavorite)}
            />
          </div>
          <h3 className={styles['course-title']}>{course.title}</h3>
          <p className={styles['teacher-name']}>{course.teacher_name}</p>

          {/* ⭐ 評分 + 學生數量 */}
          <div className={styles['rating-student']}>
            <div className={styles['rating']}>
              <p>{parseFloat(course.rating).toFixed(1)}</p>{' '}
              {/* ✅ 移除多餘小數 */}
              <StarRating rating={course.rating} />
            </div>
            <div className={styles['student-count']}>
              <img src="/images/icon/student-count.svg" alt="學生數量" />
              <div className={styles['student-num']}>
                {course.student_count.toLocaleString('en-US')} {/* ✅ 千分位 */}
              </div>
            </div>
          </div>

          {/* 💰 價錢 */}
          <div className={styles['course-price']}>
            <p>NT$ {course.sale_price.toLocaleString('en-US')}</p>{' '}
            {/* ✅ 千分位 */}
          </div>
        </div>
      </a>
    </div>
  )
}
