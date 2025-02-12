'use client'

import React, { useState, useEffect } from 'react'
import styles from './detail-page.module.scss'
import CourseInfo from './_components/course-info/page'
import FourInfo from './_components/four-info/page'
import DetailNav from './_components/detail-nav/page'
import CourseContent from './_components/course-content/page'
import TeacherInfo from './_components/teacher-info/page'
import CourseRating from './_components/course-rating/page'
import PriceFixed from './_components/price-fixed/page'

export default function CourseDetailPage() {
  return (
    <>
      <CourseInfo />
      <FourInfo />
      <section className={styles['course-detail-container']}>
        <div className="container">
          <DetailNav />
          <div className={styles['course-detail-title']}>
            <div className={styles['title-block']}></div>
            <h2>課程內容</h2>
            <div className={`${styles['line']} d-block d-sm-none`}></div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-8">
              <CourseContent />
              <TeacherInfo />
              <CourseRating />
            </div>
            <div className="col-md-4 d-none d-xl-block">
              <PriceFixed />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
