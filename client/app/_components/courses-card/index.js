'use client'

import React from 'react'
import styles from './CoursesCard.module.scss'

export default function CoursesCardIndex() {
  const courses = [
    {
      img: "images/HomePage-images/course-2.jpg",
      title: "相機外閃的神奇攝影術",
      instructor: "張馬克",
      rating: "5.0",
      reviews: "(12)",
      duration: "3:00",
      price: "NT$1,790",
    },
    {
      img: "images/HomePage-images/course-2.jpg",
      title: "相機外閃的神奇攝影術",
      instructor: "張馬克",
      rating: "5.0",
      reviews: "(12)",
      duration: "3:00",
      price: "NT$1,790",
    },
    {
      img: "images/HomePage-images/course-2.jpg",
      title: "相機外閃的神奇攝影術",
      instructor: "張馬克",
      rating: "5.0",
      reviews: "(12)",
      duration: "3:00",
      price: "NT$1,790",
    },
  ]

  return (
    <div className={styles.courseArea}>
      <div className="px-5 py-5">
        <h2 className={`${styles.courseTitle} text-left mb-4 ps-4`}>課程推薦</h2>
        <div className="row d-flex align-items-stretch">
          {courses.map((course, index) => (
            <div className="col-md-4 d-flex" key={index}>
              <div className={styles.courseCard}>
                <img src={course.img} className={`card-img-top ${styles.courseImg}`} alt={course.title} />
                <div className={`mt-3 ${styles.courseCardBody}`}>
                  <h5 className={styles.courseCardTitle}>{course.title}</h5>
                  <p className={styles.courseCardText}>{course.instructor}</p>
                  <p className={`${styles.courseRating} d-flex align-items-center`}>
                    <img src="images/HomePage-images/Star_fill.svg" alt="Star" />
                    <span className="ps-1">{course.rating}</span>
                    <span className="ps-1 text-white">{course.reviews}</span>
                    <span className="ps-1">
                      <img src="images/HomePage-images/time.svg" alt="Time" />
                    </span>
                    <span className="text-white ps-1">{course.duration}</span>
                  </p>
                  <p className={styles.courseCardText}>{course.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
