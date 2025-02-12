"use client";

import styles from "./teacher-info.module.scss";

export default function TeacherInfo() {
  return (
    <section className={styles["teacher-info-container"]}>
      <div className={styles["section-detail-title"]} data-aos="fade-right">
        <div className={styles["title-block"]}></div>
        <h2>關於講師</h2>
      </div>
      <div
        className={styles["teacher-info"]}
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
      >
        <div className={styles["teacher-info-img"]}>
          <img src="/images/teacher/teacher_4.avif" alt="" />
        </div>

        <div className={styles["teacher-info-text"]}>
          <h3>Ada Lin</h3>
          <ul className={styles["teacher-data"]}>
            <li className={styles["data-item"]}>
              <img src="/images/icon/course-icon.svg" alt="" />
              <p>2 堂課程</p>
            </li>
            <li className={styles["data-item"]}>
              <img src="/images/icon/article-icon.svg" alt="" />
              <p>1 篇文章</p>
            </li>
            <li className={styles["data-item"]}>
              <img src="/images/icon/student-icon.svg" alt="" />
              <p>1,832 位學生</p>
            </li>
          </ul>
          <div className={styles["line"]}></div>
          <p>
            林居工作室攝影師，熱愛美食、設計以及藝術！ NOM
            飲食文化誌長期配合攝影師，並累積與野宴燒肉、樂法、OK
            超商等廠商合作經驗。
          </p>
          <div className={styles["go-page-link"]}>
            <a href="">
              前往講師頁面
              <img src="/images/icon/arrow-right.svg" alt="" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
