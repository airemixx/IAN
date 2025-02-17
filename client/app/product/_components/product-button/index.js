"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faCheck } from "@fortawesome/free-solid-svg-icons"; // ✅ 加入 `faCheck` 圖示
import { useCompare } from "@/app/product/_context/CompareContext"; // ✅ 使用 Context
import styles from "./product-button.module.scss";

export default function CompareButton({ product }) {
  const { compareList, addToCompare, removeFromCompare } = useCompare(); // ✅ 取出 `compareList`
  
  // ✅ 判斷該商品是否已經加入比較清單
  const isInCompareList = compareList.some((p) => p.id === product.id);

  return (
    <div className={styles.iconcontainer}>
      <div 
        className={`${styles.iconCircle} ${isInCompareList ? styles.added : ""}`} 
        onClick={() => isInCompareList ? removeFromCompare(product.id) : addToCompare(product)}
      >
        <FontAwesomeIcon icon={isInCompareList ? faCheck : faCamera} size="lg" />
      </div>
      <p className={styles.iconText}>
        {isInCompareList ? "已加入" : "比較"}
      </p>
    </div>
  );
}
