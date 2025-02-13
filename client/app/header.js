'use client'


export default function Header() {
    
  return (
    <>
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
                  <a href="#">
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
      
    </>
  )
}
