'use client'

import { SessionProvider } from 'next-auth/react' // ✅ 確保有引入
import { Noto_Sans_TC, Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Footer from './footer'
import Header from './header'
import TeacherFooter from './teacher/_component/teacher-footer/page'

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
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)

  // ✅ 修正：判斷 `/teacher` 或 `/teacher/...`
  const isTeacherPage = pathname.startsWith('/teacher')

  return (
    <html lang="zh-TW" className={`${notoSansTC.className} ${inter.className}`}>
      <body>
        {!isTeacherPage && (
          <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
        )}
        {children}
        {isTeacherPage ? <TeacherFooter /> : <Footer />}
      </body>
    </html>
  )
}
