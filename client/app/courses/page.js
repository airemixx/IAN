'use client'

import React, { useState, useEffect } from 'react'
import BannerPage from './course-banner/page'
import CourseCategoryPage from './course-category/page'

export default function CoursesPage() {
  return (
    <>
    <BannerPage/>
    <CourseCategoryPage/>
    </>
  )
}
