"use client";
import styles from "./cart-button.module.scss";

export default function CartButton({ isHovered, onClick }) {
  return (
    <button
      className={`${styles.cartButton} ${isHovered ? styles.show : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      加入購物車
    </button>
  );
}
