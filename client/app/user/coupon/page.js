'use client';
import Link from 'next/link';
import styles from './coupon.module.scss'; // 引入 CSS Modules
import React from 'react';
import Sidenav from '../_components/Sidenav/page';

export default function UserPage() {
  return (
    <div className="container py-4">
      <div className={`row ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />


      {/* 主要內容區 */}
      <div className="col-lg-9">
        <h1 className="mb-4">我的優惠券</h1>

        {/* 相機優惠券 */}
        <h5 className="mt-4">相機</h5>
        <div className="row justify-content-start">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="col-md-6 col-lg-5">
              <div className={styles.couponCard}>
                <h4 className={styles.couponDate}>使用期限：2025-01-23</h4>
              </div>
            </div>
          ))}
        </div>

        {/* 課程優惠券 */}
        <h5 className="mt-4">課程</h5>
        <div className="row justify-content-start">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="col-md-6 col-lg-5">
              <div className={styles.couponCard}>
                <h4 className={styles.couponDate}>使用期限：2025-01-23</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)
}