"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { toast } from "react-toastify";
import styles from "./favorite-button.module.scss";

export default function FavoriteButton({ courseId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [token, setToken] = useState(null);

  // ✅ 確保 `token` 在瀏覽器端更新
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("loginWithToken");
      console.log("🔑 取得 token:", storedToken);
      setToken(storedToken);
    }
  }, []);

  // ✅ 確保 `courseId` 與 `token` 存在後才執行 API
  useEffect(() => {
    console.log("🎯 檢查收藏狀態 - courseId:", courseId, "token:", token);
    if (!token || !courseId) {
      console.warn("🚨 token 或 courseId 為空，取消 API 請求");
      return;
    }

    const checkFavoriteStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/courses/collection/${courseId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("無法取得收藏狀態");

        const data = await res.json();
        console.log("✅ API 回傳收藏狀態:", data);
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error("❌ 無法確認收藏狀態:", error);
      }
    };

    checkFavoriteStatus();
  }, [courseId, token]);

  // ✅ 避免影響 `Link`
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite();
  };

  // ✅ 收藏或取消收藏
  const toggleFavorite = async () => {
    if (!token) {
      toast.warn("請先登入才能收藏課程！", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    try {
      const method = isFavorite ? "DELETE" : "POST";
      let url = "http://localhost:8000/api/courses/collection";
  
      if (method === "DELETE") {
        url = `http://localhost:8000/api/courses/collection/${courseId}`; // ✅ 確保 DELETE 傳入 courseId
      }
  
      console.log("📌 送出的請求:", method, url);
  
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: method === "POST" ? JSON.stringify({ course_id: courseId }) : null, // ✅ DELETE 不需要 body
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }
  
      setIsFavorite((prev) => !prev);
  
      toast.success(isFavorite ? "已取消收藏！" : "成功加入收藏！", {
        position: "top-right",
        autoClose: 2000,
      });
  
    } catch (error) {
      console.error("收藏錯誤:", error);
      toast.error("操作失敗：" + (error.message || "發生錯誤，請稍後再試"), {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  return (
    <button onClick={handleFavoriteClick} className="e-favorite-icon hvr-push">
      {isFavorite ? <FaHeart size={18} color="white" className="hvr-icon"/> : <FaRegHeart size={18} color="white" />}
    </button>
  );
}
