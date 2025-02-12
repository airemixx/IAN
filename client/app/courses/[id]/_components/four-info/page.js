'use client'

import styles from './four-info.module.scss'
import StarRating from '../../../_components/star-rating/page'

export default function FourInfo() {
  return (
    <>
      <div className={styles['four-course-info-container']}>
        <div className="container">
          <div className={styles['four-course-info-wrapper']}>
            <div className={styles['four-course-info']}>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>課程內容</div>
                <div className={styles['content-text']}>8 章 22 單元</div>
              </div>
              <div className={styles['line']}></div>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>課程時長</div>
                <div className={styles['content-text']}>2 時 19 分鐘</div>
              </div>
              <div className={styles['line']}></div>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>學員人數</div>
                <div className={styles['content-text']}>484 位同學</div>
              </div>
              <div className={styles['line']}></div>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>1566 則評價</div>
                <div className={styles['rating']}>
                  <p>4.8</p>
                  <StarRating rating="4.8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
