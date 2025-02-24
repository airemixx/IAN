'use client'

import { useEffect, useState } from 'react'
import {
  FaTimes,
  FaAddressBook,
  FaChalkboard,
  FaPlusSquare,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa'
import styles from './teacher-sidebar.module.scss'
import { useTeachers } from '@/hooks/use-teachers' // ✅ 使用 Context
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function TeacherSidebar() {
  const { teacher, fetchTeacherById } = useTeachers() // ✅ 獲取講師資料
  const pathname = usePathname()
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const appKey = 'loginWithToken'

  console.log('🔍 Current pathname:', pathname)

  // ✅ 監聽 `teacher` 變化，確保 Sidebar 更新
  useEffect(() => {
    if (!teacher) {
      fetchTeacherById('me') // ✅ 取得當前登入的講師資料
    }
    const storedToken = localStorage.getItem(appKey)
    setToken(storedToken)
  }, [teacher])

  // 🔹 登出處理
  const handleLogout = async (e) => {
    e.preventDefault()
    if (!token) return

    try {
      const res = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const result = await res.json()
      if (result.status !== 'success') throw new Error(result.message)

      // 清除 localStorage 與狀態
      localStorage.removeItem(appKey)
      setToken(null)
      setUser(null)

      router.push('/login') // ✅ 跳轉至登入頁面
    } catch (err) {
      console.error('❌ 登出失敗:', err)
      alert(err.message)
    }
  }

  return (
    <div className="col-md-3 col-lg-2 d-none d-xl-block">
      <div className={styles['center-sidebar']}>
        {/* ❌ 關閉側邊欄按鈕 */}
        <button className={styles['close-sidebar-btn'] + ' d-md-none'}>
          <FaTimes />
        </button>

        {/* 📌 Logo 區塊 */}
        <div className={styles['logo']}>
          <img src="/images/icon/lenstudio-logo.svg" alt="Lenstudio Logo" />
          <hr />
        </div>

        {/* 📌 講師資訊 */}
        <div className={styles['teacher-data']}>
          <div className={styles['teacher-sticker']}>
            <img
              src={teacher?.image || '/images/teachers/default-avatar.jpg'}
              alt="講師頭像"
            />
          </div>
          <h2 className={styles['teacher-name']}>
            {teacher?.name || 'Loading...'}
          </h2>
          <p className={styles['teacher-email']}>
            {teacher?.email || 'Loading...'}
          </p>
        </div>

        {/* 📌 控制中心 */}
        <div className={styles['e-control-center']}>
          <ul>
            <li className={pathname === '/teacher/teacher-edit' ? styles.active : ''}>
              <Link href="/teacher/teacher-edit">
                <FaAddressBook /> 講師資料
              </Link>
            </li>

            <li
              className={
                pathname === '/teacher' ||
                (pathname.startsWith('/teacher/course') &&
                  pathname !== '/teacher/course/course-add')
                  ? styles.active
                  : ''
              }
            >
              <Link href="/teacher">
                <FaChalkboard /> 我的課程
              </Link>
            </li>

            <li className={pathname === '/teacher/course/course-add' ? styles.active : ''}>
              <Link href="/teacher/course/course-add">
                <FaPlusSquare /> 新增課程
              </Link>
            </li>

            <li>
              <a href="#">
                <FaQuestionCircle /> 客服中心
              </a>
            </li>
          </ul>

          {/* 📌 登出 */}
          <div className={styles['logout']}>
            <a href="#" onClick={handleLogout}>
              <FaSignOutAlt /> 登出
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
