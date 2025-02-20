import express, { json } from "express";
import moment from "moment";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../db.js";
import fs from "fs";
import path from "path";

const portNum = 3005;



const whiteList = ["http://localhost:5500", "http://localhost:8000", "http://localhost:3000"];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("不允許連線"));
    }
  },
};



const secretKey = process.env.JWT_SECRET_KEY;

const router = express.Router();
// router.use(cors(corsOptions));
// router.use(express.json());
// router.use(express.urlencoded({ extended: true }));


router.get("/", async (req, res) => {
  try{
    const [rows] = await db.execute("SELECT * FROM `users`");
    res.status(200).json({
      status: "success",
      data: rows,
      message: "取得資料成功"
    })
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message?err.message:"取得資料失敗"
    })
  }
});

router.get("/search", async (req, res) => {
  const {q} = req.query;
  try{
    if(!q) throw new Error("請提供查詢字串");

    const sql = "SELECT * FROM `users` WHERE account LIKE ?";
    const [rows] = await db.execute(sql, [`%${q}%`]);
  
    res.status(200).json({
      status: "success",
      data: rows,
      message: `搜尋成功, 條件: ${q}`
    });
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message?err.message:"搜尋失敗"
    })
  }
});

router.get("/:id", (req, res) => {
  const {id} = req.params;

  try{
    if(!id) throw new Error("請提供查詢字串");

    res.status(200).json({
      status: "success",
      data: {},
      message: `獲取特定 ID 的使用者: ${id}`
    });
  }catch(err){
    console.log(err);
    res.status(404).json({
      status: "error",
      message: err.message?err.message:"搜尋失敗"
    })
  }
});

// 確保上傳資料夾存在
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// `multer` 設定：檔案儲存到 `uploads/`，並以 `時間戳 + 原始檔名` 命名
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });


// ✅ 註冊 API（允許上傳圖片）
router.post("/", upload.single("avatar"), async (req, res) => {
  try {
    let { account, name, nickname, mail, password, gender } = req.body;
    const avatar = req.file ? req.file.filename : "users.webp"; // 若沒上傳圖片，使用預設圖片

    if (!account || !name || !nickname || !mail || !password || !gender) {
      return res.status(400).json({ status: "error", message: "請提供完整的使用者資訊！" });
    }

    // 轉換性別為 `0`（先生）或 `1`（女士）
    gender = gender === "先生" ? 0 : gender === "女士" ? 1 : null;
    if (gender === null) return res.status(400).json({ status: "error", message: "性別格式錯誤" });

    const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 設定 `head` 為上傳的圖片路徑
    const head = `/uploads/${avatar}`;

    const sql = "INSERT INTO `users` (account, password, name, nickname, mail, head, gender, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    await db.execute(sql, [account, hashedPassword, name, nickname, mail, head, gender, createdAt]);

    res.status(201).json({ status: "success", message: "帳號註冊成功！", avatarUrl: head });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "註冊失敗" });
  }
});


router.put("/:account", checkToken, upload.none(), async (req, res) => {
  const {account} = req.params;
  console.log(account);
  
  const {name, password, head , birthday} = req.body;

  try{
    if(account != req.decoded.account) throw new Error("沒有修改權限");
    // if(!name || !password || !head) throw new Error("請至少提供一個修改的內容");

    const updateFields = [];
    const value = [];

    if(name){
      updateFields.push("`name` = ?");
      value.push(name);
    }
    if(head){
      updateFields.push("`head` = ?");
      value.push(head);
    }
    if(password){
      updateFields.push("`password` = ?");
      const hashedPassword = await bcrypt.hash(password, 10);
      value.push(hashedPassword);
    }
    if(birthday){
      updateFields.push("`birthday` = ?");
      value.push(birthday);
    }
    value.push(account);
    const sql = `UPDATE users SET ${updateFields.join(", ")} WHERE account = ?;`;
    const [result] =  await db.execute(sql, value);

    if(result.affectedRows == 0) throw new Error("更新失敗");
    
    res.status(200).json({
      status: "success",
      message: `更新特定 ID 的使用者: ${account}`
    });
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message?err.message:"修改失敗"
    })
  }
});

router.delete("/:account", checkToken, async (req, res) => {
  const {account} = req.params;
  try{
    if(account != req.decoded.account) throw new Error("沒有修改權限");

    const sql = `DELETE FROM users WHERE account = ?`;
    const [result] =  await db.execute(sql, [account]);
    
    if(result.affectedRows == 0) throw new Error("刪除失敗!");
    
    res.status(200).json({
      status: "success",
      message: `刪除使用者 ${account} 成功`
    });
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message?err.message:"刪除失敗"
    })
  }
});

router.post("/login", upload.none(), async (req, res) => {
  const {account, password} = req.body;
  console.log("Debugging: ",account, password);
  console.log(req.body)
  try{
    if(!account || !password) throw new Error("請提供帳號和密碼")
    
    const sql = "SELECT * FROM `users` WHERE account = ?;"
    const [rows] = await db.execute(sql, [account]);

    if(rows.length == 0)  throw new Error("找不到使用者");

    const user = rows[0]
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("帳號或密碼錯誤");

    console.log("JWT Secret Key:", secretKey); // 檢查是否有讀取到 Secret Key
    
    const token = jwt.sign(
      {
        id: user.id,
        account: user.account,
        name: user.name,
        nickname: user.nickname || "",
        mail: user.mail,
        head: user.head,
        level: user.level,
      },
      secretKey,
      { expiresIn: "7d" }
    );
    res.status(200).json({
      status: "success",
      data: { token },
      message: "登入成功"
    });
  }catch(err){
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err.message?err.message:"登入失敗"
    });
  }
});

router.post("/logout", checkToken, (req, res) => {
  const token = jwt.sign(
    {
      account: "",
      mail: "",
      head: "",
    },
    secretKey,
    { expiresIn: "-10s" }
  );
  res.json({
    status: "success",
    data: { token },
    message: "登出成功",
  });
});

router.get("/me", checkToken, async (req, res) => {
  try {
    const sql = "SELECT account, name, nickname, mail, head, birthday FROM users WHERE account = ?";
    const [rows] = await db.execute(sql, [req.decoded.account]);

    if (rows.length === 0) throw new Error("找不到使用者");

    res.status(200).json({
      status: "success",
      data: rows[0], // 回傳最新使用者資料
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "error",
      message: error.message || "無法獲取使用者資訊",
    });
  }
});

router.post("/status", checkToken, (req, res) => {
  const {decoded} = req;
  const token = jwt.sign(
    {
      id: decoded.id,
      account: decoded.account,
      name: decoded.name,
      nickname: decoded.nickname,
      mail: decoded.mail,
      head: decoded.head,
    },
    secretKey,
    { expiresIn: "7d" }
  );
  res.json({
    status: "success",
    data: { token },
    message: "狀態: 登入中",
  });
});



function checkToken(req, res, next){
  let token = req.get("Authorization");
  if(!token) return res.status(401).json({
    status: "error",
    message: "無驗證資料, 請重新登入",
  })
  if(!token.startsWith("Bearer ")) return res.status(401).json({
    status: "error",
    message: "驗證資料錯誤, 請重新登入",
  })
  token = token.slice(7);
  jwt.verify(token, secretKey, (err, decoded) => {
    if(err) return res.status(401).json({
      status: "error",
      message: "驗證資料失效, 請重新登入",
    })
    req.decoded = decoded;
    next();
  });
}



// async function getRandomAvatar(){
//   const api = "https://randomuser.me/api";
//   try{
//     const res = await fetch(api);
//     if(!res.ok) throw new Error("伺服器掛了T_T");
//     const result = await res.json();
//     return result.results[0].picture.large;
//   }catch(err){
//     console.log("取得隨機照片失敗", err.message);
//     return "https://randomuser.me/api/portraits/men/7.jpg";
//   }
// }

export default router;