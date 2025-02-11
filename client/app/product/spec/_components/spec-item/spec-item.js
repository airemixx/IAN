'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsCompareItem(props) {
  return (
    <>
     <div>
  <h1 className="compare-title">比較相機機型</h1>
  <div className="product-container">
    {/* 商品 1 */}
    <div className="product-box">
      <img src="/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png" alt="商品 1" />
      <h5>EOS R5 Mark II</h5>
      <p>NT$240,000</p>
      <button className="btn btn-primary btn-sm buy">購買</button>
      <button className="btn btn-link btn-sm remove">移除</button>
    </div>
    {/* 商品 2 */}
    <div className="product-box">
      <img src="/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png" alt="商品 2" />
      <h5>EOS R5 Mark II</h5>
      <p>NT$122,000</p>
      <button className="btn btn-primary btn-sm buy">購買</button>
      <button className="btn btn-link btn-sm remove">移除</button>
    </div>
    {/* 商品 3 */}
    <div className="product-box">
      <img src="/images/product/8a2741e6db5f49f5b7ae91e34c3ad045_eos-5d-mk-iv-body-b21.png" alt="商品 2" />
      <h5>EOS R5 Mark II</h5>
      <p>NT$122,000</p>
      <button className="btn btn-primary btn-sm buy">購買</button>
      <button className="btn btn-link btn-sm remove">移除</button>
    </div>
    {/* 添加商品 */}
    {/* <div class="product-box empty-box">
    + 添加商品
  </div> */}
  </div>
</div>

    </>
  )
}
