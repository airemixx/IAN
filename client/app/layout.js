'use client'

import { Noto_Sans_TC, Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'
import { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import Footer from './footer'
import Header from './header'

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

  const [aboutUsOpen, setAboutUsOpen] = useState(false)
  const [accountCenterOpen, setAccountCenterOpen] = useState(false)
  const [faqOpen, setFaqOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  


  // 🔹 排除課程管理中心 (`/admin/courses`)
  // const isAdminPage = router.pathname.startsWith('/teacher')

  return (
    <>
      <html lang="en">
        <body className={`${notoSansTC.variable} ${inter.variable}`}>
        <Header
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />

          {children}
        <Footer/>
        </body>
      </html>
    </>
  )
}
