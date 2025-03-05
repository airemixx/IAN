'use client'
import Link from 'next/link'
import styles from './order.module.scss'
import React from 'react'
import useAuth from '@/hooks/use-auth'
import Sidenav from '../_components/Sidenav/page'

export default function UserPage(props) {
     const { token, user, loading } = useAuth();
    
     if (loading) {
       return <div className="text-center mt-5">載入中...</div>;
     }

  return (
    <div className={`container py-4 ${styles.body}`}>
    <div className={`row ${styles.marginTop}`}>
      {/* 側邊選單 */}
      <Sidenav />
      {/* 主要內容區 */}
      <div className="col-md-8">
        <h1 className={`mb-4 ${styles.h1}`}>我的訂單(2)</h1>
        {/* 訂單卡片 1 */}
        <div className={styles.orderCard}>
          <div className="d-flex justify-content-between mb-3">
            <h5>訂單號碼:1234-5678</h5>
            <h6 className={styles.orderStatus}>已完成</h6>
          </div>
          {/* 商品 1 */}
          <div className={styles.productBorder}>
            <div className={`d-flex ${styles.productDetails} gap-4`}>
              <img src="/images/product/zf.png" alt="相機" className={styles.productImage} />
              <div className="flex-grow-1">
                <span className={styles.productLabel}>相機</span>
                <h6 className={`mt-3 ${styles.productBrand}`}>FUJIFILM 富士</h6>
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
              <img src="/images/product/zf.png" alt="相機" className={styles.productImage} />
              <div className="flex-grow-1">
                <span className={styles.productLabel}>課程</span>
                <h6 className={`mt-3 ${styles.productBrand}`}>食癮，合影</h6>
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
          <h5 className={styles.orderTotal}>訂單金額: NT$123456</h5>
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
              <img src="/images/product/zf.png" alt="相機" className={styles.productImage} />
              <div className="flex-grow-1">
                <span className={styles.productLabel}>相機</span>
                <h6 className={`mt-3 ${styles.productBrand}`}>FUJIFILM 富士</h6>
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
          <h5 className={styles.orderTotal}>訂單金額: NT$123456</h5>
        </div>
      </div>
    </div>
  </div>

  )
}
