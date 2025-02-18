'use client'

import './cart-step2.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import CartItem from '../_components/cart-item/page'
import CheckoutFormStep2 from '../_components/checkout-form-step2/page'
import LessonItem from '../_components/lession-item/page'
import RentItem from '../_components/rental-item/page'
import { useEffect } from 'react'

export default function cartPageTwo() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])
  const cartItems = JSON.parse(localStorage.getItem("cartItems"))
  
  const cartProduct = []
  const cartLession = []
  const cartRent = []
  
  let test = cartItems.slItem
  Object.values(test).map(v =>{
    switch(v.type){
      case 'product': 
        cartProduct.push(v);
        break;
      case 'lession' :
        cartLession.push(v);
        break;
      case 'rent' :
        cartRent.push(v);
        break;
    }
  })
  
  return (
    <div className="container j-bodyHeight">
      <div className="j-heightspace"></div>
      <div className="row d-flex justify-content-center pt-2">
        <div className="j-shoppingCartBox justify-content-between mt-4 me-xxl-2 col-sm-12 col-md-9 col-lg-7 col-xl-6 col-xxl-6">
          <div className="j-cartItemsBox d-none d-sm-block p-0 d-flex flex-grow-1 flex-column gap-3">
            <div className="mt-2 mb-5 j-itemBox">
              <h3 className="j-cartTitle mb-0 ps-3 pt-2 pb-2">相機</h3>
              {cartProduct.map((item, index) => (
                <div
                    className={`j-input-box -flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`} 
                    key={index}>
                  <CartItem key={index} id={index + 1} itemData={item} />
                </div>
              ))}
            </div>

            <div className="mt-2 mb-5 j-itemBox">
              <h3 className="mb-1 ms-3 pt-2">課程</h3>
              {cartLession.map((lession, index) => (
                <div key={index}>
                  <LessonItem key={index} lessionitem={lession} />
                </div>
              ))}
            </div>

            <div className="mt-2 j-itemBox">
              <h3 className="mb-1 ms-3 pt-2">租借</h3>
              {cartRent.map((rental, index) => (
                <div key={index}>
                  <RentItem key={index} rentalitem={rental} />
                </div>
              ))}
            </div>
          </div>
          <div className="j-cartItemsBox d-sm-none d-block p-0 d-flex flex-grow-1 flex-column">
            <div className="mt-2 mb-5 j-itemBox">
              <h3 className="mb-1 ms-3 pt-2">相機</h3>
              {cartProduct.map((item, index) => (
                <div key={index + 1}>
                  <CartItem key={index} id={index + 1} itemData={item} />
                </div>
              ))}
            </div>
            <div className="mt-2 mb-5 j-itemBox">
              <h3 className="mb-1 ms-3 pt-2">課程</h3>
              {cartLession.map((lession, index) => (
                <div key={index + 1}>
                  <LessonItem key={index} lessionitem={lession} />
                </div>
              ))}
            </div>
            <div className="mt-2 j-itemBox">
              <h3 className="mb-1 ms-3 pt-2">租借</h3>
              {cartRent.map((rental, index) => (
                <div key={index + 1}>
                  <RentItem key={index} rentalitem={rental} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <CheckoutFormStep2 />
      </div>
    </div>
  )
}
