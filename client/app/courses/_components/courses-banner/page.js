'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules' // ✅ 引入 Swiper 模組
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styles from './courses-banner.module.scss'
import React from 'react'

export default function CoursesBanner() {
  return (
    <section className={styles['course-banner']}>
      <div className={styles['banner-title']}>
        <span className="icon">
          <img src="/images/icon/choice.svg" alt="Icon" />
        </span>
        <p>精選課程</p>
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]} // ✅ 確保 Swiper 啟用 Autoplay、導航、指示點
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={1000}
      >
        {[
          'course_12_1.avif',
          'course_1_1.avif',
          'course_2_1.avif',
          'course_13_1.avif',
          'course_9_1.avif',
          'course_18_1.avif',
        ].map((img, index) => (
          <SwiperSlide key={index} className={styles['swiper-slide']}>
            <a href="#">
              <img
                src={`/images/course-cover/${img}`}
                alt={`Course ${index + 1}`}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
