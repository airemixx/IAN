import express from 'express'
import pool from '../db.js'
import jwt from 'jsonwebtoken'
import authenticate from '../middlewares.js'

// 取得所有對話列表（老師看到自己的對話，管理員看到所有老師）
router.get("/conversations", async (req, res) => {
    try {
      const userId = req.user.id; // 假設前端會傳 JWT 來驗證
      const [rows] = await pool.query(
        `SELECT id, name, last_message AS lastMessage FROM conversations WHERE user_id = ? OR role = 'admin'`,
        [userId]
      );
      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "伺服器錯誤" });
    }
  });
  
  // 取得某個對話的歷史訊息
  router.get("/messages/:chatId", async (req, res) => {
    try {
      const { chatId } = req.params;
      const [messages] = await pool.query(
        `SELECT sender, text, created_at FROM messages WHERE chat_id = ? ORDER BY created_at ASC`,
        [chatId]
      );
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "伺服器錯誤" });
    }
  });
  
  // 發送訊息
  router.post("/messages", async (req, res) => {
    try {
      const { chatId, sender, text } = req.body;
  
      // ✅ **手動檢查 chatId 是否存在**
      const [chat] = await pool.query("SELECT id FROM conversations WHERE id = ?", [chatId]);
      if (chat.length === 0) {
        return res.status(400).json({ error: "無效的 chatId" });
      }
  
      // ✅ **插入訊息**
      await pool.query("INSERT INTO messages (chat_id, sender, text) VALUES (?, ?, ?)", [chatId, sender, text]);
      res.status(201).json({ message: "訊息已發送" });
    } catch (error) {
      res.status(500).json({ error: "伺服器錯誤" });
    }
  });
  
  module.exports = router;