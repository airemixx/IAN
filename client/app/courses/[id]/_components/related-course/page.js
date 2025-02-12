import { useEffect, useState } from "react";
import styles from "./related-course.module.scss";
import StarRating from "@/app/courses/_components/star-rating/page";

const courses = [
  {
    title: "旅行攝影：按下快門，用攝影書寫故事",
    teacher: "食癮，拾影",
    rating: 4.8,
    studentCount: 1234,
    price: 2180,
    imageUrl: "/images/course-cover/course_1_1.avif",
  },
  {
    title: "攝影入門：從零開始學習攝影",
    teacher: "影像學院",
    rating: 4.5,
    studentCount: 3456,
    price: 1980,
    imageUrl: "/images/course-cover/course_2_1.avif",
  },
  {
    title: "光影的魔法：專業攝影技術",
    teacher: "大師教室",
    rating: 4.2,
    studentCount: 4567,
    price: 2500,
    imageUrl: "/images/course-cover/course_3_1.avif",
  },
  {
    title: "戶外攝影：探索大自然",
    teacher: "戶外攝影師",
    rating: 4.7,
    studentCount: 5678,
    price: 1999,
    imageUrl: "/images/course-cover/course_4_1.avif",
  },
];

export default function RelatedCourses() {
  useEffect(() => {
    // 初始化 AOS 動畫效果（如果使用 AOS）
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init();
    }
  }, []);

  return (
    <div className={styles["container"]}>
      <hr />
      <div className={styles["section-detail-title"]}>
        <div className={styles["title-block"]}></div>
        <h2>相關課程推薦</h2>
      </div>
      <div className="row mt-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="col-md-3"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <a href="#" className={styles["course-card-link"]}>
              <div className={`${styles["course-card"]} mb-4 mb-md-5`}>
                <div className={styles["card-img"]}>
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="img-fluid"
                  />
                  <div className={styles["img-overlay"]}></div>
                  <div className={`${styles["favorite-icon"]} hvr-push`}>
                    <i className="fa-regular fa-heart hvr-icon"></i>
                  </div>
                </div>
                <h3 className={styles["course-title"]}>{course.title}</h3>
                <p className={styles["teacher-name"]}>{course.teacher}</p>
                <div className={styles["rating-student"]}>
                  <div className={styles["rating"]}>
                    <p>{course.rating}</p>
                  <StarRating rating={course.rating} />
                  </div>
                  <div className={styles["student-count"]}>
                    <img
                      src="/images/icon/student-count.svg"
                      alt="學生數量"
                    />
                    <div className={styles["student-num"]}>
                      {course.studentCount}
                    </div>
                  </div>
                </div>
                <div className={styles["course-price"]}>
                  <p>NT$ {course.price}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
