import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {
  const router = useRouter();
  const appKey = "loginWithToken";
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ nickname: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem(appKey);

    if (!savedToken) {
      router.push("/login"); // 沒有 token，跳轉到登入頁
      setLoading(false);
      return;
    }

    try {
      const decodedUser = jwtDecode(savedToken);
      setToken(savedToken);
      setUser(decodedUser || {});
    } catch (error) {
      console.error("Token 解碼失敗", error);
      localStorage.removeItem(appKey);
      router.push("/login");
    }

    setLoading(false);
  }, []);

  return { token, user, setUser, loading };
}