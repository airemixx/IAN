import styles from "./shopping-cart-step3.module.scss";

export default function CheckoutFormStep3() {
    return (
        <div className={`${styles['j-pay']} col-md-5 ps-0 mt-5 pt-5`}>
            <p className={`${styles['j-addressTitle']} text-start ps-3`}>結帳</p>
            <div className={`${styles['addressDetail']} d-flex flex-wrap mb-3 row ps-3`}>
                <div className="d-flex flex-column me-4 col-5">
                    <span className={`${styles['j-addressDetailContent']}`}>
                        您的送貨方式<br />
                        2-3個工作天 (若有選擇調整錶帶服務，將在3-5個工作天送達)<br />
                    </span>
                </div>
                <div className="d-flex flex-column w-50 col-auto">
                    <span className={`${styles['j-addressDetailContent']}`}>
                        送貨地址：<br />
                        XX 黃 先生<br />
                        XX街XX號<br />
                        XX縣 XX鎮 Taiwan Sheng, 310<br />
                        台灣地區(0918556231)<br />
                    </span>
                </div>
                <div className="d-flex flex-column col">
                    <span className={`${styles['j-addressDetailContent']}`}>
                        帳單地址 <br />
                        與送貨地址相同<br />
                    </span>
                </div>
            </div>
            <div className={`${styles['j-payStep']} d-flex flex-column`}>
                <div className={`${styles['j-payTitle']}`}>付款</div>
                <div className={`${styles['j-payContent']}`}>
                    <p className="mb-0">請選擇你的付款方式。之後，您將轉向相關服務頁面已完成你的訂單</p>
                </div>
                <div className={`${styles['j-useCredit']} d-flex`}>
                    <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
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
                        <input type="text" className="form-control" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 mb-3 col-6">
                        <p className="mb-0">到期日期</p>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 mb-3 col-6">
                        <p className="mb-0">安全碼</p>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 col-6">
                        <p className="mb-0">信用卡上的名字</p>
                        <input type="text" className="form-control" />
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
                <div className={`${styles['j-Checkout']} d-flex justify-content-center align-items-center align-self-stretch`}>
                    <button className={`${styles['j-btn']} btn text-align-center`}>付款</button>
                </div>
            </div>
        </div>
    );
}