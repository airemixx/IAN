import { Router } from 'express';
import cors from 'cors'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'camera'
})

//cors設定
const corsOptions = {
  origin : ["http://localhost:3000", "http://localhost:5000"],
  Credentials : true
}

const router = Router();
router.use(cors(corsOptions))

// 取得所有文章
router.get('/', async (req, res) => {
  try{
    const [rows] = await pool.query("SELECT * FROM article");
    res.status(200).json({
      status: 'success',
      data: rows,
      message: "取得所有文章成功"
    })
  }catch(err){
    res.status(500).send('伺服器錯誤')
  }
});
// 取得指定文章
router.get('/:id', (req, res) => {
  res.send(`取得文章ID: ${req.params.id}`);
});

// 新增文章
router.post('/', (req, res) => {
  res.send('新增文章');
});

// 更新指定文章
router.put('/:id', (req, res) => {
  res.send(`更新文章ID: ${req.params.id}`);
});

// 刪除指定文章
router.delete('/:id', (req, res) => {
  res.send(`刪除文章ID: ${req.params.id}`);
});

export default router;