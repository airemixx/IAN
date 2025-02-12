'use client'

import { useState, useEffect } from 'react'

export default function RentPagination({
  totalItems = 1,
  itemsPerPage = 1,
  onPageChange,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  useEffect(() => {
    if (onPageChange) onPageChange(currentPage)
  }, [currentPage, onPageChange])

  return (
    <div className="d-flex justify-content-center mt-3">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className={`btn btn-sm-radius btn-sm mx-1 ${
            currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'
          }`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}
