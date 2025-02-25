import { useState, useEffect, useRef } from "react";
import styles from "./shopping-cart-step3.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { isDev, apiURL } from '@/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner'

export default function CheckoutFormStep3() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [paymentMethod, setPaymentMethod] = useState("")
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({ returnCode: '', returnMessage: '' });
    const [addressData, setAddressData] = useState({
        name: "",
        address: "",
        phone: "",
    });

    useEffect(() => {
        const savedData = localStorage.getItem("buyerData");
        if (savedData) {
            setAddressData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        if (searchParams?.get('transactionId') && searchParams?.get('orderId')) {
            setLoading(true);
            handleConfirm(searchParams.get('transactionId'));
        } else {
            setLoading(false);
        }
    }, [searchParams]);

    const handlePaymentChange = (method) => {
        setPaymentMethod(method); // 只能選擇一個付款方式
    };

    const handleSubmit = async () => {
        if (!paymentMethod) {
            toast.error("請選擇付款方式");
            return;
        }

        const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItems = Object.values(cartData);
        const items = cartItems.map(item => `${item.brand || ''} ${item.name} x${item.quantity}`).join(", ");
        const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        if (paymentMethod === "linePay") {
            goLinePay(amount, items);
        } else if (paymentMethod === "ecpay") {
            goECPay(amount, items);
        }


    };

    const goLinePay = async (amount) => {
        // 先連到node伺服器後端，取得LINE Pay付款網址
        const res = await fetch(
            `${apiURL}/linePay/reserve?amount=${amount}`,
            {
                method: 'GET',
                // 讓fetch能夠傳送cookie
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            }
        )

        const resData = await res.json()

        console.log(resData)

        if (resData.status === 'success') {
            if (window.confirm('確認要導向至LINE Pay進行付款?')) {
                //導向至LINE Pay付款頁面
                window.location.href = resData.data.paymentUrl
            }
        } else {
            toast.error('付款失敗')
        }
    }

    const handleConfirm = async (transactionId) => {
        try {
            const res = await fetch(`${apiURL}/linePay/confirm?transactionId=${transactionId}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });
            const resData = await res.json();
            console.log(resData);

            if (resData.status === "success") {
                setResult(resData.data);
                toast.success("付款成功");
                try {
                    // 取得網址參數
                    const orderData = {
                      buyerData: JSON.parse(localStorage.getItem("buyerData")) || {}, // 取得買家資料
                      cartItems:  JSON.parse(localStorage.getItem("cartItems")) || [], // 取得購物車資料
                      date: new Date().toString()
                    };
            
                    console.log("送出訂單資料:", orderData);
            
                    const response = await fetch('/api/orders', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(orderData),
                    });
            
                    if (response.status == 200) {
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
                
            } else {
                toast.error("付款失敗");
            }

            setTimeout(() => {
                setLoading(false);
                router.replace("/");
            }, 3000);
        } catch (error) {
            console.error("確認交易失敗:", error);
            toast.error("交易確認失敗");
            setLoading(false);
        }
    };

    const goECPay = async (amount, items) => {
        try {
            const res = await fetch(`${apiURL}/${paymentMethod}?amount=${amount}&items=${encodeURIComponent(items)}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
            });
            const resData = await res.json();

            if (isDev) console.log(resData);

            if (resData.status === "success") {
                const form = document.createElement("form");
                form.method = "POST";
                form.action = resData.data.action;

                for (const key in resData.data.params) {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = resData.data.params[key];

                    form.appendChild(input);

                }

                document.body.appendChild(form);
                if (window.confirm(`確認要導向至 ${paymentMethod.toUpperCase()} 進行付款?`)) {
                    form.submit();
                }
            } else {
                toast.error("付款失敗，請稍後再試！");
            }
        } catch (error) {
            console.error("付款請求失敗:", error);
            toast.error("發生錯誤，請稍後再試！");
        }
    }

    return (
        <div className="d-flex flex-column align-items-center align-items-xl-start col-12 col-sm-10 col-md-8 col-lg-8 col-xl-5 col-xxl-5 ms-xl-5 mt-xl-5 pt-xl-5 mt-sm-5">
            <p className={`${styles['j-addressTitle']} text-start ps-3 mb-3 mt-5`}>結帳</p>
            <div className={`${styles['addressDetail']} d-flex flex-column mb-3 ps-3`}>
                <div className="d-flex mb-3">
                    <span className={styles['j-adDetailtitle']}>送貨方式：</span>
                    <span className={styles['j-adDetailContent']}>
                        2-3個工作天<br /> (若有選擇調整錶帶服務，將在3-5個工作天送達)<br />
                    </span>
                </div>
                <div className="d-flex mb-3">
                    <span className={styles['j-adDetailtitle']}>送貨地址：</span>
                    <span className={styles['j-adDetailContent']}>
                        {addressData.name} <br />
                        {addressData.address} <br />
                        台灣 ({addressData.phone})<br />
                    </span>
                </div>
            </div>

            <div className={`${styles['j-payStep']} d-flex flex-column`}>
                <div className={styles['j-payTitle']}>付款</div>
                <div className={styles['j-payContent']}>
                    <p className="mb-0">請選擇你的付款方式。之後，您將轉向相關服務頁面已完成你的訂單</p>
                </div>

                <div className={`${styles['j-useCredit']} d-flex flex-column`}>
                    <div className="d-flex align-items-center">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="ecpay"
                            name="paymentMethod"
                            checked={paymentMethod === "ecpay"}
                            onChange={() => handlePaymentChange("ecpay")}
                        />
                        {/* <label className="ms-2 mb-0" htmlFor="ecpay">
                            <img src="/images/shopping-cart-image/radiobutton1.svg" alt="" />
                        </label> */}
                        <p className="ms-2 mb-0">ECpay</p>
                    </div>

                    <div className="d-flex align-items-center mt-2">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="linepay"
                            name="paymentMethod"
                            checked={paymentMethod === "linePay"}
                            onChange={() => handlePaymentChange("linePay")}
                        />
                        {/* <label className="ms-2 mb-0" htmlFor="linepay">
                            <img src="/images/shopping-cart-image/radiobutton1.svg" alt="" />
                        </label> */}
                        <p className="ms-2 mb-0">LinePay</p>
                    </div>
                </div>

                <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center`}>
                    <button className={`${styles['j-btn']} btn text-align-center d-flex flex-grow-1 justify-content-center`}
                        onClick={handleSubmit}>
                        付款
                    </button>
                </div>
            </div>
        </div>
    );
}
