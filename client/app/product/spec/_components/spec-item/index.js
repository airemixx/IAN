"use client";
import React from "react";
import { useCompare } from "@/app/product/_context/CompareContext";
import Link from "next/link"; // ✅ 引入 Link

import styles from "./spec-item.module.scss";

export default function ComponentsCompareItem() {
  const { compareList, removeFromCompare } = useCompare();

  if (!Array.isArray(compareList)) {
    console.error("❌ `compareList` 不是陣列，初始化為空陣列");
    return <p className={styles.noProductText}>目前沒有商品</p>;
  }

  return (
    <div>
      <h1 className={styles.compareTitle}>比較相機機型</h1>
      <div className={styles.productContainer}>
        {compareList.map((product) => (
          <div key={product.id} className={styles.productBox}>
            <img src={product.image_url} alt={product.name} />
            <h5>{product.name}</h5>
            <p>NT${product.price.toLocaleString()}</p>
            <button className={`btn ${styles.buy}`}>加入購物車</button>
            <button className={`btn btn-link btn-sm ${styles.remove}`} onClick={() => removeFromCompare(product.id)}>
              移除
            </button>
          </div>
        ))}
        {compareList.length < 3 &&
          Array.from({ length: 3 - compareList.length }).map((_, index) => (
            <Link href="/product" key={`empty-${index}`} className={`${styles.productBox} ${styles.emptyBox}`}>
              + 添加商品
            </Link>
          ))}
      </div>
    </div>
  );
}
