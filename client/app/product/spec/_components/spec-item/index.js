'use client';

import React from 'react';
import styles from "./spec-item.module.scss"; // ✅ 確保 SCSS Module 正確引入

export default function ComponentsCompareItem() {
  return (
    <>
      <>
        {/* 🔹 加入標題與返回按鈕 */}
        <div className={`container ${styles.compareHeader}`}>
          <div className="row align-items-center">
            {/* 🔹 左側返回按鈕 (col-3) */}
            <div className="col-3 d-flex">
              <button className={`btn btn-outline-secondary ${styles.backButton}`} onClick={() => window.history.back()}>
                ← 回列表頁
              </button>
            </div>

            {/* 🔹 右側標題 (col-9) */}
            <div className="col-9 text-center">
              <h1 className={styles.compareTitle}>比較相機機型</h1>
            </div>
          </div>
        </div>
        <div className={styles.productContainer}>
          {/* 商品 1 */}
          <div className={styles.productBox}>
            <img src="/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png" alt="商品 1" />
            <h5>EOS R5 Mark II</h5>
            <p>NT$240,000</p>
            <button className={`btn btn-primary btn-sm ${styles.buy}`}>購買</button>
            <button className={`btn btn-link btn-sm ${styles.remove}`}>移除</button>
          </div>
          {/* 商品 2 */}
          <div className={styles.productBox}>
            <img src="/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png" alt="商品 2" />
            <h5>EOS R5 Mark II</h5>
            <p>NT$122,000</p>
            <button className={`btn btn-primary btn-sm ${styles.buy}`}>購買</button>
            <button className={`btn btn-link btn-sm ${styles.remove}`}>移除</button>
          </div>
          {/* 商品 3 */}
          {/* <div className={styles.productBox}>
            <img src="/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png" alt="商品 3" />
            <h5>EOS R5 Mark II</h5>
            <p>NT$122,000</p>
            <button className={`btn btn-primary btn-sm ${styles.buy}`}>購買</button>
            <button className={`btn btn-link btn-sm ${styles.remove}`}>移除</button>
          </div> */}
          {/* 添加商品 */}
          <div className={`${styles.productBox} ${styles.emptyBox}`}>
            + 添加商品
          </div>
        </div>
      </>
    </>
  );
}
