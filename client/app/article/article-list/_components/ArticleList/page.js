"use client"

import { useState } from "react"
import ArticleCard from "./ArticleCard"

export default function ArticleList() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen)

  const clearFilters = () => {
    setCategory("")
    setYear("")
    setMonth("")
  }

  // Mock data for articles
  const articles = [
    {
      id: 1,
      category: "產品情報",
      title: "Sony α1 II 當代全能旗艦相機重磅登場",
      author: "編輯部",
      date: "2024-10-10",
      image: "/LENSTUDIO/images/HomePage-images/social.jpg",
    },
    // ... more articles
  ]

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>文章列表</h2>
        <button onClick={toggleFilter} className="btn btn-outline-secondary">
          篩選條件
          <i className={`fas fa-angle-${isFilterOpen ? "up" : "down"} ms-1`}></i>
        </button>
      </div>

      {isFilterOpen && (
        <div className="mb-3">
          <div className="row g-2 mb-2">
            <div className="col-md-4">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select">
                <option value="">全部類別</option>
                <option value="option1">選項 1</option>
                <option value="option2">選項 2</option>
                <option value="option3">選項 3</option>
              </select>
            </div>
            <div className="col-md-4">
              <select value={year} onChange={(e) => setYear(e.target.value)} className="form-select">
                <option value="">年份</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div className="col-md-4">
              <select value={month} onChange={(e) => setMonth(e.target.value)} className="form-select">
                <option value="">月份</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={clearFilters} className="btn btn-link">
            清除選項
          </button>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {articles.map((article) => (
          <div className="col" key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  )
}