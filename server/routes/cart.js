import express from "express"

const router = express.Router();
const PORT = 3005;


router.get("/",(req,res) =>{
    res.json({
        "stasus": 200,
        "message": "連接成功"
    })
});

export default router;