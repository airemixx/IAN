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
    const [selectedOption, setSelectedOption] = useState(""); // 下拉選單選擇的值
    const [buyerOptions, setBuyerOptions] = useState([]); // 存 API 資料
    const id = jwtDecode(localStorage.getItem("loginWithToken")).id;
    // 取得訂購人預設資料
    useEffect(() => {
        fetch(`/api/address?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBuyerOptions(data);
            })
            .catch((error) => console.error("獲取資料失敗:", error));
    }, []);

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
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);

        // 根據選擇的 ID 找到對應的資料並填入表單
        const selectedBuyer = buyerOptions.find((buyer) => buyer.id === selectedValue);
        if (selectedBuyer) {
            setFormData({
                name: selectedBuyer.name,
                address: selectedBuyer.address,
                phone: selectedBuyer.phone
            });
        } else {
            setFormData({ name: "", address: "", phone: "" }); // 清空表單
        }
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
    const buyerAddress = Object.values(buyerOptions)
    console.log(buyerAddress.length);
    return (
        <div className={`${styles['j-payStep']} col-sm-10 col-md-9 col-lg-7 col-xl-6 col-xxl-5 mt-4 me-lg-0 `}>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={`${styles['j-payTitle']}`}>結帳</div>
                <select
                    className="form-select w-auto"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    key={1}
                >
                    <option value="">請選擇</option>
                    {buyerAddress.map((buyer) => (
                        <option key={buyer.id} value={buyer.id}>
                            {buyer.name}
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
