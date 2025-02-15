'use client'

import React, { useState } from 'react'
import styles from './courses-card.module.scss'
import StarRating from '../star-rating/page.js'
import FavoriteButton from '../favorite-button/page'
import Pagination from '../pagination/page.js' //  引入分頁元件

export default function CourseList({ courses }) {
  const [currentPage, setCurrentPage] = useState(1) //  當前頁數
  const coursesPerPage = 12 //  每頁顯示 12 個課程

  // 計算總頁數
  const totalPages = Math.ceil(courses.length / coursesPerPage)

  // 取得當前頁面的課程資料
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse)

  return (
    <section className={`container ${styles['course-list']}`}>
      {/* 課程列表 */}
      <div className="row mt-4">
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* 分頁 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} //  更新當前頁數
        />
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
          <div className='e-card-img'>
            <img
              src={course.image_url}
              alt={course.title}
              className="img-fluid"
            />
            <div className='e-img-overlay'></div>

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
              <p>{parseFloat(course.rating).toFixed(1)}</p>
              <StarRating rating={course.rating} />
            </div>
            <div className={styles['student-count']}>
              <img src="/images/icon/student-count.svg" alt="學生數量" />
              <div className={styles['student-num']}>
                {course.student_count.toLocaleString('en-US')}
              </div>
            </div>
          </div>

          {/*  價錢 */}
          <div className={styles['course-price']}>
            <p>NT$ {course.sale_price.toLocaleString('en-US')}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
