import express from 'express'
import pool from '../db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

// 取得所有老師資料
router.get('/', async (req, res) => {
  try {
    const sql = `
      SELECT 
        t.id AS teacher_id,
        t.name AS teacher_name,
        t.image AS teacher_image,
        t.bio AS teacher_bio,
        COALESCE(SUM(c.student_count), 0) AS total_students
      FROM teachers t
      LEFT JOIN courses c ON t.id = c.teacher_id
      GROUP BY t.id
      ORDER BY total_students DESC;
    `
    const [rows] = await pool.execute(sql)

    res.json(rows)
  } catch (error) {
    console.error('❌ 無法獲取講師列表:', error)
    res.status(500).json({ error: '無法獲取講師列表' })
  }
})

// **老師登入**
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body
    const [teachers] = await pool.query(
      'SELECT * FROM teacher WHERE email = ?',
      [email]
    )

    if (teachers.length === 0) {
      return res.status(401).json({ error: '帳號或密碼錯誤' })
    }

    // 產生 JWT Token
    const token = jwt.sign({ id: teachers[0].id }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ token, teacher: teachers[0] })
  } catch (error) {
    res.status(500).json({ error: '登入失敗' })
  }
})

// **JWT Middleware**（驗證用）
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: '未授權' })

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.teacherId = decoded.id
    next()
  } catch (error) {
    res.status(403).json({ error: '無效的 Token' })
  }
}

// **取得當前登入老師資訊**
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const [teacher] = await pool.query('SELECT * FROM teacher WHERE id = ?', [
      req.teacherId,
    ])
    if (teacher.length === 0)
      return res.status(404).json({ error: '老師不存在' })

    res.json(teacher[0])
  } catch (error) {
    res.status(500).json({ error: '無法取得老師資訊' })
  }
})

// **取得當前老師的課程**
router.get('/me/courses', authMiddleware, async (req, res) => {
  try {
    const [courses] = await pool.query(
      'SELECT * FROM courses WHERE teacher_id = ?',
      [req.teacherId]
    )
    res.json(courses)
  } catch (error) {
    res.status(500).json({ error: '無法獲取課程' })
  }
})

// **新增課程**
router.post('/me/courses', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      category,
      image_url,
      original_price,
      sale_price,
      description,
      chapter,
      duration,
      content,
      status,
    } = req.body

    const [result] = await pool.query(
      'INSERT INTO courses (title, category, teacher_id, image_url, original_price, sale_price, description, chapter, duration, content, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        title,
        category,
        req.teacherId,
        image_url,
        original_price,
        sale_price,
        description,
        chapter,
        duration,
        content,
        status,
      ]
    )

    res.status(201).json({
      id: result.insertId,
      title,
      category,
      image_url,
      original_price,
      sale_price,
      description,
      chapter,
      duration,
      content,
      status,
    })
  } catch (error) {
    res.status(500).json({ error: '無法新增課程' })
  }
})

// **更新課程**
router.put('/me/courses/:courseId', authMiddleware, async (req, res) => {
  try {
    const {
      title,
      category,
      image_url,
      original_price,
      sale_price,
      description,
      chapter,
      duration,
      content,
      status,
    } = req.body

    const [result] = await pool.query(
      'UPDATE courses SET title = ?, category = ?, image_url = ?, original_price = ?, sale_price = ?, description = ?, chapter = ?, duration = ?, content = ?, status = ? WHERE id = ? AND teacher_id = ?',
      [
        title,
        category,
        image_url,
        original_price,
        sale_price,
        description,
        chapter,
        duration,
        content,
        status,
        req.params.courseId,
        req.teacherId,
      ]
    )

    if (result.affectedRows === 0)
      return res.status(404).json({ error: '課程未找到' })

    res.json({ message: '課程更新成功' })
  } catch (error) {
    res.status(500).json({ error: '無法更新課程' })
  }
})

// **刪除課程**
router.delete('/me/courses/:courseId', authMiddleware, async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM courses WHERE id = ? AND teacher_id = ?',
      [req.params.courseId, req.teacherId]
    )

    if (result.affectedRows === 0)
      return res.status(404).json({ error: '課程未找到' })

    res.json({ message: '課程刪除成功' })
  } catch (error) {
    res.status(500).json({ error: '無法刪除課程' })
  }
})

export default router
