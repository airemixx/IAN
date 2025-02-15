'use client'

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './AddArticleModal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

export default function BackSelectTitle({ confirmClose }) {
  return (
    <div>
      {/* 返回按鈕 */}
      <button
        type="button"
        onClick={confirmClose}
        className={`mb-3 ${styles['y-btn-back']} allowed-close`}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {/* 文章分類 */}
      <div
        className={`my-4 ${styles['y-category-add-btn']} d-flex align-items-center`}
      >
        <p className="mb-0">
          文章分類 <span className={`mx-1 ${styles['red-sign']}`}>*</span>：
        </p>
        <select name="文章分類" className="form-select me-4">
          <option value="0">選擇分類</option>
          <option value="1">分類1</option>
          <option value="2">分類2</option>
          <option value="3">分類3</option>
        </select>
      </div>

      {/* 標題與副標題輸入 */}
      <input
        type="text"
        className={`my-4 form-control ${styles['form-control']}`}
        placeholder="標題 (必填)"
      />
      <input
        type="text"
        className={`my-4 form-control ${styles['form-control']}`}
        placeholder="副標題"
      />
    </div>
  )
}
