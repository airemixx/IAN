// 測試課程中心
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db.js";

const router = express.Router();
const secretKey = process.env.JWT_SECRET_KEY;

// 🔹 登入 API，提供 `account` & `password`，回傳 `level`
router.post("/login", async (req, res) => {
  const { account, password } = req.body;

  try {
    if (!account || !password) throw new Error("請提供帳號和密碼");

    const sql = "SELECT * FROM `users` WHERE account = ?";
    const [rows] = await db.execute(sql, [account]);

    if (rows.length === 0) throw new Error("找不到使用者");

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("帳號或密碼錯誤");

    // 生成 JWT Token
    const token = jwt.sign(
      {
        id: user.id,
        account: user.account,
        name: user.name,
        email: user.email,
        level: user.level, // ✅ 傳回 level
      },
      secretKey,
      { expiresIn: "30m" }
    );

    res.status(200).json({
      status: "success",
      data: { token, user },
      message: "登入成功",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message || "登入失敗",
    });
  }
});

export default router;
