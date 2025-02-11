"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "./_components/breadcrumb";
import LoopAd from "./_components/loop-ad";
import SelectList from "./_components/select-list";
import ListCard from "./_components/list-card";
import Pagination from "./_components/Pagination";
import style from "../../styles/article.css";
import Link from "next/link";

export default function NewsPage() {
  useEffect(() => {
    const filterCollapse = document.querySelector("#filter-collapse");
    const toggleButtonIcon = document.querySelector('[data-bs-target="#filter-collapse"] i');
    const clearOptionsBtn = document.querySelector("#y-clear-options-btn");

    if (filterCollapse && toggleButtonIcon) {
      filterCollapse.addEventListener("show.bs.collapse", () => {
        toggleButtonIcon.classList.replace("fa-angle-down", "fa-angle-up");
      });
      filterCollapse.addEventListener("hide.bs.collapse", () => {
        toggleButtonIcon.classList.replace("fa-angle-up", "fa-angle-down");
      });
    }

    if (clearOptionsBtn) {
      clearOptionsBtn.addEventListener("click", () => {
        document.querySelectorAll("select").forEach((select) => {
          select.selectedIndex = 0;
        });
      });
    }

    // 如果需要移除事件監聽器，可在 return 區塊中做清理
    return () => {
      if (filterCollapse && toggleButtonIcon) {
        filterCollapse.removeEventListener("show.bs.collapse", () => {
          toggleButtonIcon.classList.replace("fa-angle-down", "fa-angle-up");
        });
        filterCollapse.removeEventListener("hide.bs.collapse", () => {
          toggleButtonIcon.classList.replace("fa-angle-up", "fa-angle-down");
        });
      }

      if (clearOptionsBtn) {
        clearOptionsBtn.removeEventListener("click", () => {
          document.querySelectorAll("select").forEach((select) => {
            select.selectedIndex = 0;
          });
        });
      }
    };
  }, []);

  return (
    <div >
      <Breadcrumb />
      <LoopAd />

      <section className="y-container">
      <SelectList />

      {/* 卡片區 */}
      <ListCard />

      {/* 分頁區 */}
      <div className="d-flex justify-content-center mb-5">
        <Pagination />
      </div>
      </section>
    </div>
  );
}