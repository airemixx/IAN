'use client'

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import Link from 'next/link'

export default function TagLikeShareBtnIndex({ articleId }) {
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(`/api/articles/${articleId}/tags`)
        if (!response.ok) {
          console.log('response', response)
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setTags(data)
      } catch (error) {
        console.error('Could not fetch tags:', error)
      }
    }

    fetchTags()
  }, [articleId])

  return (
    <div
      className={`d-flex justify-content-between align-items-center ${styles['y-tag-like-comment-share-fav-area']}`}
    >
      <div className={`${styles['y-tag-area']}`}>
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/article?tag=${tag.tag_name}`}
            className="text-decoration-none"
          >
            <button className="py-sm-1 px-sm-3 ms-sm-1 fw-medium rounded-pill">
              {tag.tag_name}
            </button>
          </Link>
        ))}
      </div>
      <div className={`${styles['y-like-comment-share-fav']} d-flex`}>
        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
          <img
            src="/images/article/heart.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            alt="Heart"
          />
          <span className={`${styles['y-count-num-pc']}`}>1234</span>
          <img
            src="/images/article/heart.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            alt="Heart"
          />
          <span className={`${styles['y-count-num']}`}>1234</span>
        </button>

        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
          <img
            src="/images/article/message-text-01.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            alt="Message"
          />
          <span className={`${styles['y-count-num-pc']}`}>34</span>
          <img
            src="/images/article/message-text-01.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            alt="Message"
          />
          <span className={`${styles['y-count-num']}`}>34</span>
        </button>

        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
          <img
            src="/images/article/share.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            alt="Share"
          />
          <img
            src="/images/article/share.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            alt="Share"
          />
        </button>

        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
          <img
            src="/images/article/favourite.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-pc']}`}
            alt="Favorite"
          />
          <img
            src="/images/article/favourite.svg"
            className={`me-1 ${styles['y-like-comment-share-fav-mb']}`}
            alt="Favorite"
          />
        </button>
      </div>
    </div>
  )
}
