"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useCompare } from "@/app/product/_context/CompareContext";
import Swal from "sweetalert2";
import styles from "./product-button.module.scss";

export default function CompareButton({ product, isHovered }) {
  const { compareList, addToCompare, removeFromCompare } = useCompare();
  const isInCompareList = compareList.some((p) => p.id === product.id);

  const handleCompareClick = () => {
    if (isInCompareList) {
      removeFromCompare(product.id);
      Swal.fire({
        // icon: "info",
        title: "已移除比較清單",
        text: `${product.name} 已從比較清單中移除！`,
        imageUrl: product.image_url,
        imageWidth: 350,
        imageHeight: 300,
        imageAlt: product.name,
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: styles.sweetAlertPopup, // ✅ 使用 SCSS 調整彈窗樣式
        },
      });
    } else {
      if (compareList.length >= 3) {
        Swal.fire({
          icon: "warning",
          title: "最多只能比較 3 項商品！",
          text: "請先移除一項再加入新的商品。",
        });
      } else {
        addToCompare(product);
        Swal.fire({
          // icon: "success",
          title: "成功加入比較清單！",
          text: `${product.name} 已加入比較！`,
          imageUrl: product.image_url,
          imageWidth: 350,
          imageHeight: 300,
          imageAlt: product.name,
          timer: 1500,
          showConfirmButton: false,
          customClass: {
            popup: styles.sweetAlertPopup, // ✅ SCSS 調整彈窗
          },
        });
      }
    }
  };

  return (
    <div className={`${styles.iconcontainer} ${isHovered ? styles.show : styles.hide}`}>
      <div 
        className={`${styles.iconCircle} ${isInCompareList ? styles.added : ""}`} 
        onClick={handleCompareClick}
      >
        {/* ✅ 將勾勾放到圖片的右上角 */}
        <FontAwesomeIcon icon={isInCompareList ? faCheck : faCamera} className={styles.icon} />
      </div>
      <p className={styles.iconText}>{isInCompareList ? "已加入" : "比較"}</p>
    </div>
  );
}
