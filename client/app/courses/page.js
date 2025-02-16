'use client'

import React, { useState, useEffect } from 'react'
import styles from './course-list.module.scss'
import CoursesBanner from './_components/courses-banner/page'
import CoursesCategory from './_components/courses-category/page'
import CoursesBreadcumb from './_components/courses-breadcumb/page'
import CoursesFilter from './_components/courses-filter/page'
import PopularTeacher from './_components/popular-teacher/page'

export default function CoursesPage() {
  const [courses, setCourses] = useState([]) // ✅ 儲存課程資料
  const [filteredCourses, setFilteredCourses] = useState([]) // ✅ 篩選後的課程
  const [selectedCategory, setSelectedCategory] = useState('所有課程') // ✅ 當前選擇的分類
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const API_URL = '/api/courses'
        console.log('發送 API 請求:', API_URL)

        const res = await fetch(API_URL)
        console.log('API 回應狀態:', res.status)

        if (!res.ok)
          throw new Error(`錯誤: ${res.statusText} (狀態碼: ${res.status})`)

        const data = await res.json()
        console.log('API 回傳資料:', data)
        setCourses(data)
        setFilteredCourses(data) // 預設 `filteredCourses` = `courses`
      } catch (err) {
        console.error('載入課程失敗:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, []) // ✅ 只在頁面載入時執行

  // **當 category 或 courses 變更時，更新 `filteredCourses`**
  useEffect(() => {
    if (!courses || courses.length === 0) return

    if (selectedCategory === '所有課程') {
      setFilteredCourses(courses)
    } else {
      setFilteredCourses(
        courses.filter((course) => course.category === selectedCategory),
      )
    }
  }, [selectedCategory, courses])

  return (
    <>
      <CoursesBanner courses={courses} />
      {/* ✅ 傳遞 `setSelectedCategory`，讓分類可影響篩選 */}
      <CoursesCategory
        courses={courses}
        setSelectedCategory={setSelectedCategory}
      />
      <CoursesBreadcumb courses={courses} />

      <div className={styles['course-list-container']}>
        <CoursesFilter
          courses={filteredCourses}
          setFilteredCourses={setFilteredCourses}
        />
      </div>

      {loading && <p>載入中...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <PopularTeacher courses={filteredCourses} />
        </>
      )}
    </>
  )
}
