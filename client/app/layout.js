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
  
  return (
    <>
      <html lang="en">
      <body className={`${notoSansTC.variable} ${inter.variable}`}>
          <header className="nav-fixed-1" data-type="nav-fixed-1">
            <div className="search-icon">
              <a href="#">
                <img src="/images/icon/search.svg" alt="search" />
              </a>
            </div>
            <div className="logo">
              <a href="#">
                <img src="/images/icon/lenstudio-logo.svg" alt="logo" />

              </a>
            </div>
            <div className="menu-icon">
              <img src="/images/icon/menu.svg" alt="menu" />
            </div>
            <nav>
              <ul className="nav-left">
                <li>
                  <a href="#">首頁</a>
                </li>
                <li className="product-item">
                  <a href="#">產品系列</a>
                  <div className="hover-gap" />
                  {/* 透明的緩衝區域 */}
                  <ul className="pd-dropdown">
                    <li className="drop-camera">
                      <a href="#">
                        機身
                        <span className="icon">
                          <img src="/images/icon/arrow-down.svg" alt="Icon" />
                        </span>
                      </a>
                      <ul className="camera-brands">
                        <li>
                          <a href="#">
                            <img src="/images/canon.png" alt="Canon" />
                            <span>Canon</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/nikon.png" alt="Nikon" />
                            <span>Nikon</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/sony.png" alt="Sony" />
                            <span>Sony</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              src="/images/hasselblad.png"
                              alt="Hasselblad"
                            />
                            <span>Hasselblad</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/leica.png" alt="Leica" />
                            <span>Leica</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="drop-lens">
                      <a href="#">
                        鏡頭
                        <span className="icon">
                          <img src="/images/icon/arrow-down.svg" alt="Icon" />
                        </span>
                      </a>
                      <ul className="lens-brands">
                        <li>
                          <a href="#">
                            <img src="/images/canon.png" alt="Canon" />
                            <span>Canon</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/nikon.png" alt="Nikon" />
                            <span>Nikon</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/sony.png" alt="Sony" />
                            <span>Sony</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              src="/images/hasselblad.png"
                              alt="Hasselblad"
                            />
                            <span>Hasselblad</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/leica.png" alt="Leica" />
                            <span>Leica</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="drop-other">
                      <a href="#">
                        配件
                        <span className="icon">
                          <img src="/images/icon/arrow-down.svg" alt="Icon" />
                        </span>
                      </a>
                      <ul className="other-brands">
                        <li>
                          <a href="#">
                            <img src="/images/canon.png" alt="Canon" />
                            <span>Canon</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/nikon.png" alt="Nikon" />
                            <span>Nikon</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/sony.png" alt="Sony" />
                            <span>Sony</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img
                              src="/images/hasselblad.png"
                              alt="Hasselblad"
                            />
                            <span>Hasselblad</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="/images/leica.png" alt="Leica" />
                            <span>Leica</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <div className="separator" />
                  </ul>
                </li>
                <li>
                  <a href="#">租借服務</a>
                </li>
                <li>
                  <a href="#">影像學院</a>
                </li>
                <li>
                  <a href="#">影像誌</a>
                </li>
                <li>
                  <a href="#">聯絡我們</a>
                </li>
              </ul>
              <ul className="nav-right">
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setSearchOpen(!searchOpen)
                    }}
                  >
                    <img src="/images/icon/search.svg" alt="" />
                  </a>

                  {searchOpen && (
                    <div
                      className="search-modal"
                      style={{
                        width: '100%',
                        background: '#eaeaea',
                        padding: '1rem',
                        position: 'absolute',
                        top: '100%', // 彈窗緊貼header下方
                        left: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onMouseLeave={() => setSearchOpen(false)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          width: '100%',
                          maxWidth: '600px', // 搜尋區塊寬度可調整
                          alignItems: 'center',
                        }}
                      >
                        <input
                          type="text"
                          placeholder="搜尋關鍵字"
                          style={{
                            flex: 3,
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                          }}
                        />
                        <select
                          defaultValue="全站搜尋"
                          style={{
                            flex: 1,
                            marginLeft: '1rem',
                            padding: '0.5rem',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            background: '#fff',
                          }}
                        >
                          <option value="全站搜尋">全站搜尋</option>
                          <option value="產品">產品</option>
                          <option value="最新消息">最新消息</option>
                          <option value="課程">課程</option>
                          <option value="租賃">租賃</option>
                        </select>
                        <button
                          style={{
                            marginLeft: '1rem',
                            padding: '0.5rem 1rem',
                            border: 'none',
                            background: '#333',
                            color: '#fff',
                            borderRadius: '4px',
                            cursor: 'pointer',
                          }}
                        >
                          搜尋
                        </button>
                      </div>
                    </div>
                  )}
                  <a href="#">
                    <img src="/images/icon/user.svg" alt="" />
                  </a>
                  <a href="#">
                    <img src="/images/icon/compare.svg" alt="" />
                  </a>
                  <a href="#">
                    <img src="/images/icon/cart.svg" alt="" />
                  </a>
                </li>
              </ul>
            </nav>
          </header>


  // 🔹 排除課程管理中心 (`/admin/courses`)
  // const isAdminPage = router.pathname.startsWith('/teacher')

  return (
    <>
      <html lang="en">
        <body className={`${notoSansTC.variable} ${inter.variable}`}>
        <Header/>

          {children}
        <Footer/>
        </body>
      </html>
    </>
  )
}
