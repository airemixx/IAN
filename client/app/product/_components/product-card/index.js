"use client";
import Link from "next/link";
import CompareButton from "../product-button";
import styles from "./product-card.module.scss"; // ✅ 正確引入 SCSS Module

export default function ProductCard({ product }) {
  return (
    <div className={`col-6 col-sm-6 col-md-4 col-lg-3 mb-4 ${styles.card}`}>
      <div className=" position-relative">
        {/* 比較按鈕 (這個不會被 stretched-link 影響) */}
        <div className="position-absolute top-0 end-0 p-2 z-3">
          <CompareButton product={product} />
        </div>

        {/* 讓整張卡片可點擊，除了按鈕 */}
        <Link href={`/product/${product.id}`} className="stretched-link" aria-label={`查看 ${product.name} 的詳細資訊`} />

        {/* 商品圖片，確保它一直顯示，不會 hover 才出現 */}
        <div className="position-relative">
        <img src={product.image_url} alt={product.name} className={styles.cardImgTop} />

        </div>

        <div className={`${styles.cardbody} position-relative`}>
        <p className={`text ${styles.productBrand}`}>{product.brand_name}</p>  
          <h5 className={`card-title ${styles.productTitle}`}>{product.name}</h5>
          <p className={`card-text ${styles.cardText}`}>NT. {product.price.toLocaleString()}</p>

          {/* 按鈕區域，加上 position-relative，確保不被 stretched-link 影響 */}
          <div className="d-flex justify-content-center">
            <button className={`btn btn-secondary ${styles.custom} w-100 ${styles.purchaseButton}`}>
              立即選購
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
