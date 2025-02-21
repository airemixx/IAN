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

router.post("/", async (req,res) => {
    const { MerchantTradeNo, TradeAmt, TradeDate, PaymentDate, PaymentType, RtnCode, RtnMsg, cartItems } = req.body;

    try {
      // 儲存訂單到 MySQL
    const [result] = await pool.execute(
        "INSERT INTO orders (order_number, amount, trade_date, payment_date, payment_type, message) VALUES (?, ?, ?, ?, ?, ?)",
        [
          MerchantTradeNo,
          TradeAmt,
          TradeDate,
          PaymentDate,
          PaymentType,
          RtnMsg,
        ]
      );
  
      const orderId = result.insertId; // 取得訂單的 ID
  
      // 儲存訂單明細
      for (const item of cartItems) {
        await pool.execute(
          "INSERT INTO order_items (order_id, product_name, quantity, price) VALUES (?, ?, ?, ?)",
          [orderId, item.model, item.quantity, item.price]
        );
      }
  
      res.status(201).json({ success: true, message: "訂單儲存成功", orderId });
    } catch (error) {
      console.error("訂單儲存失敗:", error);
      res.status(500).json({ success: false, message: "訂單儲存失敗", error });
    }
});

export default router