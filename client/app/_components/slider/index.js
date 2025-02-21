'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import styles from './Slider.module.scss'  // 引入 CSS 檔案

export default function SliderIndex() {
  return (
    <Splide options={{ type: 'loop', perPage: 1, autoplay: true }}>
      <SplideSlide className={styles.slideContainer}>
        <div className={styles.slideContent}>
          <img 
            src="images/HomePage-images/SC1.jpg" 
            alt="Leica Q3 43 相機" 
            className={styles.slideImage}
          />
          <button className={styles.slideButton}>探索詳情</button>
        </div>
      </SplideSlide>
      <SplideSlide className={styles.slideContainer}>
        <div className={styles.slideContent}>
          <img 
            src="images/HomePage-images/Leica_M11_Glossy_home_3840x2160.jpg.webp" 
            alt="Leica M11 Glossy 相機" 
            className={styles.slideImage}
          />
          <button className={styles.slideButton}>探索詳情</button>
        </div>
      </SplideSlide>
    </Splide>
  )
}
