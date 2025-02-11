export default function CartTitle({ count }) {
    return (
      <div className="j-shoppingCartTitleBox d-flex align-items-end pt-5">
        <h1 className="j-shoppingCartTitle mt-5">我的購物車</h1>
        <small className="mb-2 ms-1">({count})</small>
      </div>
    );
  }