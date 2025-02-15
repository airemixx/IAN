"use client";
import { useEffect, useState } from "react";
import styles from "./image-gallery.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function ImageGallery({ productId }) {
  const [images, setImages] = useState([]); // 存放商品圖片
  const [currentIndex, setCurrentIndex] = useState(0);

  // 📌 向後端請求該商品的圖片
  useEffect(() => {
    async function fetchProductImages() {
      try {
        const response = await fetch(`http://localhost:8000/api/product/${productId}`);
        if (!response.ok) throw new Error("無法獲取商品圖片");

        const data = await response.json();
        console.log("📸 取得的商品圖片:", data.images);

        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }
      } catch (error) {
        console.error("圖片載入錯誤:", error);
      }
    }

    if (productId) {
      fetchProductImages();
    }
  }, [productId]);

  // 📌 當點擊縮圖時更新主圖片
  const updateMainImage = (index) => {
    setCurrentIndex(index);
  };

  // 📌 左右切換圖片
  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <p>圖片載入中...</p>;
  }

  return (
    <div className="col-md-6 col-12 d-flex">
      {/* 🔹 縮圖區域 */}
      <div className={`flex-column ${styles.thumbnailContainer}`}>
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={styles.thumbnailImg}
            alt={`縮圖 ${index + 1}`}
            onClick={() => updateMainImage(index)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      {/* 🔹 主要圖片區域 */}
      <div className={styles.mainImageContainer}>
        <img
          id="mainImage"
          src={images[currentIndex]}
          className={styles.mainImage}
          alt="商品圖片"
        />

        {/* 🔹 左右切換按鈕 */}
        <span className={`${styles.arrow} ${styles.arrowLeft}`} onClick={previousImage}>
          &lt;
        </span>
        <span className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextImage}>
          &gt;
        </span>

        {/* 🔹 比較按鈕 */}
        <div className={styles.cameraIconContainer}>
          <div className={styles.cameraIcon}>
            <FontAwesomeIcon icon={faCamera} />
          </div>
          <p className={styles.cameraText}>比較</p>
        </div>
      </div>
    </div>
  );
}
