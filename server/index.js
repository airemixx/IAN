// 伺服器的總入口，負責：
// 1.啟動 Express 伺服器
// 2.掛載 API 路由
// 3.定義首頁 /
// 4.全域設定 (如 CORS、解析 JSON)
// 5.監聽特定的 PORT，讓伺服器運行

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import coursesRouter from './routes/courses.js'
import teachersRouter from './routes/teachers.js'
import productRoutes from './routes/product.js'
import rentalRouter from './routes//rental.js';
import cartRouter from './routes/cart.js'
import articleRoutes from './routes/article.js'
import users from './routes/users.js'

// 讀取 .env 設定
dotenv.config()

const app = express()
const whiteList = ['http://localhost:5500', 'http://localhost:3000']
const corsOptions = {
  credential: true,
  origin: (origin, callback) => {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('不允許連線'))
    }
  },
}

// 讓 Express 提供 `public` 資料夾內的靜態資源 (先不刪)
// app.use(
//   '/images/product',
//   express.static(path.join(process.cwd(), 'public/images/product'))
// )

app.use(cors(corsOptions)) // 允許跨域請求
app.use(express.json()) // 解析 JSON 格式的請求
app.use(express.urlencoded({ extended: true }));

// 設定 API 路由
app.get('/', (req, res) => {
  res.send('API 運行中...')
})

app.use('/api/product', productRoutes)

app.use('/api/courses', coursesRouter)
app.use('/api/teachers', teachersRouter)

app.use('/api/rental', rentalRouter);

app.use('/api/cart', cartRouter)

app.use('/api/articles', articleRoutes)

app.use('/api/users', users)

// 設定伺服器監聽埠號
const PORT = process.env.PORT || 8000


app.listen(PORT, () => {
  console.log(`伺服器運行在 http://localhost:${PORT}`)
})
