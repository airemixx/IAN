"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./product-pagination.module.scss";

export default function Pagination({ totalProducts, currentPage, setCurrentPage }) {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const handlePageChange = (page, event) => {
    event.preventDefault(); // ✅ 
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPageButtons = 5;
    
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("....");
      }

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("....");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav aria-label="Page navigation example ">
     <ul className={`pagination d-flex justify-content-center w-100 ${styles.pagination}`}>

        {/* 上一頁按鈕 */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a
            className={`page-link ${styles["page-link"]}`}
            href="#"
            aria-label="Previous"
            onClick={(e) => handlePageChange(currentPage - 1, e)}
          >
            <span aria-hidden="true">«</span>
          </a>
        </li>

        {generatePageNumbers().map((page, index) => (
          <li key={index} className={`page-item ${currentPage === page ? "active" : ""}`}>
            {page === "..." ? (
              <span className="page-link">...</span>
            ) : (
              <a
                className={`page-link ${styles["page-link"]}`}
                href="#"
                onClick={(e) => handlePageChange(page, e)}
              >
                {page}
              </a>
            )}
          </li>
        ))}

        {/* 下一頁按鈕 */}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a
            className={`page-link ${styles["page-link"]}`}
            href="#"
            aria-label="Next"
            onClick={(e) => handlePageChange(currentPage + 1, e)}
          >
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
    
  );
}
