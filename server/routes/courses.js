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
  c.id, 
  c.title, 
  t.name AS teacher_name, 
  c.original_price, 
  c.sale_price, 
  c.image_url, 
  c.student_count,
  IFNULL(AVG(cm.rating), 0) AS rating,
  COUNT(cm.id) AS review_count
FROM courses c
LEFT JOIN teacher t ON c.teacher_id = t.id
LEFT JOIN comments cm ON c.id = cm.course_id
GROUP BY c.id, t.name;
    `);

    console.log("📢 從資料庫獲取的課程資料：", courses);
    res.json(courses);
  } catch (error) {
    console.error("❌ 取得課程失敗：", error.message);
    res.status(500).json({ error: "無法取得課程資料" });
  }
});


// 取得單一課程
router.get('/:id', async (req, res) => {
  const [course] = await pool.query('SELECT * FROM courses WHERE id = ?', [
    req.params.id,
  ])
  res.json(course[0])
})

export default router
