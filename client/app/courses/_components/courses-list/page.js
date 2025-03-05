import { useState, useEffect, useMemo } from "react";
import CourseCard from "@/app/courses/_components/course-card/page"; // ✅ 引入 `CourseCard`
import Pagination from "@/app/courses/_components/pagination/page"
import { toast } from "react-toastify";
import styles from "./courses-list.module.scss";

export default function CourseList({ courses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  const [popularCourses, setPopularCourses] = useState([]);
  const [filterChangeId, setFilterChangeId] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (courses.length > 0) {
      setCurrentPage(1);
      setFilterChangeId((prev) => prev + 1);
    }
  }, [courses]);

  const publishedCourses = useMemo(() => {
    return courses.filter((course) => course.status === "published");
  }, [courses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = useMemo(() => {
    return publishedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  }, [publishedCourses, currentPage]);

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/courses?sort=popular");
        if (!res.ok) throw new Error(`HTTP 錯誤！狀態碼：${res.status}`);

        const data = await res.json();
        setPopularCourses(data.filter((course) => course.status === "published").slice(0, 4));
      } catch (err) {
        console.error("載入熱門課程失敗:", err.message);
      }
    };

    fetchPopularCourses();
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("loginWithToken");
    if (storedToken) {
      setToken(storedToken);
      fetchFavorites(storedToken);
    }
  }, []);

  const fetchFavorites = async (token) => {
    try {
      const res = await fetch("http://localhost:8000/api/courses/collection", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      });
  
      if (!res.ok) throw new Error("無法取得收藏清單");
  
      const data = await res.json();
      console.log("✅ API 回傳所有收藏課程:", data);
  
      return data.favorites || []; // ✅ 確保 favorites 為陣列
    } catch (error) {
      console.error("❌ 收藏清單載入錯誤:", error);
      return []; // 發生錯誤時，回傳空陣列
    }
  };
  
  
  const toggleFavorite = async (courseId) => {
    if (!token) {
      toast.warn("請先登入才能收藏課程！", { position: "top-right", autoClose: 3000 });
      return;
    }

    try {
      const isFavorited = favorites.has(courseId);
      const method = isFavorited ? "DELETE" : "POST";
      let url = "http://localhost:8000/api/courses/collection";
      if (method === "DELETE") url = `http://localhost:8000/api/courses/collection/${courseId}`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: method === "POST" ? JSON.stringify({ course_id: courseId }) : null,
      });

      if (!res.ok) throw new Error(await res.text());

      setFavorites((prev) => {
        const updatedFavorites = new Set(prev);
        if (isFavorited) updatedFavorites.delete(courseId);
        else updatedFavorites.add(courseId);
        return updatedFavorites;
      });

      toast.success(isFavorited ? "已取消收藏！" : "成功加入收藏！", { position: "top-right", autoClose: 2000 });

    } catch (error) {
      console.error("❌ 收藏操作錯誤:", error);
      toast.error("操作失敗：" + (error.message || "發生錯誤，請稍後再試"), { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <section className={`container ${styles["course-list"]}`}>
      {publishedCourses.length === 0 && currentCourses.length === 0 ? (
        <>
          <div className={styles["notfound"]}>
            <p>找不到符合條件的課程，試試其他關鍵字吧！</p>
          </div>

          {popularCourses.length > 0 && (
            <div className={styles["recommended-section"]}>
              <div className={styles["pop-course"]}>
                <div className={styles["title-block"]}></div>
                <h3>你可能會喜歡這些熱門課程：</h3>
              </div>

              <div className="row">
                {popularCourses.map((course) => (
                  <CourseCard
                    key={`${course.id}-${filterChangeId}`}
                    course={course}
                    isFavorite={favorites.has(course.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="row mt-4">
            {currentCourses.length === 0 ? (
              <p>找不到符合條件的課程，試試其他關鍵字吧！</p>
            ) : (
              currentCourses.map((course) => (
                <CourseCard
                  key={`${course.id}-${filterChangeId}`}
                  course={course}
                  isFavorite={favorites.has(course.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))
            )}
          </div>

          {/* ✅ 加回 Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(publishedCourses.length / coursesPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  );
}