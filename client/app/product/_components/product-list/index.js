"use client";

import { useEffect, useState } from "react";
import ProductCard from "../product-card";
import styles from "./product-list.module.scss";

export default function ProductList({ filters }) { // ✅ 接收 `filters`
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // 轉換 `filters` 成 URL 查詢字串
        const queryString = new URLSearchParams({
          brand_id: filters.brand_id.length ? filters.brand_id.join(",") : "",
          category_id: filters.category_id.length ? filters.category_id.join(",") : "",
        }).toString();

        const apiUrl = `http://localhost:8000/api/product?${queryString}`;

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
  }, [filters]); // 🔥 當 `filters` 改變時重新執行



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
