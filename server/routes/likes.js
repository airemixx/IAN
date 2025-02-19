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
  credentials: true,
}

const router = Router()
router.use(cors(corsOptions))

router.post('/', async (req, res) => {
  const { likeableId, likeableType, newLikeCount, userId } = req.body
  try {
    // 檢查是否已按過讚
    const [rows] = await pool.query(
      'SELECT id FROM likes WHERE user_id = ? AND likeable_id = ? AND likeable_type = ?',
      [userId, likeableId, likeableType]
    )
    if (rows.length > 0) {
      // 若已按過讚，則直接回傳
      return res.status(200).json({ status: 'success', message: 'Already liked', newLikeCount })
    }

    if (likeableType === 'article') {
      const [result] = await pool.query(
        'UPDATE article SET like_count = ? WHERE id = ?',
        [newLikeCount, likeableId]
      )
      console.log('Update result:', result)
    }
    const [likeResult] = await pool.query(
      'INSERT INTO likes (user_id, likeable_id, likeable_type, created_at) VALUES (?, ?, ?, NOW())',
      [userId, likeableId, likeableType]
    )
    console.log('Insert like result:', likeResult)
    res.status(200).json({ status: 'success', newLikeCount })
  } catch (err) {
    console.error('Error updating like:', err)
    res.status(500).json({ status: 'error', message: err.message })
  }
})

export default router