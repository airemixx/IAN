'use client';  

import React, { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './index.module.scss';
import useArticles from '../../../../../hooks/use-article'

const NewsCardLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="5" ry="5" width="75" height="75" />
    <rect x="90" y="0" rx="5" ry="5" width="300" height="20" />
    <rect x="90" y="30" rx="5" ry="5" width="250" height="20" />
    <rect x="0" y="90" rx="5" ry="5" width="75" height="75" />
    <rect x="90" y="90" rx="5" ry="5" width="300" height="20" />
    <rect x="90" y="120" rx="5" ry="5" width="250" height="20" />
  </ContentLoader>
);

export default function NewsCard() {
  const filter = useMemo(() => ({}), []);
  const { articles, loading, error } = useArticles(filter);


  if (loading) return <NewsCardLoader />;
  if (error) return <p>Error!</p>;

  return (
    <>
      <ul className={`list-unstyled ${styles['y-news-list']}`}>
        {articles.slice(0, 4).map((article, index) => (
          <li className={styles['y-news-item']} key={index}>
            <img
              src={article.image_path}
              className={`${styles['y-news-image']} me-2`}
              alt={article.title}
            />
            <div>
              <p className={styles['y-news-tag']}>{article.category_name}</p>
              <a href={`/article/${article.id}`} className={styles['y-news-title']}>
                {article.title}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}