import styles from "./price-summary.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PriceSummary() {
  return (
    <div className={`${styles['j-payStep']} col-md-4 mb-5 d-flex flex-column align-items-center`}>
      <div className={`${styles['j-pCount']} border-bottom mb-3 d-flex flex-column gap-2`}>
        <div className={`${styles['j-pTitle']} ${styles['j-publicFont']}`}>摘要</div>
        <div className={`${styles['j-ifCouponUse']} ${styles['j-publicFont']}`}>
          <input
            className="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={25}
              viewBox="0 0 24 25"
              fill="none"
            >
              <circle cx={12} cy="12.5" r={11} stroke="#003150" strokeWidth={2} />
              <circle cx={12} cy="12.5" r="7.5" fill="#003150" />
            </svg>
            是否使用優惠券
          </label>
        </div>
        <div className={`${styles['couponName']} d-flex flex-column ${styles['j-publicFont']}`}>
          <span>課程95折優惠券</span>
          <span>相機1500折價券</span>
        </div>
        <div className={`${styles['subTotalBox']} d-flex justify-content-between ${styles['j-publicFont']}`}>
          <div className={styles['subTotal']}>小計</div>
          <div className={styles['subPrice']}>NT$8000</div>
        </div>
        <div className={`${styles['freightBox']} d-flex justify-content-between ${styles['j-publicFont']}`}>
          <div className={styles['freight']}>運費</div>
          <div className={styles['freightPrice']}>NT$8000</div>
        </div>
        <div className={`${styles['totalPriceBox']} d-flex justify-content-between ${styles['j-publicFont']}`}>
          <div className={styles['total']}>總額</div>
          <div className={styles['totalPrice']}>NT$8000</div>
        </div>
      </div>
      <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center align-self-stretch`}>
        <button className={`${styles['j-btn']} btn text-align-center`}>結帳</button>
      </div>
    </div>
  );
}