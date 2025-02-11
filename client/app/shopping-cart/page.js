'use client'

import React, { useState, useEffect } from 'react'
import ShoppingCartEmptyPage from './_components/shopping-cart-empty/page'
import ShoppingCartOnePage from './_components/shopping-cart-step1/page'
import ShoppingCartTwoPage from './_components/shopping-cart-step2/page'
import ShoppingCartThreePage from './_components/shopping-cart-step3/page'

export default function ShoppingCartPage(props) {
  return (
    <>
      <div>ShoppingCart Page</div>
      <ShoppingCartEmptyPage></ShoppingCartEmptyPage>
      <ShoppingCartOnePage></ShoppingCartOnePage>
      <ShoppingCartTwoPage></ShoppingCartTwoPage>
      <ShoppingCartThreePage></ShoppingCartThreePage>
    </>
  )
}
