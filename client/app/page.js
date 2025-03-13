"use client"

import { useEffect, useRef } from 'react'
import useAuthHook from '@/hooks/use-auth'
import SliderIndex from './_components/slider'
import ArticleCardIndex from './_components/article-card'
import ProductCardIndex from './_components/product-card'
import CoursesCardIndex2 from './_components/courses-card2'
import Chat from './_components/chat'
import CouponButton from './_components/getCoupon/page'

// 文章區和產品區的背景顏色
const ARTICLE_COLOR = [255, 255, 255] // 藍色 (RGB)
const PRODUCT_COLOR = [20, 49, 70]   // 深藍色 (RGB)

// 顏色插值函數 - 用於平滑過渡
function interpolateColor(color1, color2, factor) {
  // 使用三次曲線使過渡更自然
  const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const smoothFactor = easeInOutCubic(factor);

  const result = color1.map((channel, i) => {
    return Math.round(channel + smoothFactor * (color2[i] - channel));
  });
  return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
}

// 節流函數 - 對於快速滾動更合適
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

export default function Home() {
  const articleRef = useRef(null);
  const productRef = useRef(null);
  const bgOverlayRef = useRef(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    // 創建背景覆蓋層
    const overlay = document.createElement('div');
    overlay.id = 'background-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: rgb(${ARTICLE_COLOR.join(',')});
      transition: background-color 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      pointer-events: none;
    `;
    document.body.appendChild(overlay);
    bgOverlayRef.current = overlay;

    // 滾動監聽處理函數 - 只處理文章區到產品區的過渡
    const handleScroll = () => {
      // 確保兩個區域都已經載入
      if (!articleRef.current || !productRef.current) return;

      const scrollY = window.scrollY;
      const viewHeight = window.innerHeight;

      // 獲取文章區和產品區的位置信息
      const articleRect = articleRef.current.getBoundingClientRect();
      const productRect = productRef.current.getBoundingClientRect();

      // 計算文章區和產品區的中心位置
      const articleCenter = articleRect.top + scrollY + articleRect.height / 2;
      const productCenter = productRect.top + scrollY + productRect.height / 2;

      // 更早開始過渡：視窗底部接近文章區中心時就開始
      // 更晚結束過渡：視窗頂部離開產品區中心時才結束
      const transitionStart = articleCenter - viewHeight * 0.8; // 視窗到達文章區上方就開始過渡
      const transitionEnd = productCenter - viewHeight * 0.2; // 視窗到達產品區中間才完成過渡
      const transitionLength = transitionEnd - transitionStart;

      // 檢測滾動方向 - 對於快速滾動優化過渡
      const isScrollingDown = scrollY > lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      // 根據滾動方向調整過渡速度
      const transitionDuration = isScrollingDown ? '1.0s' : '0.8s';
      bgOverlayRef.current.style.transition = `background-color ${transitionDuration} cubic-bezier(0.34, 1.56, 0.64, 1)`;

      // 計算過渡進度 (0-1)
      if (scrollY >= transitionStart && scrollY <= transitionEnd && transitionLength > 0) {
        const progress = (scrollY - transitionStart) / transitionLength;
        const color = interpolateColor(ARTICLE_COLOR, PRODUCT_COLOR, progress);
        bgOverlayRef.current.style.backgroundColor = color;
      }
      // 如果在文章區之前，使用文章區顏色
      else if (scrollY < transitionStart) {
        bgOverlayRef.current.style.backgroundColor = `rgb(${ARTICLE_COLOR.join(',')})`;
      }
      // 如果在產品區之後，使用產品區顏色
      else if (scrollY > transitionEnd) {
        bgOverlayRef.current.style.backgroundColor = `rgb(${PRODUCT_COLOR.join(',')})`;
      }
    };

    // 使用節流處理滾動事件，而非防抖 - 更適合快速滾動
    const throttledScroll = throttle(handleScroll, 16); // 約 60fps
    window.addEventListener('scroll', throttledScroll);

    // 初始化時執行一次
    setTimeout(handleScroll, 300);

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (bgOverlayRef.current && document.body.contains(bgOverlayRef.current)) {
        document.body.removeChild(bgOverlayRef.current);
      }
    };
  }, []);

  return (
    <main>
      <SliderIndex />
      <div ref={articleRef} style={{ padding: '80px 0' }}>
        <ArticleCardIndex />
      </div>
      <div ref={productRef}>
        <ProductCardIndex />
      </div>
      <CouponButton />
      <CoursesCardIndex2 />
      <Chat />
    </main>
  )
}