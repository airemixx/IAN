import { useState } from "react";
import styles from "./shopping-cart-step2.module.scss";
import { useRouter } from "next/navigation"; // 使用 useRouter 來進行導向

export default function CheckoutFormStep2() {
    const router = useRouter(); // 取得 Next.js router
    const [formData, setFormData] = useState({
        title: "",
        lastName: "",
        firstName: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        phoneNumber: "",
        localPhone: "",
    });

    // 處理輸入變更
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // 儲存至 localStorage
    const handleSubmit = () => {
        localStorage.setItem("buyerData", JSON.stringify(formData));
        router.push("/cart/cart-step3"); // 導向到 cart-step3 頁面
    };

    return (
        <div className={`${styles['j-payStep']} col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5 mt-4 me-lg-0 `}>
            <div className={`${styles['j-payTitle']} mb-3`}>結帳</div>
            <div className={`${styles['buyerData']} mb-4`}>訂購人資料</div>
            <div className={`${styles['j-buyerInput']} d-flex flex-wrap mb-5`}>
                {[
                    { label: "稱謂*", name: "title" },
                    { label: "姓氏*", name: "lastName" },
                    { label: "姓名*", name: "firstName" },
                    { label: "地址欄*", name: "address" },
                    { label: "城市*", name: "city" },
                    { label: "地區*", name: "region" },
                    { label: "郵遞區號*", name: "postalCode" },
                    { label: "電話號碼*", name: "phoneNumber" },
                    { label: "本地電話*", name: "localPhone" }
                ].map((field, index) => (
                    <div key={index} className="d-flex flex-column flex-grow-1 mb-2">
                        <p className="mb-2">{field.label}</p>
                        <input
                            type="text"
                            name={field.name}
                            className="form-control focus-ring focus-ring-light"
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center`}>
                <button
                    className={`${styles['j-btn']} btn text-alig-center d-flex flex-grow-1 justify-content-center`}
                    onClick={handleSubmit}
                >
                    繼續
                </button>
            </div>
        </div>
    );
}
