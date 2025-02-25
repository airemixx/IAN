import styles from "./cart-item.module.scss";
import ProductDetails from "../product-details/page";
import { useEffect, useState } from "react";

export default function CartItem({ id, itemData, page }) {
  const { image, brand, model, price, specs, quantity } = itemData;
  // 初始化狀態
  const [newQuan, setNewQuan] = useState(quantity);

  // 更新 newQuan 當 quantity 變更時
  useEffect(() => {
    setNewQuan(quantity);
  }, [quantity]);

  // **當 newQuan 變更時，更新 localStorage**
  useEffect(() => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[id]) {
      cart[id].quantity = newQuan;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [newQuan]); // 只在 newQuan 變更時執行

  // **數量增加**
  function handleClickInc() {
    setNewQuan((prev) => prev + 1);
  }

  function handleClickDec() {
    if (newQuan === 1) {
      const confirmDelete = window.confirm("數量為 0，是否要從購物車刪除該商品？");
      if (confirmDelete) {
        // 取得 localStorage 中的購物車數據
        let cart = JSON.parse(localStorage.getItem("cart")) || {};

        delete cart[id]
        let updatedCart = Object.entries(cart).filter(v => v != null);// 過濾掉該商品
        updatedCart = updatedCart.map(v => v[1])

        console.log(updatedCart);
        localStorage.removeItem('cart')
        // // 轉回物件形式並更新 localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // 刷新頁面或通知父層更新購物車
        window.location.reload();
      }
    } else {
      setNewQuan((prev) => prev - 1);
    }
  }
  function handleDeleteItem() {
    const confirmDelete = window.confirm("是否要從購物車刪除該商品？");
    if (confirmDelete) {
      // 取得 localStorage 中的購物車數據
      let cart = JSON.parse(localStorage.getItem("cart")) || {};

      delete cart[id]
      let updatedCart = Object.entries(cart).filter(v => v != null);// 過濾掉該商品
      updatedCart = updatedCart.map(v => v[1])

      console.log(updatedCart);
      localStorage.removeItem('cart')
      // // 轉回物件形式並更新 localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // 刷新頁面或通知父層更新購物車
      window.location.reload();

    }
  }
  return (
    <div className="d-flex flex-grow-1">
      <div className="d-flex flex-grow-1 flex-column">
        <div className={`${styles['j-cartItem']} d-flex flex-grow-1 flex-column flex-sm-column flex-xl-row align-items-center align-items-sm-center`}>
          <div className={`${styles['j-cameraImg']} m-2 `}>
            <img src={image} alt={brand} className="object-fit-contain" />
          </div>
          <div className="d-flex flex-column flex-grow-1 align-self-sm-stretch align-self-xl-center position-relative">
            <div className={`${styles['j-content']} d-flex flex-column flex-sm-row ${page == 1 ? 'justify-content-between' : 'justify-content-around'} align-items-center `}>
              <div className={`${styles['j-itemDetail']} d-flex flex-sm-column ms-sm-3 ms-xl-0`}>
                <div className="ms-lg-2 ms-xl-0">
                  <span className={`${styles['j-brand']} ${styles['j-publicFont']} `}>{brand}</span>
                  <br />
                  <span className={`${styles['j-model']} ${styles['j-publicFont']}`}>{model}</span>
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
              {page == 1 ? <div className={`${styles['j-amount']} d-flex flex-row align-items-center justify-content-center justify-content-sm-start`}>
                <button className={`${styles['j-increase']} btn pb-0 ps-0 pt-0`}
                  onClick={handleClickInc}>+</button>
                <p className={`${styles['j-amount-text']} mb-0 ${styles['j-publicFont']} text-center`}>{newQuan}</p>
                <button className={`${styles['j-decrease']} btn pb-0 ps-2 pt-0`}
                  onClick={handleClickDec}>-</button>
              </div> : ''}
              <p className={`${styles['j-price']} me-3 `}>價格: {price}元</p>
            </div>
            {page == 1 ? <div className={`${styles['j-delBtn']} position-absolute`}>
              <button className="btn" onClick={handleDeleteItem}>
                ✕
              </button>
            </div> : ''}
          </div>
        </div>
        <div>
          <ProductDetails id={id} specs={specs} />
        </div>
      </div>
    </div>
  );
}
