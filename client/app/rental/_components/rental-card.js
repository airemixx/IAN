import React from 'react'
import styles from './rental-card.module.scss'

export default function RentalCard({ rental }) {
  return (
    <div className={`col ${styles.rentalCard}`}>
      <div className="card h-100">
        {/* 狀態標籤 */}
        <span
          className={`${styles.statusTag} ${
            rental.state === '可供出租' ? styles.available : styles.unavailable
          }`}
        >
          {rental.state}
        </span>
        {/* 商品圖片 */}
        <img
          src={`/images/rental/cams/${rental.image[0]}.png`}
          className={`card-img-top ${styles.cardImage}`}
          alt={rental.name}
        />
        <div className="card-body">
          <h5 className={`card-title ${styles.cardTitle}`}>{rental.name}</h5>
          <p className={`card-text ${styles.cardText}`}>
            NT$ {rental.fee} / 天
          </p>
        </div>
      </div>
    </div>
  )
}
