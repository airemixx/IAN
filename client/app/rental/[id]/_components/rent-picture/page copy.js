// rent-picture

'use client'

import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

// 預設 6 張圖片（當 API 沒有圖片時使用）
const defaultImages = [
  '/images/rental/test/leica-Q3-0.png',
  '/images/rental/test/leica-Q3-1.png',
  '/images/rental/test/leica-Q3-2.png',
  '/images/rental/test/leica-Q3-3.png',
  '/images/rental/test/leica-Q3-4.png',
  '/images/rental/test/leica-Q3-5.png',
]

export default function RentPicture({ images = [] }) {
  console.log('接收到的 images:', images)
  // 如果 API 沒有圖片，則使用預設圖片
  const finalImages =
    images.length > 0
      ? images.map((img) => `/images/rental/${img}.png`)
      : defaultImages

  // 修正：讓 mainImage 在 API 變動後自動更新
  const [mainImage, setMainImage] = useState(finalImages[0])
  const [useSticky, setUseSticky] = useState(false)


  useEffect(() => {
    if (!mainImage || !finalImages.includes(mainImage)) {
      setMainImage(finalImages[0]) // 確保主圖不會被重置，只有當 API 變動時才更新
    }
  }, [finalImages])

  // 修正：確保 `missingImages` 計算基於 `finalImages`
  const missingImages = finalImages.length < 3 ? 3 - finalImages.length : 0

  // 處理點擊縮圖切換主圖
  const handleThumbnailClick = (image) => {
    setMainImage(image)
  }

  // 🟢 監聽滾動，根據視窗大小與滾動位置動態切換 sticky 與 relative
  useEffect(() => {
    const handleScroll = () => {
      const pictureSection = document.querySelector('.rent-picture-container')
      const footerSection = document.querySelector('footer')

      if (!pictureSection || !footerSection) return

      const pictureRect = pictureSection.getBoundingClientRect()
      const footerRect = footerSection.getBoundingClientRect()

      const isLargeScreen = window.innerWidth >= 992

      if (isLargeScreen) {
        // ✅ 只有大螢幕需要 sticky 效果
        // 當圖片區域底部接近頁尾 (footer) 時，取消 sticky
        const shouldUseSticky = pictureRect.bottom <= footerRect.top - 20

        if (shouldUseSticky !== useSticky) {
          setUseSticky(shouldUseSticky)
        }
      } else {
        setUseSticky(false) // 小螢幕保持 relative
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleScroll)

    handleScroll() // 初始化時也執行一次

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [useSticky])

  return (
    <div className={`rent-picture-container ${useSticky ? 'sticky' : 'relative'}`}>
      <div className="rent-picture-fixed">
        {/* 主圖顯示區域 */}
        <div className="text-center p-card2 main-image-container">
          <img
            src={mainImage}
            alt="Product Image"
            className="product-image img-fluid"
          />
        </div>

        {/* 縮圖輪播區域 */}
        <div className="thumbnails-container mt-3 d-flex align-items-center ">
          <Swiper spaceBetween={10} slidesPerView={3}>
            {finalImages.map((img, index) => (
              <SwiperSlide key={index}>
                {/* 縮圖，點擊後切換主圖 */}
                <div
                  className="thumbnail p-card2"
                  onClick={() => handleThumbnailClick(img)}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className={`img-fluid ${mainImage === img ? 'active' : ''}`}
                  />
                </div>
              </SwiperSlide>
            ))}

            {/* 使用 CSS 偽元素補足空白，確保只有當圖片少於 3 張時才補齊 */}
            {missingImages > 0 &&
              Array.from({ length: missingImages }).map((_, index) => (
                <SwiperSlide key={`empty-${index}`} className="empty-slide">
                  <div
                    className="thumbnail p-card2 placeholder-slide"
                    aria-hidden="true"
                  ></div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
