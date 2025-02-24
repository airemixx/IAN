import express, { Router } from 'express'
import cors from 'cors'
import pool from '../db.js'

const router = express.Router()

//cors設定
const corsOptions = {
  origin: ['http://localhost:3000'], // 允許來自 http://localhost:3000 的請求
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
};

router.use(cors(corsOptions)); // 使用 cors 中間件

router.post("/", async (req, res) => {
  const { cartItems, buyerData } = req.body;
  
  // 確保 cartItems 存在
  if (!cartItems || typeof cartItems !== "object") {
    return res.status(400).json({ success: false, message: "無效的 cartItems" });
  }

  if (!buyerData || typeof buyerData !== "object") {
    return res.status(400).json({ success: false, message: "無效的 buyerData" });
  }
  console.log(buyerData.address);
  Object.values(cartItems).map( async (cartItem ) => {
     // 確保所有必要的欄位都有值
    const model = cartItem.model || cartItem.name;
    const categoryId = cartItem.catgory_id;
    const price = cartItem.price;
    const quantity = cartItem.quantity;
    console.log(buyerData.name,buyerData.address,buyerData.phone);
    try {
      // 插入資料
      const [result] = await pool.execute(
        "INSERT INTO orders (name, model, category_id, brand_id, courses_id, rental_id, price, amount, address, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [buyerData.name, model, categoryId, 0, 0, 0, price, quantity, buyerData.address, buyerData.phone]
      );
  
      res.status(200).json({ success: true, message: "訂單儲存成功", result });
    } catch (error) {
      console.error("訂單儲存失敗:", error);
      res.status(500).json({ success: false, message: "訂單儲存失敗", error });
    }
  })
 
 

 
});

export default router