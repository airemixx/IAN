'use client'

import styles from './course-category.module.scss'
import React, { useState, useEffect } from 'react'

export default function CoursesCategory({ setSelectedCategory }) {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setLocalSelectedCategory] = useState('所有課程') // 預設 "所有課程"
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/courses/categories') 
        if (!res.ok) throw new Error(`HTTP 錯誤！狀態碼：${res.status}`)

        const data = await res.json()
        console.log('📢 取得的分類資料:', data)

        setCategories([{ name: '所有課程' }, ...data]) // 確保 "所有課程" 始終存在
      } catch (err) {
        console.error('❌ 無法取得分類資料:', err.message)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  if (loading) return <p>載入分類中...</p>
  if (error) return <p className="text-danger">無法載入分類：{error}</p>

  return (
    <section
      className={`${styles['category-nav']} ${styles['nav-fixed-2']}`}
      data-type="nav-fixed-2"
    >
      <ul>
        {categories.map((category) => (
          <li
            key={category.name}
            className={`${styles['category-list']} ${
              selectedCategory === category.name.toString() ? styles['active'] : ''
            }`}
            onClick={() => {
              const newCategory = category.name.toString() // 確保是字串
              console.log('🛠 設定分類:', newCategory)

              if (setSelectedCategory) {
                setSelectedCategory(newCategory)
              } 
              setLocalSelectedCategory(newCategory) // 確保本地狀態同步更新
            }}
          >
            <a href="#">
              <div className={styles['circle-active']} />
              <p className="m-0">{category.name}</p>
            </a>
          </li>
        ))}
      </ul>

      <div className="gradient" />
    </section>
  )
}
