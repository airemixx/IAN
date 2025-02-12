import CartItem from "../cart-item/page";
import LessionItemPage from "../lession-item/page";
import RentalItemPage from "../rental-item/page";
import styles from './cart-section.module.scss';
export default function CartSection({ items, lessions, rentals }) {
  return (
    <div className={`${styles['j-shoppingCartBox']} justify-content-between mt-4 col-md-8`}>
      <div className={`${styles['j-shoppingItemsBox']} d-none d-sm-block p-0`}>
        {items.map((item, index) => (
          <CartItem key={index} id={index + 1} itemData={item} />
        ))}
        {lessions.map((lession, index) => (
          <LessionItemPage key={index} id={index + 1} itemData={lession}/>
        ))}
        {rentals.map((rental, index) => (
          <RentalItemPage key={index} id={index + 1} itemData={rental}/>
        ))}
      </div>
      {/* 移動端版本... */}
    </div>
  );
}
