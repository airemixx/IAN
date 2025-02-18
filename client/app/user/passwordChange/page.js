'use client'
import Link from 'next/link'
import styles from './passwordChange.module.scss'
import useAuth from '@/hooks/use-auth';
import Sidenav from '../_components/Sidenav/page'
import React from "react";



export default function UserPage(props) {
    const { token, user, loading } = useAuth();
  
    if (loading) {
      return <div className="text-center mt-5">載入中...</div>;
    }
   
  return (
    <div className="container py-4">
      <div className={`row ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />
        
        {/* 主要內容 */}
        <main className={`col-md-9 ${styles.mainContent}`}>
          <div className="mb-4">
            <h4 className={styles.backLink}><Link href="/user"><img src="/images/icon/arrow-left.svg" alt="icon" style={{width: '20px', height: '20px'}} /> 返回</Link></h4>
            <h1 className="margin">更改我的密碼</h1>
          </div>
          
          <div className={styles.formContainer}>
            <form>
              <div className="mb-3">
                <label className="form-label">密碼</label>
                <input type="password" className={`form-control ${styles.formControl}`} />
              </div>
              
              <div className="mb-3">
                <label className="form-label">新密碼</label>
                <input type="password" className={`form-control ${styles.formControl}`} />
              </div>
              
              <div className="mb-3">
                <label className="form-label">確認新密碼</label>
                <input type="password" className={`form-control ${styles.formControl}`} />
              </div>
              
              <button type="submit" className={styles.btnChange}>
                更改我的密碼
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}