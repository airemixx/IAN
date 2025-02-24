'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

export default function StickyCard() {
  const router = useRouter();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // 從 API 取得 user_id=48 的文章資料
        const response = await fetch('/api/articles?user_id=48');
        const json = await response.json();
        const articles = json.data || json;
        if (articles && articles.length > 0) {
          const stickyArticle = articles[0];
          setArticle(stickyArticle);
          // 儲存 sticky 文章的 id，後續 MasonryLayouts 會以此過濾
          localStorage.setItem('stickyArticleId', String(stickyArticle.id)); // 確保儲存的是字串
        } else {
          localStorage.removeItem('stickyArticleId'); // 清除，避免影響其他元件
          setArticle(null);
        }
      } catch (error) {
        console.error('Error fetching sticky article:', error);
      }
    };

    fetchArticle();
  }, []);

  const handleClick = () => {
    if (article) {
      router.push(`/article/${article.id}`);
    }
  };

  if (!article) return null;

  return (
    <div
      className={styles["card-custom"]}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={article.image_path}
        alt="Background"
        className={styles["card-background"]}
      />
      <div className={`${styles["card-overlay"]} absolute inset-0`}></div>
      <div className={`${styles["card-content"]} absolute`}>
        <div className={styles["card-category"]}>
          <a href="">{article.category_name}</a>
        </div>
        <h4 className={`${styles["card-title"]} mb-2`}>
          <a href="">{article.title}</a>
        </h4>
        <div className={`${styles["card-author"]} mb-1 text-sm`}>
          {article.nickname ? article.nickname : article.author_name}
        </div>
        <div className={`${styles["card-date"]} text-sm`}>
          {new Date(article.created_at).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
}
