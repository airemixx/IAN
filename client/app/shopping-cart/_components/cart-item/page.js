import ProductDetails from "../product-details/page";

export default function CartItem({ id, type, itemData }) {
  const { image, brand, model, price, specs } = itemData;

  return (
    <div className="d-flex">
      <input type="checkbox" className="form-check" id={`item${id}`} />
      <div className="j-cartItemBox me-3 mb-2 d-flex flex-grow-1">
        <div className="j-cartItem d-flex flex-grow-1">
          <div className="j-cameraImg m-2">
            <img src={image} alt={brand} className="object-fit-contain" />
          </div>
          <div className="d-flex flex-column flex-grow-1">
            <div className="j-content d-flex justify-content-between align-items-center">
              <div className="j-itemDetail d-flex flex-column">
                <div>
                  <span className="j-brand j-publicFont">{brand}</span>
                  <br />
                  <span className="j-model j-publicFont">{model}</span>
                </div>
                <button
                  className="j-detailcollapse"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapseExample${id}`}
                >
                  +詳細資訊
                </button>
              </div>
              <div className="j-amount d-flex flex-row align-items-start">
                <button className="j-increase btn pb-0 ps-0 pt-0">+</button>
                <p className="j-amount-text mb-0 j-publicFont">數量</p>
                <button className="j-decrease btn pb-0 ps-2 pt-0">-</button>
              </div>
              <p className="price me-3">{price}</p>
            </div>
            <ProductDetails id={id} specs={specs} />
          </div>
        </div>
      </div>
    </div>
  );
}