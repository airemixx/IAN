'use client'

import { useState, useEffect } from 'react'
import styles from './Slider.module.scss'

// 圖片和對應的字卡內容
const slides = [
  {
    image: "images/HomePage-images/Q3-43.webp",
    title: "Leica Q3 43",
    description: "如你所見"
  },
  {
    image: "images/HomePage-images/Leica_M11_Glossy_home_3840x2160.jpg.webp",
    title: "Leica M11 Glossy",
    description: "一見傾心"
  },
]

export default function SliderIndex() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <div key={index} className={`${styles.slideItem} ${index === currentIndex ? styles.active : ""}`}>
          <img
            src={slide.image}
            className={styles.slideImage}
            alt={`Slide ${index + 1}`}
          />
          <div className={styles.textCard}>
            <h1>{slide.title}</h1>
            <p>{slide.description}</p>
            <button className={styles.slideButton}>探索詳情</button>
          </div>
        </div>
      ))}
    </div>
  )
}
