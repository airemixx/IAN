'use client'

import React, { useState, useEffect, useMemo } from 'react'
import styles from './courses-list.module.scss'
import StarRating from '../star-rating/page.js'
import FavoriteButton from '../favorite-button/page'
import Pagination from '../pagination/page.js'

export default function CourseList({ courses }) {
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 12
  const totalPages = Math.ceil(courses.length / coursesPerPage)
  const [popularCourses, setPopularCourses] = useState([])

  console.log('📢 `CourseList` 取得的 courses:', courses)

  useEffect(() => {
    if (courses.length > 0) {
      console.log('📢 `CourseList` 重新設定分頁為第一頁')
      setCurrentPage(1) // ✅ 確保篩選變更時，分頁回到第一頁
    }
  }, [courses])

  // 🚀 **請求熱門課程**
  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await fetch('/api/courses?sort=popular')
        if (!res.ok) throw new Error(`HTTP 錯誤！狀態碼：${res.status}`)

        const data = await res.json()
        console.log('🔥 取得熱門課程:', data)

        setPopularCourses(data.slice(0, 4))
      } catch (err) {
        console.error('❌ 載入熱門課程失敗:', err.message)
      }
    }

    fetchPopularCourses()
  }, [])

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage

  const currentCourses = useMemo(() => {
    if (!courses || courses.length === 0) return []
    return courses.slice(
      indexOfFirstCourse,
      Math.min(indexOfLastCourse, courses.length),
    )
  }, [courses, currentPage])

  console.log('📢 渲染時 currentCourses:', currentCourses)

  return (
    <section className={`container ${styles['course-list']}`}>
      {courses.length === 0 && currentCourses.length === 0 ? (
        <>
          <div className={styles['notfound']}>
            <p>找不到符合條件的課程，試試其他關鍵字吧！</p>
          </div>

          {/* 🚀 顯示熱門課程（僅顯示前 4 個） */}
          {popularCourses.length > 0 && (
            <div className={styles['recommended-section']}>
              <div className={styles['pop-course']}>
                <div className={styles['title-block']}></div>
                <h3>你可能會喜歡這些熱門課程：</h3>
              </div>

              <div className="row">
                {popularCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="row mt-4">
            {currentCourses.length === 0 ? (
              <p>找不到符合條件的課程，試試其他關鍵字吧！</p>
            ) : (
              currentCourses.map((course, index) => (
                <CourseCard key={`${course.id}-${index}`} course={course} />
              ))
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  )
}

export function CourseCard({ course }) {
  console.log('📢 渲染 CourseCard，接收到的 course:', course)

  if (!course) {
    return <div className="error">⚠️ 無法載入課程</div>
  }

  const [isFavorite, setIsFavorite] = useState(false)
  const safeImage = course.image_url || '/images/default-course.jpg'

  return (
    <div className="col-lg-3 col-sm-6 col-12" data-aos="fade-up">
      <a href="#" className={styles['course-card-link']}>
        <div className={`${styles['course-card']} mb-md-5 mb-4`}>
          <div className="e-card-img">
            <img src={safeImage} alt={course.title} className="img-fluid" />
            <div className="e-img-overlay"></div>

            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={() => setIsFavorite(!isFavorite)}
            />
          </div>
          <h3 className={styles['course-title']}>{course.title}</h3>
          <p className={styles['teacher-name']}>{course.teacher_name}</p>

          {/*  評分 + 學生數量 */}
          <div className={styles['rating-student']}>
            <div className={styles['rating']}>
              <p>{parseFloat(course.rating || 0).toFixed(1)}</p>
              <StarRating rating={course.rating || 0} />
            </div>
            <div className={styles['student-count']}>
              <img src="/images/icon/student-count.svg" alt="學生數量" />
              <div className={styles['student-num']}>
                {course.student_count
                  ? course.student_count.toLocaleString('en-US')
                  : '0'}
              </div>
            </div>
          </div>

          {/*  價錢 */}
          <div className={styles['course-price']}>
            <p>
              NT${' '}
              {course.sale_price
                ? course.sale_price.toLocaleString('en-US')
                : 'N/A'}
            </p>
          </div>
        </div>
      </a>
    </div>
  )
}
