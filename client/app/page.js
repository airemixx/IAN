"use client"

import useAuthHook from '@/hooks/use-auth'
import SliderIndex from './_components/slider'
import ArticleCardIndex from './_components/article-card'
import ProductCardIndex from './_components/product-card'
import CoursesCardIndex2 from './_components/courses-card2'
import Chat from './_components/chat'
import CouponButton from './_components/getCoupon/page'

// 模擬用戶數據，實際應用中應從認證系統獲取
const mockUser = {
  id: 'user-' + Math.floor(Math.random() * 1000),
  name: '訪客用戶',
  token: 'mock-token-' + Date.now()
};

export default function Home() {
  return (
    <main>
      <SliderIndex />
      <ArticleCardIndex />
      <ProductCardIndex />
      <CouponButton/>
      <CoursesCardIndex2 />
      <Chat />
    </main>
  )
}