import { useState, useEffect } from "react";
import styles from "./shopping-cart-step2.module.scss";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function CheckoutFormStep2() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: ""
    });

    const [errors, setErrors] = useState({});
    const [selectedOption, setSelectedOption] = useState(null); // 選擇的 buyer 物件
    const [buyerOptions, setBuyerOptions] = useState([]); // API 回傳的訂購人資料

    // 取得使用者 ID，避免 jwtDecode 出錯
    const token = localStorage.getItem("loginWithToken");
    const id = token ? jwtDecode(token).id : null;

    useEffect(() => {
        if (!id) return;

        fetch(`/api/address?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                const buyerList = Array.isArray(data?.result) ? data.result : [];
                setBuyerOptions(buyerList);
            })
            .catch((error) => {
                console.error("獲取資料失敗:", error);
                setBuyerOptions([]); // 避免 UI 崩潰
            });
    }, [id]);

    // 當選擇的訂購人變更時，自動填入 input 欄位
    useEffect(() => {
        if (selectedOption) {
            setFormData({
                name: selectedOption.name || "",
                address: selectedOption.address || "",
                phone: selectedOption.phone || ""
            });
        }
    }, [selectedOption]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    };

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        const buyer = buyerOptions.find((b) => String(b.id) === selectedId);
        setSelectedOption(buyer || null);
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "此欄位為必填";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            localStorage.setItem("buyerData", JSON.stringify(formData));
            router.push("/cart/cart-step3");
        }
    };

    return (
        <div className={`${styles['j-payStep']} col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5 mt-4 me-lg-0`}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={`${styles['j-payTitle']}`}>結帳</div>
                <select
                    className="form-select w-auto"
                    onChange={handleSelectChange}
                    defaultValue=""
                >
                    <option value="" disabled>請選擇住址</option>
                    {buyerOptions.map((buyer) => (
                        <option key={buyer.id} value={buyer.id}>
                            {buyer.address}
                        </option>
                    ))}
                </select>
            </div>
            <div className={`${styles['buyerData']} mb-4`}>訂購人資料</div>
            <div className={`${styles['j-buyerInput']} d-flex flex-column mb-5`}>
                {[
                    { label: "姓名*", name: "name" },
                    { label: "地址*", name: "address" },
                    { label: "電話號碼*", name: "phone" },
                ].map((field, index) => (
                    <div key={index} className="d-flex flex-column flex-grow-1 mb-2">
                        <p className="mb-2">{field.label}</p>
                        <input
                            type="text"
                            name={field.name}
                            className={`form-control focus-ring focus-ring-light ${errors[field.name] ? 'border-danger' : ''}`}
                            value={formData[field.name]}
                            onChange={handleChange}
                        />
                        {errors[field.name] && <small className="text-danger">{errors[field.name]}</small>}
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
