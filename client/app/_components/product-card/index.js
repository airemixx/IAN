'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import styles from './ProductCard.module.scss'

export default function ProductCardIndex() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:8000/api/product');
        if (!res.ok) throw new Error("API 請求失敗");

        const data = await res.json();
        const sortedProducts = data
          .filter(product => product.category_id === 1 && ![18, 15, 16].includes(product.id))
          .sort((a, b) => b.price - a.price);
        setProducts(sortedProducts.slice(0, 7));
      } catch (error) {
        console.error("獲取商品失敗:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className={`${styles.productArea} text-white py-5`}>
      <div className="mx-5 py-5">
        <h2 className="text-center mb-5">產品推薦</h2>

        {/* Swiper 輪播區塊 */}
        <Swiper
          modules={[Pagination]}
          spaceBetween={20} // 卡片間距
          slidesPerView={1} // 每次顯示 1 張（手機）
          breakpoints={{
            768: { slidesPerView: 2 }, // 平板顯示 2 張
            1024: { slidesPerView: 3 }, // 桌面顯示 3 張
            1280: { slidesPerView: 4 } // 超大螢幕顯示 4 張
          }}
          pagination={{ clickable: true }} // 啟用點點分頁
          className={styles.mySwiper}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <div className={`card ${styles.productCard}`}>
                  <div className="card-body">
                    <div className={`bg-white mb-3 ${styles.cardArea}`}>
                      <div className={`d-flex justify-content-between align-items-center mb-2 px-2 py-2 ${styles.cardImgArea}`}>
                        <span className="badge rounded-pill">{product.brand_name}</span>
                      </div>
                      <img src={product.image_url} className="card-img-top rounded main-product-img" alt={product.title} />
                    </div>
                    <div className={styles.productDetail}>
                      <h5 className="card-title">{product.title}</h5>
                      <p className={`${styles.productName}`}>{product.name}</p>
                      <p className={`${styles.productPrice}`}>NT$ {product.price.toLocaleString()}</p>
                    </div>
                    <Link href={`/product/${product.id}`} className="d-flex justify-content-center mt-3">
                      <img src="images/HomePage-images/search-black.svg" alt="Search Icon" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center">載入中...</p>
          )}
        </Swiper>
      </div>
    </div>
  )
}
