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
        let url = "http://localhost:8000/api/product";

        const query = new URLSearchParams(); // ✅ 這裡正確使用 URLSearchParams

        if (filters.brand_id.length) query.append("brand_id", filters.brand_id.join(","));
        if (filters.category_id.length) query.append("category_id", filters.category_id.join(","));
        if (filters.subcategory_id.length) query.append("subcategory_id", filters.subcategory_id.join(","));

        // 當 `min_price` 和 `max_price` 存在時，才加入 URL
        if (filters.min_price) query.append("min_price", filters.min_price);
        if (filters.max_price) query.append("max_price", filters.max_price);

        // 確保 `query` 不是空的，才加入 `url`
        if (query.toString()) {
          url += "?" + query.toString();
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP 錯誤 " + res.status);

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("獲取商品時發生錯誤:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [filters]);

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
