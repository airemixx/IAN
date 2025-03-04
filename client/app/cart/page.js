'use client'

import styles from './cart-step1.module.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import CartTitle from './_components/cart-title/page'
import CheckoutFormStep1 from './_components/checkout-form-step1/page'
import CartItem from './_components/cart-item/page'
import LessonItem from './_components/lession-item/page'
import RentItem from './_components/rental-item/page'
import { useEffect, useState, useRef } from 'react'
import { redirect, useRouter } from 'next/navigation'

export default function cartPageOne() {
  const router = useRouter()
  const token = localStorage.getItem('loginWithToken')
  if (!token) {

    setTimeout(() => {
      router.push('/login')
    }, 2000)
    return
  }

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
  let rentStorage = JSON.parse(localStorage.getItem("rent_cart")) || [];

  let lessionStorage = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  const cartProduct = []
  const cartRent = []
  const cartLession = []

  Object.values(cartStorage).map((v, i) => {
    cartProduct.push({
      type: 'product',
      id: i,
      product_id: v.id,
      image: v.image_url,
      brand: v.brand_name,
      name: v.name,
      price: v.price,
      quantity: v.quantity,
      specs: [
        {
          title: '可用規格 SPECIFICATIONS',
          details: [
            { label: 'camera_format', value: v.camera_format },
            { label: 'image_stabilization', value: v.image_stabilization },
            { label: 'release_date', value: v.release_date },
            { label: 'waterproof_level', value: v.waterproof_level }
          ]
        }
      ]
    })
  })

  Object.values(rentStorage).map((v, i) => {
    cartRent.push({
      type: 'rent',
      id: i,
      brand: v.brand,
      product_id: v.rentalId,
      image: v.image,
      name: v.name,
      price: v.fee,
      start: v.start,
      end: v.end,
      quantity: 1,
    })
  })

  Object.values(lessionStorage).map((v, i) => {
    cartLession.push({
      type: 'lession',
      id: i,
      product_id: v.id,
      image: v.image,
      name: v.title,
      price: v.price,
      quantity: v.quantity,
    })
  })


  const [checkAll, setCheckAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})
  const [slItems, setSltems] = useState([])
  const allItems = [...cartProduct, ...cartLession, ...cartRent]
  const [selectedItems, setSelectedItems] = useState([]) // 用來存放選中的項目

  // 全選或取消全選
  const handleCheckAll = () => {
    const checkState = !checkAll

    // 更新所有 checkbox 的選擇狀態
    const updateItems = allItems.reduce((acc, _, index) => {
      acc[index] = checkState
      return acc
    }, {})

    setCheckedItems(updateItems)

    // 如果全選則複製所有項目，否則清空
    setSelectedItems(checkState ? [...allItems] : [])
    setCheckAll(checkState)
  }

  // 單獨勾選或取消勾選項目
  const handleItemChange = (index, item) => {
    const updateItems = { ...checkedItems, [index]: !checkedItems[index] }
    setCheckedItems(updateItems)

    let newSelects
    if (updateItems[index]) {
      newSelects = [...selectedItems, item] // 加入選中項目
    }
    else {
      newSelects = selectedItems.filter(
        (selected) => !(selected.type === item.type && selected.id === item.id)
      ) // 移除對應項目
    }
    setSelectedItems(newSelects)
    setCheckAll(newSelects.length === allItems.length)
  }

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = selectedItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setSelectedItems(updatedItems);
  };

  let isCartEmpty = false;
  if (Object.keys(cartStorage).length === 0 && Object.keys(rentStorage).length === 0) {
    isCartEmpty = true;
  }

  return (
    <>
      {isCartEmpty ? redirect('/cart/cart-empty') :
        <div className={`container ${styles['j-bodyHeight']}`}>
          <CartTitle count={(cartProduct.length + cartLession.length + cartRent.length)} />
          <div className="row d-flex justify-content-center">
            <div className={`${styles['j-shoppingCartBox']} justify-content-between mt-4 me-lg-4 col-sm-11 col-md-9 col-lg-7 col-xl-6 p-0`}>
              <div className="j-cartItemsBox d-none d-sm-block p-0">
                <div>
                  <input
                    type="checkbox"
                    id="checkAll"
                    className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                    checked={checkAll}
                    onChange={handleCheckAll}
                  />
                  <span className="ms-2 align-middle">全選</span>
                </div>
                <div className="mt-2 mb-5">
                  {cartProduct.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>相機</h3> : ''}
                  {cartProduct.map((item, index) => (
                    <div
                      className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                        id={`cartItem-${index}`}
                        checked={checkedItems[index] || false}
                        onChange={() => handleItemChange(index, item)}
                      />
                      <label
                        htmlFor={`cartItem-${index}`}
                        className="ms-2 d-flex flex-grow-1"
                      >
                        <CartItem key={index} id={index} itemData={item} page={1} onQuantityChange={handleQuantityChange}/>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2 mb-5">
                  {cartLession.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>課程</h3> : ''}
                  {cartLession.map((lession, index) => {
                    const lessonIndex = index + cartProduct.length
                    return (
                      <div
                        className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                          id={`lessonItem-${index}`}
                          checked={checkedItems[lessonIndex] || false}
                          onChange={() => handleItemChange(lessonIndex, lession)}
                        />
                        <label
                          htmlFor={`lessonItem-${index}`}
                          className="ms-2 d-flex flex-grow-1"
                        >
                          <LessonItem key={index} id={lessonIndex} lessionitem={lession} length={cartProduct.length} page={1} />
                        </label>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-2 mb-5">
                  {cartRent.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>租借</h3> : ''}
                  {cartRent.map((rental, index) => {
                    const rentalIndex =
                      index + cartProduct.length + cartLession.length
                    return (
                      <div
                        className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                          id={`rentItem-${index}`}
                          checked={checkedItems[rentalIndex] || false}
                          onChange={() => handleItemChange(rentalIndex, rental)}
                        />
                        <label
                          htmlFor={`rentItem-${index}`}
                          className="ms-2 d-flex flex-grow-1"
                        >
                          <RentItem key={index} rentalitem={rental} id={rentalIndex} length={(cartProduct.length + cartLession.length)} page={1} />
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="j-cartItemsBox d-sm-none d-block p-0">
                <div>
                  <input
                    type="checkbox"
                    id="checkAll"
                    className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                    checked={checkAll}
                    onChange={handleCheckAll}
                  />
                  <span className="ms-2 align-middle">全選</span>
                </div>
                <div className="mt-2 mb-5">
                  {cartProduct.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>相機</h3> : ''}
                  {cartProduct.map((item, index) => (
                    <div
                      className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                        id={`cartItem-${index}`}
                        checked={checkedItems[index] || false}
                        onChange={() => handleItemChange(index, item)}
                      />
                      <label
                        htmlFor={`cartItem-${index}`}
                        className="ms-2 d-flex flex-grow-1"
                      >
                        <CartItem key={index} id={index} itemData={item} page={1} />
                      </label>
                    </div>
                  ))}
                </div>
                <div className="mt-2 mb-5">
                  {cartLession.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>課程</h3> : ''}
                  {cartLession.map((lession, index) => {
                    const lessonIndex = index + cartProduct.length
                    return (
                      <div
                        className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                          id={`lessonItem-${index}`}
                          checked={checkedItems[lessonIndex] || false}
                          onChange={() => handleItemChange(lessonIndex, lession)}
                        />
                        <label
                          htmlFor={`lessonItem-${index}`}
                          className="ms-2 d-flex flex-grow-1"
                        >
                          <LessonItem key={index} id={lessonIndex} lessionitem={lession} length={cartProduct.length} page={1} />
                        </label>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-2 mb-5">
                  {cartRent.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>租借</h3> : ''}
                  {cartRent.map((rental, index) => {
                    const rentalIndex =
                      index + cartProduct.length + cartLession.length
                    return (
                      <div
                        className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                        key={index}
                      >
                        <input
                          type="checkbox"
                          className={`${styles['j-ckBox']} form-check-input form-check-lg shadow-sm rounded ms-2`}
                          id={`rentItem-${index}`}
                          checked={checkedItems[rentalIndex] || false}
                          onChange={() => handleItemChange(rentalIndex, rental)}
                        />
                        <label
                          htmlFor={`rentItem-${index}`}
                          className="ms-2 d-flex flex-grow-1"
                        >
                          <RentItem key={index} rentalitem={rental} id={rentalIndex} length={(cartProduct.length + cartLession.length)} page={1} />
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <CheckoutFormStep1 slItem={selectedItems} />
          </div>
        </div>}

    </>
  )
}
