'use client'

import React, { useState, useEffect } from 'react'
import CoursesBanner from './courses-banner/page'
import CoursesCategory from './courses-category/page'
import CoursesBreadcumb from './courses-breadcumb/page'
import CoursesFilter from './courses-filter/page'
import CourseList from './courses-list/page'
import Pagination from './pagination/page'
import PopularTeacher from './popular-teacher/page'

export default function CoursesPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  return (
    <>
    <CoursesBanner/>
    <CoursesCategory/>
    <CoursesBreadcumb/>
    <CoursesFilter/>
    <CourseList/>
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    <PopularTeacher/>
   </>
  )
}

