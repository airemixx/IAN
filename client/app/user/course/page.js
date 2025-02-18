'use client'
import Link from 'next/link'
import styles from './course.module.scss'
import React from 'react'
import useAuth from '@/hooks/use-auth'
import Sidenav from '../_components/Sidenav/page'

export default function UserPage(props) {
    const { token, user, loading } = useAuth();
  
    if (loading) {
      return <div className="text-center mt-5">載入中...</div>;
    }

  return (
    <div className="container py-4">
      <div className={`row ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />

        {/* 主要內容區 */}
        <div className="col-md-8 col-lg-9 py-4">
          <h1 className="mb-4">我的課程</h1>
          <div className="row g-4">
            {/* 課程卡片 1 */}
            <div className="col-sm-6 col-lg-4">
              <div className={styles.courseCard}>
                <img
                  src="/images/course-cover/course_12_1.avif"
                  className={styles.courseImage}
                  alt="課程圖片"
                />
                <div className="p-3">
                  <small className="text-muted">課程</small>
                  <h5 className="mt-2">旅行攝影：按下快門，用攝影書寫故事</h5>
                </div>
              </div>
            </div>

            {/* 課程卡片 2 */}
            <div className="col-sm-6 col-lg-4">
              <div className={styles.courseCard}>
                <img
                  src="/images/course-cover/course_20_1.avif"
                  className={styles.courseImage}
                  alt="課程圖片"
                />
                <div className="p-3">
                  <small className="text-muted">課程</small>
                  <h5 className="mt-2">閱讀攝影的眼神 - 啟動你的影像理解力</h5>
                </div>
              </div>
            </div>

            {/* 新增課程卡片 */}
            <div className="col-sm-6 col-lg-4">
              <div className={styles.addCourseCard}>
                <div className="text-center">
                  <div className={`${styles.addButton} mx-auto mb-3`}></div>
                  <h5>尋找課程</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
