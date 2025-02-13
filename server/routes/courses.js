// 專門處理「課程 API」的檔案
// 1.定義 /api/courses 相關的 API
// 2.連接 MySQL，查詢/新增/修改/刪除課程

import pool from '../db.js'
import express from 'express'

const router = express.Router()

// 取得所有課程
router.get('/', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT 
        c.*,  -- ✅ 取得 courses 表的所有欄位
        t.name AS teacher_name, 
        t.image AS teacher_image,
        IFNULL(AVG(cm.rating), 0) AS rating,
        COUNT(cm.id) AS review_count
      FROM courses c
      LEFT JOIN teachers t ON c.teacher_id = t.id
      LEFT JOIN comments cm ON c.id = cm.course_id
      GROUP BY c.id, t.id;
    `)

    console.log('📢 從資料庫獲取的課程資料：', courses)
    res.json(courses)
  } catch (error) {
    console.error('❌ 取得課程失敗：', error.message)
    res.status(500).json({ error: '無法取得課程資料' })
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
  const { id } = req.params;
  try {
    const sql = `
      SELECT 
      cm.*
      FROM comments cm
      WHERE cm.course_id = ?
      ORDER BY cm.created_at DESC;
    `;

    const [comments] = await pool.execute(sql, [id]);

    res.json(comments);
  } catch (error) {
    console.error('❌ 無法獲取課程評論:', error);
    res.status(500).json({ error: '無法獲取課程評論' });
  }
});

export default router
