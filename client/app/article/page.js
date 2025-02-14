"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "./_components/breadcrumb";
import LoopAd from "./_components/loop-ad";
import SelectList from "./_components/select-list";
import ListCard from "./_components/list-card";
import Pagination from "./_components/Pagination";
import '../../styles/article.css';
import Link from "next/link";
import useArticles from "../../hooks/use-article";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({});
  const { articles, error, loading } = useArticles(filters);

  // 當 URL 的 search 參數改變時，更新 filters
  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setFilters((prev) => ({ ...prev, search: searchQuery }));
    } else {
      setFilters((prev) => {
        const { search, ...others } = prev;
        return others;
      });
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleTagClick = (tag) => {
    setFilters({ ...filters, tag });
  };

  useEffect(() => {  
    import("bootstrap/dist/js/bootstrap.bundle.min.js");  
  
    const filterCollapse = document.querySelector("#filter-collapse");
    const toggleButtonIcon = document.querySelector('[data-bs-target="#filter-collapse"] i');
    const clearOptionsBtn = document.querySelector("#y-clear-options-btn");

    if (filterCollapse && toggleButtonIcon) {
      const handleShow = () => toggleButtonIcon.classList.replace("fa-angle-down", "fa-angle-up");
      const handleHide = () => toggleButtonIcon.classList.replace("fa-angle-up", "fa-angle-down");

      filterCollapse.addEventListener("show.bs.collapse", handleShow);
      filterCollapse.addEventListener("hide.bs.collapse", handleHide);

      return () => {
        filterCollapse.removeEventListener("show.bs.collapse", handleShow);
        filterCollapse.removeEventListener("hide.bs.collapse", handleHide);
      };
    }

    if (clearOptionsBtn) {
      const handleClear = () => {
        document.querySelectorAll("select").forEach((select) => {
          select.selectedIndex = 0;
        });
      };
      clearOptionsBtn.addEventListener("click", handleClear);

      return () => clearOptionsBtn.removeEventListener("click", handleClear);
    }
  }, []);


  return (
    <div >
      <Breadcrumb />
      <LoopAd />
      <div className="my-sm-5 y-list-title y-container">
          <h1>最新消息 News</h1>
      </div>

      <section className="y-container">
      <SelectList onFilterChange={handleFilterChange}/>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message || '出現錯誤...'}</p>} */}

      {/* 卡片區 */}
      <div className="row">
        {articles.map((article) => (
          <div key={article.id} className="col-12 col-md-6 col-lg-3">
            <ListCard article={article} onTagClick={handleTagClick}/>
          </div>
        ))}
      </div>

      {/* 分頁區 */}
      <div className="d-flex justify-content-center mb-5">
        <Pagination />
      </div>
      </section>
    </div>
  );
}