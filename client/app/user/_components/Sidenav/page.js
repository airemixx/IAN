'use client'
import Link from 'next/link'
import styles from './sidenav.scss'
import React, { useState , useEffect} from 'react';
import { useRouter } from "next/navigation";

export default function Sidenav() {
  const router = useRouter();
    const appKey = "loginWithToken";
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    // 讀取 Token，確保重新渲染時檢查 localStorage
    useEffect(() => {
      const savedToken = localStorage.getItem(appKey);
      if (savedToken) {
        setToken(savedToken);
      }
    }, []);

    const handleLogout = async (e) => {
      e.preventDefault();
      const API = "http://localhost:8000/api/users/logout";
      if (!token) return;
    
      try {
        const res = await fetch(API, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include", // 確保後端能接收到 cookies
        });
    
        const result = await res.json();
        if (result.status !== "success") throw new Error(result.message);
    
        // 🧹 清除所有存儲
        localStorage.clear();
    
    
        // 🧹 清除狀態
        setToken(null);
        setUser(null);
    
        // 🔄 跳轉回登入頁
        router.push("/login");
      } catch (err) {
        console.error("登出失敗:", err);
        alert(err.message);
      }
    };
    
  return (
    <div className="col-md-3 mb-4">
      <nav className="sidenav p-3">
        <div className="d-flex flex-column">
          <Link href="/user">會員資料修改</Link>
          <Link href="/user/order">我的訂單</Link>
          <Link href="/user/article">我的文章</Link>
          <Link href="/user/rental">我的租借</Link>
          <Link href="/user/course">我的課程</Link>
          <Link href="/user/collect">我的收藏</Link>
          <Link href="/user/coupon">優惠券</Link>
          <a href="#" onClick={handleLogout}>登出</a>
        </div>
      </nav>
    </div>

  )
}
