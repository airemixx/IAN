'use client'

import React from 'react'
import styles from './ProductCard.module.scss'

export default function ProductCardIndex() {
  const products = [
    {
      img: "images/HomePage-images/product (1).png",
      brand: "Leica 徠卡",
      title: "Q3 43",
      desc: "徠卡系列首款43mm焦段",
    },
    {
      img: "images/HomePage-images/product (1).png",
      brand: "Leica 徠卡",
      title: "Q3 43",
      desc: "徠卡系列首款43mm焦段",
    },
    {
      img: "images/HomePage-images/product (1).png",
      brand: "Leica 徠卡",
      title: "Q3 43",
      desc: "徠卡系列首款43mm焦段",
    },
    {
      img: "images/HomePage-images/product (1).png",
      brand: "Leica 徠卡",
      title: "Q3 43",
      desc: "徠卡系列首款43mm焦段",
    },
  ]

  return (
    <div className={`${styles.productArea} text-white py-5`}>
      <div className="mx-5 py-5">
        <h2 className="text-center mb-5">產品推薦</h2>
        <div className="row g-5">
          {products.map((product, index) => (
            <div className="col-md-3" key={index}>
              <div className={`card ${styles.productCard}`}>
                <div className="card-body">
                  <div className={`bg-white mb-3 ${styles.cardArea}`}>
                    <div className={`d-flex justify-content-between align-items-center mb-2 px-2 py-2 ${styles.cardImgArea}`}>
                      <span className="badge rounded-pill">{product.brand}</span>
                      <img src="images/HomePage-images/camera-Icon.svg" alt="Camera Icon" />
                    </div>
                    <img src={product.img} className="card-img-top rounded main-product-img" alt={product.title} />
                  </div>
                  <div className={styles.productDetail}>
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text text-black">{product.desc}</p>
                  </div>
                  <div className={`d-flex justify-content-center mt-3 ${styles.searchBtn}`}>
                    <a href="#">
                      <img src="images/HomePage-images/search-black.svg" alt="Search Icon" />
                    </a>
                  </div>
                  <div className={`d-flex justify-content-center mt-3 ${styles.searchBtn2}`}>
                    <a href="#">
                      <img src="images/HomePage-images/search-white.svg" alt="Search Icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
