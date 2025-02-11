import CartItem from "../cart-item/page";

export default function CartSection({ items }) {
  return (
    <div className="j-shoppingCartBox justify-content-between mt-4 col-7">
      <div className="j-shoppingItemsBox d-none d-sm-block p-0">
        {items.map((item, index) => (
          <CartItem key={index} id={index + 1} itemData={item} />
        ))}
      </div>
      {/* 移動端版本... */}
    </div>
  );
}