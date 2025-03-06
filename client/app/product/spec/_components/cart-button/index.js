'use client'
import styles from './cart-button.module.scss'
import { toast } from 'react-toastify'
import { MdError } from 'react-icons/md'
import { MdShoppingCart } from 'react-icons/md'

export default function CartButton({ product }) {
  const addToCart = () => {
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('loginWithToken')
        : null

    if (!token) {
      toast.success('請先登入才能加入購物車！', {
        position: 'top-right',
        autoClose: 2000,
        icon: <MdError size={30} />,
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

    toast.success(`${product.name} 已成功加入購物車`, {
      position: 'top-right',
      autoClose: 1500,
      icon: <MdShoppingCart size={30} color="green" />,
      className: styles.toastCustom,
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
