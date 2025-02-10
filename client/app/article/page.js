"use client";

import React, { useEffect } from "react";
import Breadcrumb from "./_components/breadcrumb";
import LoopAd from "./_components/loop-ad";
import SelectList from "./_components/select-list";
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
    <div>
      <Breadcrumb />
      <LoopAd />

      <section className="y-container">
      <SelectList />

        {/* 卡片區 */}
        <div className="row y-list-card-area">
          {/* 這裡以陣列迭代模擬 8 個卡片 */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="col-md-3" key={index}>
              <div className="card y-card">
                <img
                  src="/images/article/social.jpg"
                  className="card-img-top y-card-img-top-css"
                  alt="Social Image"
                />
                <div className="px-0 card-body y-card-body-css">
                  <div className="mb-3 y-article-list-tag d-flex justify-content-between">
                    <p className="mb-0">產品情報</p>
                    <div className="y-button-container">
                      {/* 懸浮式選單，預設隱藏 */}
                      <div className="y-float-window" id="floatingMenu">
                        <button id="editBtn">
                          <img
                            src="/images/article/file-edit-02-black.svg"
                            alt="Edit Icon"
                          />
                          編輯
                        </button>
                        <button id="deleteBtn">
                          <img
                            src="/images/article/trash-02-black.svg"
                            alt="Delete Icon"
                          />
                          刪除
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-5 y-list-card-content">
                    <a href="#" className="text-decoration-none">
                      <h4 className="card-title">Sony α1 II 當代全能旗艦相機重磅登場</h4>
                    </a>
                  </div>
                  <div className="y-author-date">
                    <p className="mb-0">
                      <img
                        className="mb-2 y-user-list-profile rounded-pill me-2"
                        src="/images/article/user (1).jpg"
                        alt="User Profile"
                      />
                      編輯部
                    </p>
                    <p>2024-10-10</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}