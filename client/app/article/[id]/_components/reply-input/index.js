
'use client'

import React from 'react'
import styles from './index.module.scss'

export default function ReplyInput() {
  return (
    <>
      <div className={`p-3 bg-white border border-secondary ${styles['y-comment-area']}`}>
        <input type="text" id="comment" className="p-2 py-3" placeholder="留言" />
        <div className={`mt-2 d-flex justify-content-end ${styles['y-comment-area-icons']}`}>
          <div className="d-flex">
            <button className="p-1">
              <img src="/images/article/image-03.svg" alt="圖片" />
            </button>
            <button className="p-1">
              <img src="/images/article/send-01.svg" alt="發送" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}