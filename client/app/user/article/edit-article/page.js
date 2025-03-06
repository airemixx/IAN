'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from '../add-article/AddArticleModal.module.scss'
import BackSelectTitle from '../add-article/back-select-title'
import ImageUpdate from './imageUpdate'
import EditHashtagInput from './EditHashtagInput'
import EditButtonGroup from './EditButtonGroup'
import Sidenav from '../../_components/Sidenav/page'
import { checkRequiredFields } from '../add-article/page'

const FroalaEditor = dynamic(() => import('../add-article/froalaEditor'), { ssr: false })

export default function EditArticlePage() {
  const [hasError, setHasError] = useState(false)
  const [articleData, setArticleData] = useState(null)
  const [hashtags, setHashtags] = useState([])
  const [editorReady, setEditorReady] = useState(false) // 新增: 監控編輯器狀態
  const imageUpdateRef = useRef(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const articleId = searchParams.get('id')

  // 監聽編輯器初始化
  useEffect(() => {
    const checkEditorInstance = () => {
      if (window.editorInstance) {
        setEditorReady(true);
        return true;
      }
      return false;
    };

    // 如果編輯器已經初始化，直接設置狀態
    if (checkEditorInstance()) return;

    // 否則每 200ms 檢查一次，最多檢查 15 次 (3 秒)
    let attempts = 0;
    const maxAttempts = 15;
    const intervalId = setInterval(() => {
      if (checkEditorInstance() || attempts >= maxAttempts) {
        clearInterval(intervalId);
      }
      attempts++;
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  // 載入文章資料
  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${articleId}`)
        const article = response.data.data
        setArticleData(article)

        // 如果有 hashtags，更新 state
        if (article.hashtags) {
          setHashtags(article.hashtags)
        }

        // 填充表單
        setTimeout(() => {
          const categorySelect = document.querySelector('select[name="文章分類"]')
          const titleInput = document.querySelector('input[placeholder="標題 (必填)"]')
          const subtitleInput = document.querySelector('input[placeholder="副標題"]')
          const imagePathInput = document.querySelector('#imagePath')
          const imagePreview = document.querySelector('#imagePreview') // 新增：獲取預覽元素

          if (categorySelect) categorySelect.value = article.category_id
          if (titleInput) titleInput.value = article.title
          if (subtitleInput) subtitleInput.value = article.subtitle

          // 新增：設置圖片路徑和預覽
          if (imagePathInput && article.image_path) {
            imagePathInput.value = article.image_path
            // 如果有預覽元素，設置預覽圖
            if (imagePreview) {
              imagePreview.src = article.image_path
              imagePreview.style.display = 'block'
            }
          }

          // 不在這裡設置編輯器內容，改由下方的 useEffect 處理
        }, 0)
      } catch (error) {
        console.error('載入文章錯誤:', error)
        Swal.fire({
          icon: 'error',
          title: '載入文章失敗',
          text: '無法取得文章資料，請稍後再試'
        })
      }
    }

    if (articleId) {
      fetchArticleData()
    }
  }, [articleId])

  // 新增: 當編輯器就緒且文章數據可用時，設置編輯器內容
  useEffect(() => {
    if (editorReady && articleData && articleData.content) {
      // console.log('編輯器已就緒，設置內容');
      window.editorInstance.html.set(articleData.content);
    }
  }, [editorReady, articleData]);

  const confirmClose = useCallback(() => {
    router.push('/user/article')
  }, [router])

  const handleUpdateArticle = useCallback(async () => {
    const allFilled = checkRequiredFields()
    if (!allFilled) {
      setHasError(true)
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請填寫所有必填欄位',
      })
      return
    }

    try {
      const categorySelect = document.querySelector('select[name="文章分類"]')
      const titleInput = document.querySelector('input[placeholder="標題 (必填)"]')
      const subtitleInput = document.querySelector('input[placeholder="副標題"]')
      const imagePathInput = document.querySelector('#imagePath')
      const editorInstance = window.editorInstance
      const content = editorInstance ? editorInstance.html.get() : ''

      const hashtagEls = document.querySelectorAll('#hashtag-preview .badge')
      const updatedHashtags = Array.from(hashtagEls).map((el) =>
        el.textContent.replace(/×$/, '')
      )

      // 比較原始和更新後的 hashtags
      const originalHashtags = articleData?.hashtags || []
      const removedHashtags = originalHashtags.filter(
        tag => !updatedHashtags.includes(tag)
      )

      await axios.put(`http://localhost:8000/api/articles/${articleId}`, {
        category: categorySelect.value,
        title: titleInput.value.trim(),
        subtitle: titleInput.value.trim(),
        content,
        image_path: imagePathInput.value.trim(),
        hashtags: updatedHashtags,
        removedHashtags, // 傳送被刪除的 hashtags
      })

      Swal.fire({
        icon: 'success',
        title: '更新成功',
        text: '文章已成功更新'
      }).then(() => {
        confirmClose()
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '更新失敗，請稍後再試',
      })
      console.error('Error updating article:', error)
    }
  }, [articleId, confirmClose, articleData])

  return (
    <>
      <div className={`d-flex container py-4 ${styles.marginTop}`}>
        <Sidenav />
        <div className="container">
          <h1 className="mb-4">編輯文章</h1>
          <div className={`container ${styles['add-article-area']}`}>
            <BackSelectTitle confirmClose={confirmClose} />
            <div className="my-4">
              <ImageUpdate
                ref={imageUpdateRef}
                hasError={hasError}
                initialImagePath={articleData?.image_path}
              />
            </div>
            <div className="my-4">
              <FroalaEditor initialContent={articleData?.content} />
            </div>
            <div className="my-4">
              <EditHashtagInput
                initialTags={hashtags}
                onTagsChange={(newTags) => setHashtags(newTags)}
              />
            </div>
            <EditButtonGroup
              confirmClose={confirmClose}
              onUpdateArticle={handleUpdateArticle}
            />
          </div>
        </div>
      </div>
    </>
  )
}