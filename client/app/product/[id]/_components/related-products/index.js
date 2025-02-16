"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // ✅ 引入 Next.js 的 Link
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import styles from "./related-products.module.scss";

export default function RelatedProducts({ brandId, currentId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!brandId || !currentId) return; // ✅ 確保有 `brandId` 和 `currentId`

    fetch(`http://localhost:8000/api/product/related/${brandId}/${currentId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("錯誤:", error));
  }, [brandId, currentId]); // ✅ 監聽 brandId & currentId，確保正確請求 API

  return (
    <div className="mb-5 mt-5">
      <h3 className="mb-4">探索系列</h3>
      <hr />

      {products.length > 0 ? (
        <>
          {/* ✅ 手機版 Swiper */}
          <div className="d-md-none">
            <Swiper modules={[Pagination]} spaceBetween={20} slidesPerView={2} pagination={{ clickable: true }}>
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                <Link href={`/product/${product.id}`} passHref className={styles.productCard}>
                <div className="card">
                <img src={product.image} className={styles.cardimgTop} alt={product.name} />

                      <div className="card-body text-center">
                        <h5 className={styles.cardTitle}>{product.name}</h5>
                        <p className="card-text">NT$ {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ✅ 桌機版 Swiper */}
          <div className="d-none d-md-block">
            <Swiper modules={[Pagination]} spaceBetween={20} slidesPerView={4} pagination={{ clickable: true }}>
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                <Link href={`/product/${product.id}`} passHref className={styles.productCard}>
                    <div className="card">
                      <img src={product.image} className={`${styles.cardimgTop}`} alt={product.name} />
                      <div className="card-body text-center">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">NT$ {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      ) : (
        <p className="text-muted text-center">沒有其他相關產品</p> // ✅ 沒有推薦產品時，顯示這段文字
      )}
    </div>
  );
}
