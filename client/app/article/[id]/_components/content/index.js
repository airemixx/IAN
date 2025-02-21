'use client';

import { useEffect, useRef } from 'react';
import styles from './index.module.scss';

export default function Content({ content, fontSize }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      // 先更新 innerHTML
      contentRef.current.innerHTML = content;
      // 從內容中取得所有圖片
      const images = contentRef.current.getElementsByTagName('img');

      // 建立 IntersectionObserver，當圖片進入視窗一半時觸發動畫
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              // 若尚未加上動畫類別，則加上動畫
              if (!img.classList.contains(styles['article-image-fade'])) {
                img.classList.add(styles['article-image-fade']);
                if (img.complete) {
                  setTimeout(() => {
                    img.classList.add(styles['loaded']);
                  }, 1500); // 延遲800ms再加上 loaded class
                } else {
                  const handleLoad = () => {
                    setTimeout(() => {
                      img.classList.add(styles['loaded']);
                    }, 1500); // 延遲800ms再加上 loaded class
                    img.removeEventListener('load', handleLoad);
                  };
                  img.addEventListener('load', handleLoad);
                }
              }
              // 觸發動畫後停止監控該圖片
              observer.unobserve(img);
            }
          });
        },
        {
          threshold: 0.5, // 圖片有50%進入視窗時觸發
          rootMargin: '50px'
        }
      );

      Array.from(images).forEach((img) => {
        observer.observe(img);
      });

      return () => {
        observer.disconnect();
      };
    }
  }, [content]);

  return (
    <div ref={contentRef} className={styles.content} style={{ fontSize }} />
  );
}