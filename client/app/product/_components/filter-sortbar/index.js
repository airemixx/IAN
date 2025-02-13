"use client";
import { useState, useEffect } from "react";
import styles from "./filter-sortbar.module.scss";

export default function FilterSortBar({ onBrandSelect, onSortChange }) {
  const [selectedBrand, setSelectedBrand] = useState("所有品牌");
  const [selectedSort, setSelectedSort] = useState("");
  const [brands, setBrands] = useState(["所有品牌"]);

  // 🔹 從 API 獲取品牌列表
  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("http://localhost:8000/api/product/brand");
        if (!res.ok) throw new Error("無法取得品牌列表");
        const data = await res.json();

        // ✅ 確保 API 取得的品牌陣列加上「所有品牌」
        setBrands(["所有品牌", ...data]);
      } catch (error) {
        console.error("獲取品牌列表時發生錯誤:", error);
      }
    }

    fetchBrands();
  }, []);

  // 🔹 處理品牌篩選
  const brandClick = (brand) => {
    setSelectedBrand(brand);
    
    // ✅ 如果點擊的是「所有品牌」，則重置 brand_id
    if (brand === "所有品牌") {
      onBrandSelect({ brand_id: [] }); 
    } else {
      onBrandSelect({ brand_id: [brand] }); // ✅ 確保 `brand_id` 是陣列
    }
  };
  

  // 🔹 處理排序變更
  const sortChange = (event) => {
    const newSort = event.target.value;
    setSelectedSort(newSort);
    if (onSortChange) onSortChange(newSort);
  };

  return (
    <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.filterSortBar}`}>
      {/* 品牌篩選（動態載入） */}
      <div className="d-flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            className={`${styles.btnOutlineSecondary} ${selectedBrand === brand ? styles.active : ""}`}
            onClick={() => brandClick(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* 排序方式 */}
      <div className={styles.sortContainer}>
        <select className="form-select" value={selectedSort} onChange={sortChange}>
          <option value="">排序</option>
          <option value="價格由低至高">價格低至高</option>
          <option value="價格由高至低">價格高至低</option>
        </select>
      </div>
    </div>
  );
}
