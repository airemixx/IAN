"use client";
import { useEffect, useState } from "react";
import styles from "./image-gallery.module.scss";
import CompareButton from "../product-button";

export default function ImageGallery({ productId }) {
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch(`http://localhost:8000/api/product/${productId}`);
        if (!response.ok) throw new Error("無法獲取商品資料");

        const data = await response.json();

        if (data.images && data.images.length > 0) {
          setImages(data.images);
        }

        setProduct(data);
      } catch (error) {
        console.error("圖片載入錯誤:", error);
      }
    }

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const updateMainImage = (index) => {
    setCurrentIndex(index);
  };

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
      <div className={styles.mainImageContainer}>
        <img
          id="mainImage"
          src={images[currentIndex]}
          className={styles.mainImage}
          alt="商品圖片"
        />
        <span className={`${styles.arrow} ${styles.arrowLeft}`} onClick={previousImage}>
          &lt;
        </span>
        <span className={`${styles.arrow} ${styles.arrowRight}`} onClick={nextImage}>
          &gt;
        </span>
        {product && (
          <div className={styles.cameraIconContainer}>
            <CompareButton product={product} />
          </div>
        )}
      </div>
    </div>
  );
}
