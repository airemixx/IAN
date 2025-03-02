// rent-reviews

'use client'

import { useState } from 'react'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'

export default function RentReviews({ reviews = [] }) {
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // 📌計算平均評分
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0

  // 📌計算星星顯示（包括半星處理）
  const getStarDisplay = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (rating >= i - 0.3) {
        stars.push(<IoStar key={i} className="k-warn-text" />)
      } else if (rating >= i - 0.8) {
        stars.push(<IoStarHalf key={i} className="k-warn-text" />)
      } else {
        stars.push(<IoStarOutline key={i} className="k-warn-text" />)
      }
    }
    return <span>{stars}</span>
  }

  // 📌顯示更多評論 (每次顯示3條)
  const showMore = () => {
    setItemsPerPage(itemsPerPage + 3)
  }

  return (
    <div className="mt-4">
      <h5>評價</h5>
      <div className="d-flex align-items-center">
        <span className="k-star">{getStarDisplay(averageRating)}</span>
        <span className="k-warn-text ms-2">{averageRating.toFixed(1)} 分</span>
        <span className="ms-2">{reviews.length} 條評論</span>
      </div>
      <div className="mt-3" id="reviewContainer">
        {reviews.slice(0, itemsPerPage).map((review, index) => (
          <div key={index} className="border p-3 mb-3 d-flex">
            <img
              src={review.avatar || '/uploads/users.webp'}
              alt={review.name}
              onError={(e) => e.target.src = '/uploads/users.webp'}
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div>
              <strong>{review.name}</strong>
              <p>
                {review.comment.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <span className='k-star'>{getStarDisplay(review.rating)}</span>

            </div>
          </div>
        ))}

        {itemsPerPage < reviews.length && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-warning k-main-radius"
              onClick={showMore}
            >
              顯示更多
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
