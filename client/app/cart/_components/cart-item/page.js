import styles from "./cart-item.module.scss";
import ProductDetails from "../product-details/page";

export default function CartItem({id, itemData }) {
  const { image, brand, model, price, specs } = itemData;

  return (
    <div className="d-flex flex-grow-1">
      <div className="d-flex flex-grow-1 flex-column">
        <div className={`${styles['j-cartItem']} d-flex flex-grow-1 flex-column flex-sm-column flex-xl-row align-items-center align-items-sm-center`}>
          <div className={`${styles['j-cameraImg']} m-2 `}>
            <img src={image} alt={brand} className="object-fit-contain" />
          </div>
          <div className="d-flex flex-column flex-grow-1 align-self-sm-stretch align-self-xl-center">
            <div className={`${styles['j-content']} d-flex flex-column flex-sm-row justify-content-between align-items-center `}>
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
              <div className={`${styles['j-amount']} d-flex flex-row align-items-start justify-content-center justify-content-sm-start`}>
                <button className={`${styles['j-increase']} btn pb-0 ps-0 pt-0`}>+</button>
                <p className={`${styles['j-amount-text']} mb-0 ${styles['j-publicFont']}`}>數量</p>
                <button className={`${styles['j-decrease']} btn pb-0 ps-2 pt-0`}>-</button>
              </div>
              <p className={`${styles['j-price']} me-3 `}>{price}</p>
            </div>
          </div>
        </div>
        <div>
            <ProductDetails id={id} specs={specs} />
        </div>
      </div>
    </div>
  );
}
