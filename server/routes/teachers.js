import express from 'express'
import pool from '../db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'

console.log("🚀 /api/teachers/me API 已載入");


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

// ✅ 獲取特定講師的資訊 + 該老師的所有課程 (包含評分)
router.get('/:id', async (req, res) => {
  const teacherId = parseInt(req.params.id, 10)
  if (isNaN(teacherId)) {
    return res.status(400).json({ error: 'Invalid teacher ID' })
  }

  try {
    // 取得講師基本資料
    const teacherSql = `
      SELECT t.*, 
        (SELECT COUNT(*) FROM courses WHERE teacher_id = t.id) AS courseCount,
        (SELECT COALESCE(SUM(student_count), 0) FROM courses WHERE teacher_id = t.id) AS studentCount
      FROM teachers t
      WHERE t.id = ?
    `

    // 取得該老師的所有課程，並計算平均評分
    const coursesSql = `
      SELECT 
        c.id, c.title, c.image_url, c.category, c.sale_price, 
        c.student_count, c.status,
        COALESCE(AVG(cm.rating), 0) AS rating  -- ✅ 計算該課程的平均評分
      FROM courses c
      LEFT JOIN comments cm ON c.id = cm.course_id  -- ✅ 連結 comments 表
      WHERE c.teacher_id = ? AND c.status = 'published'
      GROUP BY c.id, c.title, c.image_url, c.category, c.sale_price, c.student_count, c.status
    `

    // 執行 SQL 查詢
    const [teacherRows] = await pool.execute(teacherSql, [teacherId])
    const [courseRows] = await pool.execute(coursesSql, [teacherId])

    // 如果講師不存在
    if (teacherRows.length === 0) {
      return res.status(404).json({ error: 'Teacher not found' })
    }

    // 合併結果
    const teacherData = {
      ...teacherRows[0],
      courses: courseRows, // ✅ 加入該老師的所有課程
    }

    res.json(teacherData)
  } catch (error) {
    console.error('❌ 獲取講師資料失敗:', error)
    res.status(500).json({ error: '無法獲取講師資料' })
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


// 取得登入老師資訊
router.get('/me', async (req, res) => {
  console.log("✅ /api/teachers/me 路由被請求...");

  try {
    if (!req.headers.authorization) {
      console.log("❌ 未提供 Authorization Header");
      return res.status(401).json({ error: '未提供驗證 token' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      console.log("❌ Token 格式錯誤");
      return res.status(401).json({ error: 'Token 格式錯誤' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("🔹 Token 解析結果:", decoded);

    if (!decoded) {
      console.log("❌ Token 解析失敗");
      return res.status(403).json({ error: '權限不足' });
    }

    // ✅ **修正 SQL 查詢**
    const sql = `
      SELECT DISTINCT c.teacher_id
      FROM courses c
      JOIN teachers t ON c.teacher_id = t.id
      WHERE t.user_id = ?
    `;
    console.log(`📌 執行 SQL 查詢: ${sql} | user_id = ${decoded.id}`);

    const [rows] = await pool.query(sql, [decoded.id]);
    console.log("📌 SQL 查詢結果:", rows);

    if (rows.length === 0) {
      console.log("❌ 找不到對應的 teacher_id");
      return res.status(400).json({ error: 'Invalid teacher ID' });
    }

    const teacher_id = rows[0].teacher_id;
    console.log(`✅ 獲取的 teacher_id: ${teacher_id}`);

    res.json({
      id: decoded.id,
      name: decoded.name,
      level: decoded.level,
      teacher_id, // ✅ 確保前端可以拿到 `teacher_id`
    });
  } catch (error) {
    console.error('❌ 獲取老師資訊失敗:', error);
    res.status(500).json({ error: '無法獲取老師資訊' });
  }
});







// **取得當前老師的課程**
router.get('/me/courses', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: '未提供驗證 token' })
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Token 格式錯誤' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(`🔹 Token 解析結果:`, decoded)

    if (!decoded || decoded.level !== 1) {
      return res.status(403).json({ error: '權限不足' })
    }

    // **先查詢 `teacher_id`**
    const sqlTeacher = `SELECT id FROM teachers WHERE user_id = ?`
    const [teacherRows] = await pool.query(sqlTeacher, [decoded.id])

    if (teacherRows.length === 0) {
      return res.status(400).json({ error: 'Invalid teacher ID' }) // 🔴 查無 `teacher_id`
    }

    const teacherId = teacherRows[0].id
    console.log(`🔹 獲取到的 teacherId:`, teacherId)

    // **使用 `teacher_id` 查詢課程**
    let sqlCourses = `
      SELECT 
        c.*,  
        t.name AS teacher_name, 
        t.image AS teacher_image,
        u.level,  
        IFNULL(AVG(cm.rating), 0) AS rating,
        COUNT(cm.id) AS review_count
      FROM courses c
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN comments cm ON c.id = cm.course_id
      WHERE c.teacher_id = ?
      GROUP BY c.id, t.id, u.level
    `

    const [courses] = await pool.query(sqlCourses, [teacherId])

    console.log(`📌 獲取的課程資料:`, courses)
    res.json(courses)
  } catch (error) {
    console.error('❌ 獲取課程失敗:', error)
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
