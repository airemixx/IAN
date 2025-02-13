'use client'

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function Header({ searchOpen, setSearchOpen }) {

  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const selectRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = inputRef.current.value;
    const selectedOption = selectRef.current.value;
    let query = '';

    // 若選擇「最新消息」，以搜尋文章標題及 tag 為例
    if(selectedOption === '最新消息'){
      query = `?search=${encodeURIComponent(keyword)}`;
    }else {
      query = `?search=${encodeURIComponent(keyword)}`;
    }

    // 導向 /article 頁面並帶上 query 參數
    router.push(`/article${query}`);
    setSearchOpen(false);
  };

  return (
    <>
      <header className="nav-fixed-1" data-type="nav-fixed-1">
        <div className="search-icon">
          <a href="#"
            onClick={(e) => {
              e.preventDefault();
              setSearchOpen(!searchOpen);
            }}>
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

      {searchOpen && (
        <div
          ref={searchRef}
          className="search-modal"
          style={{
            width: '100%',
            background: '#eaeaea',
            padding: '1rem',
            position: 'absolute',
            top: '80px',
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            animation: 'slideDown 0.5s ease forwards',
            overflow: 'hidden',
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
