'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation' // ✅ 取得動態路由參數
import styles from './detail-page.module.scss'
import CourseInfo from './_components/course-info/page'
import FourInfo from './_components/four-info/page'
import DetailNav from './_components/detail-nav/page'
import CourseContent from './_components/course-content/page'
import TeacherInfo from './_components/teacher-info/page'
import CourseRating from './_components/course-rating/page'
import PriceFixed from './_components/price-fixed/page'
import RelatedCourses from './_components/related-course/page'

export default function CourseDetailPage() {
  const { id } = useParams() // ✅ 取得 URL 中的課程 ID
  const [course, setCourse] = useState(null) // ✅ 儲存單一課程資料
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return // ✅ 避免 ID 未載入時發送錯誤請求

    const fetchCourse = async () => {
      try {
        const API_URL = `/api/courses/${id}`
        console.log('🚀 發送 API 請求:', API_URL)

        const res = await fetch(API_URL)
        console.log('🔍 API 回應狀態:', res.status)

        if (!res.ok)
          throw new Error(`❌ 錯誤: ${res.statusText} (狀態碼: ${res.status})`)

        const data = await res.json()
        console.log('✅ API 回傳資料:', data)

        setCourse(data) // ✅ 如果 API 回傳的是陣列，請改成 data[0]
      } catch (err) {
        console.error('❌ 載入課程失敗:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [id]) // ✅ 監聽 ID 變化

  return (
    <>
      {loading && <p>載入中...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && course && (
        <>
          <CourseInfo course={course} />
          <FourInfo course={course} />
          <section className={styles['course-detail-container']}>
            <div className="container">
              <DetailNav />
              <div className={styles['course-detail-title']}>
                <div className={styles['title-block']}></div>
                <h2>課程內容</h2>
                <div className={`${styles['line']} d-block d-sm-none`}></div>
              </div>
              <div className="row">
                <div className="col-12 col-xl-8">
                  <CourseContent course={course}/>
                  <TeacherInfo />
                  <CourseRating />
                </div>
                <div className="col-md-4 d-none d-xl-block">
                  <PriceFixed />
                </div>
              </div>
              <RelatedCourses />
            </div>
          </section>
        </>
      )}
    </>
  )
}
