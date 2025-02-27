"use client";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import Swal from "sweetalert2";
import styles from "./favorite-button.module.scss";

export default function FavoriteButton({ productId, onFavoriteToggle = () => {} }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("loginWithToken") : null;

  useEffect(() => {
    if (!token) return;

    const checkFavoriteStatus = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/product/collection/${productId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // if (!res.ok) throw new Error("無法取得收藏狀態");

        const data = await res.json();
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error("無法確認收藏狀態:", error);
      }
    };

    checkFavoriteStatus();
  }, [productId, token]);

  const toggleFavorite = async () => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "請先登入",
        text: "您需要登入後才能收藏商品",
        confirmButtonText: "前往登入",
        showCancelButton: true,
        cancelButtonText: "取消",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
      return;
    }
    if (loading) return; // ✅ 防止短時間內重複點擊
    setLoading(true);

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

      if (!res.ok) {
        const errorText = await res.text();
        if (errorText.startsWith("<!DOCTYPE html>")) {
          throw new Error("伺服器錯誤或 API 連結錯誤，請檢查後端");
        }

        let errorJson;
        try {
          errorJson = JSON.parse(errorText);
        } catch {
          throw new Error("API 回應格式錯誤");
        }
      }

      setIsFavorite((prev) => !prev);

      Swal.fire({
        icon: "success",
        title: isFavorite ? "已取消收藏" : "成功加入收藏",
        text: isFavorite ? "商品已從收藏列表移除" : "商品已加入您的收藏",
        showConfirmButton: false,
        timer: 1500,
      });
      if (onFavoriteToggle) onFavoriteToggle();
    } catch (error) {
      console.error(" 收藏錯誤:", error);
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
        <FaHeart size={18} color="#d0b088" />
      ) : (
        <FaRegHeart size={18} color="gray" />
      )}
    </button>
  );
}
