'use client'

import './cart-step2.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CartItem from '../_components/cart-item/page'
import CheckoutFormStep2 from '../_components/checkout-form-step2/page'
import LessonItem from '../_components/lession-item/page'
import RentItem from '../_components/rental-item/page'

export default function cartPageTwo() {
  // const cartItemsStorage = localStorage.getItem("cartItem");
  // const cartItems = JSON.parse(cartItemsStorage)
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
    <div className="container j-bodyHeight">
  <div className="j-heightspace"></div>
  <div className="row d-flex justify-content-center pt-2">
    <div className="j-shoppingCartBox justify-content-between mt-4 me-xxl-2 col-sm-12 col-md-9 col-lg-7 col-xl-6 col-xxl-6">
      <div className="j-shoppingItemsBox d-none d-sm-block p-0 d-flex flex-grow-1 flex-column gap-3">
        {cartItems.map((item, index) => (
          <div className="p-2 border-bottom" key={index+1}>
            <CartItem key={index} id={index + 1} itemData={item} />
          </div>
        ))}
        {cartLession.map((lession, index) => (
          <div className="p-2 border-bottom" key={index+1}>
            <LessonItem key={index} lessionitem={lession} />
          </div>
        ))}
        {cartRent.map((rental, index) => (
          <div className="p-2 border-bottom" key={index+1}>
            <RentItem key={index} rentalitem={rental} />
          </div>
        ))}
      </div>
    </div>
    <CheckoutFormStep2 />
  </div>
</div>


  )
}
