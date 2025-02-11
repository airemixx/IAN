"use client";

import React, { useState, useEffect } from "react";
import styles from "./detail-page.module.scss";
import CourseInfo from "./course-info/page";
import FourInfo from "./four-info/page";
import DetailNav from "./detail-nav/page";
import CourseContent from "./course-content/page";
import TeacherInfo from "./teacher-info/page";
import CourseRating from "./course-rating/page";

export default function CourseDetailPage() {
  return (
    <>
      <CourseInfo />
      <FourInfo />
      <section className={styles["course-detail-container"]}>
        <div className="container">
          <DetailNav />
          <div className={styles["course-detail-title"]}>
            <div className={styles["title-block"]}></div>
            <h2>課程內容</h2>
            <div className={`${styles["line"]} d-block d-sm-none`}></div>
          </div>
          <div className="row">
            <div className="col-12 col-xl-8">
              <CourseContent />
              <TeacherInfo />
              <CourseRating />
            </div>
            <div className="col-md-4 d-none d-xl-block">
              {/* <CoursePriceFixed /> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
