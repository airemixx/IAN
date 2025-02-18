'use client'

import { useState } from 'react'
import styles from './course-management.module.scss'
import { FaBars, FaList, FaSearch, FaPlusSquare, FaTrash } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { FiTrash2 } from "react-icons/fi";

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState('')

  const courses = [
    {
      id: 1,
      title: '旅行攝影：按下快門，用攝影書寫故事',
      category: '影像創作',
      date: '2025-01-13',
      price: '1,980',
      sales: '$2,256,843',
      students: '532人',
      image: '/images/course-cover/course_9_1.avif',
      status: '上架中',
    },
    {
      id: 2,
      title: '旅行攝影：按下快門，用攝影書寫故事',
      category: '影像創作',
      date: '2025-01-13',
      price: '1,980',
      sales: '$2,256,843',
      students: '532人',
      image: '/images/course-cover/course_9_1.avif',
      status: '上架中',
    },
  ]

  return (
    <>
      <button className="btn btn-dark d-xl-none">
        <FaBars />
      </button>

      {/* 📌 主要內容區域 */}
      <div className={styles['center-content']}>
        {/* 🔹 標題區 */}
        <div className={styles['nav-bar']}>
          <h1>課程管理中心</h1>
          <p>您好，Ada！歡迎來到您的專屬教學平台，立即規劃並管理您的課程吧!</p>
        </div>

        {/* 🔹 控制按鈕 */}
        <div className={styles['control-btns']}>
          <div className={styles['btns-left']}>
            {/* 篩選按鈕 */}
            <div className={styles['filter']}>
              <a href="">
                <FaList />
                <p>篩選</p>
              </a>
            </div>
            {/* 搜尋欄位 */}
            <div className={styles['course-search']}>
              <input
                className={styles['search-input']}
                type="text"
                placeholder="搜尋課程"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles['search-btn']}>
                <FaSearch />
              </button>
            </div>
          </div>

          {/* 新增課程 */}
          <div className={styles['add']}>
            <a href="">
              <FaPlusSquare />
              <p>新增課程</p>
            </a>
          </div>
        </div>

        {/* 🔹 課程列表 Table */}
        <div className={styles['table-container']}>
          <table>
            <thead>
              <tr>
                <th>課程圖片</th>
                <th>課程名稱</th>
                <th>課程分類</th>
                <th>建立日期</th>
                <th>售價</th>
                <th>銷售量</th>
                <th>學生人數</th>
                <th>發布狀態</th>
                <th>編輯</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className={styles['course-img']}>
                    <img src={course.image} alt={course.title} />
                  </td>
                  <td>{course.title}</td>
                  <td>{course.category}</td>
                  <td>{course.date}</td>
                  <td>{course.price}</td>
                  <td>{course.sales}</td>
                  <td>{course.students}</td>
                  <td>
                    <div className={styles['state-circle']}>
                      <div className={styles['state']}></div>
                      {course.status}
                    </div>
                  </td>
                  <td>
                    <button className={styles['edit-btn']}>
                      <FiEdit />
                    </button>
                  </td>
                  <td>
                    <button className={styles['delete-btn']}>
                    <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
