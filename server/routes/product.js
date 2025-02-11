import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_DATABASE || "camera",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.get("/", async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    
    const [rows] = await connection.query(`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        i.image_url
      FROM product p
      LEFT JOIN image i ON p.id = i.product_id AND i.is_main = 1  -- ✅ 只抓主圖
      ORDER BY p.id ASC
    `);

    connection.release();

    res.json(rows); 
  } catch (error) {
    console.error("獲取商品錯誤:", error);
    res.status(500).json({ error: "無法獲取商品", details: error.message });
  }
});

export default router; 
