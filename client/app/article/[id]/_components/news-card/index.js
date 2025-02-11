'use client';  

import React from 'react';  
import styles from './index.module.scss'; // 導入 SCSS 模組  

export default function NewsCard() {  
  const newsData = [  
    {  
      tag: '產品情報',  
      title: 'Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！',  
      image: '/images/article/course-3.jpg',  
    },  
    {  
      tag: '產品情報',  
      title: 'Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！',  
      image: '/images/article/course-3.jpg',  
    },  
    {  
      tag: '產品情報',  
      title: 'Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！',  
      image: '/images/article/course-3.jpg',  
    },  
    {  
      tag: '產品情報',  
      title: 'Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！',  
      image: '/images/article/course-3.jpg',  
    },  
    {  
      tag: '產品情報',  
      title: 'Leica Q3 43 評測報告 | APO 大光圈鏡頭加持，領略光影之美的魅力！',  
      image: '/images/article/course-3.jpg',  
    },  
  ];  

  return (  
    <>  
      <ul className={`list-unstyled ${styles['y-news-list']}`}>  
        {newsData.map((news, index) => (  
          <li className={styles['y-news-item']} key={index}>  
            <img  
              src={news.image}  
              className={`${styles['y-news-image']} me-2`}  
              alt={news.title}  
            />  
            <div>  
              <p className={styles['y-news-tag']}>{news.tag}</p>  
              <a href="#" className={styles['y-news-title']}>  
                {news.title}  
              </a>  
            </div>  
          </li>  
        ))}  
      </ul>  
    </>  
  );  
}