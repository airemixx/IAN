'use client'

import Link from 'next/link'
import React, { useState, useEffect, useMemo } from 'react'
import styles from './courses-list.module.scss'
import StarRating from '../star-rating/page.js'
import FavoriteButton from '../favorite-button/page'
import Pagination from '../pagination/page.js'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'hover.css'

export default function CourseList({ courses }) {
  const [currentPage, setCurrentPage] = useState(1)
  const coursesPerPage = 12
  const [popularCourses, setPopularCourses] = useState([])
  const [filterChangeId, setFilterChangeId] = useState(0)

  console.log('`CourseList` 取得的 courses:', courses)

  useEffect(() => {
    if (courses.length > 0) {
      console.log('`CourseList` 重新設定分頁為第一頁')
      setCurrentPage(1) // ✅ 確保篩選變更時，分頁回到第一頁
      setFilterChangeId((prev) => prev + 1)
    }
  }, [courses])

  // ✅ **過濾只顯示 `status = "published"` 的課程**
  const publishedCourses = useMemo(() => {
    return courses.filter((course) => course.status === 'published')
  }, [courses])

  // **請求熱門課程**
  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/courses?sort=popular')
        if (!res.ok) throw new Error(`HTTP 錯誤！狀態碼：${res.status}`)

        const data = await res.json()
        console.log('取得熱門課程:', data)

        // ✅ 只保留 `status = "published"` 的熱門課程
        setPopularCourses(
          data.filter((course) => course.status === 'published').slice(0, 4)
        )
      } catch (err) {
        console.error('載入熱門課程失敗:', err.message)
      }
    }

    fetchPopularCourses()
  }, [])

  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage

  const currentCourses = useMemo(() => {
    if (!publishedCourses || publishedCourses.length === 0) return []
    return publishedCourses.slice(
      indexOfFirstCourse,
      Math.min(indexOfLastCourse, publishedCourses.length)
    )
  }, [publishedCourses, currentPage])

  // console.log('渲染時 currentCourses:', currentCourses)

  // 初始化 AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: false })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh()
    }, 100)
    return () => clearTimeout(timer)
  }, [currentCourses, filterChangeId])

  return (
    <section className={`container ${styles['course-list']}`}>
      {publishedCourses.length === 0 && currentCourses.length === 0 ? (
        <>
          <div className={styles['notfound']}>
            <p>找不到符合條件的課程，試試其他關鍵字吧！</p>
          </div>

          {/* 顯示熱門課程（僅顯示前 4 個） */}
          {popularCourses.length > 0 && (
            <div className={styles['recommended-section']}>
              <div className={styles['pop-course']}>
                <div className={styles['title-block']}></div>
                <h3>你可能會喜歡這些熱門課程：</h3>
              </div>

              <div className="row">
                {popularCourses.map((course) => (
                  <CourseCard
                    key={`${course.id}-${filterChangeId}`}
                    course={course}
                  />
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
                <CourseCard
                  key={`${course.id}-${filterChangeId}`}
                  course={course}
                />
              ))
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(publishedCourses.length / coursesPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  )
}

export function CourseCard({ course }) {
  console.log('渲染 CourseCard，接收到的 course:', course)

  if (!course) {
    return <div className="error">無法載入課程</div>
  }

  const [isFavorite, setIsFavorite] = useState(false)
  const safeImage = course.image_url || '/images/default-course.jpg'
  const [aosTrigger, setAosTrigger] = useState(false)

  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //     offset: 100,
  //   })
  // }, [])

  useEffect(() => {
    setAosTrigger((prev) => !prev) // ✅ 這樣 AOS 會重新觸發動畫，但不影響 key
  }, [course])

  return (
    <div
      className="col-lg-3 col-md-6 col-12"
      data-aos="fade-up"
      data-aos-offset="100"
    >
      <Link
        href={`/courses/${course.id}`}
        className={styles['course-card-link']}
      >
        <div className={`${styles['course-card']} mb-md-5 mb-4 hvr-float`}>
          <div className="e-card-img">
            <img src={safeImage} alt={course.title} className="img-fluid" />
            <div className="e-img-overlay"></div>

            <FavoriteButton
              courseId={course.id}
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
      </Link>
    </div>
  )
}
