'use client'

import { useState, useEffect } from 'react'
import styles from './course-management.module.scss'
import { FaBars, FaList, FaSearch, FaPlusSquare } from 'react-icons/fa'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Pagination from '../courses/_components/pagination/page'
import Link from 'next/link'

export default function CourseManagement() {
  const [user, setUser] = useState(null) // ✅ 儲存使用者資訊
  const [courses, setCourses] = useState([]) // ✅ 儲存課程列表
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const coursesPerPage = 5

  // **檢查 LocalStorage 是否有 Token**
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('loginWithToken');
        if (!token) {
          console.error("❌ 沒有找到 Token，請確認是否已登入");
          return;
        }
  
        console.log("🔹 送出 API 請求: /api/teachers/me");
  
        const res = await fetch("http://localhost:8000/api/teachers/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log(`📌 API 回應狀態碼:`, res.status);
  
        if (!res.ok) throw new Error(`API 錯誤: ${res.status}`);
  
        const data = await res.json();
        console.log("✅ 獲取的 user 資料:", data);
        setUser(data);
      } catch (error) {
        console.error("❌ 獲取使用者失敗:", error);
      }
    };
  
    fetchUser();
  }, []);
  
  
  

  useEffect(() => {
    if (!user || !user.id) {
      console.log("⏳ user 尚未設置，等待使用者資訊載入...");
      return;
    }
  
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('loginWithToken');
        if (!token) return;
  
        const userLevel = Number(user?.level);
        let apiUrl = userLevel === 1
          ? `http://localhost:8000/api/teachers/me/courses`
          : `http://localhost:8000/api/courses`;
  
        console.log(`🚀 發送 API 請求至:`, apiUrl);
        
        const res = await fetch(apiUrl, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (!res.ok) throw new Error(`API 錯誤: ${res.status}`);
  
        const data = await res.json();
        console.log('📌 獲取的課程:', data);
        setCourses(data);
      } catch (error) {
        console.error('❌ 獲取課程失敗:', error);
      }
    };
  
    fetchCourses();
  }, [user]);
  
  

  useEffect(() => {
    console.log(`📌 目前的 courses:`, courses)
    if (courses.length > 0) setCurrentPage(1)
  }, [courses])

  // **搜尋 & 分頁**
  const filteredCourses = courses.filter(
    (course) =>
      course.title.includes(searchTerm) || course.category.includes(searchTerm)
  )

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage)
  const indexOfLastCourse = currentPage * coursesPerPage
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  )

  console.log(`📌 當前顯示的課程列表:`, currentCourses)
  console.log(`📌 當前頁碼:`, currentPage, ` / 總頁數:`, totalPages)

  return (
    <>
      <button className="btn btn-dark d-xl-none">
        <FaBars />
      </button>

      <div className={styles['center-content']}>
        <div className={styles['nav-bar']}>
          <h1>課程管理中心</h1>
          <p>您好，{user?.name || '老師'}！歡迎來到您的專屬教學平台，立即規劃並管理您的課程吧!</p>
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
            <a href="#">
              <FaPlusSquare />
              <p>新增課程</p>
            </a>
          </div>
        </div>

        <div className={styles['table-container']}>
          <table>
            <thead>
              <tr>
                <th>課程圖片</th>
                <th>課程名稱</th>
                <th>課程分類</th>
                <th>建立日期</th>
                <th>售價</th>
                <th>銷售量</th>
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
                    <td className={styles['course-img']}>
                      <Link href={`/courses/${course.id}`}>
                        <img
                          src={safeImage}
                          alt={course.title}
                          className="img-fluid"
                        />
                      </Link>
                    </td>
                    <td>{course.title}</td>
                    <td>{course.category}</td>
                    <td>
                      {new Date(course.created_at).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </td>
                    <td>{course.sale_price.toLocaleString()}</td>
                    <td>
                      NT$
                      {(
                        course.sale_price * course.student_count
                      ).toLocaleString()}
                    </td>
                    <td>{course.student_count.toLocaleString()}</td>
                    <td>
                      <div className={styles['state-circle']}>
                        <div className={styles['state']}></div>
                        {course.status === 'published' ? '上架中' : '未上架'}
                      </div>
                    </td>
                    <td>
                      <button className={styles['edit-btn']}>
                        <FiEdit />
                      </button>
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
