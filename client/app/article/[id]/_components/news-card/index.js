'use client'

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import ContentLoader from 'react-content-loader'

const NewsCardLoader = () => {
  const numberOfLoaders = 2

  return (
    <>
      {Array.from({ length: numberOfLoaders }).map((_, index) => (
        <div key={index} style={{ marginBottom: '20px', width: '375px' }}>
          <ContentLoader
            speed={2}
            width={375}
            height={160}
            viewBox="0 0 375 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="75" height="75" />
            <rect x="90" y="0" rx="5" ry="5" width="225" height="20" />
            <rect x="90" y="30" rx="5" ry="5" width="225" height="50" />
            <rect x="0" y="90" rx="5" ry="5" width="75" height="75" />
            <rect x="90" y="90" rx="5" ry="5" width="225" height="20" />
            <rect x="90" y="120" rx="5" ry="5" width="225" height="50" />
          </ContentLoader>
        </div>
      ))}
    </>
  )
}

export default function NewsCard({ articles }) {
  if (!articles || articles.length === 0) {
    return <p>No related articles found.</p>
  }

  return (
    <>
      <ul className={`list-unstyled ${styles['y-news-list']}`}>
        {articles.map((article, index) => (
          <li className={styles['y-news-item']} key={index}>
            <div className={styles['y-news-image-container']}>
              <img
                src={article.image_path}
                className={styles['y-news-image']}
                alt={article.title}
              />
            </div>
            <div>
              <p className={styles['y-news-tag']}>{article.category_name}</p>
              <a
                href={`/article/${article.id}`}
                className={styles['y-news-title']}
              >
                {article.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
