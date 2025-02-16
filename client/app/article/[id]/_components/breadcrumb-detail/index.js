'use client'

import React from 'react'
import style from './index.module.scss'

export default function BreadcrumbDetail({ categoryName, articleTitle }) {
  return (
    <div className={`text-sm text-gray-500 ${style['y-breadcrumb']}`}>
      <a href="#" className="text-decoration-none hover:text-gray-700">
        首頁
      </a>
      <span className="mx-2">&gt;</span>
      <a href="#" className="text-decoration-none hover:text-gray-700">
        最新消息
      </a>
      <span className="mx-2">&gt;</span>
      <a href="#" className="text-decoration-none hover:text-gray-700">
        {categoryName || '未分類'}
      </a>
      <span className="mx-2">&gt;</span>
      <p className="text-gray-500 inline">{articleTitle || '載入中...'}</p>
    </div>
  )
}
