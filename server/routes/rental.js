import express from 'express'
import pool from '../db.js'

const router = express.Router()

// 獲取所有租借商品列表（包含圖片與 Hashtag）
// 取得所有租借商品、標籤、並支援搜尋
router.get('/', async (req, res) => {
  try {
    const { query } = req.query

    // 取得所有租借商品
    let rentalQuery = `
      SELECT 
        r.*, 
        GROUP_CONCAT(DISTINCT ri.url ORDER BY COALESCE(ri.sequence, 999) ASC) AS images,
        GROUP_CONCAT(DISTINCT t.tags) AS hashtags
      FROM rental r
      LEFT JOIN rent_image ri ON r.id = ri.rent_id
      LEFT JOIN rent_hashtag rh ON r.id = rh.rent_id
      LEFT JOIN rent_tags t ON rh.rent_tags_id = t.id
      WHERE 1=1
    `

    let queryParams = []

    // 如果有搜尋關鍵字
    if (query) {
      rentalQuery += ` AND (r.name LIKE ? OR r.summary LIKE ? OR t.tags LIKE ?) `
      queryParams.push(`%${query}%`, `%${query}%`, `%${query}%`)
    }

    rentalQuery += ` GROUP BY r.id`

    const [rentals] = await pool.query(rentalQuery, queryParams)
    rentals.forEach((rental) => {
      rental.images = rental.images ? rental.images.split(',') : []
      rental.hashtags = rental.hashtags ? rental.hashtags.split(',') : []
    })

    // 取得所有標籤
    const [tags] = await pool.query(
      `SELECT id, tags FROM rent_tags ORDER BY sequence ASC`
    )

    res.json({ success: true, rentals, tags: tags || [] }) // ✅ 確保 tags 預設為 []
  } catch (error) {
    console.error('❌ 錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

// 獲取單一租借商品詳細資訊（包含圖片與 Hashtag）
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    // 取得商品詳細資訊
    const [rental] = await pool.query(
      `
      SELECT 
          r.*, 
          GROUP_CONCAT(DISTINCT ri.url ORDER BY ri.sequence ASC) AS images,
          GROUP_CONCAT(DISTINCT t.tags) AS hashtags
      FROM rental r
      LEFT JOIN rent_image ri ON r.id = ri.rent_id
      LEFT JOIN rent_hashtag rh ON r.id = rh.rent_id
      LEFT JOIN rent_tags t ON rh.rent_tags_id = t.id
      WHERE r.id = ?
      GROUP BY r.id
      `,
      [id]
    )

    if (rental.length === 0) {
      return res.status(404).json({ success: false, error: '找不到該商品' })
    }

    // 轉換 images 和 hashtags 格式
    rental[0].images = rental[0].images ? rental[0].images.split(',') : []
    rental[0].hashtags = rental[0].hashtags ? rental[0].hashtags.split(',') : []

    // **獲取推薦商品（基於 `rent_recommend`）**
    const [recommendations] = await pool.query(
      `
      SELECT 
          r.*, 
          GROUP_CONCAT(DISTINCT ri.url ORDER BY ri.sequence ASC) AS images,
          GROUP_CONCAT(DISTINCT t.tags) AS hashtags
      FROM rent_recommend rr
      INNER JOIN rental r ON rr.recommend_id = r.id
      LEFT JOIN rent_image ri ON r.id = ri.rent_id
      LEFT JOIN rent_hashtag rh ON r.id = rh.rent_id
      LEFT JOIN rent_tags t ON rh.rent_tags_id = t.id
      WHERE rr.rent_id = ?
      GROUP BY r.id
      ORDER BY rr.sequence ASC -- 確保推薦順序
      `,
      [id]
    )

    recommendations.forEach((rental) => {
      rental.images = rental.images ? rental.images.split(',') : []
      rental.hashtags = rental.hashtags ? rental.hashtags.split(',') : []
    })

    // **回傳完整數據**
    res.json({ success: true, data: rental[0], recommendations })
  } catch (error) {
    console.error('❌ 資料庫錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

export default router
