'use client'
import Link from 'next/link'
import styles from './user.module.scss'
import React from "react";
import useAuth from "@/hooks/use-auth";
import Sidenav from './_components/Sidenav/page'

export default function UserPage(props) {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-5">載入中...</div>;
  }

  return (
    <div>
      <div className={`container py-4`}>
        <div className={`row ${styles.marginTop}`}>
          <Sidenav />

          {/* 主要內容區 */}
          <div className="col-md-9">
            <div className="mb-4">
              <h1>會員資料修改</h1>
              <p className="text-muted">
                在此部分中，您可以尋找和編輯您的個人檔案和地址。您還可以管理您的相機電子報訂閱和更改密碼。
              </p>
            </div>

            {/* 橫幅區域 */}
            <div
              className={`${styles.heroSection} mb-4 p-4 d-flex flex-column justify-content-center`}
            >
              <h6 className="text-black ms-3">獲取相機最新文章</h6>
              <button className={styles.customBtn}>立即前往</button>
            </div>

            {/* 表單區域 */}
            <div className="row">
              {/* 個人資料表單 */}
              <div className="col-lg-7 mb-4">
                <div className={styles.customCard}>
                  <form>
                    <div className="d-flex flex-column align-items-center ">
                      <div className="avatar-container mb-3">
                        <img
                          id="avatar"
                          src="/images/user/1.jpg"
                          alt="大頭貼"
                          className={styles.avatar}
                        />
                      </div>
                      <div className="mb-3 ">
                        <input
                          type="file"
                          id="fileInput"
                          className="fileInput"
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">電郵地址</label>
                      <input
                        type="email"
                        className={`form-control ${styles.customInput}`}
                        disabled
                        value={user?.mail || ""}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">名字 *</label>
                      <input
                        type="text"
                        className={`form-control ${styles.customInput}`}
                        value={user?.name || ""}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">暱稱 *</label>
                      <input
                        type="text"
                        className={`form-control ${styles.customInput}`}
                        disabled
                        value={user?.nickname || ""}
                        readOnly
                      />
                    </div>
                    
                    <div className="mb-3">
                      <label className="form-label">出生日期</label>
                      <input
                        type="date"
                        className={`form-control ${styles.customInput}`}
                      />
                    </div>
                    <button type="submit" className={styles.customBtn}>
                      更新我的帳戶
                    </button>
                  </form>
                </div>
              </div>

              {/* 密碼修改區 */}
              <div className="col-lg-5 mb-4">
                <div className={styles.customCard}>
                  <h5>我的密碼</h5>
                  <p className="mt-4 text-muted">
                    如要更改密碼，您需要先輸入目前的密碼。
                  </p>
                  <Link href="/user/passwordChange">
                    <button className={`mt-4 ${styles.customBtn}`}>
                      更新我的密碼
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 地址區域 */}
            <div className={`${styles.customCard} mt-4`}>
              <h4 className="mb-4">我的地址</h4>
              <div className="mb-3">
                <strong>送貨地址:</strong>
                <p className="text-muted">尚未填寫送貨地址</p>
              </div>
              <div>
                <Link href="#" className="text-decoration-none">
                  選擇預設送貨地址
                </Link>
                <br />
                <Link href="#" className="text-decoration-none">
                  添加新送貨地址
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
