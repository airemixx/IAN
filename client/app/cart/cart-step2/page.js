'use client'

import styles from './cart-step2.module.scss'
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
  
  let test = cartItems
  console.log(test);
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
    <div className={`container ${styles['j-bodyHeight']}`}>
      <div className={`${styles['j-heightspace']}`}></div>
      <div className="row d-flex justify-content-center pt-2">
        <div className={`${styles['j-shoppingCartBox']} justify-content-between mt-4 me-xxl-2 col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-6`}>
          <div className={`${styles['j-cartItemsBox']} d-none d-sm-block p-0 d-flex flex-grow-1 flex-column gap-3`}>
            <div className={`mt-2 mb-5 ${styles['j-itemBox']}`}>
              {cartProduct.length !=0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>相機</h3> : ''}
              {cartProduct.map((item, index) => (
                <div
                    className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`} 
                    key={index}>
                  <CartItem key={index} id={index} itemData={item} page={2}/>
                </div>
              ))}
            </div>

            <div className={`mt-2 mb-5 ${styles['j-itemBox']}`}>
              {cartLession.length !=0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>課程</h3> : ''}
              {cartLession.map((lession, index) => (
                <div key={index}
                className={`j-input-box d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`}>
                  <LessonItem key={index} lessionitem={lession} />
                </div>
              ))}
            </div>

            <div className={`mt-2 ${styles['j-itemBox']}`}>
              {cartRent.length !=0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>租借</h3> : ''}
              {cartRent.map((rental, index) => (
                <div key={index}
                className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? "j-nextBox" : "" }`}>
                  <RentItem key={index} rentalitem={rental} />
                </div>
              ))}
            </div>
          </div>
          
          <div className={`${styles['j-cartItemsBox']} d-sm-none d-block p-0 d-flex flex-grow-1 flex-column`}>
          <div className="mt-2 mb-5">
                  {cartProduct.length != 0 ? <h3 className={`${styles['j-cartTitle']} mb-0 ps-3 pt-2 pb-2`}>相機</h3> : ''}
                  {cartProduct.map((item, index) => (
                    <div
                      className={`${styles['j-input-box']} d-flex align-items-center mb-3 ${index > 0 ? styles['j-nextBox'] : ""}`}
                      key={index}
                    >
                        <CartItem key={index} id={index} itemData={item} page={1} />
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
                        key={index}>
                          <LessonItem key={index} id={lessonIndex} lessionitem={lession} length={cartProduct.length} page={1}/>
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
                        key={index}>
                          <RentItem key={index} rentalitem={rental} id={rentalIndex} length={(cartProduct.length+cartLession.length)} page={1}/>
                      </div>
                    )
                  })}
                </div>
          </div>
        </div>
        <CheckoutFormStep2 />
      </div>
    </div>
  )
}
