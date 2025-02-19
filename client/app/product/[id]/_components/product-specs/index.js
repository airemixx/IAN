"use client";
import { useEffect } from "react";
import styles from "./product-specs.module.scss"; // ✅ 正確使用 SCSS Module

export default function ProductSpecs({ introduce, specs = [] }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min")
      .then(() => {
      })
      .catch((error) => {
        console.error("❌ Bootstrap 載入失敗:", error);
      });
  }, []);
  return (
    <div className="mt-4">
      {/* 🔹 手機版下拉選單 (768px 以下顯示) */}
      <div className={`accordion d-md-none`} id="mobileIntroduce">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingIntroduce">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseIntroduce"
              aria-expanded="false"
              aria-controls="collapseIntroduce"
            >
              產品介紹
            </button>
          </h2>
          <div id="collapseIntroduce" className="accordion-collapse collapse" data-bs-parent="#mobileIntroduce">
            <div className="accordion-body">
              <p>{introduce || "暫無產品介紹"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.spec}>
        {/* 🔹 桌機版 (768px 以上顯示左側內容) */}
        <div className={styles.description}>
          <p>{introduce || "暫無產品介紹"}</p>
        </div>

        {/* 右側詳細規格 */}
        <div className={styles.specDetails}>
          <div className="accordion" id="specAccordion">
            {specs.length > 0 ? (
              specs.map((spec, index) => (
                <div key={index}>
                  {/* ✅ 感光元件格式 */}
                  <div className={`${styles.accordionItem}`}>
                    <h2 className={styles.accordionHeader}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#camera-format-${index}`}
                        aria-expanded="false"
                        aria-controls={`camera-format-${index}`}
                      >
                        防手震功能
                      </button>
                    </h2>
                    <div
                      id={`camera-format-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#specAccordion"
                    >
                      <div className="accordion-body">
                        <p>{spec.image_stabilization || "無資料"}</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ 推出日期 */}
                  <div className={`${styles.accordionItem}`}>
                    <h2 className={styles.accordionHeader}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#release-date-${index}`}
                        aria-expanded="false"
                        aria-controls={`release-date-${index}`}
                      >
                        推出日期
                      </button>
                    </h2>
                    <div
                      id={`release-date-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#specAccordion"
                    >
                      <div className="accordion-body">
                        <p>{spec.release_date || "無資料"}</p>
                      </div>
                    </div>
                  </div>

                  {/* ✅ 防水等級 */}
                  <div className={`${styles.accordionItem}`}>
                    <h2 className={styles.accordionHeader}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#white_balance_settings-${index}`}
                        aria-expanded="false"
                        aria-controls={`white_balance_settings-${index}`}
                      >
                        白平衡設定
                      </button>
                    </h2>
                    <div
                      id={`white_balance_settings-${index}`}
                      className="accordion-collapse collapse"
                      data-bs-parent="#specAccordion"
                    >
                      <div className="accordion-body">
                        <p>{spec.white_balance_settings || "無資料"}</p>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-muted">沒有可用的產品規格</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
