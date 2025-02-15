import express from 'express';
import pool from '../db.js';

const router = express.Router();

// 獲取所有租借商品列表
router.get('/', async (req, res) => {
    try {
        const [rentals] = await pool.query('SELECT * FROM rental');
        res.json({ success: true, data: rentals });
    } catch (error) {
        res.status(500).json({ success: false, error: '伺服器錯誤' });
    }
});

// 獲取單一租借商品詳細資訊
router.get('/:id', async (req, res) => {
    try {
        const [rental] = await pool.query('SELECT * FROM rental WHERE id = ?', [req.params.id]);
        if (rental.length === 0) {
            return res.status(404).json({ success: false, error: '找不到該商品' });
        }
        res.json({ success: true, data: rental[0] });
    } catch (error) {
        res.status(500).json({ success: false, error: '伺服器錯誤' });
    }
});

export default router;