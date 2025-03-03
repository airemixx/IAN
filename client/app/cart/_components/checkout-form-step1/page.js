import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import { jwtDecode } from 'jwt-decode';
import moment from "moment";
import Swal from "sweetalert2";
import styles from "./price-summary.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CheckoutFormStep1({ slItem }) {
  const token = localStorage.getItem("loginWithToken");
  const decoded = jwtDecode(token);

  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0); // 折扣金額
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [checkState, setCheckState] = useState(false);
  const [cpName, setCpName] = useState("");
  const [couponData, setCouponData] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleClose = () => {
    setCheckState(false);
    setShow(false);
  };

  // 計算原始價格
  useEffect(() => {
    if (slItem && Array.isArray(slItem)) {
      const itemPrice = slItem.reduce((acc, item) => acc + ((item.price * item.quantity) || 0), 0);
      setPrice(itemPrice);
    }
  }, [slItem]);

  function handleClick() {
    if (slItem && slItem.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(slItem));

      setTimeout(() => {
        router.push("/cart/cart-step2");
      }, 100);
    } else {
      Swal.fire({
        icon: "error",
        title: "抱歉",
        text: "購物車內沒有商品，請添加商品後再結帳！",
      });
    }
  }

  async function handleCheck() {
    setCheckState(!checkState);
    if (!checkState) {
      setCheckState(true);
      setShow(true);
      await fetchCoupon();
    } else {
      setCpName("");
      setDiscount(0); // 取消優惠券，折扣歸零
      setSelectedCoupon(null);
    }
  }

  function handsumbit() {
    setShow(false);
  }

  async function fetchCoupon() {
    try {
      const response = await fetch(`/api/coupon?id=${decoded.id}`, {
        method: "GET",
      });

      if (response.status === 200) {
        const data = await response.json();
        setCouponData(data.result);
      } else {
        console.error("獲取失敗:", await response.text());
      }
    } catch (error) {
      console.error("請求錯誤:", error);
    }
  }

  function handleCouponSelect(coupon) {
    if (selectedCoupon === coupon.code) {
      setSelectedCoupon(null);
      setCpName("");
      setDiscount(0); // 取消折扣
    } else {
      setSelectedCoupon(coupon.code);
      setCpName(coupon.cpName);
      console.log(coupon.disType);
      if (coupon.disType === "fixed") {
        setDiscount(coupon.discount); // 固定折扣金額 (如 NT$1500)
      } else if (coupon.disType === "percent") {
        const percentOff = (price * coupon.discount) / 100; // 計算折扣金額
        setDiscount(Math.min(percentOff, price)); // 確保不超過原價
      }
    }
  }

  // 計算折扣後的總額（確保不低於 0）
  const totalPrice = Math.max(price - discount, 0);

  return (
    <div className={`${styles["j-payStep"]} col-sm-11 col-md-9 col-lg-4 col-xl-4 mb-5 ms-lg-0 d-flex flex-column align-items-center`}>
      <div className={`${styles["j-pCount"]} border-bottom mb-3 d-flex flex-column gap-2`}>
        <div className={`${styles["j-pTitle"]} ${styles["j-publicFont"]} ms-lg-3 ms-xl-0`}>摘要</div>
        <div className={`${styles["j-ifCouponUse"]} ${styles["j-publicFont"]} ms-lg-3 ms-xl-0`}>
          <input className="form-check-input" type="checkbox" id="flexCheck" onChange={handleCheck} checked={checkState} />
          <label className="form-check-label" htmlFor="flexCheck">
            是否使用優惠券
          </label>
        </div>
        <Modal show={show} onHide={handleClose} backdrop="static" size="lg" className={`${styles["j-model"]}`}>
          <Modal.Header closeButton>
            <Modal.Title>選擇優惠券</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-wrap">
              {couponData.length > 0 ? (
                couponData.map((coupon, index) => (
                  <div
                    key={index}
                    className={`${styles["j-cp"]} mb-2 d-flex flex-column align-items-center position-relative col-6 ${cpName === coupon.cpName ? styles["j-selected"] : ""}`}
                    onClick={() => handleCouponSelect(coupon)}
                  >
                    <img src={`/images/cart/${coupon.img}`} alt="" className="img-fluid" />
                    <span className={`position-absolute ${styles["j-cpEndDate"]}`}>
                      {moment(coupon.end_date).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                    <span>{coupon.cpName}</span>
                    
                  </div>
                ))
              ) : (
                <p>沒有可用的優惠券</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              關閉
            </Button>
            <Button variant="primary" onClick={handsumbit}>
              確定
            </Button>
          </Modal.Footer>
        </Modal>

        <div className={`${styles["couponName"]} d-flex flex-column ${styles["j-publicFont"]} ms-lg-3 ms-xl-0`}>
          {cpName ? `已選擇優惠券: ${cpName}` : "未使用優惠券"}
        </div>
        <div className={`${styles["subTotalBox"]} d-flex justify-content-between ${styles["j-publicFont"]} ms-lg-3 ms-xl-0 me-lg-3 me-xl-0`}>
          <div className={styles["subTotal"]}>小計</div>
          <div className={styles["subPrice"]}>NT${price}</div>
        </div>
        <div className={`${styles["discountBox"]} d-flex justify-content-between ${styles["j-publicFont"]} ms-lg-3 ms-xl-0 me-lg-3 me-xl-0`}>
          <div className={styles["discount"]}>折扣</div>
          <div className={styles["discountPrice"]}>- NT${discount}</div>
        </div>
        <div className={`${styles["totalPriceBox"]} d-flex justify-content-between ${styles["j-publicFont"]} ms-lg-3 ms-xl-0 me-lg-3 me-xl-0`}>
          <div className={styles["total"]}>總額</div>
          <div className={styles["totalPrice"]}>NT${totalPrice}</div>
        </div>
      </div>
      <div className={`${styles["j-Checkout"]} d-flex justify-content-center align-items-center align-self-stretch`}>
        <button className={`${styles["j-btn"]} btn text-align-center d-flex flex-grow-1 justify-content-center`} onClick={handleClick}>
          結帳
        </button>
      </div>
    </div>
  );
}
