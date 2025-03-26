import express from 'express'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../utils/cloudinary-config.js'

const router = express.Router()

// ✅ Cloudinary 儲存設定
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'courses',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'avif', 'webp'],
    transformation: [{ width: 1200, height: 800, crop: 'limit' }],
  },
})

// ✅ 可選的 MIME 過濾器
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/avif',
    'image/webp',
  ]
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('❌ 僅支援圖片格式：JPG、PNG、GIF、AVIF、WEBP'), false)
  }
}

const upload = multer({ storage, fileFilter })

// ✅ 上傳 API
router.post('/', upload.single('upload'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: '❌ 上傳失敗' })
  }

  const imageUrl = req.file.path // Cloudinary 會自動提供
  res.status(200).json({ message: '✅ 上傳成功', url: imageUrl })
})

export default router
