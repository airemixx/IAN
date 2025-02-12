"use client"
import styles from "./rental-item.module.scss"
export default function rentalItemPage(id) {

    return (
        <div className="d-flex">
            <input type="checkbox" className="form-check  me-2" id={`item${id}`} />
            <div className={`${styles['j-cartItemBox']} me-3 mb-2 d-flex flex-grow-1`}>
                <div className={`${styles['shoppingRent']} d-flex flex-column flex-grow-1`}>
                    <div className={`${styles['j-rentImg']} m-2 d-flex justify-content-center`}>
                        <img src="/images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                    </div>
                    <div className={`${styles['j-rentCameraBrand']} d-flex flex-column align-items-center mb-3`}>
                        <span>FUJIFILM 富士</span>
                        <span>X-T5 16-50mm</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <span className="mb-2">租賃日期: 2024-01-01</span>
                        <span className={`${styles['j-rentDeadLine']}`}>到期日: 2024-01-14</span>
                    </div>
                </div>
            </div>
        </div>
    )
}