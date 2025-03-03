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

export default router;
