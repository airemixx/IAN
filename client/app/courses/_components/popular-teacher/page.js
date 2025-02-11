'use client'

import React, { useState, useEffect } from 'react'

import styles from './popular-teacher.module.scss' // ✅ 引入 CSS Modules
import { FaArrowRight } from 'react-icons/fa6'

const teacherData = [
  {
    name: '周育存',
    imgSrc: '/images/teacher/teacher_8.jpg',
    description:
      '創辦複眼攝影工作室，2009年開始從事商業攝影，平常大多拍攝商品及靜物，以處理攝影的光線問題為主。',
    animationDuration: '1000',
  },
  {
    name: '周育存',
    imgSrc: '/images/teacher/teacher_2.jpg',
    description:
      '創辦複眼攝影工作室，2009年開始從事商業攝影，平常大多拍攝商品及靜物，以處理攝影的光線問題為主。',
    animationDuration: '2000',
  },
  {
    name: '周育存',
    imgSrc: '/images/teacher/teacher_3.jpg',
    description:
      '創辦複眼攝影工作室，2009年開始從事商業攝影，平常大多拍攝商品及靜物，以處理攝影的光線問題為主。',
    animationDuration: '2500',
  },
  {
    name: '周育存',
    imgSrc: '/images/teacher/teacher_5.avif',
    description:
      '創辦複眼攝影工作室，2009年開始從事商業攝影，平常大多拍攝商品及靜物，以處理攝影的光線問題為主。',
    animationDuration: '3000',
  },
]

export default function PopularTeacher() {
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
            {teacherData.map((teacher, index) => (
              <div
                key={index}
                className="col-md-3"
                data-aos="fade-up"
                data-aos-duration={teacher.animationDuration}
              >
                <a href="#">
                  <div className={`${styles['teacher-card']} hvr-grow`}>
                    <div className={styles['teacher-card-img']}>
                      <img src={teacher.imgSrc} alt={teacher.name} />
                      <div className={styles['teacher-card-overlay']}></div>
                      <div className={styles['arrow-more']}>
                        <div className={styles['circle-more']}>
                          <FaArrowRight
                            style={{ transform: 'rotate(-45deg)' }}
                          />
                        </div>
                      </div>
                      <h3>{teacher.name}</h3>
                      <p>{teacher.description}</p>
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
