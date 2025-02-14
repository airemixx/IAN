'use client'

import React, { useState, useMemo, useEffect } from 'react'
import styles from './courses-filter.module.scss'
import CourseList from '../courses-list/page'

export default function CoursesFilter({ courses, setFilteredCourses }) {
  const [search, setSearch] = useState('')
  const [tempSearch, setTempSearch] = useState('')
  const [sort, setSort] = useState('popular')
  const [isComposing, setIsComposing] = useState(false)

  // 使用 useMemo 計算過濾結果
  const filtered = useMemo(() => {
    if (!courses || courses.length === 0) return []
    let result = [...courses]

    if (search.trim() !== '') {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.teacher_name.toLowerCase().includes(search.toLowerCase()),
      )
    }

    if (sort === 'popular') {
      result.sort((a, b) => b.student_count - a.student_count)
    } else if (sort === 'new') {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } else if (sort === 'low-price') {
      result.sort((a, b) => a.sale_price - b.sale_price)
    } else if (sort === 'high-price') {
      result.sort((a, b) => b.sale_price - a.sale_price)
    }

    return result
  }, [search, sort, courses])

  // 處理搜尋
  const handleSearch = () => {
    if (!isComposing) {
      setSearch(tempSearch)
    }
  }

  // 將 filtered 直接在父組件渲染
  return (
    <section className={`container ${styles['course-list']}`}>
      <div className={styles['search-filter']}>
        <div className={styles['course-search']}>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="搜尋課程、講師"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={(e) => {
              setIsComposing(false)
              handleSearch()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <button className={styles['search-btn']} onClick={handleSearch}>
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

      {courses.length === 0 ? (
        <p>課程載入中...</p>
      ) : (
        <CourseList courses={filtered} />
      )}
    </section>
  )
}
