import React, { useState, useEffect } from 'react'
import styles from './courses-filter.module.scss'
import { CourseCard } from '../courses-card/page'

export default function CoursesFilter() {
  const [courses, setCourses] = useState([]) // 課程列表
  const [search, setSearch] = useState('') // 搜尋關鍵字
  const [sort, setSort] = useState('popular') // 排序方式

  // 🚀 取得篩選後的課程資料
  const fetchCourses = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/courses?search=${search}&sort=${sort}`,
      )
      if (!res.ok) throw new Error(`HTTP 錯誤！狀態碼：${res.status}`)

      const data = await res.json()
      console.log('📢 取得的課程資料：', data) // ✅ 確保這裡有正確的資料

      if (!Array.isArray(data)) throw new Error('API 回應的資料不是陣列')

      setCourses(data)
    } catch (error) {
      console.error('❌ 載入課程失敗:', error)
      setCourses([]) // 避免 courses 變成 undefined
    }
  }

  // 🔄 當 `search` 或 `sort` 變動時，重新抓取資料
  useEffect(() => {
    fetchCourses()
  }, [search, sort])

  return (
    <section className={`container ${styles['course-list']}`}>
      <div className={styles['search-filter']}>
        {/* 🔍 搜尋框 */}
        <div className={styles['course-search']}>
          <input
            className={styles['search-input']}
            type="text"
            placeholder="搜尋課程、講師"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // ✅ 更新 `search`，觸發 `useEffect`
          />
          <button className={styles['search-btn']} onClick={fetchCourses}>
            <img src="/images/icon/search-blue.svg" alt="" />
          </button>
        </div>

        {/* 🔽 篩選下拉選單 */}
        <select
          className={styles['custom-select']}
          value={sort}
          onChange={(e) => setSort(e.target.value)} // ✅ 更新 `sort`，觸發 `useEffect`
        >
          <option value="popular">熱門程度優先</option>
          <option value="new">最新上架優先</option>
          <option value="low-price">價格低到高</option>
          <option value="high-price">價格高到低</option>
        </select>
      </div>

      {/* 📚 課程清單 */}
      <div className={styles['course-list-container']}>
        {courses.length === 0 ? (
          <p>找不到符合條件的課程</p>
        ) : (
          courses
            .filter((course) => course && course.image_url) // ✅ 過濾掉 `undefined` 或 `null`
            .map((course, index) => {
              console.log(`📢 渲染 course[${index}]:`, course) // ✅ 確保 console 內部的資料正確
              return (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  teacher={course.teacher_name}
                  price={course.sale_price}
                  image={course.image_url}
                />
              )
            })
        )}
      </div>
    </section>
  )
}
