"use client";
import { useState } from "react";
import ProductList from "./_components/product-list";
import FilterSidebar from "./_components/filter-sidebar";
import Pagination from "./_components/product-pagination";
import FilterSortBar from "./_components/filter-sortbar";
import "./css/product.css"; // 引入商品列表專用 CSS

export default function ProductPage() {
  const [filters, setFilters] = useState({ brand_id: [], category_id: [] }); // ✅ 狀態管理篩選條件

  // ✅ 修正 handleFilterChange
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="container-fluid px-0">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          {/* 🔹 輪播指示器 */}
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
          </div>

          {/* 🔹 輪播內容 */}
          <div className="carousel-inner">
            <div className="carousel-item">
              <img src="images/product/ff80808193438b04019343a38b6d0000_Alpha-universe_pc_d00004604.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item active">
              <img src="images/product/ff80808191504b7801919770a5531e0c_SEL85F14GM2_pc_31e0c2520.jpg" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="images/product/ff808081939a01e60193b504e4c91c79_A1II_pc_91c792058.jpg" className="d-block w-100" alt="..." />
            </div>
          </div>

          {/* 🔹 輪播控制箭頭 */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="mt-3 mb-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="#">首頁</a></li>
                <li className="breadcrumb-item"><a href="#">產品系列</a></li>
                <li className="breadcrumb-item active" aria-current="page">Canon</li>
              </ol>
            </nav>
          </div>

          {/* ✅ 側邊篩選欄 (保留) */}
          <div className="col-md-3">
            <FilterSidebar onFilterChange={handleFilterChange} selectedFilters={filters} />
          </div>

          {/* ✅ 主要商品列表，透過 `filters` 傳遞篩選條件 */}
          <div className="col-md-9">
            <FilterSortBar />
            <ProductList filters={filters} />
            <Pagination />
          </div>
        </div>
      </div>
    </>
  );
}
