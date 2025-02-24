import jwt from 'jsonwebtoken';
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔍 收到 Authorization Header:", authHeader);

  if (!authHeader) {
    console.log("❌ 沒有提供 Token");
    return res.status(401).json({ error: "未提供驗證 token" });
  }

  const token = authHeader.split(" ")[1]; // 取得 Token
  console.log("🔍 解析出的 Token:", token);

  if (!token) {
    console.log("❌ Token 格式錯誤");
    return res.status(401).json({ error: "Token 格式錯誤" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // 解析 Token
    console.log("✅ Token 解析成功:", decoded);

    req.decoded = decoded; // ✅ 設定 req.decoded
    req.userId = decoded.id; // ✅ 設定 userId
    req.user = decoded;
    console.log("✅ 設定 req.userId:", req.userId);

    next(); // 繼續執行下一個 middleware
  } catch (error) {
    console.error("❌ Token 解析失敗:", error);
    return res.status(403).json({ error: "權限不足，Token 解析失敗" });
  }
};


// **確保有 export**
export default authenticate;
