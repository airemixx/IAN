'use client'
import Link from 'next/link'
import styles from './order.module.scss'
import React from 'react'
import Sidenav from '../_components/Sidenav/page'

export default function UserPage(props) {
   
  return (
    <div className={`container py-4 ${styles.body}`}>
    <div className={`row ${styles.marginTop}`}>
      {/* 側邊選單 */}
      <div className="col-md-3 mb-4">
        <nav className={styles.sidenav}>
          <div className="d-flex flex-column">
            <a href="#">會員資料修改</a>
            <a href="#">我的訂單</a>
            <a href="#">我的文章</a>
            <a href="#">我的租借</a>
            <a href="#">我的課程</a>
            <a href="#">我的收藏</a>
            <a href="#">優惠券</a>
            <a href="#">登出</a>
          </div>
        </nav>
      </div>
      {/* 主要內容區 */}
      <div className="col-md-8">
        <h1 className="mb-4">我的訂單(2)</h1>
        {/* 訂單卡片 1 */}
        <div className={styles.orderCard}>
          <div className="d-flex justify-content-between mb-3">
            <h5>訂單號碼:1234-5678</h5>
            <h6 className={styles.orderStatus}>已完成</h6>
          </div>
          {/* 商品 1 */}
          <div className={styles.productBorder}>
            <div className={`d-flex ${styles.productDetails} gap-4`}>
              <img src="/images/product/α1.jpg" alt="相機" className={styles.productImage} />
              <div className="flex-grow-1">
                <span className={styles.productLabel}>相機</span>
                <h6 className={styles.productBrand}>FUJIFILM 富士</h6>
                <h5>X-T5 16-50mm</h5>
              </div>
              <div className={`${styles.priceGrid} me-5`}>
                <div className="row text-center">
                  <div className="col-4">單價</div>
                  <div className="col-4">數量</div>
                  <div className="col-4">小記</div>
                </div>
                <div className="row text-center">
                  <div className="col-4">NT$123456</div>
                  <div className="col-4">1</div>
                  <div className="col-4">NT$123456</div>
                </div>
              </div>
            </div>
          </div>
          {/* 商品 2 */}
          <div className={styles.productBorder}>
            <div className={`d-flex ${styles.productDetails} gap-4`}>
              <img src="/images/product/α1.jpg" alt="相機" className={styles.productImage} />
              <div className="flex-grow-1">
                <span className={styles.productLabel}>課程</span>
                <h6 className={styles.productBrand}>食癮，合影</h6>
                <h5>旅行攝影：按下快門，用攝影書寫故事</h5>
              </div>
              <div className={`${styles.priceGrid} me-5`}>
                <div className="row text-center">
                  <div className="col-4">單價</div>
                  <div className="col-4">數量</div>
                  <div className="col-4">小記</div>
                </div>
                <div className="row text-center">
                  <div className="col-4">NT$123456</div>
                  <div className="col-4">1</div>
                  <div className="col-4">NT$123456</div>
                </div>
              </div>
            </div>
          </div>
          <h4 className={styles.orderTotal}>訂單金額: NT$123456</h4>
        </div>
        {/* 訂單卡片 2 */}
        <div className={styles.orderCard}>
          <div className="d-flex justify-content-between mb-3">
            <h5>訂單號碼:1234-5678</h5>
            <h6 className={styles.orderStatus}>待收貨</h6>
          </div>
          {/* 重複的商品項目結構 */}
          <div className={styles.productBorder}>
            <div className={`d-flex ${styles.productDetails} gap-4`}>
              <img src="/images/product/α1.jpg" alt="相機" className={styles.productImage} />
              <div className="flex-grow-1">
                <span className={styles.productLabel}>相機</span>
                <h6 className={styles.productBrand}>FUJIFILM 富士</h6>
                <h5>X-T5 16-50mm</h5>
              </div>
              <div className={`${styles.priceGrid} me-5`}>
                <div className="row text-center">
                  <div className="col-4">單價</div>
                  <div className="col-4">數量</div>
                  <div className="col-4">小記</div>
                </div>
                <div className="row text-center">
                  <div className="col-4">NT$123456</div>
                  <div className="col-4">1</div>
                  <div className="col-4">NT$123456</div>
                </div>
              </div>
            </div>
          </div>
          <h4 className={styles.orderTotal}>訂單金額: NT$123456</h4>
        </div>
      </div>
    </div>
  </div>

  )
}
