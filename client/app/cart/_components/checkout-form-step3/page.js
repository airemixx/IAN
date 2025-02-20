"use client"; // 確保在 Next.js 13+ 中運行 useState 和 useEffect

import styles from "./shopping-cart-step3.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 使用 useRouter 來進行導向
import React, { useRef } from 'react'
import { isDev, apiURL } from '@/config'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// import { useAuth } from '@/hooks/use-auth'

export default function CheckoutFormStep3() {
    const router = useRouter(); // 取得 Next.js router
    const [addressData, setAddressData] = useState({
        name: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        phone: "",
    });

    useEffect(() => {
        // 從 localStorage 讀取資料
        const savedData = localStorage.getItem("checkoutAddress");
        if (savedData) {
            setAddressData(JSON.parse(savedData));
        }
    }, []);

    // 檢查是否登入
    // const { isAuth } = useAuth()
    const payFormDiv = useRef(null)
    // 建立ref，用來放置金額
    const amountRef = useRef(null)
    // 建立ref，用來放置商品名稱
    const itemsRef = useRef(null)


    const handleSubmit = async () => {

        // 取得 localStorage 內的地址資料
        const addressData = JSON.parse(localStorage.getItem("checkoutAddress")) || {};
        const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
        const cartItems = Object.values(cartData);

        // 轉換 cartData 為適合的格式（例如商品名稱與數量）
        const items = cartItems.map(item => `${item.brand} ${item.model} x${item.quantity}`).join(", ");
        const amount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        console.log(items,amount);
        try {
            const res = await fetch(`${apiURL}/ecpay?amount=${amount}&items=${encodeURIComponent(items)}`, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });

            const resData = await res.json();

            if (isDev) console.log(resData);

            if (resData.status === "success") {
                // 建立付款表單
                const form = document.createElement("form");
                form.method = "POST";
                form.action = resData.data.action;

                // 加入 ECPay API 參數
                for (const key in resData.data.params) {
                    const input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = resData.data.params[key];
                    form.appendChild(input);
                }

                // 加入至畫面並提交
                document.body.appendChild(form);

                if (window.confirm("確認要導向至 ECPay 進行付款?")) {
                    form.submit();
                }
            } else {
                toast.error("付款失敗，請稍後再試！");
            }
        } catch (error) {
            console.error("付款請求失敗:", error);
            toast.error("發生錯誤，請稍後再試！");
        }

        // router.push("/cart/cart-success"); // 導向到 cart-success 頁面
    };


    return (
        <div className={`d-flex flex-column align-items-center align-items-xl-start col-12 col-sm-10 col-md-8 col-lg-8 col-xl-5 col-xxl-5 ms-xl-5 ms-xxl-0 mt-xl-5 mt-xl-5 pt-xl-5 mt-sm-5`}>
            <p className={`${styles['j-addressTitle']} text-start ps-3 mb-3 mt-sm-1 mt-5`}>結帳</p>
            <div className={`${styles['addressDetail']} d-flex flex-column mb-3 ps-3`}>
                <div className="d-flex mb-3">
                    <span className={`${styles['j-adDetailtitle']}`}>送貨方式：</span>
                    <span className={`${styles['j-adDetailContent']}`}>
                        2-3個工作天<br /> (若有選擇調整錶帶服務，將在3-5個工作天送達)<br />
                    </span>
                </div>
                <div className="d-flex mb-3">
                    <span className={`${styles['j-adDetailtitle']}`}>送貨地址：</span>
                    <span className={`${styles['j-adDetailContent']}`}>
                        {addressData.name} <br />
                        {addressData.address}, {addressData.city}, {addressData.region} {addressData.postalCode} <br />
                        台灣 ({addressData.phone})<br />
                    </span>
                </div>
                <div className="d-flex mb-3">
                    <span className={`${styles['j-adDetailtitle']}`}>帳單地址：</span>
                    <span className={`${styles['j-adDetailContent']}`}>與送貨地址相同</span>
                </div>
            </div>
            <div className={`${styles['j-payStep']} d-flex flex-column`}>
                <div className={`${styles['j-payTitle']}`}>付款</div>
                <div className={`${styles['j-payContent']}`}>
                    <p className="mb-0">請選擇你的付款方式。之後，您將轉向相關服務頁面已完成你的訂單</p>
                </div>
                <div className={`${styles['j-useCredit']} d-flex`}>
                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        <img src="/images/shopping-cart-image/radiobutton1.svg" alt="" />
                    </label>
                    <p className="ms-2 mb-0">信用卡付款</p>
                </div>
                <div>
                    <p>除非另有標示，否則必須填寫所有欄位。</p>
                </div>
                <div className={`${styles['j-creditCardInput']} d-flex flex-wrap row`}>
                    <div className="d-flex flex-column flex-grow-1 mb-3 col-12">
                        <p className="mb-0">信用卡號碼</p>
                        <input type="text" className="form-control focus-ring focus-ring-light" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 mb-3 col-6">
                        <p className="mb-0">到期日期</p>
                        <input type="text" className="form-control focus-ring focus-ring-light" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 mb-3 col-6">
                        <p className="mb-0">安全碼</p>
                        <input type="text" className="form-control focus-ring focus-ring-light" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 col-6">
                        <p className="mb-0">信用卡上的名字</p>
                        <input type="text" className="form-control focus-ring focus-ring-light" />
                    </div>
                    <div className="col-6" />
                </div>
                <div className={`${styles['j-needCheckBox']} d-flex flex-column`}>
                    <div>
                        <input type="checkbox" />
                        <span>我已閱讀並同意映相坊</span>
                        銷售條款
                        <span>並同意與了解</span>
                        隱私權及cookie政策
                    </div>
                    <div className={`${styles['j-mustWrite']}`}>
                        <p>此為必填欄目</p>
                    </div>
                </div>
                <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center`}>
                    <button className={`${styles['j-btn']} btn text-align-center d-flex flex-grow-1 justify-content-center`}
                        onClick={handleSubmit}>付款</button>
                </div>
            </div>
        </div>
    );
}
