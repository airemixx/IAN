'use client'
import Link from 'next/link'
import styles from './passwordChange.css'
import React from 'react'

export default function UserPage(props) {
   
  return (
<div>
  <div className="container py-4">
    <div className="row">
      <div className="col-md-3 mb-4">
        <nav className="sidenav p-3">
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
      <div className="col-md-9">
        <div className="mb-4">
          <h1>會員資料修改</h1>
          <p className="text-muted">在此部分中，您可以尋找和編輯您的個人檔案和地址。您還可以管理您的相機電子報訂閱和更改密碼。</p>
        </div>
        {/* 橫幅區域 */}
        <div className="hero-section mb-4 p-4 d-flex flex-column justify-content-center">
          <h6 className="text-black">獲取相機最新文章</h6>
          <button className="custom-btn align-self-start">立即前往</button>
        </div>
        {/* 表單區域 */}
        <div className="row">
          {/* 個人資料表單 */}
          <div className="col-lg-7 mb-4">
            <div className="custom-card">
              <form>
                <div className="mb-3">
                  <label className="form-label">電郵地址</label>
                  <input type="email" className="form-control custom-input" />
                </div>
                <div className="mb-3">
                  <label className="form-label">稱謂 *</label>
                  <input type="text" className="form-control custom-input" />
                </div>
                <div className="mb-3">
                  <label className="form-label">姓氏 *</label>
                  <input type="text" className="form-control custom-input" />
                </div>
                <div className="mb-3">
                  <label className="form-label">名字 *</label>
                  <input type="text" className="form-control custom-input" />
                </div>
                <div className="mb-3">
                  <label className="form-label">出生日期</label>
                  <input type="date" className="form-control custom-input" />
                </div>
                <button type="submit" className="custom-btn">更新我的帳戶</button>
              </form>
            </div>
          </div>
          {/* 密碼修改區 */}
          <div className="col-lg-5 mb-4">
            <div className="custom-card">
              <h5>我的密碼</h5>
              <p className="text-muted">如要更改密碼，您需要先輸入目前的密碼。</p>
              <button className="custom-btn">更新我的密碼</button>
            </div>
          </div>
        </div>
        {/* 地址區域 */}
        <div className="custom-card mt-4">
          <h4 className="mb-4">我的地址</h4>
          <div className="mb-3">
            <strong>送貨地址:</strong>
            <p className="text-muted">尚未填寫送貨地址</p>
          </div>
          <div>
            <a href="#" className="text-decoration-none">選擇預設送貨地址</a><br />
            <a href="#" className="text-decoration-none">添加新送貨地址</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
