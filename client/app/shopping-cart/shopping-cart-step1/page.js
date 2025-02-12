"use client"
import  "./shopping-cart-step1.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Script from "next/script"
import CartTitle from "../_components/cart-title/page";
import PriceSummary from "../_components/price-summary/page";
import CartSection from "../_components/cart-section/page";
export default function shoppingCartOnePage() {

    const cartItems = [
        {
          type: "product",
          image: "../images/shopping-cart-image/shoppingCartItemPhoto.png",
          brand: "FUJIFILM",
          model: "X-T5 16-50mm",
          price: "NT$67000",
          specs: [
            {
              title: "影像規格 IMAGE SPECIFICATIONS",
              details: [
                { label: "有效像素", value: "2550 萬像素" },
                { label: "感光元件像素", value: "2420 萬像素" },
                { label: "感光元件格式", value: "APS-C" },
                { label: "感光元件大小", value: "22.3 x 14.9mm" },
              ],
            },
            {
              title: "觀景器 VIEWFINDER",
              details: [
                { label: "有效像素", value: "2550 萬像素" },
                { label: "感光元件像素", value: "2420 萬像素" },
                { label: "感光元件格式", value: "APS-C" },
                { label: "感光元件大小", value: "22.3 x 14.9mm" },
              ],
            },
            {
              title: "資料存取 DATA TRANSFER",
              details: [
                { label: "有效像素", value: "2550 萬像素" },
                { label: "感光元件像素", value: "2420 萬像素" },
                { label: "感光元件格式", value: "APS-C" },
                { label: "感光元件大小", value: "22.3 x 14.9mm" },
              ],
            },
            {
              title: "機身資料 PHYSICAL SPECIFICATIONS",
              details: [
                { label: "有效像素", value: "2550 萬像素" },
                { label: "感光元件像素", value: "2420 萬像素" },
                { label: "感光元件格式", value: "APS-C" },
                { label: "感光元件大小", value: "22.3 x 14.9mm" },
              ],
            },
            {
              title: "其它資料 OTHERS",
              details: [
                { label: "有效像素", value: "2550 萬像素" },
                { label: "感光元件像素", value: "2420 萬像素" },
                { label: "感光元件格式", value: "APS-C" },
                { label: "感光元件大小", value: "22.3 x 14.9mm" },
              ],
            },
            // 其他規格...
          ],
        },
        // 其他商品...
      ];
      const cartLession = [{
        type: "lession",
        image: "/images/shopping-cart-image/lesson1.png",
        lessionNametitle: "旅行攝影：按下快門，用攝影書寫故事",
        lessionName: "食癮，拾影",
        price: "NT$21800"
      }]

      const cartRent = [{
        type: "rent",
        image: "/images/shopping-cart-image/shoppingCartItemPhoto.png",
        brand: "FUJIFILM",
        model: "X-T5 16-50mm",
        price: "NT$1800"
      }]
    return (
       
        <>
        <div className="container">
          <CartTitle count={cartItems.length} />
          <div className="row d-flex justify-content-center">
            <CartSection items={cartItems} lessions={cartLession} rentals={cartRent}/>
            <PriceSummary />
          </div>
        </div>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
      </>
    )
}