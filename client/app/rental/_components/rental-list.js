import React from 'react'
import styles from './rental-list.module.scss'
import RentalCard from './rental-card'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

async function getRentals() {
  try {
    const res = await fetch(`${BASE_URL}/json/rental/rental-list.json`, {
      cache: 'no-store',
    })
    if (!res.ok) {
      throw new Error(`無法載入商品資料 (HTTP ${res.status})`)
    }
    return res.json()
  } catch (error) {
    console.error('載入租借列表時發生錯誤:', error)
    return []
  }
}

export default async function RentalList() {
  const rentals = await getRentals()

  return (
    <div style={{ marginTop: '120px' }}>
      <div
        className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-1 ${styles.rentalGrid}`}
      >
        {rentals.length > 0 ? (
          rentals.map((rental) => (
            <div key={rental.id} className={`col ${styles.rentalCard}`}>
              <div className="card h-100">
                {/* 狀態標籤 */}
                <span
                  className={`${styles.statusTag} ${
                    rental.state === '可供出租'
                      ? styles.available
                      : styles.unavailable
                  }`}
                >
                  {rental.state}
                </span>
                <img
                  src={`/images/rental/cams/${rental.image[0]}.png`}
                  className={`card-img-top ${styles.cardImage}`}
                  alt={rental.name}
                />
                <div className="card-body">
                  <h5 className={`card-title ${styles.cardTitle}`}>
                    {rental.name}
                  </h5>
                  <p className={`card-text ${styles.cardText}`}>
                    NT$ {rental.fee} / 天
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">目前沒有可租借的設備</p>
        )}
      </div>
    </div>
  )
}
