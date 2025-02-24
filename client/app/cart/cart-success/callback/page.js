'use client'

import { useSearchParams } from 'next/navigation'
import { isDev } from '@/config'
import Link from 'next/link'
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cart-success.scss";
import { CheckCircle } from "react-bootstrap-icons";

export default function ECPayCallback() {
    // 取得網址參數，例如: ?RtnCode=xxxxxx
  const searchParams = useSearchParams();
  const [orderSaved, setOrderSaved] = useState(false); // 確認訂單是否存入
  
  useEffect(() => {
    const saveOrderToDB = async () => {
      try {
        // 取得網址參數
        const orderData = {
          // merchantTradeNo: searchParams?.get('MerchantTradeNo'),
          // tradeAmount: searchParams?.get('TradeAmt'),
          // tradeDate: searchParams?.get('TradeDate'),
          // paymentDate: searchParams?.get('PaymentDate'),
          // paymentType: searchParams?.get('PaymentType'),
          // rtnCode: searchParams?.get('RtnCode'),
          // rtnMsg: searchParams?.get('RtnMsg'),
          buyerData: JSON.parse(localStorage.getItem('buyerData') || '[]'), // 取得買家資料
          cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'), // 取得購物車資料
        };

        console.log("送出訂單資料:", orderData);

        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (response.status == 200) {
          setOrderSaved(true);
          console.log('訂單已成功存入資料庫');
          // localStorage.removeItem('cart')
          // localStorage.removeItem('cartItems')
          // localStorage.removeItem('buyerData')
        } else {
          console.error('存入失敗:', await response.text());
        }
      } catch (error) {
        console.error('存入訂單時發生錯誤:', error);
      }
    };
    saveOrderToDB();
      // const timer = setTimeout(() => {
      //   window.location.href = "/"; // 替換成你的目標頁面 URL
      // }, 3000);
  
      // return () => clearTimeout(timer); // 清除計時器，避免潛在錯誤
  }, [searchParams]);
  if (isDev) console.log('RtnCode', searchParams?.get('RtnCode'))

  
  return (
    <>
      {/* <p>以下為回傳資料:</p>
      <p>交易編號: {searchParams?.get('MerchantTradeNo')}</p>
      <p>交易金額: {searchParams?.get('TradeAmt')}</p>
      <p>交易日期: {searchParams?.get('TradeDate')}</p>
      <p>付款日期: {searchParams?.get('PaymentDate')}</p>
      <p>付款方式: {searchParams?.get('PaymentType')}</p>
      <p>回應碼: {searchParams?.get('RtnCode')}</p>
      <p>回應訊息: {searchParams?.get('RtnMsg')}</p> */}
      <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container text-center p-4">
              <div className="d-flex align-items-center justify-content-center mb-3">
                <CheckCircle className="text-success me-5" size={100} />
                <div>
                  <h2>謝謝你! 你的訂單已成立</h2>
                  <p className="fw-bold">訂單號碼: {searchParams?.get('MerchantTradeNo')}</p>
                  <br />
                  <p>交易金額: {searchParams?.get('TradeAmt')}</p>
                  <p>交易日期: {searchParams?.get('TradeDate')}</p>
                  <p>付款日期: {searchParams?.get('PaymentDate')}</p>
                  <span>訂單確認電郵已發到您的電子郵箱:</span>
                  <p className="fw-bold">{1234}</p>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

// 返回的範例:
// http://localhost:3000/ecpay/callback?CustomField1=&CustomField2=&CustomField3=&CustomField4=&MerchantID=3002607&MerchantTradeNo=od20241130223942231&PaymentDate=2024%2F11%2F30+23%3A11%3A51&PaymentType=TWQR_OPAY&PaymentTypeChargeFee=0&RtnCode=1&RtnMsg=Succeeded&SimulatePaid=0&StoreID=&TradeAmt=1000&TradeDate=2024%2F11%2F30+22%3A39%3A42&TradeNo=2411302239425452&CheckMacValue=958DF6A1C508F2A90F04440AF0F464960A71E315EBA903A4FCD53C1517C043ED
