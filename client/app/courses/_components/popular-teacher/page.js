'use client'

import React, { useState, useEffect } from 'react'
import styles from './popular-teacher.module.scss'
import { FaArrowRight } from 'react-icons/fa6'
import TeacherInfoModal from '../teacher-info-modal/page'

export default function PopularTeacher() {
  const [topTeachers, setTopTeachers] = useState([]) // ✅ 儲存熱門講師
  const [isModalOpen, setIsModalOpen] = useState(false) // ✅ 控制彈跳視窗
  const [selectedTeacher, setSelectedTeacher] = useState(null) // ✅ 確保變數存在

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teachers') // 🚀 請求老師 API
        if (!res.ok) throw new Error('無法獲取講師資料')

        const data = await res.json()
        console.log('📌 取得的講師資料:', data) // ✅ 確保 API 回傳的資料正確

        setTopTeachers(data.slice(0, 4)) // 取前 4 名
      } catch (error) {
        console.error('❌ 無法獲取熱門講師:', error)
      }
    }

    fetchTeachers()
  }, [])

  // 📌 點擊講師圖片時，請求該講師詳細資料 ，並顯示彈跳視窗
  const handleTeacherClick = async (teacherId) => {
    try {
      const res = await fetch(`/api/teachers/${teacherId}`)
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

      const data = await res.json()
      console.log('📌 選擇的講師資料:', data) // ✅ 確保 API 有回應
      setSelectedTeacher(data) // ✅ 設定選中的講師資料
      setIsModalOpen(true) // ✅ 開啟彈跳視窗
    } catch (error) {
      console.error('❌ 獲取講師資料失敗:', error)
    }
  }

   useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';  // 禁止背景滾動
    } else {
      document.body.style.overflow = 'auto';  // 允許滾動
    }
    return () => {
      document.body.style.overflow = 'auto';  // 彈出視窗關閉時恢復滾動
    };
  }, [isModalOpen]);

  return (
    <section className={styles['popular-teacher']}>
      <div className="container">
        <div className={styles['teacher-title']} data-aos="fade-right">
          <div className={styles['title-block']}></div>
          <h2>熱門講師</h2>
        </div>

        <div className={styles['teacher-wrapper']}>
          <div className={`row flex-nowrap mt-4 mt-lg-5 ${styles['teacher-list']}`} id="course-list">
            {topTeachers.map((teacher, index) => (
              <div
                key={teacher.teacher_id} // ✅ 確保 `key` 唯一
                className="col-md-3"
                data-aos="fade-up"
                data-aos-duration={1000 + index * 500} // 動畫延遲
              >
                <a onClick={() => handleTeacherClick(teacher.teacher_id)}> {/* ✅ 點擊時開啟彈跳視窗 */}
                  <div className={`${styles['teacher-card']} hvr-grow`}>
                    <div className={styles['teacher-card-img']}>
                      <img src={teacher.teacher_image} alt={teacher.teacher_name} />
                      <div className={styles['teacher-card-overlay']}></div>
                      <div className={styles['arrow-more']}>
                        <div className={styles['circle-more']}>
                          <FaArrowRight style={{ transform: 'rotate(-45deg)' }} />
                        </div>
                      </div>
                      <h3>{teacher.teacher_name}</h3>
                      <p>{teacher.teacher_bio || '這位講師暫無簡介'}</p> {/* ✅ 避免 `null` 值 */}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ 引入彈跳視窗組件 */}
      {isModalOpen && selectedTeacher && (
        <TeacherInfoModal
          teacher={selectedTeacher}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  )
}
