"use client"

import  "./shopping-cart-step2.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import CartItem from "../_components/cart-item/page";
import CartTitle from "../_components/cart-title/page";
import CheckoutFormStep2 from "../_components/checkout-form-step2/page";
import LessonItem from "../_components/lession-item/page";
import RentItem from "../_components/rental-item/page";


export default function shoppingCartTwoPage() {
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
          <div className="container" style={{height:"91vh"}}>
            <CartTitle count={cartItems.length} />
            <div className="row d-flex justify-content-center">
              <div
                className="j-shoppingCartBox justify-content-between mt-4 col-md-7"
              >
                <div
                  className="j-shoppingItemsBox d-none d-sm-block p-0"
                >
                  {cartItems.map((item, index) => (
                    <CartItem key={index} id={index + 1} itemData={item} />
                  ))}
                  {cartLession.map((lession, index) => (
                    <LessonItem
                      key={index}
                      id={index + 1}
                      lessionitem={lession}
                    />
                  ))}
                  {cartRent.map((rental, index) => (
                    <RentItem
                      key={index}
                      id={index + 1}
                      rentalitem={rental}
                    />
                  ))}
                </div>
                {/* 移動端版本... */}
              </div>
              <CheckoutFormStep2 />
            </div>
          </div>
      )
}