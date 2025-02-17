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
    <div className=""></div>
      <div className="row d-flex justify-content-center pt-4">
        <div className="j-shoppingCartBox justify-content-center col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-6">
          <div className="j-shoppingItemsBox d-none d-sm-block p-0 d-flex flex-grow-1 flex-column gap-3">
            <div className='mt-2 mb-5 j-itemBox'>
              <h3 className='mb-1 ms-3 pt-2'>相機</h3>
              {cartItems.map((item, index) => (
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
          <div className="j-shoppingItemsBox d-sm-none d-block p-0 d-flex flex-grow-1 flex-column gap-3 row">
            {cartItems.map((item, index) => (
              <div className="p-2 border-bottom"  key={index+1}>
                <CartItem key={index} id={index + 1} itemData={item} />
              </div>
            ))}
            {cartLession.map((lession, index) => (
              <div className="p-2 border-bottom"  key={index+1}>
                <LessonItem key={index} lessionitem={lession} />
              </div>
              
            ))}
            {cartRent.map((rental, index) => (
              <div className="p-2 border-bottom"  key={index+1}>
                <RentItem key={index} rentalitem={rental} />
              </div>
            ))}
          </div>
        </div>
        <CheckoutFormStep3 />
      </div>
    </div>
  )
}
