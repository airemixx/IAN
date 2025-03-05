import express, { json } from "express";
import pool from "../db.js";
import authenticate from '../middlewares.js';
import jwt from "jsonwebtoken";

const portNum = 3005;

const whiteList = ["http://localhost:5500", "http://localhost:8000", "http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許連線"));
    }
  },
};

const secretKey = process.env.JWT_SECRET_KEY;
const router = express.Router();

//我的租賃//
router.get("/rent", checkToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const userId = req.decoded.id;

    console.log("🔍 獲取用戶 ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "無效的用戶 ID" });
    }

    const [products] = await connection.query(
      `SELECT 
    ur.id AS rental_order_id, 
    ur.user_id, 
    ur.rent_id, 
    ur.rent_fee, 
    ur.start_date, 
    ur.end_date, 
    ur.status, 
    ur.rating, 
    ur.comment, 
    ur.comment_at, 
    u.name AS user_name, 
    r.name AS product_name, 
    r.brand AS brand_name,
    r.fee, 
    r.stock, 
    r.status AS availability, 
    CONCAT('/images/rental/', COALESCE(
        (SELECT ri.url FROM rent_image ri WHERE ri.rent_id = ur.rent_id ORDER BY ri.sequence ASC LIMIT 1), 
        'default'
    ), '.png') AS image_url
    FROM user_rentals ur
    JOIN users u ON ur.user_id = u.id
    JOIN rental r ON ur.rent_id = r.id
    WHERE ur.user_id = ?
    ORDER BY ur.start_date DESC;
`,
      [userId]
    );

    console.log("🔍 SQL 查詢結果:", products);
    connection.release();

    if (products.length === 0) {
      return res.json({ products: [] });
    }

    res.json({ products });
  } catch (error) {
    console.error("🚨 取得租賃訂單錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤", details: error.message });
  }
});

//我的租賃 end 

//我的課程
router.get("/course", checkToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const userId = req.decoded.id;

    console.log("🔍 獲取用戶 ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "無效的用戶 ID" });
    }

    const [courses] = await connection.query(
      `SELECT 
    uc.id AS course_order_id, 
    uc.user_id, 
    uc.courses_id,
    uc.name AS course_name,
    uc.price,
    c.title,
    c.image_url AS course_image,
    c.teacher_id AS instructor,
    t.name AS instructor_name 
    FROM user_courses uc
    JOIN users u ON uc.user_id = u.id
    JOIN courses c ON uc.courses_id = c.id
    JOIN teachers t ON c.teacher_id = t.id
    WHERE uc.user_id = ?
    ORDER BY uc.id DESC;
`,
      [userId]
    );

    console.log("🔍 SQL 查詢結果:", courses);
    connection.release();

    if (courses.length === 0) {
      return res.json({ courses: [] });
    }

    res.json({ courses });
  } catch (error) {
    console.error("🚨 取得租賃訂單錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤", details: error.message });
  }
});


//我的課程 end

//order
router.get("/order", checkToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const userId = req.decoded.id;

    console.log("🔍 獲取用戶 ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "無效的用戶 ID" });
    }

    const [orders] = await connection.query(
      `SELECT 
            'course' AS item_type,
            uc.id AS order_id, 
            uc.user_id, 
            uc.courses_id AS item_id,
            uc.name COLLATE utf8mb4_unicode_ci AS item_name,
            uc.price,
            c.title COLLATE utf8mb4_unicode_ci AS title,
            c.image_url COLLATE utf8mb4_unicode_ci AS item_image,
            c.teacher_id AS instructor,
            t.name COLLATE utf8mb4_unicode_ci AS instructor_name,
            CAST(NULL AS DECIMAL(10,2)) AS rent_fee,
            CAST(NULL AS DATE) AS start_date,
            CAST(NULL AS DATE) AS end_date,
            CAST(NULL AS INT) AS amount
         FROM user_courses uc
         JOIN users u ON uc.user_id = u.id
         JOIN courses c ON uc.courses_id = c.id
         JOIN teachers t ON c.teacher_id = t.id
         WHERE uc.user_id = ?
         
         UNION ALL
      
         SELECT 
            'product' AS item_type,
            up.id AS order_id, 
            up.user_id, 
            up.product_id AS item_id,
            p.name COLLATE utf8mb4_unicode_ci AS item_name,
            up.price,
            CAST(NULL AS CHAR) AS title,
            i.image_url COLLATE utf8mb4_unicode_ci AS item_image,
            CAST(NULL AS INT) AS instructor,
            CAST(NULL AS CHAR) AS instructor_name,
            CAST(NULL AS DECIMAL(10,2)) AS rent_fee,
            CAST(NULL AS DATE) AS start_date,
            CAST(NULL AS DATE) AS end_date,
            up.amount
         FROM user_product up
         JOIN users u ON up.user_id = u.id
         JOIN product p ON up.product_id = p.id
         JOIN image i ON up.product_id = i.product_id
         WHERE up.user_id = ?
         
         UNION ALL
      
         SELECT 
            'rental' AS item_type,
            ur.id AS order_id, 
            ur.user_id, 
            ur.rent_id AS item_id,
            r.name COLLATE utf8mb4_unicode_ci AS item_name,
            CAST(NULL AS DECIMAL(10,2)) AS price,
            CAST(NULL AS CHAR) AS title,
            i.url COLLATE utf8mb4_unicode_ci AS item_image,
            CAST(NULL AS INT) AS instructor,
            CAST(NULL AS CHAR) AS instructor_name,
            ur.rent_fee,
            ur.start_date,
            ur.end_date,
            CAST(NULL AS INT) AS amount
         FROM user_rentals ur
         JOIN users u ON ur.user_id = u.id
         JOIN rental r ON ur.rent_id = r.id
         JOIN rent_image i ON ur.rent_id = i.rent_id
         WHERE ur.user_id = ?
      
         ORDER BY order_id DESC;
        `,
      [userId, userId, userId]
    );


    console.log("🔍 SQL 查詢結果:", orders);
    connection.release();

    if (orders.length === 0) {
      return res.json({ orders: [] });
    }

    res.json({ orders });
  } catch (error) {
    console.error("🚨 取得租賃訂單錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤", details: error.message });
  }
});

//order end


function checkToken(req, res, next) {
  let token = req.get("Authorization");

  console.log("🔍 收到 Token:", token); // ✅ 檢查 Token 是否存在

  if (!token) {
    console.log("❌ Token 不存在，請求被拒絕");
    return res.status(401).json({ status: "error", message: "未提供驗證資料，請重新登入" });
  }

  if (!token.startsWith("Bearer ")) {
    console.log("❌ Token 格式錯誤:", token);
    return res.status(401).json({ status: "error", message: "驗證格式錯誤，請重新登入" });
  }

  token = token.slice(7); // ✅ 移除 "Bearer " 前綴

  console.log("🔍 解析 Token:", token);

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("❌ Token 驗證失敗:", err.message);
      return res.status(401).json({ status: "error", message: "驗證失敗或已過期，請重新登入" });
    }

    console.log("✅ Token 驗證成功:", decoded);
    req.decoded = decoded;
    next();
  });
}
//coupon
router.get("/coupon", checkToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const userId = req.decoded.id;

    console.log("🔍 獲取用戶 ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "無效的用戶 ID" });
    }

    // 取得用戶的優惠券
    const [coupons] = await connection.query(
      `SELECT 
          uc.id AS user_coupon_id,
          uc.user_id,
          uc.coupon_id,
          uc.quantity,
          uc.created_at,  -- 用戶領取優惠券的時間
          c.name AS coupon_name,
          c.coupon_code,
          c.discount_type,
          c.start_date,
          c.end_date,
          c.discount,
          c.lower_purchase,
          c.img AS coupon_image,
          c.type AS coupon_type
       FROM user_coupon uc
       JOIN coupon c ON uc.coupon_id = c.id
       WHERE uc.user_id = ?
       ORDER BY uc.created_at DESC;`,  
      [userId]
    );

    console.log("🔍 SQL 查詢結果:", coupons);
    connection.release();

    if (coupons.length === 0) {
      return res.json({ coupons: [] });
    }

    res.json({ coupons });
  } catch (error) {
    console.error("🚨 取得優惠券錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤", details: error.message });
  }
});


//coupon end

/* PK專用 */

// 更新評論 API
router.put('/rent/reviews/:id', authenticate, async (req, res) => {
  try {
    console.log("🔍 收到的評論資料:", req.body); // ✅ 這行新增來 debug


    const { id } = req.params;
    const { comment, rating } = req.body;
    const userId = req.user.id;

    if (!comment || rating === undefined) {
      return res.status(400).json({ success: false, error: '評論內容與評分不得為空' });
    }



    // 檢查訂單是否符合條件
    const [rental] = await pool.query(
      `SELECT status, comment_at FROM user_rentals WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    if (rental.length === 0) {
      return res.status(404).json({ success: false, error: '找不到符合條件的訂單' });
    }

    const { status, comment_at } = rental[0];

    if (status !== '已完成') {
      return res.status(400).json({ success: false, error: '僅已完成的訂單才能評論' });
    }

    if (comment_at !== null) {
      return res.status(400).json({ success: false, error: '評論已提交，無法修改' });
    }

    // 更新評論與評分，並設定評論時間
    await pool.query(
      `UPDATE user_rentals SET comment = ?, rating = ?, comment_at = NOW() WHERE id = ? AND user_id = ?`,
      [comment, rating, id, userId]
    );

    res.json({ success: true, message: '評論已成功提交' });
  } catch (error) {
    console.error('❌ 更新評論錯誤:', error);
    res.status(500).json({ success: false, error: '伺服器錯誤' });
  }
});

/* PK專用 */

export default router;