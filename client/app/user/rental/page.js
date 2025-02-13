'use client'
import Link from 'next/link'
import styles from './rental.module.scss'
import React from 'react'
import Sidenav from '../_components/Sidenav/page'

export default function UserPage(props) {
   
  return (
    <main className={`container ${styles.flex}`}>
    {/* 側邊選單 */}
    <ul className={styles.sidenav}>
      <a href="#">會員資料修改</a>
      <a href="#">我的訂單</a>
      <a href="#">我的文章</a>
      <a href="#">我的租借</a>
      <a href="#">我的課程</a>
      <a href="#">我的收藏</a>
      <a href="#">優惠券</a>
      <a href="#">登出</a>
    </ul>

    <div className={styles.line}></div>

    {/* 主要內容 */}
    <div className={styles.maincontainer}>
      <div>
        <h1>我的租賃</h1>
      </div>

      <div>
        <div>
          <h5>相機</h5>
        </div>
        <div className={styles.cardBox}>
          {/* 相機租賃卡片 */}
          <div className={styles.box}>
            <div>
              <div>
                <img src="./image/upload/1.jpg" alt="相機" />
              </div>

              <div className={styles.box1_2}>
                <h6 className={styles.margin}>FUJIFILM 富士</h6>
                <h5 className={styles.margin}>X-T5 16-50mm</h5>
              </div>
            </div>

            <div>
              <h6>租賃日期: 2024-01-01</h6>
              <h6 className={styles.maturity}>到期日: 2024-01-14</h6>
            </div>
            <div>
              <h6 className={styles.rental}>可供出租</h6>
            </div>
          </div>

          <div className={styles.box}>
            <div>
              <div>
                <img src="./image/upload/1.jpg" alt="相機" />
              </div>

              <div className={styles.box1_2}>
                <h6 className={styles.margin}>FUJIFILM 富士</h6>
                <h5 className={styles.margin}>X-T5 16-50mm</h5>
              </div>
            </div>

            <div>
              <h6>租賃日期: 2024-01-01</h6>
              <h6 className={styles.maturity}>到期日: 2024-01-14</h6>
            </div>
            <div>
              <h6 className={styles.rental}>可供出租</h6>
            </div>
          </div>

          {/* 新增租賃卡片 */}
          <div className={styles.boxAdd}>
            <div className={styles.box1}>
              <div className={styles.boxLine1}></div>
              <div className={styles.boxLine2}></div>
              <h5 className={styles.boxH5}>尋找租賃相機</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
);
}
