import { useState, useEffect } from "react";
import Link from "next/link";
import FavoriteButton from "@/app/courses/_components/favorite-button/page";
import StarRating from "@/app/courses/_components/star-rating/page";
import styles from "./courses-card.module.scss";
import Aos from "aos";

export default function CourseCard({ course, isFavorite, onToggleFavorite }) {
  console.log("渲染 CourseCard，接收到的 course:", course);

  if (!course) {
    return <div className="error">無法載入課程</div>;
  }

  const safeImage = course.image_url || "/images/default-course.jpg";
  const [aosTrigger, setAosTrigger] = useState(false);

  useEffect(() => {
    setAosTrigger((prev) => !prev); // ✅ 這樣 AOS 會重新觸發動畫，但不影響 key
  }, [course]);

  return (
    <div className="col-lg-3 col-md-6 col-12" data-aos="fade-up" data-aos-offset="100">
      <Link href={`/courses/${course.id}`} className={styles["course-card-link"]}>
        <div className={`${styles["course-card"]} mb-md-5 mb-4 hvr-float`}>
          <div className="e-card-img">
            <img src={safeImage} alt={course.title} className="img-fluid" />
            <div className="e-img-overlay"></div>

            <FavoriteButton courseId={course.id} isFavorite={isFavorite} onToggleFavorite={onToggleFavorite} />
          </div>
          <h3 className={styles["course-title"]}>{course.title}</h3>
          <p className={styles["teacher-name"]}>{course.teacher_name}</p>

          {/* 評分 + 學生數量 */}
          <div className={styles["rating-student"]}>
            <div className={styles["rating"]}>
              <p>{parseFloat(course.rating || 0).toFixed(1)}</p>
              <StarRating rating={course.rating || 0} />
            </div>
            <div className={styles["student-count"]}>
              <img src="/images/icon/student-count.svg" alt="學生數量" />
              <div className={styles["student-num"]}>
                {course.student_count ? course.student_count.toLocaleString("en-US") : "0"}
              </div>
            </div>
          </div>

          {/* 價錢 */}
          <div className={styles["course-price"]}>
            <p>
              NT$ {course.sale_price ? course.sale_price.toLocaleString("en-US") : "N/A"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
