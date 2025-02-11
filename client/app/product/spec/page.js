'use client'

import React, { useState, useEffect } from 'react'
import ComponentsCompareItem from './_components/spec-item'
import ComponentsCompareTable from './_components/spec-table'

export default function ComparePage(props) {
  return (
    <>
      <ComponentsCompareItem />
      <ComponentsCompareTable />
    </>
  )
}
