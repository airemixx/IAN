'use client';

import { useState } from "react";

const images = [
  "/images/rental/test/leica-Q3-0.png",
  "/images/rental/test/leica-Q3-1.png",
  "/images/rental/test/leica-Q3-2.png",
  "/images/rental/test/leica-Q3-3.png",
  "/images/rental/test/leica-Q3-4.png",
  "/images/rental/test/leica-Q3-5.png",
];

export default function RentPhoto() {
  const [mainImage, setMainImage] = useState(images[0]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="text-center">
      <img src={mainImage} alt="Product Image" className="product-image img-fluid" />
      <div className="thumbnails-container mt-3 d-flex align-items-center position-relative">
        <button className="carousel-control-prev" type="button" onClick={handlePrev}>
          <span className="carousel-control-prev-icon" style={{ filter: "invert(1)" }} aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <div className="d-flex justify-content-between overflow-hidden mx-5">
          {images.slice(startIndex, startIndex + visibleCount).map((img, index) => (
            <div key={index} className="thumbnail mx-2" onClick={() => handleThumbnailClick(img)}>
              <img src={img} alt={`Thumbnail ${index}`} className={`img-fluid ${mainImage === img ? 'active' : ''}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-next" type="button" onClick={handleNext}>
          <span className="carousel-control-next-icon" style={{ filter: "invert(1)" }} aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}