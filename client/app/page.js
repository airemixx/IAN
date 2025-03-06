"use client"

// 將相對路徑改為絕對路徑
import useAuthHook from '@/hooks/use-auth'
import SliderIndex from './_components/slider'
import ArticleCardIndex from './_components/article-card'
import ProductCardIndex from './_components/product-card'
import CoursesCardIndex2 from './_components/courses-card2'
import Chat from './_components/chat'
import CouponButton from './_components/getCoupon/page'

export default function Home() {
  // 從 AuthContext 獲取用戶資訊
  const { user } = useAuthHook();

  // 根據用戶登入狀態和等級決定顯示哪種聊天室
  const userLevel = user ? user.level : 0;

  return (
    <>
      <SliderIndex />
      <ArticleCardIndex />
      <ProductCardIndex />
      <CouponButton/>
      <CoursesCardIndex2 />
      <Chat userLevel={userLevel} />
      
    </>
  )
}