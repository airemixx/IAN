'use client'

import React, { useState, useEffect } from 'react'
import styles from './courses-filter.module.scss'
import CourseList from '../courses-list/page'

export default function CoursesFilter({ courses, setFilteredCourses }) {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('popular')

  useEffect(() => {
    console.log('🔄 useEffect in CoursesFilter triggered!')
    console.log('📢 原始 courses:', courses)

    // ✅ **確保 API 已回應，且 courses 不是空的**
    if (!courses || courses.length === 0) {
      console.log('❌ API 還沒回來，跳過篩選')
      return
    }

    let filtered = [...courses]

    if (search.trim() !== '') {
      console.log(`🔍 進行關鍵字搜尋: ${search}`)
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.teacher_name.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sort === 'popular') {
      filtered.sort((a, b) => b.student_count - a.student_count)
    } else if (sort === 'new') {
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sort === 'low-price') {
      filtered.sort((a, b) => a.sale_price - b.sale_price)
    } else if (sort === 'high-price') {
      filtered.sort((a, b) => b.sale_price - a.sale_price)
    }

    console.log('📢 篩選後的 filteredCourses:', filtered)

    // ✅ **只有當 `filteredCourses` 內容變更時才更新**
    setFilteredCourses((prev) => {
      if (JSON.stringify(prev) !== JSON.stringify(filtered)) {
        console.log('✅ 更新 setFilteredCourses:', filtered)
        return filtered
      }
      return prev
    })
  }, [search, sort, courses])

  return (
    <section className={`container ${styles['course-list']}`}>
      <div className={styles['search-filter']}>
        <div className={styles['course-search']}>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="搜尋課程、講師"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles['search-btn']}>
            <img src="/images/icon/search-blue.svg" alt="搜尋" />
          </button>
        </div>

        <select
          className={styles['custom-select']}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="popular">熱門程度優先</option>
          <option value="new">最新上架優先</option>
          <option value="low-price">價格低到高</option>
          <option value="high-price">價格高到低</option>
        </select>
      </div>

      {/* 📚 課程清單 */}
      {courses.length === 0 ? (
        <p>課程載入中...</p>
      ) : (
        <CourseList courses={courses} />
      )}
    </section>
  )
}
