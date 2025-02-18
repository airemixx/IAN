"use client";
import { useState, useEffect } from "react";
import styles from "./filter-sortbar.module.scss";

export default function FilterSortBar({ onBrandSelect, onSortChange }) {
  const [selectedBrand, setSelectedBrand] = useState("所有品牌");
  const [selectedSort, setSelectedSort] = useState(""); // ✅ 確保這裡有管理 `sort`
  const [brands, setBrands] = useState(["所有品牌"]);

  // 🔹 從 API 獲取品牌列表
  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("http://localhost:8000/api/product/brand");
        if (!res.ok) throw new Error("無法取得品牌列表");
        const data = await res.json();

        // 讓 `brands` 存 id 和 name，並確保「所有品牌」在陣列中
        setBrands([{ id: null, name: "所有品牌" }, ...data]);
      } catch (error) {
        console.error("獲取品牌列表時發生錯誤:", error);
      }
    }

    fetchBrands();
  }, []);

  // 🔹 處理品牌篩選
  const brandClick = (brand) => {
    setSelectedBrand(brand.name);

    if (brand.id === null) {
      // 如果點選「所有品牌」，則清空篩選
      onBrandSelect({ brand_id: [] });
    } else {
      // 傳遞 `brand_id`
      onBrandSelect({ brand_id: [brand.id] });
    }
  };

  // ✅ 修正：確保 `onSortChange` 傳遞的是正確的 `sort` 值
  const sortChange = (event) => {
    const newSort = event.target.value;
    setSelectedSort(newSort);
  
    if (onSortChange) {
      if (newSort === "") {
        onSortChange(""); // ✅ 選擇「排序」時，重置 `sort` 回到 `id`
      } else {
        onSortChange(newSort === "價格由低至高" ? "price_asc" : "price_desc");
      }
    }
  };

  return (
    <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.filterSortBar}`}>
      <div className="d-flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand.id || "all"}
            type="button"
            className={`${styles.btnOutlineSecondary} ${selectedBrand === brand.name ? styles.active : ""}`}
            onClick={() => brandClick(brand)}
          >
            {brand.name}
          </button>
        ))}
      </div>


      {/* 排序方式 */}
      {/* ✅ 確保 `onSortChange` 能正確觸發 */}
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
