import styles from "./cart-item.module.scss";
import ProductDetails from "../product-details/page";

export default function CartItem({id, type, itemData }) {
  const { image, brand, model, price, specs } = itemData;

  return (
    <div className="d-flex flex-grow-1">
      <div className={`${styles['j-cartItemBox']} me-3 mb-2 d-flex flex-grow-1`}>
        <div className={`${styles['j-cartItem']} d-flex flex-grow-1`}>
          <div className={`${styles['j-cameraImg']} m-2`}>
            <img src={image} alt={brand} className="object-fit-contain" />
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <div className={`${styles['j-content']} d-flex justify-content-between align-items-center`}>
              <div className={`${styles['j-itemDetail']} d-flex flex-column`}>
                <div>
                  <span className={`${styles['j-brand']} ${styles['j-publicFont']}`}>{brand}</span>
                  <br />
                  <span className={`${styles['j-model']} ${styles['j-publicFont']}`}>{model}</span>
                </div>
                <button
                  className={`${styles['j-detailcollapse']}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseExample${id}`}
                >
                  +詳細資訊
                </button>
              </div>
              <div className={`${styles['j-amount']} d-flex flex-row align-items-start`}>
                <button className={`${styles['j-increase']} btn pb-0 ps-0 pt-0`}>+</button>
                <p className={`${styles['j-amount-text']} mb-0 ${styles['j-publicFont']}`}>數量</p>
                <button className={`${styles['j-decrease']} btn pb-0 ps-2 pt-0`}>-</button>
              </div>
              <p className={`${styles['price']} me-3`}>{price}</p>
            </div>
            <ProductDetails id={id} specs={specs} />
          </div>
        </div>
      </div>
    </div>
  );
}