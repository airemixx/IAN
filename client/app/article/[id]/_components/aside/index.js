'use client'

import React, { useState, useEffect } from 'react'
import NewsCard from '../news-card'
import AdCard from '../ad-card'

export default function Aside() {
  return (
    <>
      <aside>
        <div className="p-4 rounded">
          <div className="mb-5 title">
            <div className="y-title-line" />
            <h3 className="mb-3" style={{fontSize: 18, fontWeight: 500}}>延伸閱讀</h3>
            <div className="y-title-line" />
          </div>
          <NewsCard />
        </div>
        {/* 廣告 */}
        <AdCard />
      </aside>
    </>
  )
}
