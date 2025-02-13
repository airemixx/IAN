// rent-filter

export default function RentFilter() {
  return (
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
  )
}
