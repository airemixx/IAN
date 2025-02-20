"use client";
import { useState, useEffect } from "react";
import styles from "./filter-sortbar.module.scss";
import Link from "next/link";
import { useCompare } from "@/app/product/_context/CompareContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function FilterSortBar({ onBrandSelect, onSortChange }) {
  const [selectedBrand, setSelectedBrand] = useState("所有品牌");
  const [selectedSort, setSelectedSort] = useState("");
  const [brands, setBrands] = useState(["所有品牌"]);
  const { compareList } = useCompare();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const res = await fetch("http://localhost:8000/api/product/brand");
        if (!res.ok) throw new Error("無法取得品牌列表");
        const data = await res.json();

        setBrands([{ id: null, name: "所有品牌" }, ...data]);
      } catch (error) {
        console.error("獲取品牌列表時發生錯誤:", error);
      }
    }

    fetchBrands();
  }, []);

  const brandClick = (brand) => {
    setSelectedBrand(brand.name);

    if (brand.id === null) {
      onBrandSelect({ brand_id: [] });
    } else {
      onBrandSelect({ brand_id: [brand.id] });
    }
  };

  const sortChange = (event) => {
    const newSort = event.target.value;
    setSelectedSort(newSort);

    if (onSortChange) {
      if (newSort === "") {
        onSortChange("");
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

      <div className="d-flex align-items-center gap-3">
        <Link href="/product/spec" passHref>
          <button className={`btn ${styles.compareButton}`}>
            <FontAwesomeIcon icon={faCamera} size="lg" />
            {compareList.length > 0 && <span>{compareList.length}</span>}
          </button>
        </Link>
        <div className={styles.sortContainer}>
          <select
            id="sortSelect"
            className="form-select"
            name="sort"
            value={selectedSort}
            onChange={sortChange}
          >
            <option value="">排序</option>
            <option value="價格由低至高">價格低至高</option>
            <option value="價格由高至低">價格高至低</option>
          </select>
        </div>
      </div>
    </div>

  );
}
