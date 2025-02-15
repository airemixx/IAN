"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ 確保正確獲取 params
import ImageGallery from "./_components/image-gallery";
import ProductInfo from "./_components/product-info";
import ProductSpecs from "./_components/product-specs";
import RelatedProducts from "./_components/related-products";
import BreadcrumbIndex from "./_components/breadcrumb";
import "../css/product-list.css";

export default function ProductDetailPage() {
  const params = useParams(); // ✅ 取得 params 物件
  const id = params?.id; // ✅ 確保 `id` 存在

  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        if (!id) return; // 確保 id 存在
        const response = await fetch(`http://localhost:8000/api/product/${id}`);
        if (!response.ok) throw new Error("獲取商品失敗");

        const data = await response.json();
        console.log("🛒 取得的商品資訊:", data);
        setProduct(data);
      } catch (error) {
        console.error("商品載入錯誤:", error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>商品載入中...</p>;
  }

  return (
    <div className="container mt-4" style={{ paddingTop: "80px" }}>
      <BreadcrumbIndex />
      <div className="row mt-5">
        <ImageGallery productId={id} />
        <div className="col-md-6">
          <ProductInfo product={product} />
        </div>
      </div>
      <ProductSpecs introduce={product.introduce} specs={product.specs} />
      <RelatedProducts brandId={product.brand_id} currentId={id} />
    </div>
  );
}
