import express from 'express'
import pool from '../db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

// 會員認證(回傳Token含式)
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, error: '未授權，請先登入' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  } catch (error) {
    console.error('JWT 驗證失敗:', error.name, error.message)
    return res.status(403).json({ success: false, error: '無效的 Token' })
  }
}

// 📌 統一 API - 獲取商品資料 & 篩選選項
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    let user_id = null;

    // 🚀 若有 Token，解析取得 user_id
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        user_id = decoded.id;
      } catch (error) {
        console.error('JWT 驗證失敗:', error.message);
      }
    }

    const { query, category, advanced, brands } = req.query

    // ✅ 用途篩選邏輯 (動態映射)
    const categoryMapping = {
      日常攝影: {
        hashtags: ['輕便', '4K錄影', '超廣角', '多功能'],
        types: ['APS-C相機', '標準變焦鏡頭', '廣角定焦鏡頭', '腳架', '麥克風'],
      },
      專業攝影: {
        hashtags: ['高畫質', '旗艦', '高階款', '專業級', '人像'],
        types: [
          '全幅相機',
          '標準定焦鏡頭',
          '望遠變焦鏡頭',
          '廣角定焦鏡頭',
          '閃光燈',
          '轉接環',
        ],
      },
      影像創作: {
        hashtags: ['Vlog', '4K錄影', '8K錄影', '音訊', '防手震'],
        types: [
          'APS-C相機',
          '全幅相機',
          '標準變焦鏡頭',
          '廣角變焦鏡頭',
          '麥克風',
          '腳架',
        ],
      },
      戶外運動: {
        hashtags: ['高速快門', '連拍', '自動對焦', '防手震', '超望遠'],
        types: ['全幅相機', '望遠變焦鏡頭', '望遠定焦鏡頭', '腳架', '閃光燈'],
      },
      旅遊拍攝: {
        hashtags: ['旅行', '輕便', '熱靴', '多功能', '大光圈'],
        types: [
          'APS-C相機',
          '全幅相機',
          '廣角變焦鏡頭',
          '標準變焦鏡頭',
          '腳架',
          '麥克風',
        ],
      },
      產品攝影: {
        hashtags: ['微距', '大光圈', '高階款', '專業級'],
        types: [
          '全幅相機',
          '微距鏡頭',
          '標準定焦鏡頭',
          '廣角定焦鏡頭',
          '轉接環',
          '閃光燈',
          '腳架',
        ],
      },
    }

    // ✅ 用 "全部" 作為預設選項，並動態添加 categoryMapping 中的用途分類
    const categoryOptions = ['全部', ...Object.keys(categoryMapping)]

    // ✅ 組織商品查詢語句
    let rentalQuery = `
      SELECT 
          r.*, 
          GROUP_CONCAT(DISTINCT ri.url ORDER BY COALESCE(ri.sequence, 999) ASC) AS images,
          GROUP_CONCAT(DISTINCT t.tags) AS hashtags,
          IFNULL(reviews.total_reviews, 0) AS total_reviews,
          IFNULL(reviews.average_rating, 0) AS average_rating      
      `;

    // 🚀 若用戶已登入，加入收藏關聯
    if (user_id) {
      rentalQuery += `, IF(c.user_id IS NOT NULL, TRUE, FALSE) AS is_favorite `;
    }

    rentalQuery += `
          FROM rental r
          LEFT JOIN rent_image ri ON r.id = ri.rent_id
          LEFT JOIN rent_hashtag rh ON r.id = rh.rent_id
          LEFT JOIN rent_tags t ON rh.rent_tags_id = t.id

          -- 🚦 單獨計算評論數據，避免重複統計
          LEFT JOIN (
              SELECT 
                  ur.rent_id, 
                  COUNT(*) AS total_reviews, 
                  ROUND(AVG(ur.rating), 1) AS average_rating
              FROM user_rentals ur
              WHERE ur.status = '已完成'
              AND ur.comment IS NOT NULL
              AND ur.comment_at IS NOT NULL  -- ✅ 過濾軟刪除評論
              GROUP BY ur.rent_id
          ) AS reviews ON reviews.rent_id = r.id
        `;

    // ✅ 若用戶已登入，則 `JOIN collection` 取得收藏狀態
    if (user_id) {
      rentalQuery += ` LEFT JOIN collection c ON r.id = c.rent_id AND c.user_id = ? `;
    }

    rentalQuery += ` WHERE 1=1 `; // ✅ 確保篩選條件可以正常拼接

    let queryParams = user_id ? [user_id] : [];

    // 🔍 搜尋功能 (支援名稱、摘要、標籤模糊搜尋)
    if (query) {
      rentalQuery += ` AND (r.name LIKE ? OR r.summary LIKE ? OR t.tags LIKE ?) `
      queryParams.push(`%${query}%`, `%${query}%`, `%${query}%`)
    }

    // ✅ 用途篩選 (簡單篩選)
    if (category && category !== '全部' && categoryMapping[category]) {
      const { hashtags, types } = categoryMapping[category]

      let orConditions = []


      // 🟢 設備篩選 (允許 OR 查詢)
      if (types.length > 0) {
        const typeCondition = `
          (r.cam_kind IN (${types.map(() => '?').join(',')}) OR 
          r.len_kind IN (${types.map(() => '?').join(',')}) OR 
          r.acc_kind IN (${types.map(() => '?').join(',')}))`
        orConditions.push(typeCondition)
        queryParams.push(...types, ...types, ...types)
      }

      // 🟢 將 Hashtags 和 Types 的條件用 OR 連接
      if (orConditions.length > 0) {
        rentalQuery += ` AND (${orConditions.join(' OR ')})`
      }
    }

    // ✅ 設備篩選 (進階篩選)
    if (advanced) {
      const advancedList = Array.isArray(advanced) ? advanced : [advanced]
      rentalQuery += ` AND (
        r.cam_kind IN (${advancedList.map(() => '?').join(',')}) OR 
        r.len_kind IN (${advancedList.map(() => '?').join(',')}) OR 
        r.acc_kind IN (${advancedList.map(() => '?').join(',')})
      ) `
      queryParams.push(...advancedList, ...advancedList, ...advancedList)
    }

    // ✅ 品牌篩選（支援 "其他" 選項）
    if (brands) {
      const brandList = Array.isArray(brands) ? brands : [brands]

      if (brandList.length === 1 && brandList[0] === '其他') {
        rentalQuery += ` AND r.brand IS NULL `
      } else if (brandList.includes('其他')) {
        rentalQuery += ` AND (r.brand IN (${brandList
          .filter((b) => b !== '其他')
          .map(() => '?')
          .join(',')}) OR r.brand IS NULL) `
        queryParams.push(...brandList.filter((b) => b !== '其他'))
      } else {
        rentalQuery += ` AND r.brand IN (${brandList
          .map(() => '?')
          .join(',')}) `
        queryParams.push(...brandList)
      }
    }


    const [rentals] = await pool.query(rentalQuery, queryParams)
    rentals.forEach((rental) => {
      rental.images = rental.images ? rental.images.split(',') : []
      rental.hashtags = rental.hashtags ? rental.hashtags.split(',') : []
    })

    // 取得所有標籤
    const [tags] = await pool.query(
      `SELECT id, tags FROM rent_tags ORDER BY sequence ASC`
    )

    // ✅ 完整的回傳資料，包括所有前端所需的篩選選項
    res.json({
      success: true,
      rentals,
      tags: tags || [],
      categories: categoryOptions,
      equipment: [
        '全幅相機',
        'APS-C相機',
        '廣角變焦鏡頭',
        '標準變焦鏡頭',
        '望遠變焦鏡頭',
        '廣角定焦鏡頭',
        '標準定焦鏡頭',
        '望遠定焦鏡頭',
        '轉接環',
        '閃光燈',
        '麥克風',
        '腳架',
      ],
      brands: ['Canon', 'Sony', 'Nikon', 'Leica', '其他'],
    })
  } catch (error) {
    console.error('❌ 錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

/* 商品細節頁 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const token = req.headers.authorization?.split(' ')[1]
    let user_id = null

    // 🚀 解析 JWT Token 取得 `user_id`
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        user_id = decoded.id
      } catch (error) {
        console.error('JWT 驗證錯誤:', error.message)
      }
    }

    // 1.獲取單一租借商品詳細資訊（包含圖片與 Hashtag）
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

    // 格式化 images 和 hashtags
    rental[0].images = rental[0].images ? rental[0].images.split(',') : []
    rental[0].hashtags = rental[0].hashtags ? rental[0].hashtags.split(',') : []

    // 2. 獲取商品評論
    const [reviews] = await pool.query(`
        SELECT 
            ur.user_id, 
            IF(TRIM(u.nickname) = '', u.name, u.nickname) AS name,
            IF(u.head IS NULL OR TRIM(u.head) = '', '/uploads/users.webp', u.head) AS avatar,
            ur.rating, 
            ur.comment, 
            ur.comment_at,
            ur.rent_id
        FROM user_rentals ur
        INNER JOIN users u ON ur.user_id = u.id
        WHERE ur.rent_id = ?
        AND ur.status = '已完成'
        AND ur.comment IS NOT NULL
        AND ur.comment_at IS NOT NULL  -- ✅ 過濾軟刪除評論
        ORDER BY ur.comment_at DESC
      `,
      [id]
    );

    // 3.獲取推薦商品（基於 `rent_recommend`）
    let recommendQuery = `
        SELECT 
            r.*, 
            GROUP_CONCAT(DISTINCT ri.url ORDER BY ri.sequence ASC) AS images,
            GROUP_CONCAT(DISTINCT t.tags) AS hashtags,
            IFNULL(reviews.total_reviews, 0) AS total_reviews,
            IFNULL(reviews.average_rating, 0) AS average_rating
        `
    // 🚀 若用戶已登入，加入收藏狀態
    if (user_id) {
      recommendQuery += `, IF(c.user_id IS NOT NULL, TRUE, FALSE) AS is_favorite `
    }

    recommendQuery += `
        FROM rent_recommend rr
        INNER JOIN rental r ON rr.recommend_id = r.id
        LEFT JOIN rent_image ri ON r.id = ri.rent_id
        LEFT JOIN rent_hashtag rh ON r.id = rh.rent_id
        LEFT JOIN rent_tags t ON rh.rent_tags_id = t.id
        LEFT JOIN (
            SELECT 
                ur.rent_id, 
                COUNT(*) AS total_reviews, 
                ROUND(AVG(ur.rating), 1) AS average_rating
            FROM user_rentals ur
            WHERE ur.status = '已完成'
            AND ur.comment IS NOT NULL
            AND ur.comment_at IS NOT NULL
            GROUP BY ur.rent_id
        ) AS reviews ON reviews.rent_id = r.id

      `
    // 🚀 若用戶已登入，則 `JOIN collection` 取得收藏狀態
    if (user_id) {
      recommendQuery += ` LEFT JOIN collection c ON r.id = c.rent_id AND c.user_id = ? `
    }
    recommendQuery += `
        WHERE rr.rent_id = ?
        GROUP BY r.id
        ORDER BY rr.sequence ASC;
      `

    // ✅ 執行推薦商品查詢
    const queryParams = user_id ? [user_id, id] : [id]
    const [recommendations] = await pool.query(recommendQuery, queryParams)

    // 🚦 格式化推薦商品圖片與標籤
    recommendations.forEach((rental) => {
      rental.images = rental.images ? rental.images.split(',') : []
      rental.hashtags = rental.hashtags ? rental.hashtags.split(',') : []
    })

    // 🚦 回傳完整數據
    res.json({
      success: true,
      data: rental[0],
      reviews,
      recommendations,
    });
  } catch (error) {
    console.error('❌ 資料庫錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

// ✅ 新增收藏 (允許多商品收藏)
router.post('/collection', auth, async (req, res) => {
  try {
    const { rent_id } = req.body
    const user_id = req.user.id

    if (!rent_id) {
      return res.status(400).json({ success: false, error: 'rent_id 為必填項目' })
    }

    await pool.query(
      'INSERT INTO collection (user_id, rent_id, created_at) VALUES (?, ?, NOW())',
      [user_id, rent_id]
    )

    res.json({ success: true, message: '已成功收藏租借商品' })
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ success: false, message: '該商品已經收藏' })
    }
    console.error('新增收藏錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

// ✅ 取消收藏
router.delete('/collection', auth, async (req, res) => {
  try {
    console.log("收到取消收藏請求:", req.body)

    const { rent_id } = req.body
    const user_id = req.user.id

    if (!rent_id) {
      return res.status(400).json({ success: false, error: 'rent_id 為必填項目' })
    }

    const [result] = await pool.query(
      'DELETE FROM collection WHERE user_id = ? AND rent_id = ?',
      [user_id, rent_id]
    )

    console.log("資料庫刪除結果:", result) // ✅ 確保 affectedRows > 0
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: '收藏記錄不存在' })
    }

    console.log("✅ 成功取消收藏，回應 success: true") // 確保這行執行
    res.json({ success: true, message: '成功取消收藏' })
  } catch (error) {
    console.error('取消收藏錯誤:', error)
    res.status(500).json({ success: false, error: '伺服器錯誤' })
  }
})

// ✅ 檢查是否已收藏
// router.get('/collection/:rent_id', auth, async (req, res) => {
//   try {
//     const { rent_id } = req.params
//     const user_id = req.user.id

//     const [result] = await pool.query(
//       'SELECT * FROM collection WHERE user_id = ? AND rent_id = ?',
//       [user_id, rent_id]
//     )

//     res.json({ success: true, isFavorite: result.length > 0 })
//   } catch (error) {
//     console.error('檢查收藏狀態錯誤:', error)
//     res.status(500).json({ success: false, error: '伺服器錯誤' })
//   }
// })


// 評論 (之後會需要改) 還是需要唯一值ID
router.post('/reviews', auth, async (req, res) => {
  try {
    const rent_id = parseInt(req.body.rent_id, 10) || 0;
    const rating = parseInt(req.body.rating, 10) || 0;
    const comment = req.body.comment?.trim() || '';
    const user_id = req.user.id;

    console.log('rent_id:', rent_id);
    console.log('user_id:', user_id);
    console.log('rating:', rating);
    console.log('comment:', comment);

    if (rent_id <= 0 || rating <= 0 || !comment) {
      return res.status(400).json({ success: false, error: '評論資料不完整' });
    }

    // 檢查是否有「已完成」但「尚未評論」的租借記錄
    const [rentalCheck] = await pool.query(
      'SELECT * FROM user_rentals WHERE rent_id = ? AND user_id = ? AND status = "已完成"',
      [rent_id, user_id]
    );

    console.log('查詢到的租借記錄:', rentalCheck);

    if (rentalCheck.length === 0) {
      return res.status(400).json({ success: false, error: '您尚未完成該商品的租借，無法留言' });
    }

    // 更新評論，將 comment_at 設置為當前時間
    await pool.query(
      `UPDATE user_rentals 
           SET rating = ?, comment = ?, comment_at = NOW() 
           WHERE rent_id = ? AND user_id = ?`,
      [rating, comment, rent_id, user_id]
    );

    res.json({ success: true, message: '評論已成功提交' });
  } catch (error) {
    console.error('新增評論錯誤:', error);
    res.status(500).json({ success: false, error: '伺服器錯誤' });
  }
});



export default router
