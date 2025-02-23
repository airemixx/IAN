'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import styles from './article.module.scss'
import useAuth from '@/hooks/use-auth'
import Sidenav from '../_components/Sidenav/page'
import Link from 'next/link'
import { useRouter } from 'next/navigation'  // 在文件頂部引入

// 格式化日期函式，格式：yyyy/mm/dd hh:mm
function formatDate(dateString) {
  const date = new Date(dateString)
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mi = String(date.getMinutes()).padStart(2, '0')
  return `${yyyy}/${mm}/${dd} ${hh}:${mi}`
}

export default function UserPage() {
  const { token, user, loading } = useAuth()
  const [articles, setArticles] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (user && token) {
      axios
        .get(`http://localhost:8000/api/articles?user_id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          // 修改這裡，因為後端回傳的是 { status: 'success', data: rows }
          setArticles(res.data.data || []);
          console.log('API 回傳資料：', res.data); // 加入除錯用
        })
        .catch((err) => {
          console.error(err)
          Swal.fire({
            icon: 'error',
            title: '讀取文章失敗',
            text: err.message
          })
        })
    }
  }, [user, token])

  if (loading) {
    return <div className="text-center mt-5">載入中...</div>
  }

  // 如果沒有文章，也可以顯示提示
  if (!articles.length) {
    return <div className="container py-4">尚無文章</div>
  }

  // 模擬 handleEdit/handleDelete 行為
  // 修改 handleEdit 函數
  const handleEdit = (articleId) => {
    console.log('編輯文章 ID:', articleId) // 除錯用
    if (!articleId) {
      console.error('沒有文章 ID')
      return
    }
    router.push(`/user/article/edit-article?id=${articleId}`)
  }

  const handleDelete = (articleId) => {
    console.log('刪除文章', articleId)
    // 可呼叫 API 進行刪除，或先進行確認
  }

  // 修改處理點擊文章的函數
  const handleArticleClick = (articleId) => {
    console.log('Navigating to article:', articleId) // 除錯用
    router.push(`/article/${articleId}`)
  }

  return (
    <div className={`container py-4 ${styles.container}`}>
      <div className={`row ${styles.marginTop}`}>
        <Sidenav />
        <div className="col-md-9">
          <h1 className="mb-4">我的文章</h1>
          <div className="d-flex flex-column gap-4">
            {/* 新增文章卡片，以 Link 包裹 */}
            <Link href="/user/article/add-article" style={{ textDecoration: 'none' }}>
              <div className={styles.addArticleCard} style={{ cursor: 'pointer' }}>
                <div className="text-center">
                  <div className={`${styles.addButton} mx-auto mb-3`}></div>
                  <h5>新增文章</h5>
                </div>
              </div>
            </Link>


            {articles.map((article) => (
              <div
                className={styles.articleCard}
                key={article.id}
              >
                <div className="row g-0 d-flex align-items-center">
                  <div className="col-md-7 p-4 d-flex flex-column justify-content-between">
                    <p className={styles.categoryText}>{article.category_name || 'category'}</p>
                    {/* 標題可點擊 */}
                    <h4
                      onClick={() => handleArticleClick(article.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {article.title}
                    </h4>
                    <p className="text-muted mt-3">
                      {article.subtitle}
                    </p>
                    <div className={styles['btn-date']}>
                      <div className={styles.moreBtnContainer}>
                        {/* 更多按鈕區塊，保持原有功能 */}
                        <button
                          className={styles['more-btn']}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img
                            src="/images/article/more-origin.svg"
                            alt="more origin"
                            className={styles.iconOrigin}
                          />
                          <img
                            src="/images/article/more-hover.svg"
                            alt="more hover"
                            className={styles.iconHover}
                          />
                        </button>
                        <div className={styles.moreOptions}>
                          <div
                            className={styles.moreOption}
                            onClick={() => handleEdit(article.id)} // 改用 article.id 而不是 article.article_id
                          >
                            <img
                              src="/images/article/edit-origin.svg"
                              alt="編輯原圖"
                              className={styles.iconOriginal}
                            />
                            <img
                              src="/images/article/edit-hover.svg"
                              alt="編輯 hover 圖"
                              className={styles.iconHover}
                            />
                            編輯
                          </div>
                          <div
                            className={styles.moreOption}
                            onClick={() => handleDelete(article.article_id)}
                          >
                            <img
                              src="/images/article/delete-origin.svg"
                              alt="刪除原圖"
                              className={styles.iconOriginal}
                            />
                            <img
                              src="/images/article/delete-hover.svg"
                              alt="刪除 hover 圖"
                              className={styles.iconHover}
                            />
                            刪除
                          </div>
                        </div>
                      </div>
                      <p>
                        <strong>發布時間 :</strong>{' '}
                        {formatDate(article.created_at)}
                      </p>
                    </div>
                  </div>
                  {/* 圖片可點擊 */}
                  <div
                    className="col-md-5 p-4"
                    onClick={() => handleArticleClick(article.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={article.image_path || "/images/article/gallery (2).jpg"}
                      alt="文章圖片"
                      className={styles.articleImage}
                    />
                  </div>
                </div>
              </div>
            ))}


          </div>
        </div>
      </div>
    </div>
  )
}