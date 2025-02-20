'use client'
import Swal from 'sweetalert2'
import styles from './cart-button.module.scss'

export default function CartButton({ product }) {
  const addToCart = () => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('loginWithToken')
        : null

    if (!token) {
      Swal.fire({
        icon: 'warning',
        title: '請先登入',
        text: '您需要登入後才能加入購物車',
        confirmButtonText: '前往登入',
        showCancelButton: true,
        cancelButtonText: '取消',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'
        }
      })
      return
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingProduct = cart.find((item) => item.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    Swal.fire({
      icon: 'success',
      title: '已加入購物車！',
      text: `${product.name} 已成功加入購物車 🎉`,
      showConfirmButton: false,
      timer: 1500,
      toast: true,
      position: 'top-end',
    })
  }

  return (
    <button
      className={styles.cartButton}
      onClick={(e) => {
        e.stopPropagation()
        addToCart()
      }}
    >
      加入購物車
    </button>
  )
}
