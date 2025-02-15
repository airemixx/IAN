"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons"; // ✅ 引入圖示
import styles from "./product-button.module.scss"; // ✅ SCSS Module

export default function CompareButton({ product, isHovered }) {
  const handleClick = () => {
    alert(`將 ${product.name} 加入比較清單！`);
  };

  return (
    <div className={`${styles.iconcontainer} ${isHovered ? styles.show : ""}`}>
      <div className={styles.iconCircle} onClick={handleClick}>
        {/* ✅ 正確使用 FontAwesomeIcon */}
        <FontAwesomeIcon icon={faCamera} size="lg" />
      </div>
      <p className={styles.iconText}>比較</p>
    </div>
  );
}
