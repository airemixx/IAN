"use client";

import React from 'react'
import style from './index.module.scss'

export default function LoopAd() {
  return (
    <>
      <div className={style['y-loop-ad']}>
        <video autoPlay loop muted>
          <source src="/images/article/LEICA Q3 43.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
}