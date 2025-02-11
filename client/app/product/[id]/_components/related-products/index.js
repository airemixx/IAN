"use client";
import { useEffect, useState } from "react";
import styles from "./related-products.module.scss"; // ✅ 正確引入 SCSS Module

export default function RelatedProducts() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Canon EOS R10",
      price: "NT$67,500",
      image: "/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png",
    },
    {
      id: 2,
      name: "Canon EOS R10",
      price: "NT$67,500",
      image: "/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png",
    },
    {
      id: 3,
      name: "Canon EOS R10",
      price: "NT$67,500",
      image: "/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png",
    },
    {
      id: 4,
      name: "Canon EOS R11",
      price: "NT$67,500",
      image: "/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png",
    },
  ]);

  return (
    <div className="mb-5 mt-5">
      <h3 className="mb-4">探索系列</h3>
      <hr />

      {/* Swiper 只在手機版啟動 */}
      <div className={`swiper mySwiper d-md-none ${styles.swiperContainer}`}>
        <div className="swiper-wrapper">
          {products.map((product) => (
            <div key={product.id} className="swiper-slide">
              <div className={`card ${styles.productCard}`}>
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 桌機版靜態佈局 (768px 以上顯示) */}
      <div className="row d-none d-md-flex">
        {products.map((product) => (
          <div key={product.id} className="col-md-3">
            <div className={`card ${styles.productCard}`}>
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
