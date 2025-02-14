// rent-pagination

'use client';

import { useEffect } from "react";

export default function RentPagination({ currentIndex = 0, setCurrentIndex, totalItems = 0, itemsPerPage = 3 }) {
  // 當 totalItems 為 0，隱藏 Pagination
  if (totalItems === 0) return null;

  // 確保狀態變更有反應
  useEffect(() => {
    console.log("Updated currentIndex:", currentIndex);
    console.log("RentPagination -> totalItems:", totalItems);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(0, prev - itemsPerPage));
      console.log("Prev Clicked:", currentIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex((prev) => Math.min(totalItems - itemsPerPage, prev + itemsPerPage));
      console.log("Next Clicked:", currentIndex + itemsPerPage);
    }
  };

  return (
    <div className="d-flex gap-2">
      <button 
        className="btn btn-primary btn-sm btn-sm-radius2" 
        onClick={handlePrev} 
        disabled={currentIndex === 0}
      >
        <span aria-hidden="true">
          <i className="fa-solid fa-fw fa-caret-left" style={{ paddingTop: "6px" }}></i>
        </span>
        <span className="visually-hidden">往前一個 Previous</span>
      </button>
      <button 
        className="btn btn-primary btn-sm btn-sm-radius2" 
        onClick={handleNext} 
        disabled={currentIndex + itemsPerPage >= totalItems}
      >
        <span aria-hidden="true">
          <i className="fa-solid fa-fw fa-caret-right" style={{ paddingTop: "6px" }}></i>
        </span>
        <span className="visually-hidden">往後一個 Next</span>
      </button>
    </div>
  );
}
