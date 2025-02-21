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
  
    // const { merchantTradeNo, tradeAmount, tradeDate, paymentDate, paymentType, rtnCode, rtnMsg, cartItems } = req.body;
    // console.log(cartItems);
    // try {
    //   // 儲存訂單到 MySQL
    // const [result] = await pool.execute(
    //     "INSERT INTO orders (name, category_id, brand_id, courses_id	, rental_id, price, amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
    //     [
    //       cartItems.model,
    //       cartItems.id,
    //       1,
    //       1,
    //       1,
    //       cartItems.price,
    //       cartItems.quantity
    //     ]
    //   );
  
     
  
    //   res.status(201).json({ success: true, message: "訂單儲存成功", result });
    // } catch (error) {
    //   console.error("訂單儲存失敗:", error);
    //   res.status(500).json({ success: false, message: "訂單儲存失敗", error });
    // }
});

export default router