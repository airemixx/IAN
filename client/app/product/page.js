"use client";
import { useState } from "react";
import ProductList from "./_components/product-list";
import FilterSidebar from "./_components/filter-sidebar";
import Pagination from "./_components/product-pagination";
import FilterSortBar from "./_components/filter-sortbar";
import CarouselIndex from "./_components/carousel";
import BreadcrumbIndex from "./_components/breadcrumb";

export default function ProductPage() {
  const [filters, setFilters] = useState({ brand_id: [], category_id: [], subcategory_id: [], }); // ✅ 狀態管理篩選條件

  // ✅ 修正 handleFilterChange
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <CarouselIndex />
      <div className="container mt-4">
        <div className="row">
          <BreadcrumbIndex />
          <div className="col-md-3">
            <FilterSidebar onFilterChange={handleFilterChange} selectedFilters={filters} />
          </div>
          <div className="col-md-9">
            <FilterSortBar />
            <ProductList filters={filters} />
            <div className="d-flex justify-content-center mt-5 mb-5">
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
