'use client'

import { useState, useEffect } from 'react'
import styles from './rental-pagination.module.scss'

export default function RentalPagination({
  totalItems,
  itemsPerPage,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  useEffect(() => {
    onPageChange(currentPage)
    window.scrollTo({ top: 120, behavior: 'smooth' }) // 🔥 切換時回到頂部
  }, [currentPage, onPageChange])

  if (totalPages <= 1) return null // 🔥 如果只有一頁，不顯示分頁按鈕

  return (
    <div className={`d-flex justify-content-center mt-3 ${styles.pagination}`}>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`btn ${
            page === currentPage ? 'btn-primary' : 'btn-outline-primary'
          } mx-1`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  )
}
