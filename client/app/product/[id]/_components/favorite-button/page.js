"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import styles from "./favorite-button.module.scss";

export default function FavoriteButton({ productId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("loginWithToken") : null;

  useEffect(() => {
    if (!token) {
      console.error("❌ 未登入，無法獲取收藏");
      return;
    }

    async function fetchFavorites() {
      try {
        const res = await fetch("http://localhost:8000/api/collection", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // ✅ 加入 Token
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("無法獲取收藏清單");
        const data = await res.json();
        setIsFavorite(data.some((item) => item.product_id === productId));
      } catch (error) {
        console.error("❌ 獲取收藏清單失敗:", error);
      }
    }

    fetchFavorites();
  }, [productId, token]);

  const toggleFavorite = async () => {
    if (!token) {
      alert("請先登入！");
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch("http://localhost:8000/api/collection", {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });

      if (!res.ok) throw new Error("操作收藏失敗");
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("❌ 收藏錯誤:", error);
    }
  };

  return (
    <button onClick={toggleFavorite} className={styles.favoriteIcon}>
      {isFavorite ? (
        <FaHeart size={18} color="red" />
      ) : (
        <FaRegHeart size={18} color="gray" />
      )}
    </button>
  );
}
