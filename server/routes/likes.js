import { Router } from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import authenticate from '../middlewares.js' // 假設您有一個身份驗證中間件

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'lenstudio',
})

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5000'],
  credentials: true,
}

const router = Router()
router.use(cors(corsOptions))

// 檢查用戶是否已為特定文章點贊
router.get('/check', authenticate, async (req, res) => {
  try {
    const { userId, articleId } = req.query;

    const [rows] = await pool.query(
      'SELECT id FROM likes WHERE user_id = ? AND likeable_id = ? AND likeable_type = ?',
      [userId, articleId, 'article']
    );

    res.status(200).json({ isLiked: rows.length > 0 });
  } catch (err) {
    console.error('Error checking like status:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 點贊操作
router.post('/', authenticate, async (req, res) => {
  const { likeableId, likeableType, newLikeCount, userId } = req.body;

  // 驗證請求中的userId與令牌中的userId是否匹配
  if (req.user.id !== userId) {
    return res.status(403).json({ status: 'error', message: 'Unauthorized action' });
  }

  try {
    // 檢查是否已按過讚
    const [rows] = await pool.query(
      'SELECT id FROM likes WHERE user_id = ? AND likeable_id = ? AND likeable_type = ?',
      [userId, likeableId, likeableType]
    );

    if (rows.length > 0) {
      return res.status(200).json({ status: 'success', message: 'Already liked', newLikeCount });
    }

    // 開始事務
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 更新文章的like_count
      if (likeableType === 'article') {
        await connection.query(
          'UPDATE article SET like_count = ? WHERE id = ?',
          [newLikeCount, likeableId]
        );
      }

      // 插入點贊記錄
      await connection.query(
        'INSERT INTO likes (user_id, likeable_id, likeable_type, created_at) VALUES (?, ?, ?, NOW())',
        [userId, likeableId, likeableType]
      );

      // 提交事務
      await connection.commit();
      connection.release();

      res.status(200).json({ status: 'success', newLikeCount });
    } catch (err) {
      // 如果出錯，回滾事務
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (err) {
    console.error('Error updating like:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 取消點贊操作
router.delete('/', authenticate, async (req, res) => {
  const { likeableId, likeableType, newLikeCount, userId } = req.body;

  // 驗證請求中的userId與令牌中的userId是否匹配
  if (req.user.id !== userId) {
    return res.status(403).json({ status: 'error', message: 'Unauthorized action' });
  }

  try {
    // 檢查是否已按過讚
    const [rows] = await pool.query(
      'SELECT id FROM likes WHERE user_id = ? AND likeable_id = ? AND likeable_type = ?',
      [userId, likeableId, likeableType]
    );

    if (rows.length === 0) {
      return res.status(200).json({ status: 'success', message: 'Not liked yet', newLikeCount });
    }

    // 開始事務
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // 更新文章的like_count
      if (likeableType === 'article') {
        await connection.query(
          'UPDATE article SET like_count = ? WHERE id = ?',
          [newLikeCount, likeableId]
        );
      }

      // 刪除點贊記錄
      await connection.query(
        'DELETE FROM likes WHERE user_id = ? AND likeable_id = ? AND likeable_type = ?',
        [userId, likeableId, likeableType]
      );

      // 提交事務
      await connection.commit();
      connection.release();

      res.status(200).json({ status: 'success', newLikeCount });
    } catch (err) {
      // 如果出錯，回滾事務
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (err) {
    console.error('Error removing like:', err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;