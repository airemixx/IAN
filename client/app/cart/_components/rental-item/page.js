"use client"
import styles from "./rental-item.module.scss";

export default function RentItem({ rentalitem, id, length, page }) {
    const { image, brand, name, start, end, price } = rentalitem
    id = id - length
    function handleDeleteItem() {
        const confirmDelete = window.confirm("是否要從購物車刪除該商品？");
        if (confirmDelete) {
            // 取得 localStorage 中的購物車數據
            let cart = JSON.parse(localStorage.getItem("rent_cart")) || {};

            delete cart[id]
            let updatedCart = Object.entries(cart).filter(v => v != null);// 過濾掉該商品
            updatedCart = updatedCart.map(v => v[1])

            console.log(updatedCart);
            localStorage.removeItem('rent_cart')
            // // 轉回物件形式並更新 localStorage
            localStorage.setItem("rent_cart", JSON.stringify(updatedCart));

            // 刷新頁面或通知父層更新購物車
            window.location.reload();

        }
    }

    return (
        <>
            <div className="d-none d-sm-block d-flex flex-grow-1">
                <div className={`${styles['j-cartItemBox']} d-flex flex-grow-1`}>
                    <div className={`${styles['shoppingRent']} d-flex flex-grow-1 position-relative`}>
                        <div className={`${styles['j-rentImg']} m-2 d-flex justify-content-center `}>
                            <img src={`/${image}.png`} className="object-fit-contain" />
                        </div>
                        <div className="d-flex justify-content-evenly justify-content-xl-center justify-content-xxl-evenly flex-grow-1 flex-sm-column flex-xl-row">
                            <div className={`${styles['j-rentCameraBrand']} d-flex justify-content-center aligns-items-center flex-xl-column mt-xxl-2 mt-xxl-0 mt-sm-2`}>
                                <span className={`d-flex flex-start ${styles['j-rtText']} mb-xl-2 me-sm-3`}>{brand}</span>
                                <span className={`${styles['j-rtText']}`}>{name}</span>
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <span className={`${styles['j-rtText']} mb-xl-2`}>租賃日期: {start}</span>
                                <span className={`${styles['j-rentDeadLine']}`}>到期日: {end}</span>

                            </div>

                        </div>
                        <div className={"d-flex align-items-center flex-grow-1 justify-content-center justify-content-xl-start justify-content-xxl-center me-xxl-2 ms-md-2"}>
                            <span className={`d-flex flex-column ${styles['j-rtText']} mb-2 text-center me-2`}>價格: {price}元</span>
                        </div>
                        {page ? <div className={`${styles['j-delBtn']} position-absolute`}>
                            <button className="btn" onClick={handleDeleteItem}>
                                ✕
                            </button>
                        </div> : ''}
                    </div>
                </div>
            </div>
            <div className="d-sm-none d-block d-flex flex-grow-1">
                <div className={`${styles['j-cartItemBox']} d-flex flex-grow-1 flex-column`}>
                    <div className={`${styles['shoppingRent']} d-flex flex-grow-1 position-relative`}>
                        <div className={`${styles['j-rentImg']} m-2 d-flex justify-content-center `}>
                            <img src={`/${image}.png`} className="object-fit-contain" />
                        </div>
                        <div className="d-flex justify-content-center flex-grow-1 flex-sm-column flex-xl-row">
                            <div className={`${styles['j-rentCameraBrand']} d-flex justify-content-center aligns-items-center flex-xl-column mt-xxl-2 ms-xxl-4 ps-xxl-2 mt-xxl-0 mt-sm-2`}>
                                <span className={`d-flex flex-start ${styles['j-rtText']} mb-xl-2 me-sm-3`}>{brand}</span>
                                <span className={`${styles['j-rtText']}`}>{name}</span>
                            </div>
                        </div>
                        {page ? <div className={`${styles['j-delBtn']} position-absolute`}>
                            <button className="btn" onClick={handleDeleteItem}>
                                ✕
                            </button>
                        </div> : ''}
                    </div>
                    <div className="d-flex justify-content-between flex-grow-1">
                        <div className="d-flex flex-column align-items-center justify-content-center ms-xxl-5 ms-xl-4 flex-grow-1">
                            <span className={`${styles['j-rtText']} mb-xl-2`}>租賃日期: {start}</span>
                            <span className={`${styles['j-rentDeadLine']}`}>到期日: {end}</span>

                        </div>
                        <div className={"d-flex align-items-center flex-grow-1 justify-content-lg-center"}>
                            <span className={`d-flex flex-column ${styles['j-rtText']} mb-2 flex-grow-1`}>價格: {price}元</span>
                        </div>
                    </div>
                </div>
            </div>
        </>



    );
}