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
    cb(
      null,
      path.join(__dirname, '../../client/public/images/article_com_media')
    )
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = Date.now() + ext
    cb(null, uniqueName)
  },
})
const upload = multer({ storage })

router.get('/', async (req, res) => {
  const { articleId } = req.query
  if (!articleId) {
    return res.status(400).json({
      status: 'error',
      message: 'articleId 為必填參數',
    })
  }

  try {
    // If like_count exists, sort by like_count DESC, then by created_at DESC (newest to oldest)
    const [rows] = await pool.query(
      `SELECT ac.*, u.head, u.nickname, u.name,
              GROUP_CONCAT(cm.media_url) AS media_urls,
              GROUP_CONCAT(cm.media_type) AS media_types
       FROM article_comments AS ac
       LEFT JOIN users AS u ON ac.user_id = u.id
       LEFT JOIN comments_media AS cm ON ac.id = cm.comment_id
       WHERE ac.article_id = ? AND ac.is_deleted = 0
       GROUP BY ac.id
       ORDER BY ac.like_count DESC, ac.created_at DESC`,
      [articleId]
    )

    const comments = rows.map((row) => ({
      ...row,
      media_urls: row.media_urls ? row.media_urls.split(',') : [],
      media_types: row.media_types ? row.media_types.split(',') : [],
    }))

    res.status(200).json({ comments })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message || '取得留言失敗',
    })
  }
})

router.get('/count', async (req, res) => {
  const { articleId } = req.query
  if (!articleId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'articleId 為必填' })
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

// 新增留言 API：將留言內容存入 article_comments 資料表，若有附檔則存入 comments_media
// 接受欄位 media，可能多筆檔案
router.post('/', upload.array('media'), async (req, res) => {
  let { content, articleId, userId, parentId, gifUrl } = req.body

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
    // 新增留言
    const [result] = await pool.query(
      `INSERT INTO article_comments (article_id, content, user_id, parent_id, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [articleId, content, userId, parentId || null]
    )
    const commentId = result.insertId

    // 處理附檔與 GIF
    if (req.files && req.files.length > 0) {
      const insertMediaQuery = `INSERT INTO comments_media (comment_id, media_type, media_url) VALUES (?, ?, ?)`
      for (const file of req.files) {
        let mediaType = 'image'
        if (file.mimetype.startsWith('video')) {
          mediaType = 'video'
        } else if (file.mimetype === 'image/gif') {
          mediaType = 'gif'
        }
        await pool.query(insertMediaQuery, [
          commentId,
          mediaType,
          file.filename,
        ])
      }
    } else if (gifUrl) {
      const insertMediaQuery = `INSERT INTO comments_media (comment_id, media_type, media_url) VALUES (?, ?, ?)`
      await pool.query(insertMediaQuery, [commentId, 'gif', gifUrl])
    }

    // 重新查詢該留言資料，並 JOIN 使用者與媒體資料
    const [rows] = await pool.query(
      `SELECT ac.*, u.head, u.nickname, u.name,
              GROUP_CONCAT(cm.media_url) AS media_urls,
              GROUP_CONCAT(cm.media_type) AS media_types
       FROM article_comments AS ac
       LEFT JOIN users AS u ON ac.user_id = u.id
       LEFT JOIN comments_media AS cm ON ac.id = cm.comment_id
       WHERE ac.id = ?
       GROUP BY ac.id
       ORDER BY ac.created_at DESC`,
      [commentId]
    )
    const newComment = rows[0]
    // 轉換 media 欄位為陣列
    newComment.media_urls = newComment.media_urls ? newComment.media_urls.split(',') : []
    newComment.media_types = newComment.media_types ? newComment.media_types.split(',') : []

    res.status(201).json({
      status: 'success',
      message: '留言新增成功',
      ...newComment,
    })
  } catch (err) {
    console.error('新增留言錯誤：', err)
    res.status(500).json({
      status: 'error',
      message: err.message || '新增留言失敗',
    })
  }
})

export default router
