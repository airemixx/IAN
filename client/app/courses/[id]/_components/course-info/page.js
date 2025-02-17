'use client'

import Link from 'next/link'
import styles from './course-info.module.scss'
import FavoriteButtonG from '../favorite-button-g/page'

export default function CourseInfo({ course }) {
  return (
    <section className={styles['course-info-container']}>
      <div className="container">
        {/* 麵包屑導航 */}
        <nav className={styles['breadcrumb']}>
          <ul className={styles['breadcrumb']}>
            <li className={styles['breadcrumb-item']}>
              <Link href="/">首頁</Link>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li className={styles['breadcrumb-item']}>
              <Link href="/courses">影像學院</Link>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li className={styles['breadcrumb-item']}>
              <Link href={`/courses?category=${course.category}`}>
                {course.category}
              </Link>
            </li>
            <li>
              <img src="/images/icon/breadcrumb-arrow.svg" alt="" />
            </li>
            <li
              className={`${styles['breadcrumb-item']} ${styles['breadcrumb-item-active']}`}
            >
              {course.title}
            </li>
          </ul>
        </nav>

        {/* 課程資訊 */}
        <div className={`row ${styles['course-info']}`}>
          <div className={`col-md-6 ${styles['course-img']}`}>
            <img src={course.image_url} alt="" />
          </div>
          <div className={`col-md-6 ${styles['course-detail']}`}>
            <h1> {course.title}</h1>
            <a href="">
              <div className={styles['course-info-teacher']}>
                <div className={styles['teacher-img']}>
                  <img src={course.teacher_image} alt="" />
                </div>
                <h3>{course.teacher_name}</h3>
              </div>
            </a>
            <p>{course.description}</p>
            <div className={styles['line']}></div>
            <div className={styles['original-price']}>
              {course.original_price.toLocaleString('en-US')}
            </div>
            <div className={styles['shopping-btns']}>
              <div className={styles['price']}>
                <div className={styles['discount-price']}>
                  {course.sale_price.toLocaleString('en-US')}
                </div>
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
