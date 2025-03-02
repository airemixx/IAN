// components/GoogleLoginButton.js
"use client";
import { useState } from "react";
import { signInWithGoogle, logout } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import styles from "./GoogleLoginButton.module.scss";

export default function GoogleLoginButton() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const userData = await signInWithGoogle();
      setUser(userData);
      router.push("/");
    } catch (error) {
      console.error("登入錯誤", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className={styles.width}>
        <a onClick={handleLogin}><img
        id="avatar"
        src="/images/icon/google.png" // ✅ 使用相對路徑
        alt="大頭貼"
        className={styles.avatar}
        style={{ cursor: "pointer" }}
      /></a>
    </div>
  );
}
