'use client'

import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import styles from './pagination.module.scss'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <section className={styles['pages-container']} data-aos="fade-up">
      {/* 上一頁按鈕 */}
      <button
        className={`${styles['page-arrow']} ${styles['hvr-icon-back']}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FaAngleLeft size={15} />
      </button>

      {/* 頁數列表 */}
      <ul className={styles['pages']}>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`${styles['page']} ${currentPage === index + 1 ? styles['active'] : ''}`}
            onClick={() => onPageChange(index + 1)}
          >
            <button className={styles['page-link']}>{index + 1}</button>
          </li>
        ))}
      </ul>

      {/* 下一頁按鈕 */}
      <button
        className={`${styles['page-arrow']} ${styles['hvr-icon-forward']}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FaAngleRight size={15} />
      </button>
    </section>
  )
}
