import styles from "./cart-item.module.scss";
import ProductDetails from "../product-details/page";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function CartItem({ id, itemData, page }) {
  const { image, brand, name, price, specs, quantity } = itemData;
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }

  }, []);

  function handleDeleteItem() {
    Swal.fire({
      title: "確定要刪除嗎？",
      text: "刪除後將無法恢復此商品！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CA6D1B",
      cancelButtonColor: "#003150",
      confirmButtonText: "刪除",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        // 取得 localStorage 中的購物車數據
        let cart = JSON.parse(localStorage.getItem("cart")) || {};

        delete cart[id];
        let updatedCart = Object.entries(cart).filter(v => v != null); // 過濾掉該商品
        updatedCart = updatedCart.map(v => v[1]);

        console.log(updatedCart);
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // 顯示刪除成功提示
        Swal.fire({
          title: "已刪除！",
          text: "商品已從購物車移除。",
          icon: "success",
          confirmButtonText: "確定",
        }).then(() => {
          // 刷新頁面或通知父層更新購物車
          window.location.reload();
        });
      }
    });
  }


  return (
    <>
      <div className="d-none d-sm-block d-flex flex-grow-1">
        <div className="d-flex flex-grow-1 flex-column">
          <div className={`${styles['j-cartItem']} d-flex flex-grow-1  flex-xl-row align-items-center align-items-sm-center position-relative`}>
            <div className={`${styles['j-cameraImg']} m-2 `}>
              <img src={image} alt={brand} className="object-fit-contain" />
            </div>
            <div className="d-flex flex-column flex-grow-1 align-self-sm-stretch align-self-xl-center ">
              <div className={`${styles['j-content']} d-flex justify-content-between align-items-center flex-grow-1 me-xxl-4 me-xl-3 me-lg-2`}>
                <div className={`${styles['j-itemDetail']} d-flex flex-column ms-sm-3 ms-xl-0`}>
                  <div className={`${styles['j-product']} ms-lg-2 ms-xl-0`}>
                    <span className={`${styles['j-brand']} ${styles['j-publicFont']} `}>{brand}</span>
                    <br />
                    <span className={`${styles['j-model']} ${styles['j-publicFont']}`}>{name}</span>
                  </div>
                  <button
                    className={`${styles['j-detailcollapse']} ms-lg-2 ms-xl-0`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseExample${id}`}
                  >
                    +詳細資訊
                  </button>
                </div>
                <div>
                  <span className={`${styles['j-quantity']} `}>數量:{quantity}</span>
                </div>
                <div className="d-flex">
                  <p className={`${styles['j-price']} me-4`}>NT$ {Number(price).toLocaleString()}</p>
                </div>
              </div>
            </div>
            {page == 1 ? <div className={`${styles['j-delBtn']} position-absolute`}>
              <button className="btn" onClick={handleDeleteItem}>
                ✕
              </button>
            </div> : ''}
          </div>
          <div>
            <ProductDetails id={id} specs={specs} />
          </div>
        </div>
      </div>
      <div className="d-sm-none d-block d-flex flex-grow-1">
        <div className="d-flex flex-grow-1 flex-column">
          <div className={`${styles['j-cartItem']} d-flex flex-grow-1  flex-xl-row align-items-center align-items-sm-center position-relative`}>
            <div className={`${styles['j-cameraImg']} m-2 `}>
              <img src={image} alt={brand} className="object-fit-contain" />
            </div>
            <div className="d-flex flex-column flex-grow-1 align-self-sm-stretch align-self-xl-center ">
              <div className={`${styles['j-content']} d-flex justify-content-around align-items-center flex-grow-1`}>
                <div className={`${styles['j-itemDetail']} d-flex flex-column ms-sm-3 ms-xl-0 `}>
                  <div className="ms-lg-2 ms-xl-0">
                    <span className={`${styles['j-brand']} ${styles['j-publicFont']} `}>{brand}</span>
                    <br />
                    <span className={`${styles['j-model']} ${styles['j-publicFont']}`}>{name}</span>
                  </div>
                  <button
                    className={`${styles['j-detailcollapse']} ms-lg-2 ms-xl-0`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseExample${id}`}
                  >
                    +詳細資訊
                  </button>
                  <div className="mb-2 mb-sm-0">
                    <span className={`${styles['j-quantity']} `}>數量:{quantity}</span>
                  </div>
                </div>

              </div>
              <div className="d-flex justify-content-center me-4 mt-2 mt-sm-0">
                <p className={`${styles['j-price']}`}>NT$ {Number(price).toLocaleString()}</p>
              </div>
            </div>

            {page == 1 ? <div className={`${styles['j-delBtn']} position-absolute`}>
              <button className="btn" onClick={handleDeleteItem}>
                ✕
              </button>
            </div> : ''}
          </div>

          <div>
            <ProductDetails id={id} specs={specs} />
          </div>
        </div>
      </div>
    </>

  );
}
