'use client'

import React, { useState, useEffect } from 'react'
import style from './index.module.scss'
import NewsCard from '../news-card'
import AdCard from '../ad-card'

export default function Aside() {
  return (
    <>
      <aside>
        <div className="px-4 rounded">
          <div className="mb-4 title">
            <div className={style['y-title-line']} />
            <h3 className="mb-3" style={{fontSize: 18, fontWeight: 500}}>延伸閱讀</h3>
            <div className={style['y-title-line']} />
          </div>
          <NewsCard />
        </div>
        <div className="mb-4 title">
            <div className={style['y-title-line']} />
            <h3 className="mb-3" style={{fontSize: 18, fontWeight: 500}}>本文推薦</h3>
            <div className={style['y-title-line']} />
          </div>
        {/* 廣告 */}
        <AdCard />
      </aside>
    </>
  )
}
