'use client'

import React, { useState, useEffect } from 'react'
import CoursesBanner from './courses-banner/page'
import CoursesCategory from './courses-category/page'
import CoursesBreadcumb from './courses-breadcumb/page'
import CoursesFilter from './courses-filter/page'

export default function CoursesPage() {
  return (
    <>
    <CoursesBanner/>
    <CoursesCategory/>
    <CoursesBreadcumb/>
    <CoursesFilter/>
   </>
  )
}
