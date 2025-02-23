'use client'

import React, { useRef, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import styles from './AddArticleModal.module.scss'
import BackSelectTitle from './back-select-title'
import ImageUpdate from './imageUpdate'
import HashtagInput from './hashtag-input'
import ButtonGroup from './ButtonGroup'
import Sidenav from '../../_components/Sidenav/page'  // 新增這行引入 Sidenav

const FroalaEditor = dynamic(() => import('./froalaEditor'), { ssr: false })

export const checkRequiredFields = () => {
  let allFilled = true
  const errorBorder = '1px solid rgb(200, 57, 31)'
  const defaultBorder = ''

  const categorySelect = document.querySelector('select[name="文章分類"]')
  const titleInput = document.querySelector('input[placeholder="標題 (必填)"]')
  const imageSourceLocal = document.querySelector('#imageSourceLocal')
  const imageUpload = document.querySelector('#imageUpload')
  const imagePath = document.querySelector('#imagePath')
  const editorDiv = document.querySelector('#example')
  const editorInstance = window.editorInstance

  // 文章分類
  if (categorySelect && categorySelect.value === '0') {
    categorySelect.style.border = errorBorder
    allFilled = false
  } else if (categorySelect) {
    categorySelect.style.border = defaultBorder
  }

  // 標題
  if (titleInput && !titleInput.value.trim()) {
    titleInput.style.border = errorBorder
    allFilled = false
  } else if (titleInput) {
    titleInput.style.border = defaultBorder
  }

  // 圖片
  if (imageSourceLocal && imageSourceLocal.checked) {
    if (!imageUpload || !imageUpload.files || imageUpload.files.length === 0) {
      if (imageUpload) imageUpload.style.border = errorBorder
      allFilled = false
    } else {
      if (imageUpload) imageUpload.style.border = defaultBorder
    }
  } else {
    if (!imagePath || !imagePath.value.trim()) {
      if (imagePath) imagePath.style.border = errorBorder
      allFilled = false
    } else {
      if (imagePath) imagePath.style.border = defaultBorder
    }
  }

  // Froala 編輯器
  const content = editorInstance?.html.get() || ''
  if (!content || !content.trim() || content.trim() === '<p><br></p>') {
    if (editorDiv) editorDiv.style.border = errorBorder
    allFilled = false
  } else {
    if (editorDiv) editorDiv.style.border = defaultBorder
  }

  return allFilled
}

export default function AddArticlePage() {
  const [hasError, setHasError] = useState(false)
  const imageUpdateRef = useRef(null)
  const router = useRouter()

  // 當使用者完成新增後，或按返回關閉時，導向回文章列表頁（例如：/user/article）
  const confirmClose = useCallback(() => {
    router.push('/user/article')
  }, [router])

  const handleAddArticle = useCallback(async () => {
    const allFilled = checkRequiredFields()
    if (!allFilled) {
      setHasError(true)
      Swal.fire({
        icon: 'error',
        title: '錯誤',
        text: '請填寫所有必填欄位',
      })
      return
    } else {
      setHasError(false)
    }

    try {
      const categorySelect = document.querySelector('select[name="文章分類"]')
      const titleInput = document.querySelector('input[placeholder="標題 (必填)"]')
      const subtitleInput = document.querySelector('input[placeholder="副標題"]')
      const imagePathInput = document.querySelector('#imagePath')
      const editorInstance = window.editorInstance
      const content = editorInstance ? editorInstance.html.get() : ''

      const hashtagEls = document.querySelectorAll('#hashtag-preview .badge')
      const hashtags = Array.from(hashtagEls).map((el) =>
        el.textContent.replace(/×$/, '')
      )

      const categoryId = categorySelect ? categorySelect.value : '0'
      const title = titleInput ? titleInput.value.trim() : ''
      const subtitle = subtitleInput ? subtitleInput.value.trim() : ''
      const imagePath = imagePathInput ? imagePathInput.value.trim() : ''

      if (imagePath && !imagePath.startsWith('https://')) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '圖片路徑必須以 https:// 開頭',
        })
        return
      }

      await axios.post('http://localhost:8000/api/articles', {
        category: categoryId,
        title,
        subtitle,
        content,
        image_path: imagePath,
        hashtags,
      })

      confirmClose()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '出現問題囉，請稍後再試',
      })
      console.error('Error adding article:', error)
    }
  }, [confirmClose])

  return (
    <>
        <div className={`d-flex container py-4 ${styles.marginTop}`}>
        {/* 側邊選單 */}
        <Sidenav />
        <div className="container">
          <h1 className="mb-4">新增文章</h1>
          <div className={`container ${styles['add-article-area']}`}>
            {/* <h1 className="mb-4">新增文章</h1> */}
            {/* 返回按鈕 */}
            <BackSelectTitle confirmClose={confirmClose} />
            <div className="my-4">
              <ImageUpdate ref={imageUpdateRef} hasError={hasError} />
            </div>
            <div className="my-4">
              <FroalaEditor />
            </div>
            <div className="my-4">
              <HashtagInput />
            </div>
            <ButtonGroup confirmClose={confirmClose} onAddArticle={handleAddArticle} />
          </div>

        </div>
      </div>
    </>
  )
}