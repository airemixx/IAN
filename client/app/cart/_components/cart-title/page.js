import styles from './cart-title.module.scss'
export default function CartTitle({ count }) {
    return (
      <div className={`${styles['j-shoppingCartTitleBox']} d-flex justify-content-center justify-content-lg-start align-items-end pt-5 ms-lg-5 ms-xl-5 ps-xl-2 ms-xxl-5 ps-xxl-4`}>
        <span className={`${styles['j-shoppingCartTitle']} mt-5 ms-sm-4`}>我的購物車</span>
        <small className=" ms-1">({count})</small>
      </div>
    );
  }