import styles from "./shopping-cart-step2.module.scss";

export default function CheckoutFormStep2() {
    return (
        <div className={`${styles['j-payStep']} col-5`}>
            <div className={`${styles['j-payTitle']} mb-3`}>結帳</div>
            <div className={`${styles['buyerData']} mb-5`}>訂購人資料</div>
            <div className={`${styles['j-buyerInput']} d-flex flex-wrap mb-5`}>
                <div className="d-flex flex-column flex-grow-1">
                    <p>稱謂*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>姓氏*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>姓名*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>地址欄*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>城市*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>地區*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>郵遞區號*</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>電話號碼</p>
                    <input type="text" className="form-control" />
                </div>
                <div className="d-flex flex-column flex-grow-1">
                    <p>本地電話*</p>
                    <input type="text" className="form-control" />
                </div>
            </div>
            <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center align-self-stretch`}>
                <button className={`${styles['j-btn']} btn text-alig-center`}>繼續</button>
            </div>
        </div>
    );
}