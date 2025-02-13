'use client'
import Link from 'next/link'
import styles from './register.module.scss'
import React from 'react'



export default function UserPage(props) {
  return (
    <div className={`container ${styles.container1}`}>
      <div className={styles.formBox}>
        <h2 className="text-center ">建立帳戶</h2>
        <p className="text-center">
          映相坊邀請您進入非凡世界，提供豐富的作品、文章資訊和服務。
        </p>

        <form>
          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="gender">
              稱謂 *
            </label>
            <select
              id="gender"
              className={`form-control ${styles.formControl}`}
              defaultValue=""
            >
              <option value="" disabled>
                請選擇
              </option>
              <option value="先生">先生</option>
              <option value="女士">女士</option>
            </select>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className={styles.formLabel} htmlFor="lastName">
                姓氏 *
              </label>
              <input
                type="text"
                className={`form-control ${styles.formControl}`}
                id="lastName"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className={styles.formLabel} htmlFor="firstName">
                名字 *
              </label>
              <input
                type="text"
                className={`form-control ${styles.formControl}`}
                id="firstName"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="password">
              密碼 *
            </label>
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              id="password"
            />
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="confirmPassword">
              確認您的密碼 *
            </label>
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              id="confirmPassword"
            />
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="email">
              電子郵件 *
            </label>
            <input
              type="email"
              className={`form-control ${styles.formControl}`}
              id="email"
              placeholder="example@gmail.com"
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreePrivacy"
            />
            <label className={styles.formLabel} htmlFor="agreePrivacy">
              我已閱讀並同意隱私條款。
            </label>
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="subscribe"
            />
            <label className={styles.formLabel} htmlFor="subscribe">
              我同意接收有關浪琴表的電子郵件。
            </label>
          </div>

          <Link href="/login"><button type="submit" className={styles.btnCustom}>
            建立帳戶
          </button></Link>
        </form>

        <div className="text-center mt-3">
        <Link href="/login">我已擁有帳戶</Link>
        </div>
      </div>
    </div>
  )
}
