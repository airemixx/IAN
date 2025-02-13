'use client'
import Link from 'next/link'
import styles from './login.module.scss'
import React from 'react'

export default function UserPage(props) {
   
  return (
    <main className="container">
    <section >
      <div className="container ">
        <div className="mb-5 text-center">
          <h3 className={styles.parent}>客戶登入</h3>
          <h6 className={styles.parent}>登入您的映相坊帳戶，享受所有個人化功能。</h6>
        </div>
        <div className={`row justify-content-center ${styles.marginTop}`}>
          {/* 左側 - 建立帳戶 */}
          <div className={`col-lg-6 ${styles.box} ${styles.column} me-4`}>
            <div className={styles.box1}>
              <h6>我沒有帳戶</h6>
              <h6>建立帳戶，享受個人化的購物體驗。</h6>
            </div>
            <div className={`${styles.start} mb-3`}>
              <div className={styles.box1}>
                <ul>
                  <li>收藏我的最愛</li>
                  <li>查詢租賃時間</li>
                  <li>追查訂單進度</li>
                </ul>
              </div>
              <div className={styles.box1}>
              <Link href="/login/register">
                <button className={`${styles.buttonBox} ${styles.marginTop33}`}>
                建立帳戶
                </button>
                </Link>
              </div>
            </div>
          </div>

          {/* 右側 - 登入帳戶 */}
          <div className={`col-lg-6 ${styles.box} ${styles.column} me-4`}>
            <div className={styles.box1}>
              <h6>我已擁有帳戶</h6>
            </div>
            <div>
              <div className={`${styles.box1} mb-2`}>
                <label className={styles.label}>電子郵件</label>
                <input className={`form-control ${styles.inputField}`} type="email" placeholder="電子郵件" />
              </div>
              <div className={`${styles.box1} mb-2`}>
                <label  className={styles.label}>密碼</label>
                <input className={`form-control ${styles.inputField}`} type="password" placeholder="密碼" />
              </div>
              <div className={`${styles.box1} mb-2`}>
                <Link href="/user"><button className={`${styles.buttonBox} ${styles.start}`}>登入</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
);
};