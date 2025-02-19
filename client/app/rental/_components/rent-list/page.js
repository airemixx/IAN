'use client'
import { useState, useEffect } from 'react'
import RentPagination from '../rent-pagination/page'
import RentTotal from '../rent-total/page'
import RentOrder from '../rent-order/page'
import RentFilter from '../rent-filter/page'
import RentHashtag from '../rent-hashtag/page'
import RentSearch from '../rent-search/page'
import RentCard from '../rent-card/page'

export default function RentList() {
  // 📌 **狀態管理**
  const [rentals, setRentals] = useState([]) // 原始所有租借商品
  const [filteredRentals, setFilteredRentals] = useState([]) // 過濾後的商品
  const [hashtags, setHashtags] = useState([]) // 取得標籤
  const [searchQuery, setSearchQuery] = useState('') // 搜尋關鍵字
  const [currentPage, setCurrentPage] = useState(1) // 目前頁數
  const [itemsPerPage, setItemsPerPage] = useState(12) // 每頁顯示數量
  const [totalPages, setTotalPages] = useState(1) // 總頁數
  const [sorting, setSorting] = useState('') // 排序方式（asc: 價格由低到高, desc: 由高到低）

  // 📌 **初始化時載入資料**
  useEffect(() => {
    fetchData()
  }, [])

  // 📌 **當 `filteredRentals` 或 `itemsPerPage` 變更時，重新計算 `totalPages`**
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(filteredRentals.length / itemsPerPage)))
  }, [filteredRentals, itemsPerPage])

  // 📌 **RWD 視窗大小變更時，調整 `itemsPerPage`**
  useEffect(() => {
    const updateItemsPerPage = () => {
      let newItemsPerPage
      if (window.innerWidth < 768) {
        newItemsPerPage = 6
      } else if (window.innerWidth < 992) {
        newItemsPerPage = 8
      } else {
        newItemsPerPage = 12
      }
      setItemsPerPage(newItemsPerPage)
    }

    updateItemsPerPage() // ✅ 初始化時立即執行
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  // 📌 **從 API 獲取租借商品和標籤**
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/rental`) // ✅ 確保 API 正確
      const data = await res.json()
      if (data.success) {
        setRentals(data.rentals) // 設定所有商品
        setFilteredRentals(data.rentals) // 預設顯示所有商品
        setHashtags(data.tags || []) // 確保標籤至少為空陣列
        setTotalPages(
          Math.max(1, Math.ceil(data.rentals.length / itemsPerPage))
        ) // 設定總頁數
      }
    } catch (error) {
      console.error('❌ 無法載入資料:', error)
    }
  }

  // 📌 **監聽 `searchQuery` 變化時執行搜尋**
  useEffect(() => {
    handleSearch()
  }, [searchQuery])

  // 📌 **搜尋功能（根據 `name`、`summary` 和 `hashtags` 過濾）**
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRentals(rentals) // ✅ 如果沒有輸入搜尋內容，顯示全部商品
      return
    }

    const filtered = rentals.filter(
      (rental) =>
        rental.name.includes(searchQuery) || // 🔍 比對商品名稱
        rental.summary.includes(searchQuery) || // 🔍 比對商品摘要
        (rental.hashtags &&
          rental.hashtags.some((tag) => tag.includes(searchQuery))) // 🔍 比對標籤
    )
    setFilteredRentals(filtered)
  }

  // 📌 **點擊 Hashtag 時，將 Hashtag 設定為搜尋關鍵字**
  const handleHashtagClick = (tag) => {
    setSearchQuery(tag) // ✅ 點擊標籤時，觸發搜尋
  }

  // 📌 **商品排序功能**
  const sortedRentals = [...filteredRentals].sort((a, b) => {
    if (sorting === 'asc') return a.fee - b.fee // 由低到高
    if (sorting === 'desc') return b.fee - a.fee // 由高到低
    return 0
  })

  // 📌 **計算當前頁面的商品範圍**
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const visibleItems = sortedRentals.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="row">
      {/* 📌 側邊篩選功能 */}
      <aside className="col-0 col-md-4 col-lg-3 p-3">
        <hr className="d-none d-md-block" />
        <RentSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <RentHashtag hashtags={hashtags} onHashtagClick={handleHashtagClick} />
        <RentFilter />
      </aside>

      {/* 📌 主要內容區域 */}
      <main className="col-12 col-md-8 col-lg-9">
        {/* 📌 總數 & 排序 */}
        <div className="d-flex justify-content-between align-items-center">
          <RentTotal
            totalItems={filteredRentals.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
          />

          <RentOrder setSorting={setSorting} />
        </div>

        {/* 📌 商品清單 */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 mt-1">
          {visibleItems.map((rental) => (
            <RentCard key={rental.id} rental={rental} />
          ))}
        </div>

        {/* 📌 分頁功能 */}
        <RentPagination
          totalItems={filteredRentals.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  )
}
