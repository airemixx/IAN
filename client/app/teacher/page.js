'use client'

import React, { useState, useEffect } from 'react'
import TeacherSidebar from './_component/teacher-sidebar/page'
import Pagination from '../article/_components/Pagination'

export default function TeacherCenterPage() {
  return (
    <>
      <section className="center-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-lg-2">
              <TeacherSidebar />
            </div>
            <div className="col-md-9 col-lg-10"></div>
            {/* 分頁 */}
            <Pagination />
          </div>
        </div>
      </section>
    </>
  )
}
