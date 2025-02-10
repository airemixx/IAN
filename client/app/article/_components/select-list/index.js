'use client'

import React, { useEffect } from 'react'
import style from './index.module.scss'

const categories = [
  {value: "", label: "全部類別"},
  {value: "option1", label: "選項 1"},
  {value: "option2", label: "選項 2"},
  {value: "option3", label: "選項 3"},
]

const years = [
  { value: '', label: '年份' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
]

const months = [
  { value: '', label: '月份' },
  { value: '01', label: '01' },
  { value: '02', label: '02' },
  { value: '03', label: '03' },
  { value: '04', label: '04' },
  { value: '05', label: '05' },
  { value: '06', label: '06' },
  { value: '07', label: '07' },
  { value: '08', label: '08' },
  { value: '09', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
]

export default function SelectList() {
  useEffect(() => {
    const filterCollapse = document.querySelector("#filter-collapse")
    const toggleButtonIcon = document.querySelector('[data-bs-target="#filter-collapse"] i')
    const clearOptionsBtn = document.querySelector("#y-clear-options-btn")

    if (filterCollapse && toggleButtonIcon) {
      filterCollapse.addEventListener("show.bs.collapse", () => {
        toggleButtonIcon.classList.replace("fa-angle-down", "fa-angle-up")
      })
      filterCollapse.addEventListener("hide.bs.collapse", () => {
        toggleButtonIcon.classList.replace("fa-angle-up", "fa-angle-down")
      })
    }
    
    if (clearOptionsBtn) {
      clearOptionsBtn.addEventListener("click", () => {
        document.querySelectorAll("select").forEach((select) => {
          select.selectedIndex = 0
        })
      })
    }
  }, [])

  const renderSelect = (id, options, title) => {
    return (
      <select id={id} className="form-select select04 me-sm-2" title={title}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
  
  return (
    <>
        <div className="my-sm-5 y-list-title d-flex justify-content-between align-items-center">  
        <h2 className="mb-0">文章列表</h2>
        <button
          className="mb-0 btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filter-collapse"
          aria-expanded="false"
          aria-controls="filter-collapse"
        >
          篩選條件<i className="fa-solid fa-angle-down ms-1"></i>
        </button>
      </div>

      {/* 下拉選單區塊 */}
      <div className="mb-4 collapse" id="filter-collapse">
        <div className={`d-flex justify-content-between ${style['y-selection']}`}>
          <div className={`d-flex justify-content-start ${style['y-collapse-area']}`}>  
            {renderSelect('select-category', categories, 'Select Category')}
            {renderSelect('select-year', years, 'Select Year')}
            {renderSelect('select-month', months, 'Select Month')}
          </div>
          <div className={style['y-clear-option']}>
            <button id="y-clear-options-btn" className="btn btn-link">
              清除選項
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
