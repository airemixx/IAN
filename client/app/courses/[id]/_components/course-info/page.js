import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./course-info.module.scss";
import FavoriteButtonG from "../favorite-button-g/page";
import { toast } from "react-toastify";

export default function CourseInfo({ course }) {
  const [cart, setCart] = useState([]);

  // 頁面載入時，從 `localStorage` 讀取購物車資料
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("shoppingCart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);

  // 加入購物車
  const handleAddToCart = () => {
    const token = localStorage.getItem("loginWithToken"); //
  
    if (!token) {
      // 未登入，顯示警告並阻止加入購物車
      toast.warn("請先登入，即可選購課程！", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
  
    const updatedCart = [...cart];
  
    // 檢查購物車是否已經有該課程
    const existingItemIndex = updatedCart.findIndex(
      (item) => item.id === course.id
    );
  
    if (existingItemIndex === -1) {
      // 如果沒有該課程，則新增
      updatedCart.push({
        id: course.id,
        title: course.title,
        price: course.sale_price,
        image: course.image_url,
        quantity: 1, // 初始數量 1
      });
  
      // 更新 `localStorage`
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      setCart(updatedCart);

      // 顯示成功提示
      toast.success("已加入購物車！", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      // 如果該課程已經在購物車中，顯示提示
      toast.warn("此課程已在購物車內！", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };
  

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section className={styles["course-info-container"]}>
      <div className="container">
        {/* 麵包屑導航 */}
        <nav className={styles["breadcrumb"]}>
          <ul className={styles["breadcrumb"]}>
            <li className={styles["breadcrumb-item"]}>
              <Link href="/">首頁</Link>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li className={styles["breadcrumb-item"]}>
              <Link href="/courses">影像學院</Link>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li className={styles["breadcrumb-item"]}>
              <Link href={`/courses?category=${course.category}`}>
                {course.category}
              </Link>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li
              className={`${styles["breadcrumb-item"]} ${styles["breadcrumb-item-active"]}`}
            >
              {course.title}
            </li>
          </ul>
        </nav>

        {/* 課程資訊 */}
        <div className={`row ${styles["course-info"]}`}>
          <div className={`col-md-6 ${styles["course-img"]}`}>
            <img src={course.image_url} alt="" />
          </div>
          <div className={`col-md-6 ${styles["course-detail"]}`}>
            <h1> {course.title}</h1>
            <a
              href="#"
              className={styles["course-info-teacher"]}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("teacher-info");
              }}
            >
              <div className={styles["teacher-img"]}>
                <img src={course.teacher_image} alt="" />
              </div>
              <h3>{course.teacher_name}</h3>
            </a>
            <p>{course.description}</p>
            <div className={styles["line"]}></div>
            <div className={styles["original-price"]}>
              {course.original_price.toLocaleString("en-US")}
            </div>
            <div className={styles["shopping-btns"]}>
              <div className={styles["price"]}>
                <div className={styles["discount-price"]}>
                  {course.sale_price.toLocaleString("en-US")}
                </div>
              </div>
              <div className={styles["shopping-btn"]}>
                <button className={styles["buy-btn"]}>+ 立即購買</button>
                <button
                  className={`${styles["cart-btn"]} hvr-icon-pulse`}
                  onClick={handleAddToCart} // ✅ 綁定加入購物車事件
                >
                  <img
                    src="/images/icon/cart-btn.svg"
                    alt=""
                    className="hvr-icon"
                  />
                  <p>加入購物車</p>
                </button>
                <FavoriteButtonG courseId={course.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
