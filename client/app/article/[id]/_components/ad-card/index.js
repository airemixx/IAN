'use client';  

import React from 'react';  
import style from './index.module.scss'; // 確保導入模組化 SCSS  

export default function AdCard() {  
  return (  
    <>  
      <div className={`mb-3 ${style['y-ad-card']}`}>  
        <img  
          src="/images/article/product (1).jpg"  
          alt="product-image"  
        />  
        <div className={style['product-info']}>  
          <div className={style['product-title']}>Sony α1 II</div>  
          <div className={style['product-subtitle']}>無與倫比</div>  
          <div className={style['product-price']}>NT$189,980</div>  
        </div>  
        <button className={style['buy-button']}>BUY</button>  
      </div>  
    </>  
  );  
}  
