import express, { json } from "express";
import moment from "moment";
import multer from "multer";
import cors from "cors";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import db from "../db.js";

const portNum = 3005;

const upload = multer();
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
router.use(cors(corsOptions));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


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

router.post("/", upload.none(), async (req, res) => {
  let { account, name, mail, password, gender } = req.body;  // 直接解構 gender
  console.log(req.body);

  if (!account || !name || !mail || !password || !gender) {
    return res.status(400).json({
      status: "error",
      message: "請提供完整的使用者資訊，包括性別!"
    });
  }

  // 轉換性別成 `0`（先生）或 `1`（女士）
  if (gender === "先生") {
    gender = 0;
  } else if (gender === "女士") {
    gender = 1;
  } else {
    return res.status(400).json({
      status: "error",
      message: "性別必須是 '先生' 或 '女士'"
    });
  }
  const id = uuidv4();
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const head = await getRandomAvatar();
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO `users` (`id`, `account`, `password`, `name`, `mail`, `head`, `gender`, `created_at`) VALUES (?,?,?,?,?,?,?,?);";

  const result = await db.execute(sql, [id, account, hashedPassword, name, mail, head, gender, createdAt]);
  console.log(result);
  
  
  res.status(201).json({
    status: "success",
    data: {id},
    message: "新增一個使用者成功"
  });
});

router.put("/:account", checkToken, upload.none(), async (req, res) => {
  const {account} = req.params;
  console.log(account);
  
  const {name, password, head} = req.body;

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

router.post("/login", async (req, res) => {
  console.log(req.body)
  const {account, password} = req.body;
  
  try{
    if(!account || !password) throw new Error("請提供帳號和密碼")
    
    const sql = "SELECT * FROM `users` WHERE account = ?;"
    const [rows] = await db.execute(sql, [account]);

    if(rows.length == 0)  throw new Error("找不到使用者");

    const user = rows[0]
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("帳號或密碼錯誤");

    console.log("JWT Secret Key:", secretKey); // 檢查是否有讀取到 Secret Key
    const token = jwt.sign(
      {
        id: user.id,
        account: user.account,
        name: user.name,
        mail: user.mail,
        head: user.head,
      },
      secretKey,
      { expiresIn: "30m" }
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
      message: err.message?err.message:"登入失"
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

router.post("/status", checkToken, (req, res) => {
  const {decoded} = req;
  const token = jwt.sign(
    {
      id: decoded.id,
      account: decoded.account,
      name: decoded.name,
      mail: decoded.mail,
      head: decoded.head,
    },
    secretKey,
    { expiresIn: "30m" }
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

async function getRandomAvatar(){
  const api = "https://randomuser.me/api";
  try{
    const res = await fetch(api);
    if(!res.ok) throw new Error("伺服器掛了T_T");
    const result = await res.json();
    return result.results[0].picture.large;
  }catch(err){
    console.log("取得隨機照片失敗", err.message);
    return "https://randomuser.me/api/portraits/men/7.jpg";
  }
}

export default router;