// filepath: /c:/Users/iii_student/Desktop/LENSTUDIO/server/routes/comments.js
import { Router } from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'

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

// 新增留言 API：將留言內容存入 comments 資料表
router.post('/', async (req, res) => {
  const { content, articleId, userId, parentId } = req.body

  if (!content || !articleId || !userId) {
    return res.status(400).json({
      status: 'error',
      message: 'content, articleId 和 userId 為必填項',
    })
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO comments (article_id, content, user_id, parent_id, created_at) VALUES (?, ?, ?, ?, NOW())',
      [articleId, content, userId, parentId]
    )
    res.status(201).json({
      status: 'success',
      message: '留言新增成功',
      commentId: result.insertId,
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
