'use client'

import { useState, useEffect } from 'react'
import styles from './teacher-info.module.scss'
import { FaChevronRight } from 'react-icons/fa'

export default function TeacherInfo({ teacherId }) {
  const [teacher, setTeacher] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false) // 控制彈出視窗

  useEffect(() => {
    if (!teacherId) return

    console.log('開始請求 API:', `/api/teachers/${teacherId}`)

    fetch(`/api/teachers/${teacherId}`)
      .then((res) => {
        console.log('API 回應狀態:', res.status)
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
        return res.json()
      })
      .then((data) => {
        console.log('API 回傳資料:', data)
        setTeacher(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('獲取講師資料失敗:', error)
        setLoading(false)
      })
  }, [teacherId])

  console.log('📌 TeacherInfo 接收到的 teacherId:', teacherId)
  if (loading) return <p>載入中...</p>
  if (!teacher) return <p>無法找到講師資料</p>

  return (
    <section className={styles['teacher-info-container']} id="teacher-info">
      <div className={styles['section-detail-title']} data-aos="fade-right">
        <div className={styles['title-block']}></div>
        <h2>關於講師</h2>
      </div>
      <div
        className={styles['teacher-info']}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className={styles['teacher-info-img']}>
          <img
            src={teacher.image || '/images/teacher/default.avif'}
            alt={teacher.name}
          />
        </div>

        <div className={styles['teacher-info-text']}>
          <h3>{teacher.name}</h3>
          <ul className={styles['teacher-data']}>
            <li className={styles['data-item']}>
              <img src="/images/icon/course-icon.svg" alt="" />
              <p>
                {teacher.courseCount?.toLocaleString('en-US') || '0'} 堂課程
              </p>
            </li>
            <li className={styles['data-item']}>
              <img src="/images/icon/article-icon.svg" alt="" />
              <p>
                {teacher.articleCount
                  ? teacher.articleCount.toLocaleString()
                  : '0'}{' '}
                篇文章
              </p>
            </li>
            <li className={styles['data-item']}>
              <img src="/images/icon/student-icon.svg" alt="" />
              <p>
                {Number(teacher.studentCount)?.toLocaleString('en-US') || '0'}{' '}
                位學生
              </p>
            </li>
          </ul>
          <div className={styles['line']}></div>
          <p>{teacher.bio}</p>
          <div className={styles['go-page-link']}>
            {/* 點擊開啟彈出視窗 */}
            <button
              onClick={() => setIsModalOpen(true)}
              className={styles['open-modal-btn']}
            >
              前往講師頁面
             <FaChevronRight size={10} />
            </button>
          </div>
        </div>
      </div>

      {/* 彈出視窗 */}
      {isModalOpen && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal-content']}>
            <button
              className={styles['close-btn']}
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>
            <h2>{teacher.name}</h2>
            <img
              src={teacher.image || '/images/teacher/default.avif'}
              alt={teacher.name}
              className={styles['modal-img']}
            />
            <p>{teacher.bio}</p>
            <ul>
              <li>課程數量: {teacher.courseCount?.toLocaleString('en-US') || '0'}</li>
              <li>文章數量: {teacher.articleCount?.toLocaleString('en-US') || '0'}</li>
              <li>學生數量: {Number(teacher.studentCount)?.toLocaleString('en-US') || '0'}</li>
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}
