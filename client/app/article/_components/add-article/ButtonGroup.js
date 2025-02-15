'use client'

import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './AddArticleModal.module.scss'

export default function ButtonGroup({ confirmClose }) {
  return (
    <div className="my-4 d-flex justify-content-end">
      <button
        type="button"
        className={`mx-3 btn y-btn-add ${styles['y-btn-add']}`}
        disabled
      >
        新增
      </button>
      <button
        type="button"
        onClick={confirmClose}
        className={`btn btn-danger ${styles['y-btn-cancel']} allowed-close`}
      >
        取消
      </button>
    </div>
  )
}
