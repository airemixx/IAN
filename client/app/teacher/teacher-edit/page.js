'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './teacher-edit.module.scss'
import { toast } from "react-toastify";

export default function TeacherEdit() {
  // ✅ 確保所有 Hook 在最上面，順序不變
  const fileInputRef = useRef(null) // ✅ 確保 useRef 在最外層
  const [previewImg, setPreviewImg] = useState(
    '/images/teachers/default-avatar.jpg'
  )

  // 🔹 設定表單初始值
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    facebook: '',
    instagram: '',
    youtube: '',
    image: '/images/teachers/default-avatar.jpg',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('🔍 useEffect 啟動，準備獲取講師個人資料')

    const fetchTeacherInfo = async () => {
      console.log('📌 開始發送 API 請求...')
      try {
        if (typeof window === 'undefined') return // 確保在客戶端執行
        const token = localStorage.getItem('loginWithToken')
        if (!token) {
          console.error('❌ Token 不存在，請先登入')
          setError('請先登入')
          setLoading(false)
          return
        }

        console.log('🔍 取得 Token:', token)

        const res = await fetch('http://localhost:8000/api/teachers/me', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })

        console.log('📌 API 回應狀態:', res.status)

        if (!res.ok) throw new Error(`API 錯誤: ${res.status}`)

        const data = await res.json()
        console.log('📌 獲取的講師資料:', data)

        if (data) {
          // ✅ 設定表單初始值
          setFormData((prev) => ({
            ...prev,
            name: data.name || '',
            email: data.email || '',
            bio: data.bio || '',
            website: data.website || '',
            facebook: data.facebook || '',
            instagram: data.instagram || '',
            youtube: data.youtube || '',
            image: data.image || '/images/teachers/default-avatar.jpg',
          }))
        } else {
          console.warn('⚠️ 找不到講師資料')
        }
      } catch (error) {
        console.error('❌ 獲取講師資料失敗:', error)
        setError('無法獲取講師資料')
      } finally {
        setLoading(false)
      }
    }

    fetchTeacherInfo()
  }, [])

  // 🔹 處理輸入變更
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔹 處理圖片上傳
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, image: event.target.result }))
        setPreviewImg(event.target.result) // ✅ 預覽圖片
      }
      reader.readAsDataURL(file)
    }
  }

  // 🔹 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('loginWithToken')

    try {
      const res = await fetch('http://localhost:8000/api/teachers/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('更新失敗')
        toast.success('講師資料更新成功！')

      window.location.reload();
    } catch (error) {
      console.error(error)
      toast.error('更新失敗')
    }
  }

  if (loading) return <p>載入中...</p>
  if (error) return <p className="text-danger">{error}</p>

  // 🔹 觸發選擇圖片
  const handleUploadClick = () => {
    fileInputRef.current.click() // ✅ 透過 useRef 觸發 input
  }

  return (
    <div className={styles['center-content']}>
      <div className={styles['nav-bar']}>
        <h1>編輯講師資料</h1>
      </div>

      {/* 📌 編輯表單 */}
      <form className={styles['teacher-edit']} onSubmit={handleSubmit}>
        <div className="row">
          {/* 🔹 講師照片上傳 */}
          <div className="col-md-4">
            <div className={styles['form-group']}>
              <label>
                講師照片 <span className={styles['required']}>*</span>
              </label>
              <div
                className={styles['image-upload']}
                onClick={handleUploadClick}
              >
                <img src={formData.image} alt="講師圖片" />
                <input
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
            </div>
          </div>

          {/* 🔹 右側輸入區 */}
          <div className="col-md-8">
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label>
                  講師名稱 <span className={styles['required']}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles['form-group']}>
                <label>
                  電子郵件 <span className={styles['required']}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles['form-group']}>
              <label>
                講師簡介 <span className={styles['required']}>*</span>
              </label>
              <textarea
                className={styles['teacher-info']}
                name="bio"
                rows="5"
                value={formData.bio}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* 🔹 社群連結 */}
            {['website', 'facebook', 'instagram', 'youtube'].map((field) => (
              <div key={field} className={styles['form-group']}>
                <label>{field.toUpperCase()}</label>
                <input
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </div>
            ))}

            {/* 🔹 按鈕區 */}
            <div className={styles['form-actions']}>
              <button type="submit" className={styles['save-btn']}>
                儲存
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
