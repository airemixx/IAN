// rent-detail

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import RentPicture from '../rent-picture/page'
import RentTabs from '../rent-tabs/page'
import RentHashtag from '../rent-hashtag/page'
import RentReviews from '../rent-reviews/page'
import RentRecommend from '../rent-recommend/page'

export default function RentDetail() {
  const { id } = useParams() // ✅ 取得商品 ID
  const [rental, setRental] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('前端接收到的 rental:', rental) // ✅ 確保 API 回傳的資料
  }, [rental])

  useEffect(() => {
    if (!id) return // 確保 ID 存在

    fetch(`http://localhost:8000/api/rental/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRental(data.data)
        } else {
          console.error('商品資料加載失敗:', data.error)
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error('無法載入商品資料:', error)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-center mt-5">🚀 資料載入中...</p>
  if (!rental)
    return <p className="text-center text-danger mt-5">❌ 找不到商品</p>

  return (
    <div className="container">
      <main>
        <div className="row">
          {/* Pictur Section */}
          <div className="col-lg-7">
            <RentPicture images={rental.images} /> {/* ✅ 確保圖片正確傳遞 */}
          </div>

          {/* Rental Details */}
          <div className="col-lg-5">
            <RentTabs rental={rental} /> {/* ✅ 傳遞完整的 rental 資料 */}
            <RentHashtag hashtags={rental.hashtags} />{' '}
            {/* ✅ 確保標籤正確傳遞 */}
            <RentReviews rentalId={rental.id} /> {/* ✅ 傳遞商品 ID */}
          </div>
        </div>
      </main>
      {/* Recommend */}
      <div className="col-lg-12 col-xl-10 mx-auto my-4">
        <RentRecommend rentalId={rental.id} /> {/* ✅ 傳遞商品 ID */}
      </div>
    </div>
  )
}
