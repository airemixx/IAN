"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import styles from "./product-list.module.scss";

export default function ProductList({ filters }) { // ✅ 接收 `filters`
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 取得商品列表
  useEffect(() => {
    async function fetchProducts() {
      try {
        // 🔍 將 `filters` 轉換為 URL 參數
        const queryString = new URLSearchParams({
          brand_id: filters.brand_id.join(","), // ✅ 把多個品牌 ID 轉成 "1,2,3"
          category_id: filters.category_id.join(","),
        }).toString();

        const apiUrl = `http://localhost:8000/api/product?${queryString}`;

        console.log("📌 請求 API:", apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("HTTP 錯誤 " + response.status);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ 獲取商品時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]); // ✅ `filters` 變更時重新請求

  if (loading) return <p className={styles.loadingText}>載入中...</p>;

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
