"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Swal from "sweetalert2"; // ✅ 引入 SweetAlert2
import styles from "./favorite-button.module.scss";

export default function FavoriteButton({ productId }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("loginWithToken") : null;

  useEffect(() => {
    if (!token) {
      console.error("❌ 未登入，無法獲取收藏");
      return;
    }
  });

  const toggleFavorite = async () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        text: "您需要登入後才能收藏商品",
      });
      return;
    }
  
    console.log("🔍 Token:", token); // ✅ 確保 Token 存在
  
    try {
      const method = isFavorite ? "DELETE" : "POST";
      const res = await fetch("http://localhost:8000/api/product/collection", {
        method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: productId }),
      });
  
      // 🔹 檢查 API 是否正常回應
      if (!res.ok) {
        const errorText = await res.text();
        // console.error("❌ API 錯誤回應:", errorText);
  
        if (errorText.startsWith("<!DOCTYPE html>")) {
          throw new Error("伺服器錯誤或 API 連結錯誤，請檢查後端");
        }
  
        let errorJson;
        try {
          errorJson = JSON.parse(errorText);
        } catch {
          throw new Error("API 回應格式錯誤");
        }
  
        // throw new Error(errorJson.error || "操作收藏失敗");
      }
  
      // ✅ 收藏或取消收藏成功
      setIsFavorite((prev) => !prev);
  
      Swal.fire({
        icon: "success",
        title: isFavorite ? "已取消收藏" : "成功加入收藏",
        text: isFavorite ? "商品已從收藏列表移除" : "商品已加入您的收藏",
        showConfirmButton: false,
        timer: 1500,
      });
  
    } catch (error) {
      console.error("❌ 收藏錯誤:", error);
      Swal.fire({
        icon: "error",
        title: "操作失敗",
        text: error.message || "發生錯誤，請稍後再試",
      });
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
