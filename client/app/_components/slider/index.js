'use client'

import { useState, useEffect } from 'react'
import styles from './Slider.module.scss'

const images = [
  "images/HomePage-images/SC1.jpg",
  "images/HomePage-images/Leica_M11_Glossy_home_3840x2160.jpg.webp",
]

export default function SliderIndex() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.sliderContainer}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          className={`${styles.slideImage} ${index === currentIndex ? styles.active : ""}`}
          alt={`Slide ${index + 1}`}
        />
      ))}
      <button className={styles.slideButton}>探索詳情</button>
    </div>
  )
}
