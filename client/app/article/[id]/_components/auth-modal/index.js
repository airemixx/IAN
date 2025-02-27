'use client'

import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import styles from './index.module.scss'
import { Modal } from 'react-bootstrap'

export default function AuthModal({ show, onHide, onLoginSuccess }) {
  const appKey = 'loginWithToken'
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 登入處理
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

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

      // 登入成功，調用回調函數
      onLoginSuccess && onLoginSuccess(userData, newToken)


      onHide();

      // 登入成功後重新整理頁面
      setTimeout(() => {
        window.location.reload();
      }, 300); // 短暫延遲確保其他操作完成

    } catch (err) {
      console.error(err)
      setError(err.message || '登入失敗，請重試')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className={styles.authModal}
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row justify-content-between">
            {/* 左側 - 建立帳戶 */}
            <div className="col-md-6">
              <div className={`p-4 h-100 d-flex flex-column justify-content-between ${styles.leftSide}`}>
                <div>
                  <h5 className="mb-3">我沒有帳戶</h5>
                  <p>建立帳戶，享受個人化的體驗。</p>
                  <ul className="ps-4 mt-3">
                    <li>收藏我的最愛</li>
                    <li>查詢租賃時間</li>
                    <li>追查訂單進度</li>
                  </ul>
                </div>
                <div className="mt-4 text-center">
                  <Link href="/login/register">
                    <button className="btn btn-outline-primary w-100">
                      建立帳戶
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 右側 - 登入帳戶 */}
            <div className="col-md-6 ">
              <div className={`p-4 h-100 ${styles.rightSide}`}>
                <h5 className="mb-3">已有帳戶</h5>
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">帳號</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="請輸入帳號"
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">密碼</label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="密碼"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={loading}
                    >
                      {loading ? '登入中...' : '登入'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}