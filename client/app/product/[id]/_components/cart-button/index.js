"use client";
import Swal from "sweetalert2"; // ✅ 引入 SweetAlert2
import styles from "./cart-button.module.scss";

export default function CartButton({ product }) {
  const addToCart = () => {
    const spec = product.specs[0]
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, ...spec, });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    // ✅ 使用 SweetAlert2 顯示成功提示
    Swal.fire({
      icon: "success",
      title: "已加入購物車！",
      text: `${product.name} 已成功加入購物車 🎉`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: "top-end",
    });
  };

  return (
    <button
      className={styles.cartButton}
      onClick={(e) => {
        e.stopPropagation();
        addToCart();
      }}
    >
      加入購物車
    </button>
  );
}
