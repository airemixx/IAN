'use client'

import './cart-step3.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartItem from '../_components/cart-item/page';
import LessonItem from '../_components/lession-item/page';
import RentItem from '../_components/rental-item/page';
import CheckoutFormStep3 from '../_components/checkout-form-step3/page';
import { useEffect } from 'react';


export default function cartPageThree() {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"))
  
  const cartProduct = []
  const cartLession = []
  const cartRent = []
  
  let test = cartItems
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
    <div className=""></div>
      <div className="row d-flex justify-content-center pt-4">
        <div className="j-shoppingCartBox justify-content-center col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-6 mt-5">
          <div className="j-cartItemsBox d-none d-sm-block p-0 d-flex flex-grow-1 flex-column gap-3">
            <div className='mt-2 mb-sm-5 j-itemBox'>
              <h3 className='j-cartTitle mb-0 ps-3 pt-2 pb-2'>相機</h3>
              {cartProduct.map((item, index) => (
                <div 
                className={`j-input-box d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`}
                key={index}>
                  <CartItem key={index} id={index + 1} itemData={item} />
                </div>
              ))}
            </div>
            
            <div className='mb-sm-5 j-itemBox'>
              <h3 className='mb-1 ms-3 pt-2'>課程</h3>
              {cartLession.map((lession, index) => (
                <div key={index}>
                  <LessonItem key={index} lessionitem={lession} />
                </div>
              ))}
            </div>

            <div className='j-itemBox'>
              <h3 className='mb-1 ms-3 pt-2'>租借</h3>
              {cartRent.map((rental, index) => (
                <div key={index}>
                  <RentItem key={index} rentalitem={rental} />
                </div>
              ))}
            </div>
          </div>
          <div className="j-cartItemsBox d-sm-none d-block p-0 d-flex flex-grow-1 flex-column">
            <div className='mt-2 mb-5 j-itemBox'>
              <h3 className='mb-1 ms-3 pt-2'>相機</h3>
              {cartProduct.map((item, index) => (
                <div key={index+1}>
                  <CartItem key={index} id={index + 1} itemData={item} />
                </div>
              ))}
            </div> 
            <div className='mt-2 mb-5 j-itemBox'>
              <h3 className='mb-1 ms-3 pt-2'>課程</h3>
              {cartLession.map((lession, index) => (
                <div key={index+1}>
                  <LessonItem key={index} lessionitem={lession} />
                </div>
              ))}
            </div>
            <div className='mt-2 j-itemBox'>
              <h3 className='mb-1 ms-3 pt-2'>租借</h3>
              {cartRent.map((rental, index) => (
                <div key={index+1}>
                  <RentItem key={index} rentalitem={rental} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <CheckoutFormStep3 />
      </div>
    </div>
  )
}
