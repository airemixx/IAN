'use client'

import React from 'react'
import style from './index.module.scss'

export default function Content({ content = '<p>載入中...</p>' }) {
  return (
    <div
      className={style['y-article-content']}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
