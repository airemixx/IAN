'use client'

import React, { useState, useEffect } from 'react'

export default function ComponentsCompareTable(props) {
  return (
    <>
     <table className="comparison-table container">
  <thead>
    <tr>
      <th>比較項目</th>
      <th>Leica Q3 43</th>
      <th>EOS R5 Mark II</th>
      <th>-</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>相機格式</th>
      <td>6239 萬像素，半導體數位相機</td>
      <td>5030 萬像素，可換鏡頭數位相機</td>
      <td>-</td>
    </tr>
    <tr>
      <th>推出日期</th>
      <td>約 2024 年 9 月</td>
      <td>約 2024 年 7 月</td>
      <td>-</td>
    </tr>
    <tr>
      <th>防水等級</th>
      <td>IP52 防塵防水潑格</td>
      <td>防塵防水滴</td>
      <td>-</td>
    </tr>
    <tr>
      <th>感光元件像素</th>
      <td>6239 萬像素</td>
      <td>5030 萬像素</td>
      <td>-</td>
    </tr>
    <tr>
      <th>有效像素</th>
      <td>6030 萬像素</td>
      <td>4500 萬像素</td>
      <td>-</td>
    </tr>
    <tr>
      <th>感光元件大小</th>
      <td>6030 萬像素</td>
      <td>4500 萬像素</td>
      <td>-</td>
    </tr>
    <tr>
      <th>感光元件格式</th>
      <td>6030 萬像素</td>
      <td>4500 萬像素</td>
      <td>-</td>
    </tr>
    <tr>
      <th>最大解像度</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>解晰度選擇</th>
      <td>【DNG】9528 x 6328（6,030 萬像素）、7416 x 4928（3,650 萬像素）、5272 x 3498（1,840 萬像素）</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>壓縮模式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>影像格式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>無壓縮影像格式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>影像比例</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>影片解像度</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>影片格式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>音訊格式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>訊號轉換器</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>防手震功能</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>焦距變換比率</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>自動對焦情況</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>AF Assist Light</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>鏡頭接環</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>曝光模式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>場景模式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>快門速度</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>測光模式</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>曝光補償</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>自動曝光鎖</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>包圍曝光</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>ISO 感光值</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>白平衡設定</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>自拍</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>連拍</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>定時拍攝</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>螢幕</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>光學取景器</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>記憶卡</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>連接埠</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>影像輸出</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>電池種類</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>隨身電池及充電器</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>電池壽命</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>機身重量</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>重量(含電池)</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
    <tr>
      <th>體積</th>
      <td>數據 1</td>
      <td>數據 2</td>
      <td>數據 3</td>
    </tr>
  </tbody>
</table>

    </>
  )
}
