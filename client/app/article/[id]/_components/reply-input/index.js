'use client'

import React, { useState, useRef } from 'react'
import axios from 'axios'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Grid } from '@giphy/react-components'
import styles from './index.module.scss'

const gf = new GiphyFetch('YOUR_GIPHY_API_KEY') // 替換為你的 Giphy API Key

export default function ReplyInput({ articleId, parentId }) {
  const [comment, setComment] = useState('')
  const [previews, setPreviews] = useState([])
  const [showGifPicker, setShowGifPicker] = useState(false)
  const fileInputRef = useRef(null)
  const userId = 1 // TODO: 從登入狀態取得使用者 ID

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    let selectedFiles = []
    // 如果有影片，只取第一個影片；否則取所有圖片
    const videoFiles = files.filter((file) => file.type.startsWith('video'))
    if (videoFiles.length > 0) {
      selectedFiles = [videoFiles[0]]
    } else {
      const imageFiles = files.filter((file) => file.type.startsWith('image'))
      if (imageFiles.length > 0) {
        selectedFiles = [imageFiles[0]] // 只取第一張圖片
      }
    }
    const previewURLs = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type
    }))
    setPreviews(previewURLs)
  }

  const triggerFileInput = () => {
    if(fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const removePreview = (index) => {
    setPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleGifSelect = (gif) => {
    setPreviews([{ url: gif.images.original.url, type: 'gif' }])
    setShowGifPicker(false)
  }

  const handleSubmit = async () => {
    if (!comment.trim()) return

    try {
      const response = await axios.post(
        'http://localhost:8000/api/comments',
        {
          content: comment,
          articleId: articleId,
          userId: userId,
          parentId: parentId // 如果是回覆中的回覆，則會傳入父留言的 id
        },
        { withCredentials: true }
      )
      console.log('留言新增成功：', response.data)
      setComment('') // 清空留言輸入框
    } catch (error) {
      console.error('留言送出失敗：', error)
    }
  }

  return (
    <div className={`p-3 bg-white border border-secondary ${styles['y-comment-area']}`}>
      <input
        type="text"
        id="comment"
        className="p-2 py-3"
        placeholder="留言"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {/* 隱藏檔案選擇 input */}
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className={`mt-2 d-flex justify-content-end ${styles['y-comment-area-icons']}`}>
        <div className="d-flex">
          <button className="p-1" onClick={triggerFileInput}>
            <img src="/images/article/image-03.svg" alt="圖/影/gif" />
          </button>
          <button className="p-1" onClick={() => setShowGifPicker(!showGifPicker)}>
            <img src="/images/article/gif-icon.svg" alt="選擇 GIF" />
          </button>
          <button className="p-1" onClick={handleSubmit}>
            <img src="/images/article/send-01.svg" alt="發送" />
          </button>
        </div>
      </div>
      {/* 上傳預覽區 */}
      {previews.length > 0 && (
        <div style={{ width: '20%', marginTop: '1rem' ,}}>
        {previews.map((file, index) => (
            <div key={index} style={{ position: 'relative', marginBottom: '0.5rem' , display: 'flex'}}>
              {file.type.startsWith('image') ? (
                <img src={file.url} alt={`預覽-${index}`} style={{ width: '100%', borderRadius: '15px' }} />
              ) : file.type === 'gif' ? (
                <img src={file.url} alt={`預覽-${index}`} style={{ width: '100%', borderRadius: '15px' }} />
              ) : (
                // 影片元件不需播放器，只顯示影片縮圖
                <video src={file.url} style={{ width: '100%', borderRadius: '15px' }} />
              )}
              {/* 刪除按鈕：右上角，實心圓 + 空心 X */}
              <div
                onClick={() => removePreview(index)}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  backgroundColor: 'red',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <span style={{ color: 'white', fontSize: '14px', lineHeight: '0' }}>✕</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Giphy GIF 選擇器 */}
      {showGifPicker && (
        <div style={{ width: '100%', marginTop: '1rem' }}>
          <Grid
            fetchGifs={(offset) => gf.trending({ offset, limit: 10 })}
            width={800}
            columns={3}
            gutter={6}
            onGifClick={handleGifSelect}
          />
        </div>
      )}
    </div>
  )
}