'use client'

import React from 'react'
import styles from './ArticleCard.module.scss'
import Link from 'next/link'
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
            img: "https://images.api.hahow.in/images/62f608443ed5430006718b31",
            category: "攝影技巧",
            title: "攝影入門必學：3 種常見的「焦段」與「視角」的變化者",
            date: "2024.11.16",
            link: "article/2",
          },
          {
            img: "https://sw.cool3c.com/user/29442/2023/819804b5-5277-45e7-8e9e-5e056aee7c29.jpg?auto=compress&fix=max&w=2560",
            category: "產品情報",
            title: "徠卡推出第四代單色感光元件相機 Leica M11 Monochrom",
            date: "2025.02.21",
            link: "article/12",
          },
          {
            img: "https://5mtz55f1.tinifycdn.com/storage/app/uploads/public/67a/456/38c/67a45638ce238730388063.jpg",
            category: "攝影活動",
            title: "年度最大攝影盛會！2025 SKM PHOTO攝影藝術博覽會，50組國內外名家探索影像之美",
            date: "2024.12.16",
            link: "article/5",
          },
          {
            img: "https://images.hahow.in/images/636b2423e701e8c3e7013ffa",
            category: "訊息公告",
            title: "13 種拍照技巧輕鬆學，找出完美拍照角度，照片超好 PO！",
            date: "2025.01.16",
            link: "article/7",
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
        <Link href="/article"><button>查看更多</button></Link>
      </div>
    </div>
  )
}
