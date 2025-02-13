'use client'

import React, { useState, useEffect } from 'react'
import styles from './popular-teacher.module.scss' // ✅ 引入 CSS Modules
import { FaArrowRight } from 'react-icons/fa6'

export default function PopularTeacher() {
  const [topTeachers, setTopTeachers] = useState([]) // 儲存熱門講師

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await fetch('/api/teachers') // 🚀 請求老師 API
        if (!res.ok) throw new Error('無法獲取講師資料')

        const data = await res.json()

        // 📌 取前 4 名最熱門的講師
        const sortedTeachers = data.slice(0, 4)

        setTopTeachers(sortedTeachers)
      } catch (error) {
        console.error('❌ 無法獲取熱門講師:', error)
      }
    }

    fetchTeachers()
  }, [])

  return (
    <section className={styles['popular-teacher']}>
      <div className="container">
        <div className={styles['teacher-title']} data-aos="fade-right">
          <div className={styles['title-block']}></div>
          <h2>熱門講師</h2>
        </div>

        <div className={styles['teacher-wrapper']}>
          <div
            className={`row flex-nowrap mt-4 mt-lg-5 ${styles['teacher-list']}`}
            id="course-list"
          >
            {topTeachers.map((teacher, index) => (
              <div
                key={teacher.teacher_id}
                className="col-md-3"
                data-aos="fade-up"
                data-aos-duration={1000 + index * 500} // 動畫延遲
              >
                <a href="#">
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
    </section>
  )
}
