"use client";
import { useState } from "react";
import styles from "./filter-sortbar.module.scss"; // ✅ 正確引入 SCSS Module

export default function FilterSortBar({ onBrandSelect, onSortChange }) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const brands = ["所有品牌", "Sony", "Canon", "Nikon", "Hasselblad", "Leica"];

  // 處理品牌選擇
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    if (onBrandSelect) onBrandSelect(brand);
  };

  // 處理排序變更
  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setSelectedSort(newSort);
    if (onSortChange) onSortChange(newSort);
  };

  return (
    <div className={`d-flex justify-content-between align-items-center mb-3 ${styles.filterSortBar}`}>
      {/* 品牌篩選 */}
      <div className="d-flex flex-wrap gap-2">
        {brands.map((brand) => (
          <button
            key={brand}
            type="button"
            className={`btn ${selectedBrand === brand ? "btn-secondary" : "btn-outline-secondary"}`}
            onClick={() => handleBrandClick(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* 排序方式 */}
      <div className={styles.filterSortContainer}>
        <select className="form-select" value={selectedSort} onChange={handleSortChange}>
          <option value="">排序</option>
          <option value="價格由低至高">價格低至高</option>
          <option value="價格由高至低">價格高至低</option>
        </select>
      </div>
    </div>
  );
}
