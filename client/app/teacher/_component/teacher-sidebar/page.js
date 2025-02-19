"use client";

import styles from "./teacher-sidebar.module.scss";
import { FaTimes, FaChalkboard, FaPlusSquare, FaQuestionCircle, FaSignOutAlt, FaAddressBook } from "react-icons/fa";

export default function TeacherSidebar() {
  return (
    <div className="col-md-3 col-lg-2 d-none d-xl-block">
      <div className={styles["center-sidebar"]}>
        {/* ❌ 關閉側邊欄按鈕 */}
        <button className={styles["close-sidebar-btn"] + " d-md-none"}>
          <FaTimes /> {/* ✅ 改用 FaTimes */}
        </button>

        {/* 📌 Logo 區塊 */}
        <div className={styles["logo"]}>
          <img src="/images/icon/lenstudio-logo.svg" alt="Lenstudio Logo" />
          <hr />
        </div>

        {/* 📌 講師資訊 */}
        <div className={styles["teacher-data"]}>
          <div className={styles["teacher-sticker"]}>
            <img src="/images/teachers/余惟.jpg" alt="講師頭像" />
          </div>
          <h2 className={styles["teacher-name"]}>Ada Lin</h2>
          <p className={styles["teacher-email"]}>ada@gmail.com</p>
        </div>

        {/* 📌 控制中心 */}
        <div className={styles["control-center"]}>
          <ul>
            <li>
              <a href="">
                <FaAddressBook /> 講師資料
              </a>
            </li>
            <li>
              <a href="">
                <FaChalkboard /> 我的課程
              </a>
            </li>
            <li>
              <a href="">
                <FaPlusSquare /> 新增課程
              </a>
            </li>
            <li>
              <a href="">
                <FaQuestionCircle /> 客服中心
              </a>
            </li>
          </ul>

          {/* 📌 登出 */}
          <div className={styles["logout"]}>
            <a href="">
              <FaSignOutAlt /> 登出
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
