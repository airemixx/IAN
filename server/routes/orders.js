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

  const { cartItems, buyerData, date, userId, merchantTradeNo } = req.body;
  // 確保 cartItems 存在
  if (!cartItems || typeof cartItems !== "object") {
    return res.status(400).json({ success: false, message: "無效的 cartItems" });
  }

  if (!buyerData || typeof buyerData !== "object") {
    return res.status(400).json({ success: false, message: "無效的 buyerData" });
  }
  try {

    Object.values(cartItems).map(async cartItem => {
      // 確保所有必要的欄位都有值
      let categoryId = null, coursesId = null, rentalId = null;
      const model = cartItem.model || cartItem.name;
      switch (cartItem.type) {
        case 'product':
          categoryId = cartItem.product_id;
          break;
        case 'lession':
          coursesId = cartItem.product_id;
          break;
        case 'rent':
          rentalId = cartItem.product_id;
          break;
      }


      const price = cartItem.price;
      const quantity = cartItem.quantity;


      // 插入資料
      await pool.execute(
        `INSERT INTO orders (user_id, rent_id, start_date, end_date) VALUES 
        (?, ?, ?, ?, ?)`
      )
      await pool.execute(
        `INSERT INTO orders (
        order_code, 
        user_id, 
        name, 
        model, 
        product_id, 
        courses_id, 
        rental_id, 
        price, 
        amount, 
        address, 
        phone, 
        created_at
        ) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          merchantTradeNo,
          userId,
          buyerData.name,
          model,
          categoryId,
          coursesId,
          rentalId,
          price,
          quantity,
          buyerData.address,
          buyerData.phone,
          date
        ]
      );
    })
    res.status(200).json({ success: true, message: "訂單儲存成功" });

  } catch (error) {
    console.error("訂單儲存失敗:", error);
    res.status(500).json({ success: false, message: "訂單儲存失敗", error });
  }

});

export default router