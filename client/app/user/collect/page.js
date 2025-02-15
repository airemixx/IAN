'use client';
import Link from 'next/link';
import styles from './collect.module.scss'; // 引入 CSS Modules
import React from 'react';
import Sidenav from '../_components/Sidenav/page';

export default function UserPage() {
  return (
    <div className="container py-4">
      <div className={`row ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />

        {/* Main Content */}
        <div className="col-lg-9">
          <h1 className="mb-4">我的收藏</h1>

          {/* 相機 Section */}
          <section className="mb-5">
            <h5 className="mb-3">相機</h5>
            <div className="row g-4">
              {/* Card 1 */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className={`p-4 ${styles.collectionCard}`} >
                  <div className={`mb-3 ${styles.iconFav}`}>
                  <img src="/images/icon/favorite-btn.svg" alt="相機"  />
                  </div>
                  <img src="/images/product/zf.png" alt="相機" className="mb-3" />
                  <div className={styles.cardDivider} />
                  <h6 className={styles.textGray}>FUJIFILM 富士</h6>
                  <h5 className="mb-3">X-T5 16-50mm</h5>
                  <h6 className={styles.textGray}>
                    恆定 F2 最大光圈 涵蓋多種拍攝需求的 28-70mm 焦段 媲美定焦鏡的解像能力及散景表現 4 顆 XD
                    線性馬達帶來快速、安靜的自動對焦 918g 輕量化設計，並具備理想平衡讓拍攝更舒適
                  </h6>
                </div>
              </div>

              {/* Add Collection Card */}
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
                  <h6 className={styles.textGray}>
                    恆定 F2 最大光圈 涵蓋多種拍攝需求的 28-70mm 焦段 媲美定焦鏡的解像能力及散景表現 4 顆 XD
                    線性馬達帶來快速、安靜的自動對焦 918g 輕量化設計，並具備理想平衡讓拍攝更舒適
                  </h6>
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

          {/* 課程 Section */}
          <section className="mb-5">
            <h5 className="mb-3">課程</h5>
            <div className="row g-4">
              <div className="col-12 col-md-6 col-lg-4">
                <div className={`p-4 ${styles.collectionCard}`}>
                  <img src="/images/course-cover/course_20_1.avif" alt="課程" className="mb-3" />
                  <div className={styles.cardDivider} />
                  <h6 className={styles.textGray}>課程</h6>
                  <h5>旅行攝影：按下快門，用攝影書寫故事</h5>
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
