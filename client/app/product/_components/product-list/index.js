"use client";
import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import styles from "./product-list.module.scss"; // ✅ 正確引入 SCSS Module

export default function ProductList() {
  const [products, setProducts] = useState([]);  // 🔹 狀態用來存 API 回應的商品數據
  const [loading, setLoading] = useState(true); // 🔹 狀態用來顯示加載中

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:8000/api/product");

        if (!response.ok) throw new Error("HTTP 錯誤 " + response.status); // 🔹 檢查請求是否成功
        const data = await response.json(); // 🔹 解析 JSON
        setProducts(data); // 🔹 更新狀態
      } catch (error) {
        console.error("獲取商品時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); // 🔹 `useEffect` 只在組件載入時執行一次

  if (loading) return <p className={styles.loadingText}>載入中...</p>; // ✅ 確保 `SCSS` 影響 `載入中...` 文字

  return (
    <div className={`row ${styles.productList}`}>
      {products.length > 0 ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p className={styles.noProductText}>目前沒有商品</p>
      )}
    </div>
  );
}
