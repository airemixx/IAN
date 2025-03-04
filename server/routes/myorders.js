import express, { json } from "express";
import jwt from "jsonwebtoken";
import db from "../db.js";

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

router.get("/rent", checkToken, async (req, res) => {
  try {
    const connection = await db.getConnection();
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



//user end //
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


export default router;