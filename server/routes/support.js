import express from 'express';
import pool from '../db.js';
import authenticate from '../middlewares.js';

const router = express.Router();



// ✅ 取得所有對話列表
router.get("/conversations", authenticate, async (req, res) => {
  try {
    console.log("🔍 `req.user`: ", req.user);

    if (!req.user) {
      return res.status(401).json({ error: "未授權，請重新登入" });
    }

    let query;
    let params = [];

    if (req.user.level === 88) {
      // ✅ 管理員可以獲取所有對話
      console.log("✅ 管理員登入，查詢所有對話");
      query = `
        SELECT 
          c.id, 
          u.name AS user_name, 
          u.head AS user_avatar, 
          c.last_message AS lastMessage, 
          (SELECT created_at FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) AS lastMessageTime
        FROM conversations c
        LEFT JOIN users u ON c.user_id = u.id;
      `;
    } else {
      // ✅ 老師只能獲取「自己的對話」
      console.log(`✅ 老師 (${req.user.id}) 登入，查詢自己的對話`);
      query = `
        SELECT 
          c.id, 
          u.name AS user_name, 
          u.head AS user_avatar, 
          c.last_message AS lastMessage, 
          (SELECT created_at FROM messages WHERE chat_id = c.id ORDER BY created_at DESC LIMIT 1) AS lastMessageTime
        FROM conversations c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.user_id = ?;
      `;
      params = [req.user.id];
    }

    console.log("🔍 執行 SQL:", query);
    const [rows] = await pool.query(query, params);
    console.log("✅ 取得對話列表:", rows);

    if (rows.length === 0 && req.user.level !== 88) {
      console.warn(`⚠️ 老師 (${req.user.id}) 沒有對話，建立新對話...`);
      
      // **新增對話**
      const insertQuery = `INSERT INTO conversations (user_id) VALUES (?)`;
      const [result] = await pool.query(insertQuery, [req.user.id]);

      if (result.affectedRows > 0) {
        console.log("✅ 成功建立新對話");
        const newChat = {
          id: result.insertId,
          user_name: req.user.name,
          user_avatar: req.user.head || "/uploads/default-avatar.png",
          lastMessage: null,
          lastMessageTime: null,
        };
        return res.json([newChat]); // 回傳新對話
      } else {
        console.error("❌ 無法建立新對話");
        return res.status(500).json({ error: "無法建立新對話" });
      }
    }

    res.json(rows);
  } catch (error) {
    console.error("❌ 伺服器錯誤:", error);
    res.status(500).json({ message: "伺服器錯誤", details: error.message });
  }
});




// ✅ 取得某個對話的歷史訊息
router.get("/messages/:chatId", authenticate, async (req, res) => {
  try {
    const { chatId } = req.params;
    if (!chatId) {
      return res.status(400).json({ error: "缺少 chatId 參數" });
    }

    const query = `
      SELECT 
        m.sender_id, 
        m.text, 
        m.created_at,
        u.name AS sender_name, 
        u.head AS user_avatar  -- ✅ 取得發送者的名稱與頭貼
      FROM messages m
      LEFT JOIN users u ON m.sender_id = u.id  -- 🔗 連接 users 資料表
      WHERE m.chat_id = ?
      ORDER BY m.created_at ASC
    `;

    const [messages] = await pool.query(query, [chatId]);

    console.log(`✅ 取得 chat_id ${chatId} 的歷史訊息:`, messages);

    res.json(messages);
  } catch (error) {
    console.error("❌ 取得歷史訊息失敗:", error);
    res.status(500).json({ message: "伺服器錯誤" });
  }
});


router.post("/messages", authenticate, async (req, res) => {
  try {
    console.log("📩 伺服器收到請求:", req.body);

    let { chatId, text, is_bot } = req.body;
    let senderId = req.user.id;
    
    // 如果是機器人訊息，覆蓋 senderId（根據實際情況設定管理員 ID）
    if (is_bot) {
      senderId = 35; // 假設 35 是管理員或機器人的 ID
    }
    
    if (!text || !senderId) {
      console.warn("❌ 缺少必要參數:", { chatId, senderId, text });
      return res.status(400).json({ error: "請提供完整的訊息資訊" });
    }

    // 如果 `chatId` 為空，創建新對話
    if (!chatId || isNaN(chatId)) {
      console.log("🔄 `chatId` 為空或不是數字，創建新對話...");

      const [newChat] = await pool.query(
        "INSERT INTO conversations (user_id, last_message) VALUES (?, ?)", 
        [senderId, text]
      );

      if (!newChat.insertId) {
        console.error("❌ 創建對話失敗");
        return res.status(500).json({ error: "無法創建新對話" });
      }

      chatId = newChat.insertId;
      console.log("🆕 創建新對話 `chatId`:", chatId);
    } else {
      // 確認 `chatId` 是否存在
      console.log("🔍 檢查 `chatId` 是否存在:", chatId);
      const [existingChat] = await pool.query("SELECT id FROM conversations WHERE id = ?", [chatId]);

      if (existingChat.length === 0) {
        console.error("❌ `chatId` 無效:", chatId);
        return res.status(400).json({ error: "無效的 chatId" });
      }
    }

    // 存入訊息
    console.log("💾 插入訊息:", { chatId, senderId, text });
    await pool.query("INSERT INTO messages (chat_id, sender_id, text) VALUES (?, ?, ?)", [
      chatId,
      senderId,
      text,
    ]);

    // 更新 conversations 的 last_message
    await pool.query("UPDATE conversations SET last_message = ? WHERE id = ?", [text, chatId]);

    console.log("✅ 訊息成功存入資料庫");

    // ---------------------------
    // 新增：廣播新訊息給前端
    // ---------------------------
    // 從 app locals 中取得 io 實例
    const io = req.app.get("io");
    if (io) {
      io.emit("newMessage", {
        chatId,
        sender_id: senderId,
        text,
        created_at: new Date(), // 或是從資料庫取得的時間
      });
      console.log("📡 廣播 newMessage 事件:", { chatId, sender_id: senderId, text });
    } else {
      console.warn("❌ 無法取得 io 實例");
    }

    res.status(201).json({ message: "訊息已發送", chatId });
  } catch (error) {
    console.error("❌ 伺服器錯誤:", error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});




export default router;
