'use client';

import { useEffect, useState } from "react";

export default function RentRecommendation() {
  const [rentalData, setRentalData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    fetch("/json/rental/rental-list.json")
      .then((response) => response.json())
      .then((data) => setRentalData(data))
      .catch((error) => console.error("❌ 無法載入商品資料:", error));
  }, []);

  const visibleItems = rentalData.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-1">
      {visibleItems.map((rental, index) => (
        <a key={index} href="/rental-detail" className="card-ring">
          <div className="p-card position-relative w-100 border rounded-1 overflow-hidden">
            <div className="position-absolute top-0 start-0 tpye-bg text-white text-uppercase fw-bold py-1 px-4">
              {rental.type}
            </div>
            <div className="position-absolute top-0 end-0 state-text text-uppercase fw-bold pt-2 pe-3 rounded-start">
              {rental.state}
            </div>
            <div className="carousel slide mt-4" data-bs-ride="carousel">
              <div className="carousel-inner">
                {rental.image.map((img, imgIndex) => (
                  <div key={imgIndex} className={`carousel-item ${imgIndex === 0 ? "active" : ""}`}>
                    <img src={`/images/rental/${img}.png`} className="d-block mx-auto" style={{ width: "50%" }} alt={rental.name} />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-0 pe-3 pb-2 ps-4">
              <h3 className="fs-5 fw-bold text-dark">{rental.name}</h3>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fs-6 fw-semibold text-dark">NT$ {rental.fee} / 天</span>
                <button className="btn-heart">
                  <i className="fa-regular fa-heart text-muted fs-5"></i>
                </button>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
