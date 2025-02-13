// rent-photo

'use client';

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// 縮圖圖片列表
const images = [
  "/images/rental/test/leica-Q3-0.png",
  "/images/rental/test/leica-Q3-1.png",
  "/images/rental/test/leica-Q3-2.png",
  "/images/rental/test/leica-Q3-3.png",
  "/images/rental/test/leica-Q3-4.png",
  "/images/rental/test/leica-Q3-5.png",
];

export default function RentPhoto() {
  // 主圖的狀態，初始顯示第一張圖片
  const [mainImage, setMainImage] = useState(images[0]);

  // 計算需要補齊的空白區塊數量，確保圖片真的小於 3 張才補足
  const missingImages = images.length < 3 ? 3 - images.length : 0;

  // 縮圖點擊切換主圖
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div>
      {/* 主圖顯示區域 */}
      <div className="text-center p-card2">
        <img src={mainImage} alt="Product Image" className="product-image img-fluid" />
      </div>
      
      {/* 縮圖輪播區域 */}
      <div className="thumbnails-container mt-3 d-flex align-items-center position-relative">
        <Swiper spaceBetween={10} slidesPerView={3}>
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              {/* 縮圖，點擊後切換主圖 */}
              <div className="thumbnail p-card2" onClick={() => handleThumbnailClick(img)}>
                <img src={img} alt={`Thumbnail ${index}`} className={`img-fluid ${mainImage === img ? 'active' : ''}`} />
              </div>
            </SwiperSlide>
          ))}
          {/* 使用 CSS 偽元素補足空白，確保只有當圖片少於 3 張時才補齊 */}
          {missingImages > 0 && Array(missingImages).fill(null).map((_, index) => (
            <SwiperSlide key={`empty-${index}`} className="empty-slide">
              <div className="thumbnail p-card2 placeholder-slide" aria-hidden="true"></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}