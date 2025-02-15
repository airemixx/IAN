'use client';  

import React from 'react';  
import styles from './index.module.scss';  

const ListCard = ({ article, onTagClick }) => {
  return (
    <div className={`${styles['y-list-card-area']}`}>
      <div className={`card ${styles['y-card']}`}>
        <img
          src={article.image_path || "/images/article/social.jpg"}
          className={`card-img-top ${styles['y-card-img-top-css']}`}
          alt={article.title}
        />
        <div className={`px-0 card-body ${styles['y-card-body-css']}`}>
          <div
            className={`mb-3 ${styles['y-article-list-tag']} d-flex justify-content-between`}
          >
            <p className="mb-0">{article.category_name || "未分類"}</p>
          </div>
          <div className={`mb-5 ${styles['y-list-card-content']}`}>
            <a href="#" className="text-decoration-none">
              <h4 className="card-title">{article.title}</h4>
              <p className={styles['card-sub-title']}>{article.subtitle}</p>
            </a>
          </div>
          <div className={`${styles['y-tag-area']} mb-3`}>
            {article.tags &&
              article.tags.split(',').map((tag, idx) => (
                <button key={idx} onClick={() => onTagClick(tag.trim())}>
                  {tag.trim()}
                </button>
              ))
            }
          </div>
          <div className={styles['y-author-date']}>
            <p className="mb-0">
              <img
                className={`mb-2 ${styles['y-user-list-profile']} rounded-pill me-2`}
                src={article.authorImageUrl || "/images/article/user (1).jpg"}
                alt={article.author}
              />
              {article.user_id || "編輯部"}
            </p>
            <p>{new Date(article.created_at).toLocaleDateString('zh-tw',{
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) || "未知日期"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;