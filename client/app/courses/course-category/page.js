'use client'

import styles from './course-category.module.scss';
import React from 'react';

export default function CourseCategoryPage() {
  return (
    <>
 <section className={`${styles["category-nav"]} ${styles["nav-fixed-2"]}`} data-type="nav-fixed-2">
  <ul>
    <li className={styles["category-list"]}>
      <a href="#"><div className="circle-active" />
        <p className="m-0">所有課程</p></a>
    </li>
    <li className={styles["category-list"]}>
      <a href="#"><div className="circle-active" />
        <p className="m-0">影像創作</p></a>
    </li>
    <li className={styles["category-list"]}>
      <a href="#"><div className="circle-active" />
        <p className="m-0">商業攝影</p></a>
    </li>
    <li className={styles["category-list"]}>
      <a href="#"><div className="circle-active" />
        <p className="m-0">後製剪輯</p></a>
    </li>
    <li className={styles["category-list"]}>
      <a href="#"><div className="circle-active" />
        <p className="m-0">攝影理論</p></a>
    </li>
  </ul>
  <div className="gradient" />
</section>

    </>
  )
}
