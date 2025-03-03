'use client';

import Link from 'next/link';
import styles from './rental.module.scss'; // 引入 CSS Modules
import React from 'react';
import useAuth from '@/hooks/use-auth';
import Sidenav from '../_components/Sidenav/page';

export default function UserPage() {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">載入中...</div>;
  }
  return (
    <div className="container py-4">
      <div className={`row ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />

        {/* Main Content */}
        <div className="col-lg-9">
          <h1 className="mb-4">我的租賃</h1>

          {/* 租賃 Section */}
          <section className="mb-5">
            <h5 className="mb-3">租賃</h5>
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div className={`p-4 ${styles.collectionCard}`}>
                  <img src="/images/product/zf.png" alt="租賃" className="mb-3" />
                  <div className={styles.cardDivider} />
                  <h6 className={styles.textGray}>FUJIFILM 富士</h6>
                  <h5 className="mb-3">X-T5 16-50mm</h5>
                  <div>
                    <h6>租賃日期: 2024-01-01</h6>
                    <h6 className={styles.maturity}>到期日: 2024-01-14</h6>
                  </div>
                  <div>
                    <h6 className={styles.rental}>可供出租</h6>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className={`${styles.addCollection} ${styles.collectionCard}`}>
                  <div className="text-center">
                    <div className={`${styles.addCircle} mx-auto mb-2`} />
                    <h5>添加收藏</h5>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}
