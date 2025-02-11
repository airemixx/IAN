'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './courses-banner.module.scss';
import React from 'react';

export default function CoursesBanner() {

  return (
    <>
      <section className={styles["course-banner"]}>
        <div className={styles["banner-title"]}>
          <span className="icon"><img src="./images/icon/choice.svg" alt="Icon" /></span>
          <p>精選課程</p>
        </div>
        <div className="swiper mySwiper">
          <Swiper
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
            <SwiperSlide className={styles['swiper-slide']}>
              <a href="#">
                <img src="./images/course-cover/course_12_1.avif" alt="Course 12" />
              </a>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
              <a href="#">
                <img src="./images/course-cover/course_1_1.avif" alt="Course 1" />
              </a>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
              <a href="#">
                <img src="./images/course-cover/course_2_1.avif" alt="Course 2" />
              </a>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
              <a href="#">
                <img src="./images/course-cover/course_13_1.avif" alt="Course 13" />
              </a>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
              <a href="#">
                <img src="./images/course-cover/course_9_1.avif" alt="Course 9" />
              </a>
            </SwiperSlide>
            <SwiperSlide className={styles['swiper-slide']}>
              <a href="#">
                <img src="./images/course-cover/course_18_1.avif" alt="Course 18" />
              </a>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}
