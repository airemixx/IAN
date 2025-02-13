"use client";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
import styles from "./product-button.module.scss"; // ✅ 正確引入 SCSS Module

export default function CompareButton({ product }) {
  const handleClick = () => {
    alert(`將 ${product.name} 加入比較清單！`);
  };

  return (

  <div className={styles.iconcontainer}>
    <div className={styles.iconCircle}>
      <i className="fa-solid fa-camera" />
    </div>
    <p className={styles.iconText}>比較</p>
  </div>


  );
}
