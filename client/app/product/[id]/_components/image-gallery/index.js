"use client";
import { useState } from "react";
import styles from "./image-gallery.module.scss"; // ✅ 正確引入 SCSS Module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"; // ✅ 確保引入 `faCamera`


export default function ImageGallery() {
  const images = [
    "/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png",
    "/images/product/2b2ea827765d48108ab5b2246a7fe2db_eos-5d-mk-iv-body-b22.png",
    "/images/product/504ad16701d848659666ac9afb059555_eos-5d-mk-iv-body-b26.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const updateMainImage = (index) => {
    setCurrentIndex(index);
  };

  const previousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="col-md-6 col-12 d-flex">
      {/* 縮圖區域 */}
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

      {/* 主要圖片區域 */}
      <div className={styles.mainImageContainer}>
        <img
          id="mainImage"
          src={images[currentIndex]}
          className={styles.mainImage}
          alt="商品圖片"
        />

        {/* 左右切換按鈕 */}
        <span className={`${styles.arrow} ${styles.arrowLeft}`} onClick={previousImage}>
          &lt;
        </span>
        <span className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextImage}>
          &gt;
        </span>

        {/* 比較按鈕 */}
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
