'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useEffect, useState } from 'react'
import { usePathname } from "next/navigation";

export default function Header({ searchOpen, setSearchOpen }) {
  const router = useRouter()
  const searchRef = useRef(null)
  const inputRef = useRef(null)
  const selectRef = useRef(null)
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setSearchOpen])

  const handleSearch = async (e) => {
    e.preventDefault()
    const keyword = inputRef.current.value.trim()
    if (!keyword) return

    // 清除當前 URL 的查詢參數
    await router.replace('/article')

    // 根據使用者輸入產生新的查詢參數
    const query = `?search=${encodeURIComponent(keyword)}`
    const targetUrl = `/article${query}`

    router.push(targetUrl)
    // 強制重新渲染
    router.refresh()

    inputRef.current.value = ''
    setSearchOpen(false)
  }

  // 監聽 Enter 鍵按下事件
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault() // 防止表單提交
      handleSearch(e) // 直接呼叫 handleSearch 函數
    }
  }

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (searchOpen && inputRef.current) {
        inputRef.current.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [searchOpen])

  return (
    <>
      <header className="nav-fixed-1" data-type="nav-fixed-1">
        <div className="search-icon">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              setSearchOpen(!searchOpen)
            }}
          >
            <img src="/images/icon/search.svg" alt="search" />
          </a>
        </div>
        <div className="logo">
          <Link href="/">
            <img src="/images/icon/lenstudio-logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="menu-icon">
          <img src="/images/icon/menu.svg" alt="menu" />
        </div>
        <nav>
          <ul className="nav-left">
            <li>
              <Link href="#">首頁</Link>
            </li>
            <li className="product-item">
              <Link href="/product">產品系列</Link>
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
                        <img src="/images/hasselblad.png" alt="Hasselblad" />
                        <span>Hasselblad</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <img src="/images/leica.png" alt="Leica" />
                      </a>
                      <span>Leica</span>
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
                        <img src="/images/hasselblad.png" alt="Hasselblad" />
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
                        <img src="/images/hasselblad.png" alt="Hasselblad" />
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
              <Link href="/rental">租借服務</Link>
            </li>
            <li className={pathname === "/courses" ? ".nav-active" : ""}>
            <Link href="/courses">影像學院</Link>
            </li>
            <li>
              <Link href="/article">影像誌</Link>
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
              <Link href="/login">
                <img src="/images/icon/user.svg" alt="" />
              </Link>
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

      {searchOpen && (
        <div
          ref={searchRef}
          className="search-modal"
          style={{
            width: '100%',
            background: '#eaeaea',
            padding: '1rem',
            position: 'fixed', // 改為 fixed 定位
            top: '80px', // 設定與 header 底部的距離（根據 header 高度調整）
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'slideDown 0.5s ease forwards',
            overflow: 'hidden',
            zIndex: 9,
          }}
        >
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '1000px',
              alignItems: 'center',
            }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="搜尋關鍵字"
              style={{
                flex: 3,
                padding: '0.5rem 1rem',
                border: '1px solid #ccc',
                borderRadius: '25px',
              }}
            />
            <select
              ref={selectRef}
              defaultValue="全站搜尋"
              style={{
                flex: 1,
                marginLeft: '1rem',
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '25px',
                background: '#fff',
              }}
            >
              <option value="全站搜尋">全站搜尋</option>
              <option value="產品">產品</option>
              <option value="最新消息">最新消息</option>
              <option value="課程">課程</option>
              <option value="租賃">租賃</option>
            </select>
            <button className="search-button" onClick={handleSearch}>
              搜尋
            </button>
          </div>
        </div>
      )}
    </>
  )
}
