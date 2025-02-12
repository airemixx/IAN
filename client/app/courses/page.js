'use client'

import React, { useState, useEffect } from 'react'
import CoursesBanner from './_components/courses-banner/page'
import CoursesCategory from './_components/courses-category/page'
import CoursesBreadcumb from './_components/courses-breadcumb/page'
import CoursesFilter from './_components/courses-filter/page'
import CourseCard from './_components/courses-card/page'
import Pagination from './_components/pagination/page'
import PopularTeacher from './_components/popular-teacher/page'

export default function CoursesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 5
  return (
    <>
      <CoursesBanner />
      <CoursesCategory />
      <CoursesBreadcumb />
      <CoursesFilter />
      <CourseCard />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <PopularTeacher />
    </>
  )
}
