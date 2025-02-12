'use client'
import Link from 'next/link'
import styles from './sidenav.scss'
import React from 'react'

export default function UserPage(props) {
   
  return (
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

  )
}
