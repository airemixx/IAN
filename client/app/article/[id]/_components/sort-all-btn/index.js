'use client'

import React from 'react'
import styles from './index.module.scss'

export default function SortAllBtn() {
  return (
    <>
      <div className={styles['y-all-comment-btn']}>  
        <button>- 全部留言 -</button>  
      </div>  

      <div className={styles['y-sort-dropdown']}>  
        <select id="sort-comments" name="sort-comments" className="form-select">  
          <option value="1">由新到舊</option>  
          <option value="2">由舊到新</option>  
          <option value="3">熱門留言</option>  
        </select>  
      </div>  
    </>
  )
}
