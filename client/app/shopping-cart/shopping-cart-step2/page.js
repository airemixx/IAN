'use client'

import './shopping-cart-step2.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import CartItem from '../_components/cart-item/page'
import CheckoutFormStep2 from '../_components/checkout-form-step2/page'
import LessonItem from '../_components/lession-item/page'
import RentItem from '../_components/rental-item/page'

export default function shoppingCartTwoPage() {
  const cartItemsStorage = localStorage.getItem("cartItem");
  const cartItems = JSON.parse(cartItemsStorage);
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
    <div className="container" style={{ height: '91vh' }}>
    <div className="j-heightspace"></div>
      <div className="row d-flex justify-content-center pt-2">
        <div className="j-shoppingCartBox justify-content-between mt-4 col-md-7 ">
          <div className="j-shoppingItemsBox d-none d-sm-block p-0 d-flex flex-grow-1">
            {cartItems.map((item, index) => (
              <CartItem key={index} id={index + 1} itemData={item} />
            ))}
            {cartLession.map((lession, index) => (
              <LessonItem key={index} lessionitem={lession} />
            ))}
            {cartRent.map((rental, index) => (
              <RentItem key={index} rentalitem={rental} />
            ))}
          </div>
          {/* 移動端版本... */}
        </div>
        <CheckoutFormStep2 />
      </div>
    </div>
  )
}
