import { useEffect } from "react";

const setCartItem = (cartItems) => {
  localStorage.setItem("cartItem",JSON.stringify(cartItems))
  }

  const getCartItem = () => {
    const cartItemsStorage = localStorage.getItem("cartItem");
    const cartItem = JSON.parse(cartItemsStorage);
    return cartItem  ? JSON.parse(cartItemsStorage) : [];
  }
const useAddCart = () => {
  useEffect(() => {
    return getCartItem;
  },[])
}

export default useAddCart;