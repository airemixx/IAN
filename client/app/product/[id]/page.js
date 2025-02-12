"use client";
import { use } from "react";
import ImageGallery from "./_components/image-gallery";
import ProductSpecs from "./_components/product-specs";
import RelatedProducts from "./_components/related-products";
import BreadcrumbIndex from "../_components/breadcrumb";
import "../css/product-list.css";

export default function ProductDetailPage({ params }) {
  const { id } = use(params); // ✅ 這樣解開 Promis

  // 🔹 靜態的假資料
  const product = {
    id,
    brand: "Canon",
    name: "EOS R5",
    description: "恆定 F2 最大光圈涵蓋多種拍攝需求的 28-70mm 焦段絕美定焦鏡的解像能力及散景表現 4 級 XD 線性馬達帶來快速、安靜的自動對焦918g輕量化設計，並具備理想平衡讓拍攝更舒適",
    price: 120000,
    images: [
      "/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png",
      "/images/product/2b2ea827765d48108ab5b2246a7fe2db_eos-5d-mk-iv-body-b22.png",
    ],
    specs: [
      { label: "888", value: "全片幅 CMOS" },
      { label: "像素", value: "4500 萬像素" },
      { label: "快門速度", value: "最高 1/8000 秒" },
    ],
  };

  return (
    <div className="container mt-4" style={{ paddingTop: "80px" }}>

      {/* 麵包屑 */}
      <BreadcrumbIndex/>

      <div className="row mt-5">
        {/* 左邊 - 圖片區 */}
          <ImageGallery images={product.images} />
        {/* 右邊 - 商品資訊 */}
        <div className="col-md-6 product-info">
          <p className="brand">{product.brand}</p>
          <h1 className="product-title">{product.name}</h1>
          <p className="introduce">{product.description}</p><br />
          <p className="price">NT$ {product.price.toString()}</p>
          <div className="d-flex">
            <button className="btn btn-primary me-2 cart">+加入購物車</button>
            <button className="btn"><i className="fa-regular fa-heart"></i></button>
          </div>
        </div>
      </div>

      {/* 產品規格 */}
      <ProductSpecs specs={product.specs} />

      {/* 推薦產品 */}
      <RelatedProducts />
    </div>
  );
}
