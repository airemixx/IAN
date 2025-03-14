'use client'
import Link from 'next/link'
import styles from './login.module.scss'
import React, { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import GoogleLoginButton from "./_components/google/GoogleLoginButton";
import LineLoginButton from "./_components/line/page";

export default function loginPage() {
  const router = useRouter()
  const appKey = 'loginWithToken'
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(true); // ✅ 新增 `loading` 狀態

  // 檢查是否已登入
  useEffect(() => {
    const savedToken = localStorage.getItem(appKey)
    if (savedToken) {
      try {
        const decodedUser = jwtDecode(savedToken)
        setToken(savedToken)
        setUser(decodedUser)
        router.push('/user')
      } catch (error) {
        console.error('Token 解碼失敗', error)
        localStorage.removeItem(appKey)
      }
    }
    setLoading(false);
  }, [])

  // 登入處理，根據 level 導向不同頁面
  const handleLogin = async (e) => {
    e.preventDefault()
    const API = 'http://localhost:8000/api/users/login'

    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account, password }),
      })

      const result = await res.json()
      if (result.status !== 'success') throw new Error(result.message)

      const newToken = result.data.token
      localStorage.setItem(appKey, newToken)
      const userData = jwtDecode(newToken)
      setToken(newToken)
      setUser(userData)

      // 根據 level 跳轉不同頁面
      if (userData.level === 1 || 88) {
        router.push('/teacher') // 講師跳轉至課程管理中心
      } else if (userData.level === 2) {
        router.push('/user/article') // 編輯跳轉至文章管理中心
      } else {
        router.push('/') // 其他使用者導回主頁
        window.location.reload()
      }
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }
  if (loading) {
    return null;
  }

  return (
    <main className="container">
      <section>
        <div className="container">
          <div className="mb-5 text-center">
            <h3 className={styles.parent}>客戶登入</h3>
            <h6 className={styles.parent}>
              登入您的映相坊帳戶，享受所有個人化功能。
            </h6>
          </div>

          <div className={`row justify-content-center ${styles.marginTop}`}>
            {/* 左側 - 建立帳戶 */}
            <div className={`col-lg-6 ${styles.box} ${styles.column} me-4`}>
              <div className={styles.box1}>
                <h5>我沒有帳戶</h5>
                <h6>建立帳戶，享受個人化的購物體驗。</h6>
              </div>
              <div className={`${styles.start} mb-3`}>
                <div className={styles.box1}>
                  <ul>
                    <li>收藏我的最愛</li>
                    <li>查詢租賃時間</li>
                    <li>追查訂單進度</li>
                  </ul>
                </div>
                <div className={styles.box1}>
                  <Link href="/login/register">
                    <button
                      className={`${styles.buttonBox} ${styles.marginTop33}`}
                    >
                      建立帳戶
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 右側 - 登入帳戶 */}
            <div className={`col-lg-6 ${styles.box} ${styles.column} me-4`}>
              <form onSubmit={handleLogin}>
                <div className={styles.box1}>
                  <h5>我已擁有帳戶</h5>
                </div>
                <div className={`${styles.box1} mb-2`}>
                  <label className={styles.label}>帳號</label>
                  <input
                    className={`form-control ${styles.inputField}`}
                    type="text"
                    placeholder="請輸入帳號"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    required
                  />
                </div>
                <div className={`${styles.box1} mb-2`}>
                  <label className={styles.label}>密碼</label>
                  <input
                    className={`form-control ${styles.inputField}`}
                    type="password"
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className={`${styles.box1} mb-2`}>
                  <button
                    type="submit"
                    className={`${styles.buttonBox} ${styles.start}`}
                  >
                    登入
                  </button>
                </div>
              </form>

              <div className="d-flex justify-content-between align-items-end">
                <div className='d-flex '>
                  <GoogleLoginButton />
                  <LineLoginButton />
                </div>

                <Link href="/login/forgerpwd">
                  <div className="flex justify-start">
                    忘記密碼 ?
                  </div>
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
