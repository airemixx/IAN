'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './course-management.module.scss'
import { FaBars, FaList, FaSearch, FaPlusSquare, FaEye } from 'react-icons/fa'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Pagination from '../courses/_components/pagination/page'
import Link from 'next/link'

export default function CourseManagement() {
  const [user, setUser] = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()
  const coursesPerPage = 5

  // **權限驗證：檢查是否為老師或管理員**
  useEffect(() => {
    const fetchCoursesAndUser = async () => {
      try {
        const token = localStorage.getItem('loginWithToken')
        if (!token) {
          console.log('⛔️ 沒有 Token，跳轉登入頁面')
          router.push('/login')
          return
        }

        // ✅ 請求老師課程 & 使用者資訊
        console.log('📡 正在發送請求到 /api/teachers/me/courses...')
        const res = await fetch('http://localhost:8000/api/teachers/me/courses', {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error(`API 錯誤: ${res.status}`)

        const data = await res.json()
        console.log('✅ 取得課程與使用者資訊:', data)

        // ✅ 檢查回傳的數據格式
        if (!data.length || data[0]?.level === undefined) {
          console.error('❌ API 回傳錯誤，沒有 level 值', data)
          router.push('/dashboard') // 避免進入錯誤頁面
          return
        }

        // ✅ 設定使用者資訊
        setUser({
          name: data[0].teacher_name,
          level: data[0].level,
          email: data[0].mail,
        })

        // ✅ 如果是管理員，改用 `/api/admin/courses`
        let coursesUrl = 'http://localhost:8000/api/teachers/me/courses'
        if (data[0].level === 88) {
          coursesUrl = 'http://localhost:8000/api/courses' // 管理員取得所有課程
        }

        console.log('📡 正在發送請求到:', coursesUrl)
        const coursesRes = await fetch(coursesUrl, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!coursesRes.ok) throw new Error(`API 錯誤: ${coursesRes.status}`)

        const coursesData = await coursesRes.json()
        console.log('✅ 取得課程資料:', coursesData)

        setCourses(coursesData) // 設定課程資料

        // ✅ 只有未知角色才會跳轉
        if (data[0].level !== 1 && data[0].level !== 88) {
          console.warn('⚠️ 無權限訪問，跳轉到 /dashboard')
          router.push('/dashboard')
        }

      } catch (error) {
        console.error('❌ 獲取使用者與課程失敗:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchCoursesAndUser()
  }, [])

  useEffect(() => {
    console.log('📌 目前的 courses:', courses)
    if (courses.length > 0) {
      setCurrentPage(1)
    }
  }, [courses])

  // **搜尋 & 分頁**
  const filteredCourses = courses.filter(
    (course) =>
      course.title.includes(searchTerm) || course.category.includes(searchTerm)
  )

  const totalPages = filteredCourses.length > 0 ? Math.ceil(filteredCourses.length / coursesPerPage) : 1
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse)

  console.log('📌 當前顯示的課程列表:', currentCourses)
  console.log('📌 當前頁碼:', currentPage, ' / 總頁數:', totalPages)

  if (loading) return <p>載入中...</p>

  return (
    <>
      <div className={styles['center-content']}>
        <div className={styles['nav-bar']}>
          <h1>課程管理中心</h1>
          <p>
            您好，{user?.name}
            ！歡迎來到您的專屬教學平台，立即規劃並管理您的課程吧！
          </p>
        </div>

        <div className={styles['control-btns']}>
          <div className={styles['btns-left']}>
            <div className={styles['filter']}>
              <a href="#">
                <FaList />
                <p>篩選</p>
              </a>
            </div>

            <div className={styles['course-search']}>
              <input
                className={styles['search-input']}
                type="text"
                placeholder="搜尋課程"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className={styles['search-btn']}>
                <FaSearch />
              </button>
            </div>
          </div>

          <div className={styles['add']}>
            <Link href="/teacher/course/course-add">
              <FaPlusSquare />
              <p>新增課程</p>
            </Link>
          </div>
        </div>

        <div className={styles['table-container']}>
          <table>
            <thead>
              <tr>
                <th>課程圖片</th>
                <th>課程名稱</th>
                <th>分類</th>
                <th>建立日期</th>
                <th>售價</th>
                {/* <th>銷售量</th> */}
                <th>學生人數</th>
                <th>發布狀態</th>
                <th>編輯</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              {currentCourses.map((course) => {
                console.log(`📌 顯示課程:`, course)
                const safeImage = course.image_url
                  ? course.image_url
                  : `/uploads/course-cover/${course.image_url}` ||
                    '/images/course-cover/default-course.jpg'
                return (
                  <tr key={course.id}>
                    <td className={styles['course-img']} data-label="課程圖片">
                      <Link
                        href={`/courses/${course.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className={styles['image-container']}>
                          <img
                            src={safeImage}
                            alt={course.title}
                            className="img-fluid"
                          />
                          <div className={styles['overlay']}>
                            <FaEye className={styles['view-icon']} />
                          </div>
                        </div>
                      </Link>
                    </td>
                    <td data-label="課程名稱">{course.title}</td>
                    <td data-label="分類">{course.category}</td>
                    <td data-label="建立日期">
                      {new Date(course.created_at).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td data-label="售價">{course.sale_price.toLocaleString()}</td>
                    {/* <td data-label="銷售量">
                      NT$
                      {(
                        course.sale_price * course.student_count
                      ).toLocaleString()}
                    </td> */}
                    <td data-label="學生人數">{course.student_count.toLocaleString()}</td>
                    <td  data-label="發布狀態">
                      <div className={styles['state-circle']}>
                        <div
                          className={` ${
                            course.status === 'published'
                              ? styles['published']
                              : styles['draft']
                          }`}
                        ></div>
                        {course.status === 'published' ? '上架中' : '未上架'}
                      </div>
                    </td>
                    <td>
                      <Link
                        href={`/teacher/course/course-edit?id=${course.id}`}
                      >
                        <button className={styles['edit-btn']}>
                          <FiEdit />
                        </button>
                      </Link>
                    </td>
                    <td>
                      <button className={styles['delete-btn']}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  )
}