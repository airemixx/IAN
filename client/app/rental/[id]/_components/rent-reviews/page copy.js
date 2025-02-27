// rent-reviews

'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

export default function RentReviews({ rent_id }) {
  const [reviews, setReviews] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // 初始加載評論數據
  useEffect(() => {
    fetchReviews()
  }, [rent_id])

  // 從 API 獲取評論數據
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`/api/rental/reviews?rent_id=${rent_id}`)
      if (response.data.success) {
        setReviews(response.data.reviews || [])
      }
    } catch (error) {
      console.error('獲取評論失敗:', error.message)
    }
  }

  // 顯示更多評論 (每次顯示3條)
  const showMore = () => {
    setItemsPerPage(itemsPerPage + 3)
  }

  return (
    <div className="mt-4">
      <h5>評價</h5>
      <div className="d-flex align-items-center">
        <span className="k-warn-text">★★★★★</span>
        <span className="ms-2">{reviews.length} 條評論</span>
      </div>
      <div className="mt-3" id="reviewContainer">
        {reviews.slice(0, itemsPerPage).map((review, index) => (
          <div key={index} className="border p-3 mb-3 d-flex">
            <img
              src={review.avatar || '/uploads/users.webp'}
              alt={review.name}
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
              <span className="k-warn-text">
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </span>
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
