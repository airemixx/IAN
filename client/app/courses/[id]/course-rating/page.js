"use client";

import styles from "./course-rating.module.scss";
import CourseComment from "../course-comment/page";

export default function CourseRating() {
  const comments = [
    {
      name: "Alice",
      date: "2025/01/05",
      rating: 4.8,
      title: "帶你看從影像的人設切入，一層一層疊加上去的過程",
      content:
        "從影像的人設開始構思：使用一天哪個時段感的燈光、搭配的物品、以及配色，再加上前置拍攝品的擺放準備（比如怎麼＂做＂出一個漢堡）、反光道具選擇及配置圖，一直到進後製修圖；不僅用單眼示範還加上手機的拍攝，非常仔細，如果忘記到底講了哪些東西或是聽到恍神，最後還有條列出章節回顧，之後如果要回放也可以先從最後查找，很值得購入以及反覆觀看學習的課程．",
      imgSrc: "./images/commentator/commenter_1.jpg",
    },
    {
      name: "Bob",
      date: "2025/01/10",
      rating: 5.0,
      title: "很值得購買的課程",
      content: "老師的講解非常清楚，學到了很多實用技巧！",
      imgSrc: "./images/commentator/commenter_2.jpg",
    },
    {
      name: "Alice",
      date: "2025/01/05",
      rating: 4.8,
      title: "帶你看從影像的人設切入，一層一層疊加上去的過程",
      content:
        "從影像的人設開始構思：使用一天哪個時段感的燈光、搭配的物品、以及配色，再加上前置拍攝品的擺放準備（比如怎麼＂做＂出一個漢堡）、反光道具選擇及配置圖，一直到進後製修圖；不僅用單眼示範還加上手機的拍攝，非常仔細，如果忘記到底講了哪些東西或是聽到恍神，最後還有條列出章節回顧，之後如果要回放也可以先從最後查找，很值得購入以及反覆觀看學習的課程．",
      imgSrc: "./images/commentator/commenter_1.jpg",
    },
    {
      name: "Bob",
      date: "2025/01/10",
      rating: 5.0,
      title: "很值得購買的課程",
      content: "老師的講解非常清楚，學到了很多實用技巧！",
      imgSrc: "./images/commentator/commenter_2.jpg",
    },
  ];

  return (
    <section className={styles["course-rating-container"]}>
      <div className={styles["section-detail-title"]} data-aos="fade-right">
        <div className={styles["title-block"]}></div>
        <h2>課程評價</h2>
      </div>
      <div className={styles["course-rating"]} data-aos="fade-up">
        <div className={styles["rating-left"]}>
          <div className={styles["score-area"]}>
            <p className={styles["score"]}>4.8</p>
            <p className={styles["total-score"]}>/ 5.0</p>
          </div>
          <div className={styles["star-area"]}>
            <div className={styles["rating"]}>
              <div className={styles["rating-star"]} data-rating="4.8"></div>
            </div>
            <div className={styles["rating-count"]}>1566 則評價</div>
          </div>
        </div>
        <div className={styles["rating-right"]}>
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={index} className={styles["progress-container"]}>
              <div className={styles["count"]}>{rating}</div>
              <div className={styles["progress"]}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${[90, 8, 2, 0, 0][index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 評論區 */}
      <div className="row g-3">
        {comments.map((comment, index) => (
          <CourseComment key={index} {...comment} />
        ))}
      </div>

      {/* 所有評價按鈕 */}
      <div className={styles["all-comment-link"]}>
        <a href="">
          所有評價 <img src="/images/icon/all-comment.svg" alt="所有評價" />
        </a>
      </div>
    </section>
  );
}
