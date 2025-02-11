'use client'

import React, { useState, useEffect } from 'react'
import styles from './courses-list.module.scss'
import StarRating from '../star-rating/page.js'
import FavoriteButton from '../favorite-button/page'

const coursesData = [
  {
    title: '旅行攝影：按下快門，用攝影書寫故事',
    teacher: '食癮，拾影',
    rating: 4.8,
    studentCount: 1234,
    price: 2180,
    imageUrl: '/images/course-cover/course_1_1.avif',
  },
  {
    title: '攝影入門：從零開始學習攝影',
    teacher: '影像學院',
    rating: 4.5,
    studentCount: 3456,
    price: 1980,
    imageUrl: '/images/course-cover/course_2_1.avif',
  },
  {
    title: '光影的魔法：專業攝影技術',
    teacher: '大師教室',
    rating: 4.2,
    studentCount: 4567,
    price: 2500,
    imageUrl: '/images/course-cover/course_3_1.avif',
  },
  {
    title: '戶外攝影：探索大自然',
    teacher: '戶外攝影師',
    rating: 4.7,
    studentCount: 5678,
    price: 1999,
    imageUrl: '/images/course-cover/course_4_1.avif',
  },
  {
    title: '旅行攝影：按下快門，用攝影書寫故事',
    teacher: '食癮，拾影',
    rating: 4.8,
    studentCount: 1234,
    price: 2180,
    imageUrl: '/images/course-cover/course_1_1.avif',
  },
  {
    title: '攝影入門：從零開始學習攝影',
    teacher: '影像學院',
    rating: 4.5,
    studentCount: 3456,
    price: 1980,
    imageUrl: '/images/course-cover/course_2_1.avif',
  },
  {
    title: '光影的魔法：專業攝影技術',
    teacher: '大師教室',
    rating: 4.2,
    studentCount: 4567,
    price: 2500,
    imageUrl: '/images/course-cover/course_3_1.avif',
  },
  {
    title: '戶外攝影：探索大自然',
    teacher: '戶外攝影師',
    rating: 4.7,
    studentCount: 5678,
    price: 1999,
    imageUrl: '/images/course-cover/course_4_1.avif',
  },
  {
    title: '旅行攝影：按下快門，用攝影書寫故事',
    teacher: '食癮，拾影',
    rating: 4.8,
    studentCount: 1234,
    price: 2180,
    imageUrl: '/images/course-cover/course_1_1.avif',
  },
  {
    title: '攝影入門：從零開始學習攝影',
    teacher: '影像學院',
    rating: 4.5,
    studentCount: 3456,
    price: 1980,
    imageUrl: '/images/course-cover/course_2_1.avif',
  },
  {
    title: '光影的魔法：專業攝影技術',
    teacher: '大師教室',
    rating: 4.2,
    studentCount: 4567,
    price: 2500,
    imageUrl: '/images/course-cover/course_3_1.avif',
  },
  {
    title: '戶外攝影：探索大自然',
    teacher: '戶外攝影師',
    rating: 4.7,
    studentCount: 5678,
    price: 1999,
    imageUrl: '/images/course-cover/course_4_1.avif',
  },
]

export default function CourseList() {
  const [courses, setCourses] = useState(coursesData)
  const [visibleCourses, setVisibleCourses] = useState(4) // 初始顯示課程數
  const [isMobile, setIsMobile] = useState(false)

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
      <div className="row mt-4">
        {courses
          .slice(0, isMobile ? visibleCourses : courses.length)
          .map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
      </div>

      {isMobile && visibleCourses < courses.length && (
        <div className={styles['load-more-btn-container']}>
          {' '}
          {/* ✅ 加入外層 div */}
          <button className={styles['load-more-btn']} onClick={loadMoreCourses}>
            更多課程
          </button>
        </div>
      )}
    </section>
  )
}

// **CourseCard 元件**
export function CourseCard({ course }) {
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="col-lg-3 col-sm-6 col-12" data-aos="fade-up">
      <a href="#" className={styles['course-card-link']}>
        <div className={`${styles['course-card']} mb-md-5 mb-4`}>
          <div className={styles['card-img']}>
            <img
              src={course.imageUrl}
              alt={course.title}
              className="img-fluid"
            />
            <div className={styles['img-overlay']}></div>

            {/* ✅ 傳入 isFavorite 狀態 & toggleFavorite 方法 */}
            <FavoriteButton
              isFavorite={isFavorite}
              toggleFavorite={() => setIsFavorite(!isFavorite)}
            />
          </div>
          <h3 className={styles['course-title']}>{course.title}</h3>
          <p className={styles['teacher-name']}>{course.teacher}</p>
          <div className={styles['rating-student']}>
            <div className={styles['rating']}>
              <p>{course.rating}</p>
              <StarRating rating={course.rating} />
            </div>
            <div className={styles['student-count']}>
              <img src="/images/icon/student-count.svg" alt="學生數量" />
              <div className={styles['student-num']}>{course.studentCount}</div>
            </div>
          </div>
          <div className={styles['course-price']}>
            <p>NT$ {course.price}</p>
          </div>
        </div>
      </a>
    </div>
  )
}
