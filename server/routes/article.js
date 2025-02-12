import { Router } from 'express';
import cors from 'cors'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'lenstudio'
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
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "取得文章失敗"
    })
  }
});
// 取得指定文章
router.get('/:id', async (req, res) => {
  try{
    const [rows] = await pool.query("SELECT * FROM article WHERE id = ?" , [req.params.id]);
      if (rows.length === 0){
        return res.status(404).json({
          status: 'error',
          message: `找不到${req.params.id}文章`
        })
      }
      res.status(200).json({
        status: 'success',
        data: rows[0],
        message: `取得${req.params.id}文章成功`
      })
  }catch(err){
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "連結伺服器錯誤"
    })
  }
});

// 新增文章
router.post('/',async (req, res) => {
  try{
    //此為初步測試 實際的新增邏輯請根據需求補上，例如取得 req.body 資料
    res.status(201).json({
      status: 'success',
      message: '新增文章成功'
    })
  }catch(err){
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "新增文章失敗"
    })
  }
});

// 更新指定文章
router.put('/:id', async (req, res) => {
  try{
    //此為初步測試 實際的新增邏輯請根據需求補上，例如取得 req.body 資料
    res.status(200).json({
      status: 'success',
      message: `更新文章ID: ${req.params.id}成功`
    })
  }catch(err){
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "更新文章失敗TAT"
    })
  }
});

// 刪除指定文章
router.delete('/:id', async (req, res) => {
  try{
    //此為初步測試 實際的新增邏輯請根據需求補上，例如取得 req.body 資料
    res.status(200).json({
      status: 'success',
      message: `刪除文章ID: ${req.params.id}成功`
    })
  }catch(err){
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "刪除文章失敗~"
    })
  }
});

export default router;