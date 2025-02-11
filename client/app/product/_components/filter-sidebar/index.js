"use client";

import { useState, useEffect } from "react";
import styles from "./filter-sidebar.module.scss"; // 確保 Bootstrap 樣式

export default function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({ brand: [], category: [] });
  const [expanded, setExpanded] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    brand_id: [],
    category_id: [],
  });

  // 取得篩選條件
  useEffect(() => {
    async function fetchFilters() {
      try {
        const response = await fetch("http://localhost:8000/api/product/filters");
        if (!response.ok) throw new Error("HTTP 錯誤 " + response.status);
        const data = await response.json();

        console.log("取得篩選條件:", data);
        if (!data.brand || !data.category) {
          throw new Error("API 回應格式錯誤");
        }

        setFilters(data);
      } catch (error) {
        console.error("獲取篩選條件時發生錯誤:", error);
      }
    }
    fetchFilters();
  }, []);

  // 🔹 切換展開/收合
  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  // 🔹 處理 Checkbox 變更
  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const updatedFilters = { ...selectedFilters };

    if (checked) {
      updatedFilters[name] = [...updatedFilters[name], value];
    } else {
      updatedFilters[name] = updatedFilters[name].filter((item) => item !== value);
    }

    setSelectedFilters(updatedFilters);
    console.log("🔍 選擇的篩選條件:", updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <aside className={styles.asideFilter}>
      <div className="accordion" id="filterAccordion">

      <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${expanded === "lens" ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleExpand("lens")}
            >
              種類
            </button>
          </h2>
          <div className={`accordion-collapse ${expanded === "lens" ? "show" : "collapse"}`}>
            <div className="accordion-body">
              {filters.category.length > 0 ? (
                filters.category.map((category) => (
                  <div key={category.id} className="form-check">
                    <input
                      type="checkbox"
                      id={`category_${category.id}`}
                      name="category_id"
                      value={category.id}
                      className="form-check-input"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`category_${category.id}`} className="form-check-label">
                      {category.name}
                    </label>
                  </div>
                ))
              ) : (
                <p>沒有種類資料</p>
              )}
            </div>
          </div>
        </div>

        {/* 機身 (品牌篩選) */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${expanded === "brand" ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleExpand("brand")}
            >
              品牌
            </button>
          </h2>
          <div className={`accordion-collapse ${expanded === "brand" ? "show" : "collapse"}`}>
            <div className="accordion-body">
              {filters.brand.length > 0 ? (
                filters.brand.map((brand) => (
                  <div key={brand.id} className="form-check">
                    <input
                      type="checkbox"
                      id={`brand_${brand.id}`}
                      name="brand_id"
                      value={brand.id}
                      className="form-check-input"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`brand_${brand.id}`} className="form-check-label">
                      {brand.name}
                    </label>
                  </div>
                ))
              ) : (
                <p>沒有品牌資料</p>
              )}
            </div>
          </div>
        </div>

        {/*鏡頭 (種類篩選) */}
        

        {/* 配件 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${expanded === "accessory" ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleExpand("accessory")}
            >
              配件
            </button>
          </h2>
          <div className={`accordion-collapse ${expanded === "accessory" ? "show" : "collapse"}`}>
            <div className="accordion-body">
              <p>配件篩選 (可擴充)</p>
            </div>
          </div>
        </div>

        {/* ✅ 價格篩選 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${expanded === "price" ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleExpand("price")}
            >
              價格
            </button>
          </h2>
          <div className={`accordion-collapse ${expanded === "price" ? "show" : "collapse"}`}>
            <div className="accordion-body">
              <input type="number" className="form-control" placeholder="最低價格" />
              <input type="number" className="form-control mt-2" placeholder="最高價格" />
            </div>
          </div>
        </div>

        {/* ✅ 庫存狀態 */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${expanded === "stock" ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleExpand("stock")}
            >
              鏡頭種類
            </button>
          </h2>
          <div className={`accordion-collapse ${expanded === "stock" ? "show" : "collapse"}`}>
            <div className="accordion-body">
              <p>庫存篩選 (可擴充)</p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
