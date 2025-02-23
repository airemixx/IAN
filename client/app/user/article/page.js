'use client'
import React, { useState } from 'react'
import styles from './article.module.scss'
import useAuth from '@/hooks/use-auth'
import Sidenav from '../_components/Sidenav/page'
import Link from 'next/link'

export default function UserPage() {
  const { token, user, loading } = useAuth()

  if (loading) {
    return <div className="text-center mt-5">載入中...</div>
  }

  return (
    <div className={`container py-4 ${styles.container}`}>
      <div className={`row ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />

        {/* 主要內容區 */}
        <div className="col-md-9">
          <h1 className="mb-4">我的文章</h1>

          <div className="d-flex flex-column gap-4">
            {/* 文章卡片 */}
            <div className={styles.articleCard}>
              <div className="row g-0">
                <div className="col-md-7 p-4">
                  <h4>請問2025大家心目中的最佳街拍相機組合為何?</h4>
                  <p className="text-muted mt-3">
                    哈哈哈, 2024已經快過去了, 想要請教大家此時此刻,
                    心目中最佳的2025街拍神器為何?...
                  </p>
                  {/* <div className="d-flex align-items-center mt-3">
                    <img
                      src="/images/article/gallery (2).jpg"
                      alt="用戶頭像"
                      className={styles.userAvatar}
                    />
                    <h5 className="mb-0">sweet57239</h5>
                  </div> */}
                  <div className={`${styles['btn-date']}`}>
                    <button className={styles['more-btn']}>
                      <img src="/images/article/more-origin.svg" alt="" />
                    </button>
                    <p className=''><strong>發布時間 :</strong> 2025年2月23日 15:30</p>
                  </div>
                </div>
                <div className="col-md-5 p-4">
                  <img
                    src="/images/article/gallery (2).jpg"
                    alt="文章圖片"
                    className={styles.articleImage}
                  />
                </div>
              </div>
            </div>

            {/* 新增文章卡片，以 Link 包裹 */}
            <Link href="/user/article/add-article">
              <div className={styles.addArticleCard} style={{ cursor: 'pointer' }}>
                <div className="text-center">
                  <div className={`${styles.addButton} mx-auto mb-3`}></div>
                  <h5 className={styles['no-underline']}>新增文章</h5>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}