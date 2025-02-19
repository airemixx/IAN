import { Router } from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'lenstudio',
})

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true, // 確保 credentials 為 true
}

const router = Router()
router.use(cors(corsOptions))


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 設定 multer storage，將檔案儲存在 images/article_com_media，檔名以當前時間命名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../client/public/images/article_com_media'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = Date.now() + ext
    cb(null, uniqueName)
  }
})
const upload = multer({ storage })

// 新增留言 API：將留言內容存入 article_comments 資料表，若有附檔則存入 comments_media
// 接受欄位 media，可能多筆檔案
router.post('/', upload.array('media'), async (req, res) => {
  let { content, articleId, userId, parentId, gifUrl } = req.body

  // 若未傳入 userId，預設使用 users 資料表裡的 id = 1
  if (!userId) {
    userId = 1
  }

  if (!content || !articleId) {
    return res.status(400).json({
      status: 'error',
      message: 'content 與 articleId 為必填項',
    })
  }

  try {
    // 先將留言新增到 article_comments 中
    const [result] = await pool.query(
      `INSERT INTO article_comments (article_id, content, user_id, parent_id, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [articleId, content, userId, parentId || null]
    )
    const commentId = result.insertId

    // 若有檔案附加，依檔案類型將資料都寫入 comments_media
    if (req.files && req.files.length > 0) {
      const insertMediaQuery = `INSERT INTO comments_media (comment_id, media_type, media_url) VALUES (?, ?, ?)`
      for (const file of req.files) {
        let mediaType = 'image'
        if (file.mimetype.startsWith('video')) {
          mediaType = 'video'
        } else if (file.mimetype === 'image/gif') {
          mediaType = 'gif'
        }
        await pool.query(insertMediaQuery, [commentId, mediaType, file.filename])
      }
    } else if (gifUrl) {
      // 處理從 Giphy 選擇的 GIF
      const insertMediaQuery = `INSERT INTO comments_media (comment_id, media_type, media_url) VALUES (?, ?, ?)`
      await pool.query(insertMediaQuery, [commentId, 'gif', gifUrl])
    }

    res.status(201).json({
      status: 'success',
      message: '留言新增成功',
      commentId: commentId,
    })
  } catch (err) {
    console.error('新增留言錯誤：', err)
    res.status(500).json({
      status: 'error',
      message: err.message || '新增留言失敗',
    })
  }
})

router.get('/count', async (req, res) => {
  const { articleId } = req.query
  if (!articleId) {
    return res.status(400).json({ status: 'error', message: 'articleId 為必填' })
  }
  try {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM article_comments WHERE article_id = ?',
      [articleId]
    )
    res.json({ count: rows[0].count })
  } catch (err) {
    console.error('取得留言數量錯誤：', err)
    res.status(500).json({ status: 'error', message: '取得留言數量失敗' })
  }
})

export default router