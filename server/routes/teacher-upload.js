import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import authenticate from "../middlewares.js";
import pool from "../db.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary'


const router = express.Router();
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'teachers',
    allowed_formats: ['jpg', 'jpeg', 'png'],
    transformation: [{ width: 800, height: 800, crop: 'limit' }],
  },
})

const upload = multer({ storage });

// **講師圖片上傳並更新資料庫**
router.post("/", authenticate, upload.single("upload"), async (req, res) => {
  const userId = req.userId; // 從 Token 取得 userId

  if (!req.file) {
    return res.status(400).json({ error: "❌ 沒有選擇圖片" });
  }

  const imageUrl = req.file.path; 

  try {
    // **更新講師資料**
    const [updateResult] = await pool.query(
      "UPDATE teachers SET image = ? WHERE user_id = ?",
      [imageUrl, userId]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ error: "❌ 找不到講師，無法更新頭像" });
    }

    // console.log(`✅ 老師頭像更新成功: ${imageUrl}`);
    res.json({ message: "✅ 老師頭像更新成功！", image_url: imageUrl }); // ✅ 確保正確回傳
  } catch (error) {
    console.error("❌ 更新老師頭像失敗:", error);
    res.status(500).json({ error: "無法更新頭像" });
  }
});


export default router;
