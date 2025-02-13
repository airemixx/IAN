'use client'

import React, { useState, useEffect } from 'react'
import CoursesBanner from './_components/courses-banner/page'
import CoursesCategory from './_components/courses-category/page'
import CoursesBreadcumb from './_components/courses-breadcumb/page'
import CoursesFilter from './_components/courses-filter/page'
import CourseList from './_components/courses-card/page'
import PopularTeacher from './_components/popular-teacher/page'

export default function CoursesPage() {
  const [courses, setCourses] = useState([]) // ✅ 儲存課程資料
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const API_URL = '/api/courses' // 這應該會自動轉發到 http://localhost:8000/api/courses
        console.log('🚀 發送 API 請求:', API_URL)

        const res = await fetch(API_URL)
        console.log('🔍 API 回應狀態:', res.status)

        if (!res.ok)
          throw new Error(`❌ 錯誤: ${res.statusText} (狀態碼: ${res.status})`)

        const data = await res.json()
        console.log('✅ API 回傳資料:', data)
        setCourses(data)
      } catch (err) {
        console.error('❌ 載入課程失敗:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <>
      <CoursesBanner />
      <CoursesCategory />
      <CoursesBreadcumb />
      <CoursesFilter />
      {loading && <p>載入中...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <CourseList courses={courses} />
          <PopularTeacher courses={courses} />
        </>
      )}
    </>
  )
}
