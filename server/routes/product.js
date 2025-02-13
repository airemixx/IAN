import express from "express";
import mysql from "mysql2/promise";

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "admin",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_DATABASE || "lenstudio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

router.get("/", async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    
    // 取得查詢參數
    const { brand_id, category_id, subcategory_id,min_price, max_price } = req.query;
    
    
    // 構建 SQL 查詢條件
    let whereClause = "WHERE 1=1";
    const queryParams = [];

    if (brand_id) {
      whereClause += " AND p.brand_id = ?";
      queryParams.push(brand_id);
    }

    if (category_id) {
      whereClause += " AND p.category_id = ?";
      queryParams.push(category_id);
    }

    if (subcategory_id) {
      whereClause += " AND p.subcategory_id = ?";
      queryParams.push(subcategory_id);
    }

   // ✅ 確保 `min_price` 和 `max_price` 只有在用戶輸入時才會加入查詢
   const minPriceNum = min_price ? Number(min_price) : null;
   const maxPriceNum = max_price ? Number(max_price) : null;

   if (!isNaN(minPriceNum) && minPriceNum !== null) {
     whereClause += " AND p.price >= ?";
     queryParams.push(minPriceNum);
   }

   if (!isNaN(maxPriceNum) && maxPriceNum !== null) {
     whereClause += " AND p.price <= ?";
     queryParams.push(maxPriceNum);
   }
    // 執行 SQL 查詢
    const [rows] = await connection.query(`
      SELECT 
        p.id, 
        p.name, 
        p.price, 
        p.brand_id, 
        p.category_id, 
        p.subcategory_id, 
        b.brand_name AS brand_name,  
        CONCAT('/images/product/', COALESCE(i.image_url, 'default.jpg')) AS image_url
      FROM product p
      LEFT JOIN brand b ON p.brand_id = b.brand_id
      LEFT JOIN image i ON p.id = i.product_id AND i.is_main = 1
      ${whereClause}
      ORDER BY p.id ASC
    `, queryParams);

    connection.release();

    // 🔍 確保 API 回傳了 `image_url`
    console.log("📌 取得的產品資料:", rows);

    res.json(rows); 
  } catch (error) {
    console.error("獲取商品錯誤:", error);
    res.status(500).json({ error: "無法獲取商品", details: error.message });
  }
});


router.get("/filters", async (req, res) => { 
  try {
    const connection = await pool.getConnection();
    
    const [brand] = await connection.query(`SELECT brand_id AS id, brand_name AS name FROM brand`);
    const [category] = await connection.query(`SELECT category_id AS id, category_name AS name FROM category`);
    const [subcategory] = await connection.query(`SELECT subcategory_id AS id, name AS name FROM subcategory`);
    
    connection.release();
    
    res.json({
      brand,
      category,
      subcategory,
    });

  } catch (error) {
    console.error("獲取篩選條件錯誤:", error);
    res.status(500).json({ error: "無法獲取篩選條件", details: error.message });
  }
})

router.get("/brand", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [brand] = await connection.query(`SELECT brand_id AS id, brand_name AS name FROM brand`);


    connection.release();

    res.json(brand.map(b => b.name));
  } catch (error) {
    console.error("取得品牌時發生錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤", details: error.message });
  }
});

export default router; 
