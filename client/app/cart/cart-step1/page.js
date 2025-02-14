'use client'

import './cart-step1.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script'
import CartTitle from '../_components/cart-title/page'
import CheckoutFormStep1 from '../_components/checkout-form-step1/page'
import CartItem from '../_components/cart-item/page'
import LessonItem from '../_components/lession-item/page'
import RentItem from '../_components/rental-item/page'

export default function cartPageOne() {
  // test()
  // async function test(){
  //   let api = "http://localhost:8000/api/cart";
  //   const res =await fetch(api,{
  //     method: "GET"
  //   });
  //   const result =await res.json();
  //   console.log(result);
  // }
  const cartItems = [
    {
      type: 'product',
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
      image: '/images/shopping-cart-image/shoppingCartItemPhoto.png',
      brand: 'FUJIFILM 富士',
      model: 'X-T5 16-50mm',
      rentDate: '2024-01-01',
      dueDate: '2024-01-14',
    },
  ]
  return (
    <>
      <div className="container j-bodyHeight">
        <CartTitle count={cartItems.length} />
        <div className="row d-flex justify-content-center">
          <div className="j-shoppingCartBox justify-content-between mt-4 col-sm-11 col-md-9 col-lg-6 col-xl-7 me-lg-3 me-xl-3">
            <div className="j-shoppingItemsBox d-none d-sm-block p-0">
              {cartItems.map((item, index) => (
                <div className="d-flex align-items-center gap-3 p-2 border-bottom" key={index + 1}>
                  <input
                    type="checkbox"
                    className="form-check-input form-check-lg shadow-sm rounded"
                    id={`cartItem-${index}`}
                  />
                  <CartItem key={index} id={index + 1} itemData={item} />
                </div>
              ))}
              {cartLession.map((lession, index) => (
                <div className="d-flex align-items-center gap-3 p-2 border-bottom" key={index + 1}>
                  <input
                    type="checkbox"
                    className="form-check-input form-check-lg shadow-sm rounded"
                    id={`lessonItem-${index}`}
                  />
                  <LessonItem key={index} lessionitem={lession} />
                </div>
              ))}
              {cartRent.map((rental, index) => (
                <div className="d-flex align-items-center gap-3 p-2 border-bottom" key={index + 1}>
                  <input
                    type="checkbox"
                    className="form-check-input form-check-lg shadow-sm rounded"
                    id={`rentItem-${index}`}
                  />
                  <RentItem key={index} rentalitem={rental} />
                </div>
              ))}
            </div>
            {/* 移動端版本... */}
          </div>
          <CheckoutFormStep1 />
        </div>
      </div>

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}
