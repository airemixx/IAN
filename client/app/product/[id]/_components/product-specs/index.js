"use client";

import styles from "./product-specs.module.scss"; // ✅ 正確使用 SCSS Module

export default function ProductSpecs({ specs = [] }) {
  if (!specs.length) {
    return <p>無可用規格</p>; // 如果沒有規格顯示替代內容
  }

  return (
    <div className="mt-4">
      {/* 產品資訊 - 手機版下拉選單 */}
      <div className={`accordion d-md-none ${styles.accordionMobile}`} id="mobileDescription">
        <div className="accordion-item">
          <h2 className="accordion-header" id="mobileHeading">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mobileCollapse"
            >
              產品資訊
            </button>
          </h2>
          <div id="mobileCollapse" className="accordion-collapse collapse" data-bs-parent="#mobileDescription">
            <div className="accordion-body">
              <p>
                EOS 5D Mark IV 整合了革新的 Accelerated Capture 系統及高畫質傳感器，帶來卓越的性能和功能。
                EOS 5D Mark IV，4500 萬像素全畫幅影像感測器 CMOS，讓每一張影像都有極致的細節與清晰度。
                8K DCI 60p Light RAW 的 4K 120p HDR，是一次性將專業影像帶至新境界的佳選。
                EOS 5D Mark IV 結合最先進的焦點技術及靈敏的對焦系統。適合多種拍攝需求，包括專業攝影師以及影片創作者。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.spec}>
        {/* 左側說明 */}
        <div className={styles.description}>
          <p>
            EOS 5D Mark IV 整合了革新的 Accelerated Capture 系統及高畫質傳感器，帶來卓越的性能和功能。
            EOS 5D Mark IV，4500 萬像素全畫幅影像感測器 CMOS，讓每一張影像都有極致的細節與清晰度。
            8K DCI 60p Light RAW 的 4K 120p HDR，是一次性將專業影像帶至新境界的佳選。
            EOS 5D Mark IV 結合最先進的焦點技術及靈敏的對焦系統。適合多種拍攝需求，包括專業攝影師以及影片創作者。
          </p>
        </div>

        {/* 右側詳細規格 */}
        <div className={styles.specDetails}>
          <div className="accordion" id="specAccordion">
            {specs.map((spec, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${index}`}
                  >
                    {spec.label}
                  </button>
                </h2>
                <div id={`collapse${index}`} className="accordion-collapse collapse" data-bs-parent="#specAccordion">
                  <div className="accordion-body">
                    <p>{spec.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
