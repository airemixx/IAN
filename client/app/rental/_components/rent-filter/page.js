// rent-filter

'use client';

import { useState } from 'react';

export default function RentFilter({ onFilterChange = () => {} }) {
  const [activeSections, setActiveSections] = useState([0]); // 預設只有簡易篩選開啟
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [selectedAdvanced, setSelectedAdvanced] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleAccordion = (index) => {
    setActiveSections((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ category, advanced: selectedAdvanced, brands: selectedBrands });
  };

  const handleAdvancedChange = (option) => {
    setSelectedAdvanced((prev) => {
      const newSelections = prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option];
      onFilterChange({ category: selectedCategory, advanced: newSelections, brands: selectedBrands });
      return newSelections;
    });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) => {
      const newSelections = prev.includes(brand)
        ? prev.filter((item) => item !== brand)
        : [...prev, brand];
      onFilterChange({ category: selectedCategory, advanced: selectedAdvanced, brands: newSelections });
      return newSelections;
    });
  };

  return (
    <div className="accordion" id="filterAccordion">
      {["用途篩選", "設備篩選", "品牌篩選"].map((title, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${activeSections.includes(index) ? "" : "collapsed"}`}
              type="button"
              onClick={() => toggleAccordion(index)}
            >
              {title}
            </button>
          </h2>
          <div className={`accordion-collapse collapse ${activeSections.includes(index) ? "show" : ""}`}>
            <div className="accordion-body">
              {index === 0 && ["全部", "人像攝影", "旅遊攝影", "街拍、Vlog", "婚禮、商業攝影", "產品、美食攝影", "運動、生態攝影"].map((category) => (
                <label key={category} className="d-block" style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    style={{ marginRight: '4px' }}
                  /> {category}
                </label>
              ))}
              {index === 1 && ["全幅相機", "半幅相機", "廣角變焦鏡頭", "標準變焦鏡頭", "望遠變焦鏡頭", "廣角定焦鏡頭", "標準定焦鏡頭", "望遠定焦鏡頭", "轉接環", "閃光燈", "麥克風", "腳架"].map((option) => (
                <label key={option} className="d-block" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedAdvanced.includes(option)}
                    onChange={() => handleAdvancedChange(option)}
                    style={{ marginRight: '4px' }}
                  /> {option}
                </label>
              ))}
              {index === 2 && ["Canon", "Leica", "Nikon", "Sony", "其他"].map((brand) => (
                <label key={brand} className="d-block" style={{ cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    style={{ marginRight: '4px' }}
                  /> {brand}
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
