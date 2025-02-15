// 專門處理「課程 API」的檔案
// 1.定義 /api/courses 相關的 API
// 2.連接 MySQL，查詢/新增/修改/刪除課程

import pool from '../db.js'
import express from 'express'

const router = express.Router()

// 取得所有課程（支援搜尋 & 排序）
router.get('/', async (req, res) => {
  try {
    console.log('🌍 API 收到請求：', req.query) // ✅ 看看前端傳了什麼參數

    let { search, sort } = req.query
    let query = `
      SELECT 
        c.*,  
        t.name AS teacher_name, 
        t.image AS teacher_image,
        IFNULL(AVG(cm.rating), 0) AS rating,
        COUNT(cm.id) AS review_count
      FROM courses c
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN comments cm ON c.id = cm.course_id
    `

    let filters = []
    let params = []

    if (search) {
      filters.push(`(c.title LIKE ? OR t.name LIKE ?)`)
      params.push(`%${search}%`, `%${search}%`)
    }

    if (filters.length) {
      query += ` WHERE ` + filters.join(' AND ')
    }

    query += ` GROUP BY c.id, t.id`

    if (sort) {
      if (sort === 'popular') query += ` ORDER BY c.student_count DESC`
      if (sort === 'new') query += ` ORDER BY c.created_at DESC`
      if (sort === 'low-price') query += ` ORDER BY c.sale_price ASC`
      if (sort === 'high-price') query += ` ORDER BY c.sale_price DESC`
    }

    console.log('📢 執行的 SQL：', query, params)

    const result = await pool.query(query, params)
    const courses = result[0] // ✅ 確保 courses 是陣列

    console.log('✅ 從資料庫獲取的課程：', courses)
    res.json(courses)
  } catch (error) {
    console.error('❌ 取得課程失敗:', error.stack) // 🔥 這裡會顯示完整錯誤
    res.status(500).json({ error: '無法取得課程資料', details: error.message })
  }
})

// 取得單一課程
router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const sql = `
      SELECT 
          c.*,  
          t.name AS teacher_name, 
          t.image AS teacher_image,
          IFNULL(AVG(cm.rating), 0) AS rating, 
          COUNT(cm.id) AS comment_count
      FROM courses c
      JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN comments cm ON c.id = cm.course_id -- ✅ 確保評論數據被 JOIN
      WHERE c.id = ?
      GROUP BY c.id, t.id; -- ✅ 確保 GROUP BY 正確
    `
    const [rows] = await pool.execute(sql, [id])

    if (rows.length === 0) {
      return res.status(404).json({ error: '找不到該課程' })
    }

    res.json(rows[0])
  } catch (error) {
    console.error('❌ 無法獲取課程:', error)
    res.status(500).json({ error: '無法獲取課程' })
  }
})

// 取得特定課程的所有評論
router.get('/:id/comments', async (req, res) => {
  const { id } = req.params
  try {
    const sql = `
      SELECT 
      cm.*
      FROM comments cm
      WHERE cm.course_id = ?
      ORDER BY cm.created_at DESC;
    `

    const [comments] = await pool.execute(sql, [id])

    res.json(comments)
  } catch (error) {
    console.error('❌ 無法獲取課程評論:', error)
    res.status(500).json({ error: '無法獲取課程評論' })
  }
})

export default router

// **取得同分類課程**
router.get('/related/:category', async (req, res) => {
  const category = req.params.category

  try {
    const sql = `
      SELECT c.id, c.title, c.image_url, c.sale_price, c.student_count, 
       COALESCE(AVG(cm.rating), 0) AS rating, 
       t.name AS teacher_name
      FROM courses c
      JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN comments cm ON c.id = cm.course_id
      WHERE c.category = ?  
      GROUP BY c.id, t.name
ORDER BY RAND()
      LIMIT 4;
    `

    const [rows] = await pool.execute(sql, [category])

    res.json(rows)
  } catch (error) {
    console.error('❌ 無法獲取相關課程:', error)
    res.status(500).json({ error: '無法獲取相關課程' })
  }
})
