// 伺服器的總入口，負責：
// 1.啟動 Express 伺服器
// 2.掛載 API 路由
// 3.定義首頁 /
// 4.全域設定 (如 CORS、解析 JSON)
// 5.監聽特定的 PORT，讓伺服器運行

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import coursesRouter from "./routes/courses.js";
import productRoutes from "./routes/product.js";
<<<<<<< HEAD
import cartRouter from "./routes/cart.js";
=======
import articleRoutes from './routes/article.js';


>>>>>>> fdf0ce2e053890a258af1929934f82c51b6ff3a1


// 讀取 .env 設定
dotenv.config();

const app = express();
const whiteList = ["http://localhost:5500", "http://localhost:3000"];
const corsOptions = {
  credential: true,
  origin: (origin,callback) => {
    if(!origin || whiteList.includes(origin)){
      callback(null,true);
    }else{
      callback(new Error("不允許連線"))
    }
  }
}

// 📌 讓 Express 提供 `public` 資料夾內的靜態資源
app.use("/images/product", express.static(path.resolve("client/public/images/product")));



app.use(cors(corsOptions)); // 允許跨域請求
app.use(express.json()); // 解析 JSON 格式的請求

// 設定 API 路由
app.get("/", (req, res) => {
  res.send("API 運行中...");
});

app.use("/api/product", productRoutes);

app.use("/api/courses", coursesRouter);

<<<<<<< HEAD
app.use("/api/cart", cartRouter);
=======
app.use("/api/articles", articleRoutes);

>>>>>>> fdf0ce2e053890a258af1929934f82c51b6ff3a1

// 設定伺服器監聽埠號
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`);
});
