'use client'

import React from 'react'
import style from './index.module.scss'

export default function Breadcrumb() {
  return (
    <>
      <section className={style['y-container']}>
        <div className={style['y-breadcrumb']}>
          <a href="#" className="text-decoration-none">首頁</a>
          <span className="mx-2">&gt;</span>
          <a href="#" className="text-decoration-none">最新消息</a>
        </div>

        <div className="my-sm-5 y-list-title">
          <h1>最新消息 News</h1>
        </div>
      </section>
    </>
  )
}
