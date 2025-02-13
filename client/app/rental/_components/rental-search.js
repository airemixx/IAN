'use client'

import { useState } from 'react'

export default function RentalSearch({ onSearch }) {
  const [keyword, setKeyword] = useState('')

  const handleSearch = () => {
    onSearch(keyword)
  }

  return (
    <div style={{ marginTop: '120px' }}>
      <aside className="mt-5">
        <hr className="d-none d-md-block" />

        {/* 搜尋框 */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="搜尋關鍵字"
            aria-label="搜尋"
            onChange={(e) => setKeyword(e.target.value)} // ✅ 修正變數名稱
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            <i className="fa fa-search"></i>
          </button>
        </div>

        {/* 標籤區 */}
        <div className="mt-1 mb-2">
          <span className="badge tag-bg">防抖</span>
          <span className="badge tag-bg">4K</span>
          <span className="badge tag-bg">輕便</span>
          <span className="badge tag-bg">快速對焦</span>
          <span className="badge tag-bg">大光圈</span>
          <span
            className="badge tag-bg"
            onMouseOver={(e) => showTooltip(e)}
            onMouseOut={(e) => hideTooltip(e)}
          >
            ...
          </span>
        </div>
        <div
          id="tooltip"
          style={{
            display: 'none',
            position: 'absolute',
            background: '#333d',
            color: '#fff',
            padding: '5px',
            borderRadius: '5px',
          }}
        >
          連拍
          <br />
          小光圈
          <br />
        </div>

        {/* 手風琴選單（篩選條件） */}
        <div className="accordion" id="filterAccordion">
          {/* 簡易篩選 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#categoryOne"
                aria-expanded="true"
              >
                簡易篩選
              </button>
            </h2>
            <div id="categoryOne" className="accordion-collapse collapse show">
              <div className="accordion-body">
                <input type="checkbox" /> 人像攝影 <br />
                <input type="checkbox" /> 旅遊攝影 <br />
                <input type="checkbox" /> 街拍、Vlog <br />
                <input type="checkbox" /> 婚禮、商業攝影 <br />
                <input type="checkbox" /> 產品、美食攝影 <br />
                <input type="checkbox" /> 運動、生態攝影
              </div>
            </div>
          </div>

          {/* 設備類型 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#categoryTwo"
              >
                設備類型
              </button>
            </h2>
            <div id="categoryTwo" className="accordion-collapse collapse">
              <div className="accordion-body">
                <input type="checkbox" /> 相機 <br />
                <input type="checkbox" /> 鏡頭 <br />
                <input type="checkbox" /> 配件
              </div>
            </div>
          </div>

          {/* 進階篩選 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#categoryThree"
              >
                進階篩選
              </button>
            </h2>
            <div id="categoryThree" className="accordion-collapse collapse">
              <div className="accordion-body">
                <input type="checkbox" /> 全幅相機 <br />
                <input type="checkbox" /> 半幅相機 (APS-C) <br />
                <input type="checkbox" /> 定焦鏡頭 <br />
                <input type="checkbox" /> 變焦鏡頭 <br />
                <input type="checkbox" /> 廣角鏡頭 (10-35mm) <br />
                <input type="checkbox" /> 標準鏡頭 (35-70mm) <br />
                <input type="checkbox" /> 望遠鏡頭 (70mm ↑ )
              </div>
            </div>
          </div>

          {/* 相機品牌 */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#categoryFour"
              >
                相機品牌
              </button>
            </h2>
            <div id="categoryFour" className="accordion-collapse collapse">
              <div className="accordion-body">
                <input type="checkbox" /> Canon <br />
                <input type="checkbox" /> Leica <br />
                <input type="checkbox" /> Nikon <br />
                <input type="checkbox" /> Sony
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
