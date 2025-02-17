'use client'

import React, { useState, useEffect } from 'react'
import NewsCard from '../news-card'
import AdCard from '../ad-card'
import style from './index.module.scss'
import { useParams } from 'next/navigation';

export default function Aside({ categoryId, title, content }) {
  const [relatedArticles, setRelatedArticles] = useState([])
  const params = useParams();
  const articleId = params.id;

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const url = 'http://localhost:8000/api/articles/related'
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryId: categoryId,
            title: title,
            content: content,
            articleId: articleId, // 傳遞文章 ID
          }),
        })
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`)
        }
        const data = await response.json()
        setRelatedArticles(data.data)
      } catch (error) {
        console.error('Error fetching related articles:', error)
      }
    }

    fetchRelatedArticles()
  }, [categoryId, title, content, articleId])

  return (
    <>
      <aside>
        <div className="px-4 rounded">
          <div className="mb-4 title">
            <div className={style['y-title-line']} />
            <h3 className="mb-3" style={{ fontSize: 18, fontWeight: 500 }}>
              延伸閱讀
            </h3>
            <div className={style['y-title-line']} />
          </div>
          <NewsCard articles={relatedArticles} />
        </div>
        <div className="mb-4 title">
          <div className={style['y-title-line']} />
          <h3 className="mb-3" style={{ fontSize: 18, fontWeight: 500 }}>
            本文推薦
          </h3>
          <div className={style['y-title-line']} />
        </div>
        <AdCard />
      </aside>
    </>
  )
}