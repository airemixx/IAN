'use client'
import Link from 'next/link'
import styles from './sidenav.scss'
import React from 'react'

export default function UserPage(props) {
   
  return (
    <div className="col-md-3 mb-4">
      <nav className="sidenav p-3">
        <div className="d-flex flex-column">
          <Link href="/user">會員資料修改</Link>
          <Link href="/user/order">我的訂單</Link>
          <Link href="/user/article">我的文章</Link>
          <Link href="/user/rental">我的租借</Link>
          <Link href="/user/course">我的課程</Link>
          <Link href="/user/collect">我的收藏</Link>
          <Link href="/user/coupon">優惠券</Link>
          <Link href="/login">登出</Link>
        </div>
      </nav>
    </div>

  )
}
