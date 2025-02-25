import { useState, useEffect } from 'react'
import { FaRegHeart, FaHeart } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../course-info/course-info.module.scss'
import { useFavorite } from '@/hooks/use-collection'

export default function FavoriteButtonG({ courseId, className }) {
  const [token, setToken] = useState(null)
  const { favoriteCourses, toggleFavorite } = useFavorite()
  const isFavorite = favoriteCourses[courseId] || false

  // 讀取 `token`
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('loginWithToken')
      console.log('🔑 取得 token:', storedToken)
      setToken(storedToken)
    }
  }, [])

  // 檢查收藏狀態
  useEffect(() => {
    if (!token || !courseId) {
      console.warn('🚨 token 或 courseId 為空，取消 API 請求')
      return
    }

    const checkFavoriteStatus = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/courses/collection/${courseId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )

        if (!res.ok) throw new Error('無法取得收藏狀態')

        const data = await res.json()
        console.log('✅ API 回傳收藏狀態:', data)
        toggleFavorite(courseId, data.isFavorite)
      } catch (error) {
        console.error('❌ 無法確認收藏狀態:', error)
      }
    }

    checkFavoriteStatus()
  }, [courseId, token])

  // 收藏或取消收藏
  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!token) {
      toast.warn('請先登入才能收藏課程！', {
        position: 'top-right',
        autoClose: 3000,
      })
      return
    }

    try {
      const method = isFavorite ? 'DELETE' : 'POST'
      let url = 'http://localhost:8000/api/courses/collection'

      if (method === 'DELETE') {
        url = `http://localhost:8000/api/courses/collection/${courseId}`
      }

      console.log('📌 送出的請求:', method, url)

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body:
          method === 'POST' ? JSON.stringify({ course_id: courseId }) : null,
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(errorText)
      }

      toggleFavorite(courseId, !isFavorite) // 同步所有 FavoriteButtonG 的狀態

      toast.success(isFavorite ? '已取消收藏！' : '成功加入收藏！', {
        position: 'top-right',
        autoClose: 2000,
      })
    } catch (error) {
      console.error('收藏錯誤:', error)
      toast.error('操作失敗：' + (error.message || '發生錯誤，請稍後再試'), {
        position: 'top-right',
        autoClose: 3000,
      })
    }
  }

  return (
    <button
      onClick={handleFavoriteClick}
      className={`${styles['favorite-btn']} hvr-icon-pulse ${className || ''}`}
    >
      {isFavorite ? (
        <FaHeart size={18} className={styles['favorite-icon']} />
      ) : (
        <FaRegHeart size={18} className={styles['favorite-icon']} />
      )}
      <p>收藏課程</p>
    </button>
  )
}

return (
  <button
    onClick={handleFavoriteClick}
    className={`${styles['favorite-btn']} hvr-icon-pulse ${className || ''}`}
  >
    {isFavorite ? (
      <FaHeart size={18} className={styles['favorite-icon']} />
    ) : (
      <FaRegHeart size={18} className={styles['favorite-icon']} />
    )}
    <p>收藏課程</p>
  </button>
)
