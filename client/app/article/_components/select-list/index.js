'use client'

import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import styles from './index.module.scss'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SelectList({ onFilterChange }) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [categories, setCategories] = useState([
    { value: '', label: '全部類別' },
  ])
  const [years, setYears] = useState([{ value: '', label: '年份' }])
  const [months, setMonths] = useState([
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
  ])
  const [openSelect, setOpenSelect] = useState({})
  const router = useRouter()

  // 動態載入 Bootstrap JS（僅在 client-side）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
    }
  }, [])

  // 定義 handleFilterChange 函式
  const handleFilterChange = () => {
    const scrollPosition = window.scrollY

    const selectedCategory = document.getElementById('select-category').value
    const selectedYear = document.getElementById('select-year').value
    const selectedMonth = document.getElementById('select-month').value

    // 觸發父層傳入的 onFilterChange 進行篩選
    if (onFilterChange) {
      onFilterChange({
        category: selectedCategory,
        year: selectedYear,
        month: selectedMonth,
      })
    }

    // 使用 setTimeout 確保更新完成後再還原滾動位置
    setTimeout(() => {
      window.scrollTo(0, scrollPosition)
    }, 100)
  }

  const renderSelect = (id, options, title) => (
    <select
      id={id}
      className="form-select select04 me-sm-2"
      title={title}
      onChange={handleFilterChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )

  // 載入分類與年份等資料
  useEffect(() => {
    const controller = new AbortController()

    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/articles/categories',
          {
            signal: controller.signal,
          }
        )
        const categoryOptions = response.data.data.map((category) => ({
          value: category.id,
          label: category.name,
        }))
        setCategories((prev) => [...prev, ...categoryOptions])
      } catch (err) {
        if (err.name === 'CanceledError' || err.message === 'Request aborted') {
          console.log('分類請求已被中斷')
        } else {
          console.error('取得分類失敗', err)
        }
      }
    }

    const fetchYears = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/articles/years',
          {
            signal: controller.signal,
          }
        )
        const yearOptions = response.data.data.map((year) => ({
          value: year.year,
          label: year.year,
        }))
        setYears((prev) => [...prev, ...yearOptions])
      } catch (err) {
        if (err.name === 'CanceledError' || err.message === 'Request aborted') {
          console.log('年份請求已被中斷')
        } else {
          console.error('取得年份失敗', err)
        }
      }
    }

    fetchCategories()
    fetchYears()

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const collapseEl = document.getElementById('filter-collapse')
    if (collapseEl) {
      // 當展開動畫結束時，設定 isCollapsed 為 false
      collapseEl.addEventListener('shown.bs.collapse', () => {
        setIsCollapsed(false)
      })
      // 當摺疊動畫結束時，設定 isCollapsed 為 true
      collapseEl.addEventListener('hidden.bs.collapse', () => {
        setIsCollapsed(true)
      })
    }
    return () => {
      if (collapseEl) {
        collapseEl.removeEventListener('shown.bs.collapse', () =>
          setIsCollapsed(false)
        )
        collapseEl.removeEventListener('hidden.bs.collapse', () =>
          setIsCollapsed(true)
        )
      }
    }
  }, [])

  return (
    <>
      <div className={`${styles['y-title-line']} mt-5`}></div>
      <div
        className={`my-sm-3 ${styles['y-list-title']} d-flex justify-content-between align-items-center`}
      >
        <h2 className="mb-0">所有文章</h2>

        <button
          className="mb-0 btn rounded-pill btn-select-use"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#filter-collapse"
          aria-expanded={!isCollapsed}
          aria-controls="filter-collapse"
        >
          篩選條件
          <div style={{ fontSize: '20px', display: 'inline-block' }}>
            <FontAwesomeIcon
              icon={isCollapsed ? faAngleDown : faAngleUp}
              style={{ fontSize: 'inherit', color: 'black' }}
              className="ms-1"
            />
          </div>
        </button>
        {typeof resultCount !== 'undefined' && (
          <p className="text-black mt-2">搜尋到 {resultCount} 筆資料</p>
        )}
      </div>

      <div className="mb-3 collapse" id="filter-collapse">
        <div className="d-flex justify-content-between y-selection">
          <div
            className={`d-flex justify-content-start ${styles['y-collapse-area']}`}
          >
            {renderSelect('select-category', categories, 'Select Category')}
            {renderSelect('select-year', years, 'Select Year')}
            {renderSelect('select-month', months, 'Select Month')}
          </div>
          <div className={styles['y-clear-option']}>
            <button
              id="y-clear-options-btn"
              className="btn btn-link"
              onClick={() => {
                const scrollPosition = window.scrollY // 記住滾動位置

                document.querySelectorAll('select').forEach((select) => {
                  select.selectedIndex = 0
                }) // 清除選項

                // 先清除選項，再觸發篩選和滾動
                Promise.resolve()
                  .then(() => handleFilterChange()) // 觸發篩選
                  .then(() => router.push('/article')) // 使用 router.push 導航
                  .then(() => {
                    // 確保 router.push 完成後再滾動
                    setTimeout(() => {
                      window.scrollTo(0, scrollPosition) // 恢復滾動位置
                    }, 100)
                  })
              }}
            >
              清除選項
            </button>
          </div>
        </div>
      </div>
      <div className={`${styles['y-title-line']} mt-3`}></div>
    </>
  )
}
