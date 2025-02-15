// rent-list

'use client';

import { useState, useEffect } from 'react';
import RentPagination from "../rent-pagination/page";
import RentTotal from "../rent-total/page";
import RentOrder from "../rent-order/page";
import RentFilter from "../rent-filter/page";
import RentHashtag from "../rent-hashtag/page";
import RentSearch from "../rent-search/page";
import RentCard from "../rent-card/page";

export default function RentList() {
  const [rentals, setRentals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [sorting, setSorting] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch('/json/rental/rental-list.json')
      .then((response) => response.json())
      .then((data) => {
        setRentals(data);
        calculatePagination(data.length, itemsPerPage);
      })
      .catch((error) => console.error('無法載入商品資料:', error));
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      let newItemsPerPage;
      if (window.innerWidth < 768) {
        newItemsPerPage = 6;
      } else if (window.innerWidth < 992) {
        newItemsPerPage = 8;
      } else {
        newItemsPerPage = 12;
      }
      setItemsPerPage(newItemsPerPage);
      calculatePagination(rentals.length, newItemsPerPage);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, [rentals.length]);

  const calculatePagination = (totalItems, perPage) => {
    setTotalPages(Math.max(1, Math.ceil(totalItems / perPage)));
  };

  const handleHashtagClick = (tag) => {
    setSearchQuery(tag);
  };

  const sortedRentals = [...rentals].sort((a, b) => {
    if (sorting === "asc") return a.fee - b.fee;
    if (sorting === "desc") return b.fee - a.fee;
    return 0;
  });

  const filteredRentals = sortedRentals.filter((rental) =>
    rental.name.includes(searchQuery)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const visibleItems = filteredRentals.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='row'>
        <aside className="col-0 col-md-4 col-lg-3 p-3">
          <hr className="d-none d-md-block" />
          <RentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <RentHashtag onHashtagClick={handleHashtagClick} />
          <RentFilter />
        </aside>
        <main className="col-12 col-md-8 col-lg-9">
          <div className='d-flex justify-content-between align-items-center'>
            <RentTotal totalItems={rentals.length} itemsPerPage={itemsPerPage} />
            <RentOrder setSorting={setSorting} />
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-1">
            {visibleItems.map((rental) => (
              <RentCard key={rental.id} rental={rental} />
            ))}
          </div>
          <RentPagination totalItems={filteredRentals.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
        </main>
    </div>
  );
}
