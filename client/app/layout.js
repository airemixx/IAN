'use client'

import { Noto_Sans_TC, Inter } from 'next/font/google'
import '@/styles/ck-custom.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Footer from './footer'
import Header from './header'
import TeacherFooter from './teacher/_component/teacher-footer/page'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppProvider from '@/hooks/app-provider'
import { CompareProvider } from '@/app/product/_context/CompareContext'
import { IoIosArrowUp } from 'react-icons/io'

const notoSansTC = Noto_Sans_TC({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'chinese-traditional'],
  display: 'swap',
})
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default function RootLayout({ children }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  const isTeacherPage = useMemo(
    () => pathname && pathname.startsWith('/teacher'),
    [pathname]
  );


  const isCartPage = useMemo(() => pathname?.startsWith('/cart'), [pathname])
  // top按鈕
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isMobile = window.innerWidth < 1200; // 1200以下不顯示

      if (isMobile) {
        setShowButton(false); // 手機版直接隱藏按鈕
        return;
      }

      // 滾動超過 300px 顯示按鈕
      if (scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }

      // 滾到底部 50px 內隱藏按鈕
      if (scrollY + windowHeight >= documentHeight - 50) {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // 頁面載入時也檢查一次
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  // 老師頁面不用layout
  const isExcluded = pathname.includes('/teacher')

  return (
    <html lang="zh-TW" className={`${notoSansTC.className} ${inter.className}`}>
      <body>
        <div className={isTeacherPage ? "" : isCartPage ? "layout-cart-container" : "layout-container"}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            closeOnClick
            pauseOnHover
            draggable
            theme="dark"
            className="custom-toast-container"
            style={{ marginTop: '80px' }}
          />
          {!isTeacherPage && (
            <Header
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              isCartPage={isCartPage}
            />
          )}
          <AppProvider>
            <main className={isExcluded ? '' : 'root-content'}>{children}</main>
          </AppProvider>
          {isTeacherPage ? (
            <TeacherFooter />
          ) : (
            <Footer isCartPage={isCartPage} />
          )}
        </div>

        {/* top按鈕 */}
        {showButton && (
          <button onClick={scrollToTop} className="scroll-top-btn hvr-icon-bob">
            <IoIosArrowUp size={25} className="hvr-icon" />
          </button>
        )}
      </body>
    </html>
  )
}
