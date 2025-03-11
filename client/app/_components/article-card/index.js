"use client"

import React from "react";
import styles from "./ArticleCard.module.scss";

const ArticleCard = ({ category, title, date, backgroundImage }) => (
  <div className={styles.smallImgContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className={`${styles.cardContent} ${styles.articleSmallCardContent}`}>
      <p>{category}</p>
      <h6>{title}</h6>
      <p>{date}</p>
    </div>
  </div>
);

const BigArticleCard = ({ category, title, date, backgroundImage }) => (
  <div className={styles.homeArticleBigCard} style={{ backgroundImage: `url(${backgroundImage})` }}>
    <div className={`${styles.cardContent} ${styles.articleBigCardContent}`}>
      <p>{category}</p>
      <h6>{title}</h6>
      <p>{date}</p>
    </div>
  </div>
);

const ArticleHomeContainer = () => {
  return (
    <div className={styles.homeArticleContainer}>
      <div className={styles.homeArticleTitle}>
        <h2>最新消息 News</h2>
      </div>
      <div className={styles.homeArticle}>
        <div className={styles.homepageArticleArea}>
          <BigArticleCard
            category="分類標籤"
            title="這裡是大標題文字內容"
            date="2025-03-11 | 作者名稱"
            backgroundImage="/images/HomePage-images/SC1.jpg"
          />
          <div className={styles.homeArticleSmallCard}>
            <ArticleCard
              category="分類標籤"
              title="小標題文字"
              date="2025-03-11"
              backgroundImage="/images/HomePage-images/SC1.jpg"
            />
            <ArticleCard
              category="分類標籤"
              title="小標題文字"
              date="2025-03-11"
              backgroundImage="/images/HomePage-images/SC1.jpg"
            />
            <ArticleCard
              category="分類標籤"
              title="小標題文字"
              date="2025-03-11"
              backgroundImage="/images/HomePage-images/SC1.jpg"
            />
            <ArticleCard
              category="分類標籤"
              title="小標題文字"
              date="2025-03-11"
              backgroundImage="/images/HomePage-images/SC1.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHomeContainer;