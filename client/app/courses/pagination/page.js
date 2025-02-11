'use client'

import React, { useState, useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"; 
import styles from "./pagination.module.scss";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <section className={styles["pages-container"]} data-aos="fade-up">
      {/* 上一頁按鈕 */}
      <button
        className={`${styles["page-arrow"]} ${styles["hvr-icon-back"]}`}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1} // 禁用上一頁按鈕
      >
        <FaAngleLeft size={15}  />
      </button>

      {/* 頁數列表 */}
      <ul className={styles["pages"]}>
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index} className={styles["page"]}>
            <button
              className={`${styles["page-link"]} ${
                currentPage === index + 1 ? styles["active"] : ""
              }`}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      
      {/* 下一頁按鈕 */}
      <button
        className={`${styles["page-arrow"]} ${styles["hvr-icon-forward"]}`}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages} // 禁用下一頁按鈕
      >
  <FaAngleRight size={15} />
      </button>
    </section>
  );
}