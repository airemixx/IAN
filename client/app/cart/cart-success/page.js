'use client'

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./cart-success.scss";
import { CheckCircle } from "react-bootstrap-icons";

export default function CartSuccessPage({ orderNumber, email }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/"; // 替換成你的目標頁面 URL
    }, 3000);

    return () => clearTimeout(timer); // 清除計時器，避免潛在錯誤
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container text-center p-4">
        <div className="d-flex align-items-center justify-content-center mb-3">
          <CheckCircle className="text-success me-5" size={100} />
          <div>
            <h2>謝謝你! 你的訂單已成立</h2>
            <p className="fw-bold">訂單號碼: {orderNumber}</p>
            <br />
            <span>訂單確認電郵已發到您的電子郵箱:</span>
            <p className="fw-bold">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
