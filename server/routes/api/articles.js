import express from 'express';
import mysql from 'mysql2/promise';

const router = express.Router();

const pool = mysql.createPool({
  host: 'localhost',
  user: 'admin',
  password: '12345',
  database: 'lenstudio',
});

router.get('/', async (req, res) => {
  const { user_id } = req.query;

  try {
    const [rows] = await pool.query(`
      SELECT 
        a.*,
        u.name,
        u.nickname,
        ac.name AS category_name
      FROM article a
      JOIN users u ON a.user_id = u.id
      JOIN article_category ac ON a.category_id = ac.id
      WHERE a.user_id = ?
    `, [user_id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

export default router;