'use client'

import '@/styles/globals.css'
import React from 'react'
import styles from './teacher-layout.module.scss'
import TeacherSidebar from './_component/teacher-sidebar/page'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function TeacherRootLayout({ children }) {
  return (
    <>
      <ToastContainer />
      <section className="center-dashboard">
        <div className="container-fluid">
          <div className="row">
            <div className={styles['col-md-3'] + ' col-md-3 col-lg-2'}>
              <TeacherSidebar />
            </div>
            <div className="col-md-9 col-lg-10">{children}</div>
          </div>
        </div>
      </section>
    </>
  )
}
