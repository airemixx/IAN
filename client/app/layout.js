'use client'

import { Noto_Sans_TC, Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import { usePathname } from 'next/navigation'
import Footer from './footer'
import Header from './header'
import TeacherFooter from './teacher/teacher-footer/page'

const notoSansTC = Noto_Sans_TC({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin', 'chinese-traditional'],
  display: 'swap',
})
const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

// export const metadata = {
//   title: 'Lenstudio - 賣相機和攝影課程的平台',
//   description: 'Lenstudio 提供各種相機、鏡頭與專業攝影課程，讓你提升拍攝技巧。',
// }

export default function RootLayout({ children }) {
  const pathname = usePathname()

  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <html lang="en">
        <body>
          {pathname !== '/teacher' && (
            <Header searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
          )}

          {children}
          {pathname === '/teacher' ? <TeacherFooter /> : <Footer />}
        </body>
      </html>
    </>
  )
}
