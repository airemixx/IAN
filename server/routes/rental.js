import express from 'express'
import pool from '../db.js'

const router = express.Router()

// 獲取所有租借商品列表（包含圖片與 Hashtag）
router.get('/', async (req, res) => {
  try {
    const [rentals] = await pool.query(`
            SELECT 
                r.*, 
                GROUP_CONCAT(DISTINCT ri.url ORDER BY COALESCE(ri.sequence, 999) ASC) AS images,
                GROUP_CONCAT(DISTINCT t.tags) AS hashtags
            FROM rental r
            LEFT JOIN rent_image ri ON r.id = ri.rent_id
            LEFT JOIN rent_hashtag rh ON r.id = rh.rent_id
            LEFT JOIN rent_tags t ON rh.rent_tags_id = t.id
            GROUP BY r.id
        `)

    rentals.forEach((rental) => {
      rental.images = rental.images ? rental.images.split(',') : []
      rental.hashtags = rental.hashtags ? rental.hashtags.split(',') : []
    })

    res.json({ success: true, data: rentals })
  } catch (error) {
    console.error('❌ 資料庫錯誤：', error) // 顯示詳細錯誤
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

// 獲取單一租借商品詳細資訊（包含圖片與 Hashtag）
router.get('/:id', async (req, res) => {
  try {
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
      [req.params.id]
    )

    if (rental.length === 0) {
      return res.status(404).json({ success: false, error: '找不到該商品' })
    }

    // ✅ 檢查 SQL 回傳的數據
    console.log('SQL 查詢結果:', rental[0])

    // ✅ 確保 images 是陣列
    rental[0].images = rental[0].images ? rental[0].images.split(',') : []
    // ✅ 確保 hashtags 是陣列
    rental[0].hashtags = rental[0].hashtags ? rental[0].hashtags.split(',') : []

    // ✅ 最終確認 API 要回傳的數據
    console.log('最終 API 回傳的數據:', rental[0])

    res.json({ success: true, data: rental[0] })
  } catch (error) {
    console.error('資料庫錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

export default router
