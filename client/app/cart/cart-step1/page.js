'use client'

import './cart-step1.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import CartTitle from '../_components/cart-title/page'
import CheckoutFormStep1 from '../_components/checkout-form-step1/page'
import CartItem from '../_components/cart-item/page'
import LessonItem from '../_components/lession-item/page'
import RentItem from '../_components/rental-item/page'
import { useEffect, useState, useRef } from 'react'

export default function cartPageOne() {
  const cartItems = [
    {
      type: 'product',
      id: 1,
      image: '../images/shopping-cart-image/shoppingCartItemPhoto.png',
      brand: 'FUJIFILM',
      model: 'X-T5 16-50mm',
      price: 'NT$67000',
      specs: [
        {
          title: '影像規格 IMAGE SPECIFICATIONS',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '觀景器 VIEWFINDER',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '資料存取 DATA TRANSFER',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '機身資料 PHYSICAL SPECIFICATIONS',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '其它資料 OTHERS',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        // 其他規格...
      ],
    },
    {
      type: 'product',
      id: 2,
      image: '../images/shopping-cart-image/shoppingCartItemPhoto.png',
      brand: 'FUJIFILM',
      model: 'X-T5 16-50mm',
      price: 'NT$67000',
      specs: [
        {
          title: '影像規格 IMAGE SPECIFICATIONS',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '觀景器 VIEWFINDER',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '資料存取 DATA TRANSFER',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '機身資料 PHYSICAL SPECIFICATIONS',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        {
          title: '其它資料 OTHERS',
          details: [
            { label: '有效像素', value: '2550 萬像素' },
            { label: '感光元件像素', value: '2420 萬像素' },
            { label: '感光元件格式', value: 'APS-C' },
            { label: '感光元件大小', value: '22.3 x 14.9mm' },
          ],
        },
        // 其他規格...
      ],
    },
    // 其他商品...
  ]

  const cartLession = [
    {
      type: 'lession',
      id: 1,
      image: '/images/shopping-cart-image/lesson1.png',
      title: '旅行攝影：按下快門，用攝影書寫故事',
      instructor: '食癮，拾影',
      rating: '4.2',
      price: 'NT$ 2,180',
    },
    {
      type: 'lession',
      id: 2,
      image: '/images/shopping-cart-image/lesson1.png',
      title: '旅行攝影：按下快門，用攝影書寫故事',
      instructor: '食癮，拾影',
      rating: '4.2',
      price: 'NT$ 2,180',
    },
  ]

  const cartRent = [
    {
      type: 'rent',
      id: 1,
      image: '/images/shopping-cart-image/shoppingCartItemPhoto.png',
      brand: 'FUJIFILM 富士',
      model: 'X-T5 16-50mm',
      rentDate: '2024-01-01',
      dueDate: '2024-01-14',
    },
    {
      type: 'rent',
      id: 2,
      image: '/images/shopping-cart-image/shoppingCartItemPhoto.png',
      brand: 'FUJIFILM 富士',
      model: 'X-T5 16-50mm',
      rentDate: '2024-01-01',
      dueDate: '2024-01-14',
    },
  ]

  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  
  const [checkAll, setCheckAll] = useState(false)
  const [checkedItems, setCheckedItems] = useState({})
  const allItems = [...cartItems, ...cartLession, ...cartRent]
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
  
  // test()
  // async function test(){
  //   let api = "http://localhost:8000/api/cart";
  //   const res =await fetch(api,{
  //     method: "GET"
  //   });
  //   const result =await res.json();
  //   console.log(result);
  // }
  return (
    <>
      <div className="container j-bodyHeight">
        <CartTitle count={cartItems.length} />
        <div className="row d-flex justify-content-center">
          <div className="j-shoppingCartBox justify-content-between mt-4 me-lg-4 col-sm-11 col-md-9 col-lg-6 p-0">
            <div className="j-cartItemsBox d-none d-sm-block p-0">
              <div>
                <input
                  type="checkbox"
                  id="checkAll"
                  className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                  checked={checkAll}
                  onChange={handleCheckAll}
                />
                全選
              </div>
              <div className="mt-2 mb-5">
                <h3 className="j-cateTitle mb-0 ps-3 pt-2 pb-2">相機</h3>
                {cartItems.map((item, index) => (
                  <div
                    className={`j-input-box d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`}
                    key={index}
                  >
                    <input
                      type="checkbox"
                      className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                      id={`cartItem-${index}`}
                      checked={checkedItems[index] || false}
                      onChange={() => handleItemChange(index, item)}
                    />
                    <label
                      htmlFor={`cartItem-${index}`}
                      className="ms-2 d-flex flex-grow-1"
                    >
                      <CartItem key={index} id={index} itemData={item} />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-2 mb-5">
                <h3 className="j-cateTitle mb-0 ps-3 pt-2 pb-2">課程</h3>
                {cartLession.map((lession, index) => {
                  const lessonIndex = index + cartItems.length
                  return (
                    <div
                      className={`j-input-box d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                        id={`lessonItem-${index}`}
                        checked={checkedItems[lessonIndex] || false}
                        onChange={() => handleItemChange(lessonIndex, lession)}
                      />
                      <label
                        htmlFor={`lessonItem-${index}`}
                        className="ms-2 d-flex flex-grow-1"
                      >
                        <LessonItem key={index} lessionitem={lession} />
                      </label>
                    </div>
                  )
                })}
              </div>
              <div className="mt-2 mb-5">
                <h3 className="j-cateTitle mb-0 ps-3 pt-2 pb-2">租借</h3>
                {cartRent.map((rental, index) => {
                  const rentalIndex =
                    index + cartItems.length + cartLession.length
                  return (
                    <div
                      className={`j-input-box d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`}
                      key={index}
                    >
                      <input
                        type="checkbox"
                        className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                        id={`rentItem-${index}`}
                        checked={checkedItems[rentalIndex] || false}
                        onChange={() => handleItemChange(rentalIndex, rental)}
                      />
                      <label
                        htmlFor={`rentItem-${index}`}
                        className="ms-2 d-flex flex-grow-1"
                      >
                        <RentItem key={index} rentalitem={rental} />
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
                  name=""
                  id=""
                  className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                />
                全選
              </div>
              <div className="mt-2 mb-5 j-itemBox">
                <h3 className="mb-1 ms-3 pt-2">相機</h3>
                {cartItems.map((item, index) => (
                  <div
                    className="j-input-box d-flex align-items-center"
                    key={index + 1}
                  >
                    <input
                      type="checkbox"
                      className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                      id={`cartItem-${index}`}
                    />
                    <label
                      htmlFor={`cartItem-${index}`}
                      className="ms-2 d-flex flex-grow-1"
                    >
                      <CartItem key={index} id={index + 1} itemData={item} />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-2 mb-5 j-itemBox">
                <h3 className="mb-1 ms-3 pt-2">課程</h3>
                {cartLession.map((lession, index) => (
                  <div
                    className="j-input-box d-flex align-items-center"
                    key={index + 1}
                  >
                    <input
                      type="checkbox"
                      className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                      id={`lessonItem-${index}`}
                    />
                    <label
                      htmlFor={`lessonItem-${index}`}
                      className="ms-2 d-flex flex-grow-1"
                    >
                      <LessonItem key={index} lessionitem={lession} />
                    </label>
                  </div>
                ))}
              </div>
              <div className="mt-2 mb-5 j-itemBox">
                <h3 className="mb-1 ms-3 pt-2">租借</h3>
                {cartRent.map((rental, index) => (
                  <div
                    className="j-input-box d-flex align-items-center"
                    key={index + 1}
                  >
                    <input
                      type="checkbox"
                      className="j-ckBox form-check-input form-check-lg shadow-sm rounded ms-2"
                      id={`rentItem-${index}`}
                    />
                    <RentItem key={index} rentalitem={rental} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CheckoutFormStep1 slItem={selectedItems} />
        </div>
      </div>
    </>
  )
}
