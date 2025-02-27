'use client'

import React from 'react'
import styles from './ArticleCard.module.scss'

export default function ArticleCardIndex(props) {
  return (
    <div className={styles.newsCard}>
      {/* 標題 */}
      <h2 className="text-white text-center mb-5">最新消息</h2>  

      {/* 卡片區塊 */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-2 g-4">
        {/* 卡片陣列 */}
        {[
          {
            img: "images/HomePage-images/news (1).jpg",
            category: "產品情報",
            title: "Sony α1 II 當代全能旗艦相機重磅登場",
            date: "2024.11.20",
            link: "#",
          },
          {
            img: "images/HomePage-images/news (1).webp",
            category: "攝影活動",
            title: "台北攝影器材展Nikon三大亮點，福袋加碼送Z系列鏡頭，總價值超過25萬",
            date: "2024.12.31",
            link: "#",
          },
          {
            img: "images/HomePage-images/news (2).webp",
            category: "產品情報",
            title: "Leica Q3 43 評測報告｜APO 大光圈鏡頭加持、領略減法攝影的美好！",
            date: "2024.10.11",
            link: "#",
          },
          {
            img: "images/HomePage-images/news (2).webp",
            category: "訊息公告",
            title: "2024 春節配送公告",
            date: "2024.01.16",
            link: "#",
          },
        ].map((news, index) => (
          <div className="col" key={index}>
            <div className={`card h-100 d-flex flex-row ${styles.newsCardContent}`}>
              <div className={`col-4 ${styles.cardNewsImg}`}>
                <img src={news.img} className="img-fluid h-100" alt="Card Image" />
              </div>
              <div className="col-8 d-flex flex-column justify-content-between">
                <div className={styles.tagProduct}>
                  <span>{news.category}</span>
                </div>
                <div>
                  <h4 className={`card-title mt-2 mb-5 mx-2 ${styles.cardTitle}`}>{news.title}</h4>
                </div>
                <div className={`d-flex justify-content-between ${styles.underText}`}>
                  <p>{news.date}</p>
                  <a href={news.link} className="btn btn-link text-decoration-none">More →</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 查看更多按鈕 */}
      <div className={`text-center my-5 ${styles.btnMore}`}>
        <button>查看更多</button>
      </div>
    </div>
  )
}
