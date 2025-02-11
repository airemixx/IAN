"use client";

import styles from "./detail-nav.module.scss";

export default function DetailNav() {
  return (
    <>
      {" "}
      <div className={styles["detail-nav-links"]}>
        <a href="" className={styles["detail-nav-link"]}>
          <div className={styles["circle"]}></div>
          <p>課程內容</p>
        </a>
        <a href="" className={styles["detail-nav-link"]}>
          <div className={styles["circle"]}></div>
          <p>評價</p>
        </a>
        <a href="" className={styles["detail-nav-link"]}>
          <div className={styles["circle"]}></div>
          <p>相關課程推薦</p>
        </a>
      </div>
      <div className={`${styles["line"]} d-none d-sm-block`}></div>
    </>
  );
}
