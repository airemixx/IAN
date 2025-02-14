import styles from "./shopping-cart-step2.module.scss";

export default function CheckoutFormStep2() {
    return (
        <div className={`${styles['j-payStep']} col-sm-11 col-md-9 col-lg-7 col-xl-6 col-xxl-5 mt-4 me-lg-0 `}>
            <div className={`${styles['j-payTitle']} mb-3`}>結帳</div>
            <div className={`${styles['buyerData']} mb-4`}>訂購人資料</div>
            <div className={`${styles['j-buyerInput']} d-flex flex-wrap mb-5`}>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">稱謂*</p>
                    <input type="text" className="form-control mb-2 focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p className="mb-2">姓氏*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">姓名*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">地址欄*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">城市*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">地區*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">郵遞區號*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">電話號碼*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
                <div className="d-flex flex-column flex-grow-1 mb-2">
                    <p className="mb-2">本地電話*</p>
                    <input type="text" className="form-control focus-ring focus-ring-light" />
                </div>
            </div>
            <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center`}>
                <button className={`${styles['j-btn']} btn text-alig-center d-flex flex-grow-1 justify-content-center`}>繼續</button>
            </div>
        </div>
    );
}