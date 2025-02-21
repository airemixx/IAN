'use client'
import Link from 'next/link'
import styles from './passwordChange.module.scss'
import useAuth from '@/hooks/use-auth';
import Sidenav from '../_components/Sidenav/page'
import React , { useState } from "react";
import { Router } from 'react-bootstrap-icons';
import { useRouter } from "next/navigation";




export default function UserPage(props) {
    const { token, user, loading } = useAuth();
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [updating, setUpdating] = useState(false);
  
    if (loading) {
      return <div className="text-center mt-5">載入中...</div>;
    }
   
    const handlePasswordChange = async (e) => {
      e.preventDefault();
      
      if (newPassword !== confirmPassword) {
        alert('新密碼與確認密碼不一致');
        return;
      }

      setUpdating(true); // 進入「處理中」狀態
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.account}`, // 🔹 使用者帳號
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: newPassword, // 只更新密碼
          }),
        }
      );

      const result = await response.json();
      console.log("📌 更新密碼 API 回應:", result);

      if (result.status !== 'success') throw new Error(result.message);

      alert('密碼更新成功！請使用新密碼登入');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      router.push('/user');
    } catch (error) {
      console.error('❌ 更新密碼失敗:', error);
      alert('密碼更新失敗，請稍後再試');
    } finally {
      setUpdating(false);
    }
  };
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
            <form onSubmit={handlePasswordChange}>
              <div className="mb-3">
                <label className="form-label">目前密碼</label>
                <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required 
                type="password" className={`form-control ${styles.formControl}`} />
              </div>
              
              <div className="mb-3">
                <label className="form-label">新密碼</label>
                <input 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type="password" className={`form-control ${styles.formControl}`} />
              </div>
              
              <div className="mb-3">
                <label className="form-label">確認新密碼</label>
                <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password" className={`form-control ${styles.formControl}`} />
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