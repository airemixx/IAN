"use client"
import styles from "./rental-item.module.scss";

export default function RentItem({rentalitem }) {
    const {image, brand, model, rentDate, dueDate} = rentalitem
    return (
        <div className="d-flex flex-grow-1">
            <div className={`${styles['j-cartItemBox']} mb-2 d-flex flex-grow-1`}>
                <div className={`${styles['shoppingRent']} d-flex flex-column flex-grow-1`}>
                    <div className={`${styles['j-rentImg']} m-2 d-flex justify-content-center `}>
                        <img src={image} alt={brand} className="object-fit-contain" />
                    </div>
                    <div className={`${styles['j-rentCameraBrand']} d-flex flex-column align-items-center mb-3`}>
                        <span>{brand}</span>
                        <span>{model}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <span className="mb-2">租賃日期: {rentDate}</span>
                        <span className={`${styles['j-rentDeadLine']}`}>到期日: {dueDate}</span>
                    </div>
                </div>
            </div>
        </div>
         
    );
}