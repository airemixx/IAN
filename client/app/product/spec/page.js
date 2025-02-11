'use client'

import React, { useState, useEffect } from 'react'
import ComponentsCompareItem from './_components/CompareItem'
import ComponentsCompareTable from './_components/CompareTable'
import "./compare.css";

export default function ComparePage(props) {
  return (
    <>
      <ComponentsCompareItem />
      <ComponentsCompareTable />
    </>
  )
}
