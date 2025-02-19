// rent-recommend

'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RentCard from '../rent-card/page'

// 動態載入 RentPagination，避免影響 SSR
const RentPagination = dynamic(() => import('../rent-pagination/page'), {
  ssr: false,
})

export default function RentRecommend({ recommendations = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1) // 小螢幕
      } else if (window.innerWidth < 992) {
        setItemsPerPage(2) // 中螢幕
      } else {
        setItemsPerPage(3) // 大螢幕
      }
    }

    updateItemsPerPage() // 初始化設定
    window.addEventListener('resize', updateItemsPerPage)

    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  // 確保 recommendations 存在
  if (!recommendations || recommendations.length === 0) {
    return <p className="text-center mt-3">❌ 沒有推薦商品</p>
  }

  // 計算目前頁面的推薦商品
  const visibleItems = recommendations.slice(
    currentIndex,
    currentIndex + itemsPerPage
  )

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3>推薦商品</h3>
        <RentPagination
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          totalItems={recommendations.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-1">
        {visibleItems.map((rental, index) => (
          <RentCard key={index} rental={rental} />
        ))}
      </div>
    </div>
  )
}
