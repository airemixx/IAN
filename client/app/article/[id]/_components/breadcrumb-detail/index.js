'use client';  

import React from 'react';  
import style from './index.module.scss';  

export default function BreadcrumbDetail() {  
  return (
    <div className={`text-sm text-gray-500 ${style['y-breadcrumb']}`}>  
      <a href="#" className="text-decoration-none hover:text-gray-700">  
        首頁  
      </a>  
      <span className="mx-2">&gt;</span>  
      <a href="#" className="text-decoration-none hover:text-gray-700">  
        最新消息  
      </a>
      <span className="mx-2">&gt;</span>
      <a href="#" className="text-decoration-none hover:text-gray-700">
        產品情報
      </a>
      <span className="mx-2">&gt;</span>
      <p className="text-gray-500 inline">Sony α1 II 當代全能旗艦相機重磅登場</p>
    </div>
  );
}