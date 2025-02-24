'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../add-article/AddArticleModal.module.scss'

const ImageUpdate = forwardRef(({ hasError, initialImagePath = '' }, ref) => {
  // 如果 initialImagePath 存在，預設選擇輸入圖片路徑
  const [imageSource, setImageSource] = useState(initialImagePath ? 'path' : 'local')
  const [localPreview, setLocalPreview] = useState(null)
  const [imagePath, setImagePath] = useState(initialImagePath || '')
  const [pathPreview, setPathPreview] = useState(initialImagePath || '')
  const [isDragOver, setIsDragOver] = useState(false)

  const fileInputRef = useRef(null)
  const dropZoneRef = useRef(null)

  // 新增：監聽 initialImagePath 變化
  useEffect(() => {
    if (initialImagePath) {
      setImageSource('path')
      setImagePath(initialImagePath)
      setPathPreview(initialImagePath)
    }
  }, [initialImagePath])

  useImperativeHandle(ref, () => ({
    clearImagePreview: () => {
      setImageSource('local')
      setLocalPreview(null)
      setPathPreview('')
      setImagePath('')
      if (fileInputRef.current) fileInputRef.current.value = null
    },
  }))

  useEffect(() => {
    const dropZone = dropZoneRef.current
    if (!dropZone) return

    const handleDragOver = (e) => {
      e.preventDefault()
      setIsDragOver(true)
      dropZone.classList.add(styles['drop-zone--over'])
    }

    const handleDragLeave = (e) => {
      e.preventDefault()
      setIsDragOver(false)
      dropZone.classList.remove(styles['drop-zone--over'])
    }

    const handleDrop = (e) => {
      e.preventDefault()
      setIsDragOver(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0]
        if (file) {
          if (fileInputRef.current) {
            fileInputRef.current.files = e.dataTransfer.files
          }
          previewImage(file)
        }
      }
      dropZone.classList.remove(styles['drop-zone--over'])
    }

    dropZone.addEventListener('dragover', handleDragOver)
    dropZone.addEventListener('dragleave', handleDragLeave)
    dropZone.addEventListener('drop', handleDrop)

    return () => {
      dropZone.removeEventListener('dragover', handleDragOver)
      dropZone.removeEventListener('dragleave', handleDragLeave)
      dropZone.removeEventListener('drop', handleDrop)
    }
  }, [dropZoneRef])

  const toggleImageSource = (e) => {
    setImageSource(e.target.value)
    // 切換時重置預覽和輸入值
    setLocalPreview(null)
    setPathPreview('')
    setImagePath('')
    if (fileInputRef.current) fileInputRef.current.value = null
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      previewImage(e.target.files[0])
    }
  }

  const previewImage = (file) => {
    const url = URL.createObjectURL(file)
    setLocalPreview(url)
  }

  const handlePathChange = (e) => {
    setImagePath(e.target.value)
    previewImageFromPath(e.target.value)
  }

  const previewImageFromPath = (path) => {
    setPathPreview(path)
  }

  const dropZoneStyle = {
    borderColor:
      imageSource === 'local' && !localPreview && hasError
        ? 'rgb(200, 57, 31)'
        : '',
  }

  const imagePathInputStyle = {
    border:
      imageSource === 'path' && !imagePath && hasError
        ? '1px solid rgb(200, 57, 31)'
        : '',
  }

  return (
    <>
      <div className="my-4">
        <p>
          選擇主圖 <span className={`mx-1 ${styles['red-sign']}`}>*</span>:
        </p>

        {/* 選擇本地圖片與輸入圖片路徑的選項 */}
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="imageSource"
            id="imageSourceLocal"
            value="local"
            checked={imageSource === 'local'}
            onChange={toggleImageSource}
          />
          <label className="form-check-label" htmlFor="imageSourceLocal">
            選擇本地圖片
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="imageSource"
            id="imageSourcePath"
            value="path"
            checked={imageSource === 'path'}
            onChange={toggleImageSource}
          />
          <label className="form-check-label" htmlFor="imageSourcePath">
            輸入圖片路徑
          </label>
        </div>

        {/* 本地圖片上傳區域 */}
        {imageSource === 'local' && (
          <div
            id="dropZone"
            className={styles['drop-zone']}
            ref={dropZoneRef}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            style={dropZoneStyle}
          >
            <span className="drop-zone__prompt">
              <i className="fa-regular fa-image me-2"></i>
              拖曳圖片到此處，或點擊選取圖片
            </span>
            <input
              type="file"
              id="imageUpload"
              className="drop-zone__input"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            {localPreview && (
              <img
                id="imagePreview"
                src={localPreview}
                alt="預覽圖片"
                style={{
                  display: 'block',
                  maxWidth: '20%',
                  marginTop: '10px',
                }}
                onLoad={() => URL.revokeObjectURL(localPreview)}
              />
            )}
          </div>
        )}

        {/* 圖片路徑輸入區域 */}
        {imageSource === 'path' && (
          <div
            id="imagePathDiv"
            className={styles['add-image-path']}
            style={{ display: 'block' }}
          >
            <input
              type="text"
              className={`form-control ${styles['form-control']}`}
              id="imagePath"
              placeholder="請輸入圖片路徑"
              value={imagePath}
              onChange={handlePathChange}
              style={imagePathInputStyle}
            />
            {pathPreview && (
              <img
                id="imagePreviewPath"
                className={styles['add-image-path-preview']}
                src={pathPreview}
                alt="預覽圖片"
                style={{
                  display: 'block',
                  maxWidth: '200px',
                  marginTop: '10px',
                }}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
})

ImageUpdate.displayName = 'ImageUpdate'

export default ImageUpdate