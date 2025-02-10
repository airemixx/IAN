'use client'

import React, { useState, useEffect } from 'react'
import styles from './courses-filter.module.scss'

export default function CoursesFilter() {
  return (
    <>
   <section className={`container ${styles["course-list"]}`}>
  <div className={styles["search-filter"]}>
    {/* 🔍 左側搜尋框（保持不變） */}
    <div className={styles["course-search"]}>
      <input
        className={styles["search-input"]}
        type="text"
        placeholder="搜尋課程、講師"
      />
      <button className={styles["search-btn"]}>
        <img src="/images/search-blue.svg" alt="" />
      </button>
    </div>

    {/* 🔽 右側 Bootstrap 選單（改用 `form-select`） */}
    <select className={styles["custom-select"]}>
      <option value="popular">熱門程度優先</option>
      <option value="new">最新上架優先</option>
      <option value="low-price">價格低到高</option>
      <option value="high-price">價格高到低</option>
    </select>
  </div>
</section>

    </>
  )
}
