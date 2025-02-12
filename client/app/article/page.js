"use client";

import React, { useEffect } from "react";
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
  const { articles, error, loading} = useArticles();

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

  if (loading) return <div>載入中...</div>;
  if (error) return <div>發生錯誤：{error.message}</div>;

  return (
    <div >
      <Breadcrumb />
      <LoopAd />

      <section className="y-container">
      <SelectList />

      {/* 卡片區 */}
      {articles.map((article) => (
        <ListCard key={article.id} article={article}/>
      ))}

      {/* 分頁區 */}
      <div className="d-flex justify-content-center mb-5">
        <Pagination />
      </div>
      </section>
    </div>
  );
}