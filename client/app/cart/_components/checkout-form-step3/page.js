import { useState, useEffect, useRef } from "react";
import styles from "./shopping-cart-step3.module.scss";
import { useRouter } from "next/navigation";
import { isDev, apiURL } from '@/config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CheckoutFormStep3() {
    const router = useRouter();
    const [addressData, setAddressData] = useState({
        name: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        phone: "",
    });

    const [paymentMethod, setPaymentMethod] = useState(""); // 儲存選中的付款方式

    useEffect(() => {
        const savedData = localStorage.getItem("checkoutAddress");
        if (savedData) {
            setAddressData(JSON.parse(savedData));
        }
    }, []);

    const handlePaymentChange = (method) => {
        setPaymentMethod(method); // 只能選擇一個付款方式
    };

    const handleSubmit = async () => {
        if (!paymentMethod) {
            toast.error("請選擇付款方式");
            return;
        }

        const addressData = JSON.parse(localStorage.getItem("checkoutAddress")) || {};
        const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItems = Object.values(cartData);
        const items = cartItems.map(item => `${item.brand} ${item.model} x${item.quantity}`).join(", ");
        const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
    };

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
                        {addressData.address}, {addressData.city}, {addressData.region} {addressData.postalCode} <br />
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
                            checked={paymentMethod === "linepay"}
                            onChange={() => handlePaymentChange("linepay")}
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
