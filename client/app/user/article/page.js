'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import styles from './article.module.scss'
import '../../../styles/article.css'
import useAuth from '@/hooks/use-auth'
import Sidenav from '../_components/Sidenav/page'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserArticleFilter from './_components/UserArticleFilter'

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

  // 模擬 handleEdit/handleDelete 行為
  const handleEdit = (articleId) => {
    console.log('編輯文章 ID:', articleId) // 除錯用
    if (!articleId) {
      console.error('沒有文章 ID')
      return
    }
    router.push(`/user/article/edit-article?id=${articleId}`)
  }

  const handleDelete = (articleId) => {
    // 第一階段：初步確認
    Swal.fire({
      title: "確定要刪除這篇文章嗎？",
      text: "刪除後將無法復原。",
      icon: "warning",
      showCancelButton: true,
      // 移除原本的 confirmButtonColor/cancelButtonColor
      customClass: {
        confirmButton: "btn-custom-confirm-delete", // 自訂確認按鈕
        cancelButton: "btn-custom-cancel-delete"      // 自訂取消按鈕
      },
      buttonsStyling: false, // 關閉預設按鈕樣式
      confirmButtonText: "是, 刪除它！",
      cancelButtonText: "取消"
    }).then((result) => {
      if (result.isConfirmed) {
        // 第二階段：再次確認，使用自訂樣式
        const swalWithCustomStyle = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-custom-confirm-delete-2",
            cancelButton: "btn btn-custom-cancel-delete-2"
          },
          buttonsStyling: false
        });

        swalWithCustomStyle.fire({
          title: "刪除後將無法復原！",
          text: "是否確定永久刪除？",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "是的, 刪除！",
          cancelButtonText: "否, 取消！",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            // 呼叫 API 更新 is_deleted 為1
            axios.delete(`http://localhost:8000/api/articles/${articleId}`, {
              headers: {
                Authorization: `Bearer ${token}` // token須來自 useAuth 狀態
              }
            })
              .then((res) => {
                swalWithCustomStyle.fire(
                  "已刪除！",
                  "該文章已被刪除。",
                  "success"
                );
                // 從目前文章狀態中移除該文章
                setArticles(prevArticles => prevArticles.filter(a => a.id !== articleId));
              })
              .catch((error) => {
                swalWithCustomStyle.fire(
                  "失敗",
                  "刪除文章失敗，請稍後再試。",
                  "error"
                );
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithCustomStyle.fire(
              "已取消",
              "該文章依然安全！",
            );
          }
        });
      }
    });
  };

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
            {/* 新增文章卡片 */}
            <Link href="/user/article/add-article" style={{ textDecoration: 'none' }}>
              <div className={styles.addArticleCard} style={{ cursor: 'pointer' }}>
                <div className="text-center">
                  <div className={`${styles.addButton} mx-auto mb-3`}></div>
                  <h5>新增文章</h5>
                </div>
              </div>
            </Link>

            {/* 多篩選功能 (UserArticleFilter) 放在新增文章區下方 */}
            <UserArticleFilter
              onFilterChange={(filters) => {
                // 根據篩選條件更新文章列表
                if (user && token) {
                  const queryParams = new URLSearchParams()
                  queryParams.append('user_id', user.id)
                  if (filters.category) {
                    queryParams.append('category', filters.category)
                  }
                  if (filters.year) {
                    queryParams.append('year', filters.year)
                  }
                  if (filters.month) {
                    queryParams.append('month', filters.month)
                  }

                  axios.get(`http://localhost:8000/api/articles?${queryParams}`, {
                    headers: { Authorization: `Bearer ${token}` }
                  })
                    .then(res => {
                      setArticles(res.data.data || [])
                    })
                    .catch(error => console.error('篩選失敗：', error))
                }
              }}
            />

            {/* 文章列表 */}
            {articles.map((article) => {
              // 轉換 tags，若為字串則 split
              const tags = typeof article.tags === 'string' && article.tags !== ''
                ? article.tags.split(',')
                : Array.isArray(article.tags)
                  ? article.tags
                  : [];

              // 過濾重複的 tag
              const uniqueTags = Array.from(new Set(tags));

              return (
                <div className={styles.articleCard} key={article.id}>
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
                      <p className="text-muted mt-3">{article.subtitle}</p>

                      <div className="hashtag mt-3">
                        {uniqueTags.length > 0 ? (
                          uniqueTags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                          ))
                        ) : (
                          <p></p>
                        )}
                      </div>

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
                              onClick={() => handleEdit(article.id)}
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
                              className={styles.moreOptionDelete}
                              onClick={() => handleDelete(article.id)}
                            >
                              <img
                                src="/images/article/delete-origin.svg"
                                alt="刪除原圖"
                                className={styles.iconOriginalDelete}
                              />
                              <img
                                src="/images/article/delete-hover.svg"
                                alt="刪除 hover 圖"
                                className={styles.iconHoverDelete}
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
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}