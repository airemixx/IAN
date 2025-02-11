"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./filter-sidebar.module.scss"; // 正確引入 SCSS Module

export default function FilterSidebar() {
  const [showFilter, setShowFilter] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [isOpen, setIsOpen] = useState({
    brand: false,
    lens: false,
    accessory: false,
    price: false,
    stock: false,
  });

  // 🔹 切換篩選欄顯示/隱藏
  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  // 🔹 點擊畫面其他地方時關閉篩選欄
  const handleClickOutside = useCallback(
    (event) => {
      if (!event.target.closest(`.${styles.asideFilter}`) && !event.target.closest(`.${styles.filterToggleBtn}`)) {
        setShowFilter(false);
      }
    },
    []
  );

  // 🔹 監聽滾動事件，當滾動到底部時隱藏按鈕
  const handleScroll = useCallback(() => {
    const footer = document.getElementById("footer");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      setHideButton(footerRect.top < window.innerHeight);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleClickOutside, handleScroll]);

  // 🔹 手動切換下拉選單的開關
  const toggleCollapse = (category) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    <>
      {/* 🔹 按鈕在滾動到底部時會隱藏 */}
      <button className={`${styles.filterToggleBtn} d-md-none ${hideButton ? styles.hidden : ""}`} onClick={toggleFilter}>
        篩選條件
      </button>

      {/* 側邊篩選欄 */}
      <div className={`${styles.asideFilter} ${showFilter ? styles.show : ""}`}>
        <aside>
          <div className="accordion" id="dropdown-container">
            {/* 品牌篩選 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${isOpen.category ? "" : "collapsed"}`}
                  type="button"
                  onClick={() => toggleCollapse("category")}
                >
                  種類
                </button>
              </h2>
              <div className={`accordion-collapse ${isOpen.category ? "show" : "collapse"}`}>
                <div className="accordion-body">
                  <label><input type="checkbox" name="category" value="相機" /> 相機</label><br />
                  <label><input type="checkbox" name="category" value="鏡頭" /> 鏡頭</label><br />
                  <label><input type="checkbox" name="category" value="配件" /> 配件</label><br />
                </div>
              </div>
            </div>

            {/* 鏡頭篩選 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className={`accordion-button ${isOpen.lens ? "" : "collapsed"}`} type="button" onClick={() => toggleCollapse("lens")}>
                  鏡頭種類
                </button>
              </h2>
              <div className={`accordion-collapse ${isOpen.lens ? "show" : "collapse"}`}>
                <div className="accordion-body">
                  <label><input type="checkbox" name="lens" value="廣角" /> 廣角</label><br />
                  <label><input type="checkbox" name="lens" value="標準" /> 標準</label><br />
                  <label><input type="checkbox" name="lens" value="長焦" /> 長焦</label><br />
                  <label><input type="checkbox" name="lens" value="微距" /> 微距</label><br />
                </div>
              </div>
            </div>

            {/* 配件篩選 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className={`accordion-button ${isOpen.accessory ? "" : "collapsed"}`} type="button" onClick={() => toggleCollapse("accessory")}>
                  配件
                </button>
              </h2>
              <div className={`accordion-collapse ${isOpen.accessory ? "show" : "collapse"}`}>
                <div className="accordion-body">
                  <label><input type="checkbox" name="accessory" value="電池" /> 電池</label><br />
                  <label><input type="checkbox" name="accessory" value="記憶卡" /> 記憶卡</label><br />
                  <label><input type="checkbox" name="accessory" value="背帶" /> 背帶</label><br />
                </div>
              </div>
            </div>

            {/* 價格篩選 */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className={`accordion-button ${isOpen.price ? "" : "collapsed"}`} type="button" onClick={() => toggleCollapse("price")}>
                  價格
                </button>
              </h2>
              <div className={`accordion-collapse ${isOpen.price ? "show" : "collapse"}`}>
                <div className="accordion-body">
                  <div className="d-flex align-items-center">
                    <input type="number" className="form-control price-input me-2" placeholder="最低金額" min={0} />
                    <span className="mx-2"> ~ </span>
                    <input type="number" className="form-control price-input" placeholder="最高金額" min={0} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
