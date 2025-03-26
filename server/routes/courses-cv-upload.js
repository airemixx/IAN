import express from 'express'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../utils/cloudinary-config.js'

const router = express.Router()

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'course-covers', // ✅ 專屬課程封面資料夾
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'avif'],
    transformation: [{ width: 1200, height: 630, crop: 'limit' }], // ✅ 適合封面比例
  },
})

const upload = multer({ storage })

router.post('/', upload.single('upload'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ message: '❌ 上傳失敗' })
  }

  const imageUrl = req.file.path
  res.status(200).json({ message: '✅ 上傳成功', url: imageUrl })
})

export default router
