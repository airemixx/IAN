'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import '@/styles/ck-custom.css'
import styles from './course-add.module.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function CourseCreate() {
  const fileInputRef = useRef(null)
  const router = useRouter()
  const [previewImg, setPreviewImg] = useState('/images/course-cover/default.jpg')

  // ✅ 加入 `loading` 狀態，避免 UI 卡住
  const [loading, setLoading] = useState(false)

  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    original_price: '',
    sale_price: '',
    image_url: '',
    content: '',
    status: "draft",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setCourse((prev) => ({ ...prev, content: data }))
  }

  const handleSubmit = async (e, status) => {
    e.preventDefault(); // ✅ 確保表單不會重新載入
    console.log("🚀 handleSubmit 執行，狀態:", status)
    setLoading(true) // ✅ 設定 loading 為 true

    const apiUrl = `http://localhost:8000/api/courses`
    console.log("🚀 發送 `POST` 請求到:", apiUrl)

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("loginWithToken")}`,
        },
        body: JSON.stringify({ ...course, status }),
      })

      console.log("🔍 API 回應狀態:", res.status)

      if (!res.ok) {
        const errorText = await res.text()
        console.error("❌ API 錯誤:", errorText)
        throw new Error(`❌ API 錯誤: ${res.status}`)
      }

      console.log("✅ 課程新增成功！")
      router.push("/teacher")
    } catch (error) {
      console.error("❌ 新增課程失敗:", error)
    } finally {
      console.log("✅ API 請求完成，設定 loading = false")
      setLoading(false) // ✅ 確保不會卡住
    }
  }

  // ✅ 如果 `loading = true`，顯示 `載入中...`
  if (loading) return <p className="text-center">⏳ 課程新增中...</p>

  return (
    <div className={styles['center-content']}>
      <div className={styles['nav-bar']}>
        <h1>新增課程</h1>
      </div>

      {/* 📌 編輯表單 */}
      <form className={styles['course-edit']} onSubmit={(e) => handleSubmit(e, 'draft')}>
        <div className="row">
          {/* 🔹 課程名稱 */}
          <div className="col-md-4">
            <div className={styles['form-group']}>
              <label>課程名稱 <span className={styles['required']}>*</span></label>
              <input type="text" name="title" value={course.title} onChange={handleInputChange} required />
            </div>

            {/* 🔹 課程簡介 */}
            <div className={styles['form-group']}>
              <label>課程簡介 <span className={styles['required']}>*</span></label>
              <textarea className={styles['course-info']} name="description" rows="4" value={course.description} onChange={handleInputChange} required />
            </div>

            {/* 🔹 課程分類 */}
            <div className={styles['form-group']}>
              <label>請選擇分類 <span className={styles['required']}>*</span></label>
              <select className={styles['category-select']} name="category" value={course.category} onChange={handleInputChange} required>
                <option value="影像創作">影像創作</option>
                <option value="商業攝影">商業攝影</option>
                <option value="後製剪輯">後製剪輯</option>
                <option value="攝影理論">攝影理論</option>
              </select>
            </div>

            {/* 🔹 價格設定 */}
            <div className={styles['price-container']}>
              <div className={styles['form-group']}>
                <label>課程定價 <span className={styles['required']}>*</span></label>
                <input type="number" name="original_price" value={course.original_price} onChange={handleInputChange} required />
              </div>
              <div className={styles['form-group']}>
                <label>課程售價 <span className={styles['required']}>*</span></label>
                <input type="number" name="sale_price" value={course.sale_price} onChange={handleInputChange} required />
              </div>
            </div>
          </div>

          {/* 🔹 課程內容 */}
          <div className="col-md-8">
            <div className={styles['form-group']}>
              <label>課程內容 <span className={styles['required']}>*</span></label>
              <div className={styles['editor-container']}>
                <CKEditor editor={ClassicEditor} data={course.content} onChange={handleEditorChange} />
              </div>
            </div>

            {/* 🔹 按鈕區 */}
            <div className={styles['form-actions']}>
              <button type="submit" className={styles['save-btn']} onClick={(e) => handleSubmit(e, 'draft')}>儲存為草稿</button>
              <button type="submit" className={styles['publish-btn']} onClick={(e) => handleSubmit(e, 'published')}>上架課程</button>
              <button type="button" className={styles['cancel-btn']} onClick={() => router.push('/teacher')}>返回課程列表</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
