"use client";
import styles from "./cart-button.module.scss"; // ✅ 引入 SCSS Module

export default function CartButton({ isHovered, onClick }) {
  return (
    <button
      className={`${styles.cartButton} ${isHovered ? styles.show : ""}`}
      onClick={(e) => {
        e.stopPropagation(); // ✅ 防止點擊事件被 `stretched-link` 截走
        onClick();
      }}
    >
      加入購物車
    </button>
  );
}
