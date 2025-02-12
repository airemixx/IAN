'use client'

import styles from './course-info.module.scss'
import FavoriteButtonG from '../favorite-button-g/page'

export default function CourseInfo() {
  return (
    <section className={styles['course-info-container']}>
      <div className="container">
        {/* breadcrumb */}
        <nav className={styles['breadcrumb']}>
          <ul className={styles['breadcrumb']}>
            <li className={styles['breadcrumb-item']}>
              <a href="">首頁</a>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li className={styles['breadcrumb-item']}>
              <a href="">影像學院</a>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li
              className={`${styles['breadcrumb-item']} ${styles['breadcrumb-item-active']}`}
            >
              <a href="">商業攝影</a>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li
              className={`${styles['breadcrumb-item']} ${styles['breadcrumb-item-active']}`}
            >
              美食攝影逐光旅行，餐桌上的四季光影
            </li>
          </ul>
        </nav>
        {/* 課程資訊 */}
        <div className={`row ${styles['course-info']}`}>
          <div className={`col-md-6 ${styles['course-img']}`}>
            <img src="/images/course-cover/course_13_1.avif" alt="" />
          </div>
          <div className={`col-md-6 ${styles['course-detail']}`}>
            <h1>美食攝影逐光旅行，餐桌上的四季光影</h1>
            <a href="">
              <div className={styles['course-info-teacher']}>
                <div className={styles['teacher-img']}>
                  <img src="/images/teacher/teacher_4.avif" alt="" />
                </div>
                <h3>Ada Lin</h3>
              </div>
            </a>
            <p>
              這門課程將教你如何使用自然光，與簡單的人造補光，拍攝出各種風格的餐桌饗宴。
              利用實作範例分享，了解各種風格可以利用什麼樣的配件與道具、色彩的搭配，
              從無到有的拍攝出吸睛的美食攝影照。
            </p>
            <div className={styles['line']}></div>
            <div className={styles['original-price']}>$2,500</div>
            <div className={styles['shopping-btns']}>
              <div className={styles['price']}>
                <div className={styles['discount-price']}>$1,890</div>
              </div>
              <div className={styles['shopping-btn']}>
                <button className={styles['buy-btn']}>+ 立即購買</button>
                <button className={`${styles['cart-btn']} hvr-icon-pulse`}>
                  <img
                    src="/images/icon/cart-btn.svg"
                    alt=""
                    className="hvr-icon"
                  />
                  <p>加入購物車</p>
                </button>
                <FavoriteButtonG />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
