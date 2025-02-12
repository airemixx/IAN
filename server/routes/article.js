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

// 取得所有文章或篩選文章
router.get('/', async (req, res) => {
  const { year, month } = req.query;
  let query = `
    SELECT a.*, c.name as category_name
    FROM article a
    LEFT JOIN article_category c ON a.category_id = c.id
  `;
  const queryParams = [];

  if (year) {
    query += ' WHERE YEAR(a.created_at) = ?';
    queryParams.push(year);
  }

  if (month) {
    query += year ? ' AND' : ' WHERE';
    query += ' MONTH(a.created_at) = ?';
    queryParams.push(month);
  }

  try {
    const [rows] = await pool.query(query, queryParams);
    res.status(200).json({
      status: 'success',
      data: rows,
      message: "取得所有文章成功"
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "取得文章失敗"
    });
  }
});

// 取得所有文章分類
router.get('/categories', async (req, res) => {
  try{
    const [rows] = await pool.query("SELECT id, name FROM article_category")
    res.status(200).json({
      status: 'success',
      data: rows,
      message: "取得所有文章分類成功"
    });
  }catch(err){
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "取得文章分類失敗"
    })
  }
})

// 取得所有文章年份
router.get('/years', async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT DISTINCT YEAR(created_at) as year FROM article ORDER BY year DESC");
    res.status(200).json({
      status: 'success',
      data: rows,
      message: "取得所有年份成功"
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message ? err.message : "取得年份失敗"
    });
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