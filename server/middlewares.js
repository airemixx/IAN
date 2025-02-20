import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log("🛑 authMiddleware 進入驗證:", req.path);

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    console.log("❌ 未提供 Token");
    return res.status(401).json({ error: "未授權" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Token 驗證成功:", decoded);
    req.teacherId = decoded.id;
    next();
  } catch (error) {
    console.log("❌ JWT 驗證失敗:", error);
    return res.status(403).json({ error: "無效的 Token" });
  }
};

// **確保有 export**
export default authMiddleware;
