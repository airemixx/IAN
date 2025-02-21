'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import '@/styles/ck-custom.css'
import styles from './course-edit.module.scss'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const editorConfig = {
  extraPlugins: [
    function (editor) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return {
          upload: async () => {
            const file = await loader.file
            const formData = new FormData()
            formData.append('upload', file)

            const response = await fetch('/api/courses/upload', {
              method: 'POST',
              body: formData,
            })

            const data = await response.json()
            return { default: data.url }
          },
        }
      }
    },
  ],

  toolbar: [
    'undo',
    'redo',
    'heading',
    '|',
    'bold',
    'italic',
    '|',
    'imageUpload',
    '|',
  ],

  heading: {
    options: [
      { model: 'paragraph', title: '內文', class: 'ck-heading_paragraph' },
      {
        model: 'heading3',
        view: 'h3',
        title: '標題',
        class: 'ck-heading_heading3',
      },
    ],
  },
}

export default function CourseEdit() {
  const searchParams = useSearchParams()
  
  const router = useRouter()

  const courseId = searchParams.get('id')
  console.log("🔍 取得的 `courseId`:", courseId);

  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    original_price: '',
    sale_price: '',
    image_url: '',
    content: '',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!courseId) {
      setError('❌ 沒有提供課程 ID')
      return
    }

    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('loginWithToken')
        if (!token) {
          router.push('/login')
          return
        }

        const res = await fetch(`/api/courses/${courseId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error(`API 錯誤: ${res.status}`)

        const data = await res.json()
        setCourse(data)
      } catch (error) {
        console.error('❌ 獲取課程失敗:', error)
        setError('無法獲取課程資料')
      } finally {
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCourse((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    console.log('編輯器內容變更:', data) // ✅ 確保 CKEditor 內容有變更
    setCourse((prev) => ({ ...prev, content: data }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!courseId) {
      console.error("❌ `courseId` 無效，請確認 URL 是否有 `id`！");
      return;
    }
    console.log("🔍 送出的 `id`:", courseId);
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: 'POST', // ✅ 改成 POST
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('loginWithToken')}`,
        },
        body: JSON.stringify(course),
      })

      if (!res.ok) throw new Error('❌ 更新失敗')

      alert('✅ 課程更新成功！')
    } catch (error) {
      console.error(error)
      alert('❌ 更新失敗')
    }
  }

  if (loading) return <p>⏳ 載入中...</p>
  if (error) return <p className="text-danger">{error}</p>

  return (
    <div className={styles['center-content']}>
      <div className={styles['nav-bar']}>
        <h1>編輯課程</h1>
      </div>

      {/* 📌 編輯表單 */}
      <form className={styles['course-edit']} onSubmit={handleSubmit}>
        <div className="row">
          {/* 🔹 課程圖片上傳 */}
          <div className="col-md-4">
            <div className={styles['form-group']}>
              <label>
                課程縮圖 <span className={styles['required']}>*</span>
              </label>
              <div className={styles['image-upload']}>
                <img
                  src={course.image_url || '/images/course-cover/default.jpg'}
                  alt="課程圖片"
                />
              </div>
            </div>

            {/* 🔹 課程名稱 */}
            <div className={styles['form-group']}>
              <label>
                課程名稱 <span className={styles['required']}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={course.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* 🔹 課程簡介 */}
            <div className={styles['form-group']}>
              <label>
                課程簡介 <span className={styles['required']}>*</span>
              </label>
              <textarea
                className={styles['course-info']}
                name="description"
                rows="4"
                value={course.description}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* 🔹 課程分類 */}
            <div className={styles['form-group']}>
              <label>
                請選擇分類 <span className={styles['required']}>*</span>
              </label>
              <select
                className={styles['category-select']}
                name="category"
                value={course.category}
                onChange={handleInputChange}
                required
              >
                <option value="影像創作">影像創作</option>
                <option value="商業攝影">商業攝影</option>
                <option value="後製剪輯">後製剪輯</option>
                <option value="攝影理論">攝影理論</option>
              </select>
            </div>

            {/* 🔹 價格設定 */}
            <div className={styles['price-container']}>
              <div className={styles['form-group']}>
                <label>
                  課程定價 <span className={styles['required']}>*</span>
                </label>
                <input
                  type="number"
                  name="original_price"
                  value={course.original_price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>
                  課程售價 <span className={styles['required']}>*</span>
                </label>
                <input
                  type="number"
                  name="sale_price"
                  value={course.sale_price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* 🔹 課程內容 */}
          <div className="col-md-8 course-content-container">
            <div className={styles['form-group']}>
              <label>
                課程內容 <span className={styles['required']}>*</span>
              </label>
              <div className={styles['editor-container']}>
                <CKEditor
                  editor={ClassicEditor}
                  data={course.content}
                  onChange={handleEditorChange}
                  config={editorConfig}
                />
              </div>
            </div>

            {/* 🔹 按鈕區 */}
            <div className={styles['form-actions']}>
              <button type="submit" className={styles['save-btn']}>
                儲存為草稿
              </button>
              <button type="submit" className={styles['publish-btn']}>
                上架課程
              </button>
              <button type="button" className={styles['cancel-btn']}>
                返回課程列表
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
