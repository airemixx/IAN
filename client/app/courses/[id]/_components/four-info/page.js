'use client'

import styles from './four-info.module.scss'
import StarRating from '../../../_components/star-rating/page'

export default function FourInfo({ course }) {
  return (
    <>
      <div className={styles['four-course-info-container']}>
        <div className="container">
          <div className={styles['four-course-info-wrapper']}>
            <div className={styles['four-course-info']}>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>課程內容</div>
                <div className={styles['content-text']}>{course.chapter}</div>
              </div>
              <div className={styles['line']}></div>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>課程時長</div>
                <div className={styles['content-text']}>
                  {Math.floor(course.duration / 60)} 時 {course.duration % 60}{' '}
                  分鐘
                </div>
              </div>
              <div className={styles['line']}></div>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>學員人數</div>
                <div className={styles['content-text']}>
                  {course.student_count.toLocaleString('en-US')}
                </div>
              </div>
              <div className={styles['line']}></div>
              <div className={styles['info-content']}>
                <div className={styles['title-text']}>
                  {course.comment_count.toLocaleString('en-US')} 則評價
                </div>
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
