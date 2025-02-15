// rent-pagination

'use client';

import { useState, useEffect } from 'react';

export default function RentPagination({ totalItems = 1, itemsPerPage = 1, onPageChange }) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  useEffect(() => {
    if (onPageChange) onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4 mb-1">
      <button 
        className="page-link" 
        onClick={handlePrev} 
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          className={`page-link ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handlePageClick(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button 
        className="page-link" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
}
