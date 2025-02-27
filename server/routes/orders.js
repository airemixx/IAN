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

  const { cartItems, buyerData, userId, merchantTradeNo } = req.body;
  // 確保 cartItems 存在
  if (!cartItems || typeof cartItems !== "object") {
    return res.status(400).json({ success: false, message: "無效的 cartItems" });
  }

  if (!buyerData || typeof buyerData !== "object") {
    return res.status(400).json({ success: false, message: "無效的 buyerData" });
  }
  try {
    let start_date = null,end_date = null;
    Object.values(cartItems).map(async (cartItem) => {
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
          start_date = cartItem.start;
          end_date = cartItem.end;
          break;
      }


      const price = cartItem.price;
      const quantity = cartItem.quantity;
  
      if(categoryId !== null){
        await pool.execute(
          `INSERT INTO user_product (
          user_id, name, product_id, price, amount) VALUES 
          (?, ?, ?, ?, ?)`,
          [ userId, model, categoryId, price, quantity]
        );
      }else if(coursesId != null){
        await pool.execute(
          `INSERT INTO user_courses (
          user_id, name, courses_id, price) VALUES 
          (?, ?, ?, ?)`,
          [ userId, model, coursesId, price]
        );
      }else if(rentalId != null){
        await pool.execute(
          `INSERT INTO user_rentals (
          user_id, rent_id, rent_fee, start_date, end_date) VALUES 
          (?, ?, ?, ?, ?)`,
          [ userId, rentalId,price, start_date, end_date]
        );
      }
    })
    await pool.execute(
      `INSERT INTO orders (
      order_code, user_id, name, address, phone) VALUES 
      (?, ?, ?, ?, ?)`,
      [
        merchantTradeNo, userId, buyerData.name, buyerData.address, buyerData.phone,
      ]
    );
    res.status(200).json({ success: true, message: "訂單儲存成功" });

  } catch (error) {
    console.error("訂單儲存失敗:", error);
    res.status(500).json({ success: false, message: "訂單儲存失敗", error });
  }

});

export default router