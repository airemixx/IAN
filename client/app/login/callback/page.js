"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Callback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchTokenAndSaveUser = async () => {
      const code = searchParams.get("code");
      if (!code) return;

      try {
        console.log("LINE 授權碼:", code);

        // 🟢 **修正這裡！只傳 `code` 到後端，讓後端去處理**
        const backendResponse = await axios.post("http://localhost:8000/api/auth/line", {
          code, // ✅ 傳送 `code`，而不是 `lineId`
        });

        console.log("後端回應:", backendResponse.data);

        const { token, user } = backendResponse.data.data;

        // 儲存 Token 到 localStorage
        localStorage.setItem("loginWithToken", token);

        // 設定用戶資料
        setUserData(user);

        // 導向用戶頁面
        router.push("/user");

      } catch (error) {
        console.error("登入失敗", error);
      }
    };

    fetchTokenAndSaveUser();
  }, [searchParams]);

  return (
    <div className="container">
      <h1>LINE 登入成功</h1>
      {userData ? (
        <div>
          <p>名稱: {userData.name}</p>
          <img src={userData.head} alt="User" width="100" />
        </div>
      ) : (
        <p>正在載入...</p>
      )}
    </div>
  );
}
