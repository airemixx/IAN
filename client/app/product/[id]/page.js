"use client";
import { use } from "react";
import ImageGallery from "./_components/image-gallery";
import ProductInfo from "./_components/product-info"; // ✅ 引入拆分的元件
import ProductSpecs from "./_components/product-specs";
import RelatedProducts from "./_components/related-products";
import BreadcrumbIndex from "../_components/breadcrumb";
import "../css/product-list.css";


export default function ProductDetailPage({ params }) {
  const { id } = use(params);


  // 🔹 靜態的假資料
  const product = {
    id,
    brand: "Canon",
    name: "EOS R5",
    description: "恆定 F2 最大光圈涵蓋多種拍攝需求的 28-70mm 焦段...",
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

      <BreadcrumbIndex />
      <div className="row mt-5">      
          <ImageGallery images={product.images} />
        <div className="col-md-6">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductSpecs specs={product.specs} />
      {/* 🔹 推薦產品 */}
      <RelatedProducts />
    </div>
  );
}
