'use client'

import { useState, useEffect } from 'react'
import styles from './price-filxed.module.scss'
import FavoriteButtonG from '../favorite-button-g/page'

export default function PriceFixed({ course }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const priceSection = document.querySelector(
        `.${styles['course-price-fixed']}`,
      )
      const contentSection = document.querySelector('.col-12.col-xl-8') // 左側內容區

      if (!priceSection || !contentSection) return

      const priceRect = priceSection.getBoundingClientRect()
      const contentRect = contentSection.getBoundingClientRect()

      // **當 `PriceFixed` 距離視窗頂部 150px 時顯示**
      const appearThreshold = 500

      // **如果 `PriceFixed` 的 `top` <= `appearThreshold`，讓它顯示**
      const shouldShow = priceRect.top <= appearThreshold

      // **維持底部隱藏邏輯**
      const shouldHide = priceRect.bottom >= contentRect.bottom

      setIsVisible(shouldShow && !shouldHide)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      className={`${styles['course-price-fixed']} ${isVisible ? styles['show'] : styles['hide']}`}
      data-aos="fade-down"
    >
      <div className={styles['fixed-price']}>
        <div className={styles['discount-price']}>
          NT$ {course.sale_price.toLocaleString()}
        </div>
        <div className={styles['original-price']}>
          NT$ {course.original_price.toLocaleString()}
        </div>
      </div>
      <div className={styles['shopping-btn-fixed']}>
        <button className={styles['buy-btn']}>+ 立即購買</button>
        <div className={styles['shopping-btn-flex']}>
          <button className={`${styles['cart-btn']} hvr-icon-pulse`}>
            <img src="/images/icon/cart-btn.svg" alt="" className="hvr-icon" />
            <p>加入購物車</p>
          </button>
          <FavoriteButtonG className={styles['favorite-btn']} />
        </div>
        <div className={styles['refund']}>
          <p>30 天退款保證</p>
        </div>
        <div className={styles['fixed-content']}>
          <div className={styles['content-title']}>此課程包含</div>
          <div className={styles['line']}></div>
          <ul className={styles['content-text']}>
            <li>
              <img src="/images/icon/fixed_icon_1.svg" alt="" />
              {Math.floor(course.duration / 60)} 小時 {course.duration % 60}{' '}
              分鐘的影片
            </li>
            <li>
              <img src="/images/icon/fixed_icon_2.svg" alt="" />4 個可下載的資源
            </li>
            <li>
              <img src="/images/icon/fixed_icon_3.svg" alt="" />
              透過行動裝置與電視存取
            </li>
            <li>
              <img src="/images/icon/fixed_icon_4.svg" alt="" />
              完整終身存取權
            </li>
            <li>
              <img src="/images/icon/fixed_icon_5.svg" alt="" />
              結業證書
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
