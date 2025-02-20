import { useEffect, useState } from 'react'
import {
  FaTimes,
  FaAddressBook,
  FaChalkboard,
  FaPlusSquare,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa'
import styles from './teacher-sidebar.module.scss' // 確保 CSS 正確導入

export default function TeacherSidebar() {
  const [teacher, setTeacher] = useState({
    name: 'Loading...',
    email: 'Loading...',
    image: '/images/default-avatar.jpg', // 預設大頭貼
  })

  useEffect(() => {
    const fetchTeacherCourses = async () => {
      try {
        const token = localStorage.getItem('loginWithToken')
        if (!token) return console.error('❌ Token 不存在，請先登入')

        const res = await fetch(
          'http://localhost:8000/api/teachers/me/courses',
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )

        if (!res.ok) throw new Error(`API 錯誤: ${res.status}`)

        const data = await res.json()
        console.log('📌 獲取的課程資料:', data)

        if (data.length > 0) {
          setTeacher({
            name: data[0].teacher_name, // ✅ 修正
            email: data[0].mail, // ✅ 修正
            image: data[0].teacher_image || '/images/default-avatar.jpg', // ✅ 預設大頭貼
          })
        } else {
          console.warn('⚠️ 沒有課程資料，無法獲取講師資訊')
        }
      } catch (error) {
        console.error('❌ 獲取課程失敗:', error)
      }
    }

    fetchTeacherCourses()
  }, [])

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
            <img src={teacher.image} alt="講師頭像" />
          </div>
          <h2 className={styles['teacher-name']}>{teacher.name}</h2>
          <p className={styles['teacher-email']}>{teacher.email}</p>
        </div>

        {/* 📌 控制中心 */}
        <div className={styles['control-center']}>
          <ul>
            <li>
              <a href="">
                <FaAddressBook /> 講師資料
              </a>
            </li>
            <li>
              <a href="">
                <FaChalkboard /> 我的課程
              </a>
            </li>
            <li>
              <a href="">
                <FaPlusSquare /> 新增課程
              </a>
            </li>
            <li>
              <a href="">
                <FaQuestionCircle /> 客服中心
              </a>
            </li>
          </ul>

          {/* 📌 登出 */}
          <div className={styles['logout']}>
            <a href="">
              <FaSignOutAlt /> 登出
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
