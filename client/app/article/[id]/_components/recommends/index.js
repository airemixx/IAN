'use client';  

import React from 'react';  
import styles from './index.module.scss'; 

// 模擬的商品資料  
const products = [  
  {  
    id: 1,  
    tag: 'Leica 徠卡',  
    name: 'Q3 43',  
    price: 'NT$220,000',  
    image: '/images/article/product (1).png',  
  },  
  {  
    id: 2,  
    tag: 'Leica 徠卡',  
    name: 'Q3 43',  
    price: 'NT$220,000',  
    image: '/images/article/product (1).png',  
  },  
  {  
    id: 3,  
    tag: 'Leica 徠卡',  
    name: 'Q3 43',  
    price: 'NT$220,000',  
    image: '/images/article/product (1).png',  
  },  
  {  
    id: 4,  
    tag: 'Leica 徠卡',  
    name: 'Q3 43',  
    price: 'NT$220,000',  
    image: '/images/article/product (1).png',  
  },  
  {  
    id: 5,  
    tag: 'Leica 徠卡',  
    name: 'Q3 43',  
    price: 'NT$220,000',  
    image: '/images/article/product (1).png',  
  },  
];  

// 卡片元件  
function ProductCard({ product }) {  
  return (  
    <div className={`card ${styles.card}`} style={{ width: '18rem' }}>  
      {/* 卡片收藏按鈕 */}  
      <div className={`px-3 py-2 ${styles['y-card-title']} d-flex justify-content-end`}>  
        <a href="#">  
          <img src="/images/article/heart-dark.svg" alt="收藏" />  
        </a>  
      </div>  
      {/* 商品圖片 */}  
      <img  
        className="card-img-top object-fit-cover"  
        src={product.image}  
        alt={product.name}  
      />  
      {/* 卡片文字內容 */}  
      <div className="card-body">  
        <h6 className={styles['y-card-tag']}>{product.tag}</h6>  
        <h5 className="card-product-name">{product.name}</h5>  
        <h6 className={`mt-3 ${styles['y-card-price']}`}>{product.price}</h6>  
      </div>  
    </div>  
  );  
}  

// 主元件  
export default function Recommends() {  
  return (  
    <div className={styles['y-recommends-area-bg']}>  
      <div className={`my-5 ${styles['y-recommends-area']}`}>  
        <h2 className="px-4">Lenstudio Recommends</h2>  
        <div className={styles['y-recommends-line']}></div>  
        {/* 卡片區域 */}  
        <div className={`gap-3 d-flex ${styles['y-recommends-card-area']}`}>  
          {products.map((product) => (  
            <ProductCard key={product.id} product={product} />  
          ))}  
        </div>  
      </div>  
    </div>  
  );  
}  
