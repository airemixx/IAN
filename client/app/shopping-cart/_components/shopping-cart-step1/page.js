"use client"
import "@/style/shopping-cart-step1.css"
import "@/node_modules/bootstrap/dist/css/bootstrap.min.css"
import Script from "next/script"
export default function shoppingCartOnePage() {
    return (
       
        <div >
            <div className="container">
                <div className="j-shoppingCartTitleBox d-flex align-items-end pt-5">
                    <h1 className="j-shoppingCartTitle mt-5">我的購物車</h1>
                    <small className="mb-2 ms-1 ">(4)</small>
                </div>
                <div className="j-shoppingCartBox justify-content-between mt-4 row">
                    {/* 商品項目 */}
                    <div className="j-shoppingItemsBox col-md-6 d-none d-sm-block p-0">
                        <div className="d-flex">
                            <input type="checkbox" className="form-check" id="item1"/>
                            <div className="j-cartItemBox me-3 mb-2 d-flex flex-grow-1">
                                <div className="j-cartItem d-flex flex-grow-1">
                                    <div className="j-cameraImg m-2 ">
                                        <img src="../images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                                    </div>
                                    <div className="d-flex flex-column flex-grow-1">
                                        <div className="j-content d-flex justify-content-between align-items-center ">
                                            <div className="j-itemDetail d-flex flex-column">
                                                <div><span className="j-brand j-publicFont">FUJIFILM</span><br />
                                                    <span className="j-model j-publicFont">X-T5 16-50mm</span>
                                                </div>
                                                <button className="j-detailcollapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
                                                    +詳細資訊
                                                </button>
                                            </div>
                                            <div className="j-amount d-flex flex-row align-items-start">
                                                <button className="j-increase btn pb-0 ps-0 pt-0">+</button>
                                                <p className="j-amount-text mb-0 j-publicFont ">數量</p>
                                                <button className="j-decrease btn pb-0 ps-2 pt-0">-</button>
                                            </div>
                                            <p className="price me-3">NT$67000</p>
                                        </div>
                                        <div className="collapse" id="collapseExample1">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                                                            影像規格 IMAGE SPECIFICATIONS
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                                        <div className="accordion-body j-accBody">
                                                            <div className="j-detialTypeContent d-flex flex-column j-publicFont">
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="effectivePixels mb-1">有效像素</p>
                                                                    <p className="effectivePixelsValue mb-1">2550 萬像素</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="pSensitivePixels mb-1">感光元件像素</p>
                                                                    <p className="pSensitivePixelsValue mb-1">2420 萬像素</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="sensorFormat mb-1">感光元件格式</p>
                                                                    <p className="sensorFormatValue mb-1">APS-C</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="pSensitiveSize mb-1">感光元件大小</p>
                                                                    <p className="pSensitiveSizeValue mb-1">22.3 x 14.9mm</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                            觀景器 VIEWFINDER
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                            資料存取 DATA TRANSFER
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                                            機身資料 PHYSICAL SPECIFICATIONS
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                                            其它資料 OTHERS
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <input type="checkbox" className="form-check" id="item2"/>
                            <div className="j-cartItemBox me-3 mb-2 d-flex flex-grow-1">
                                <div className="j-cartItem d-flex flex-grow-1">
                                    <div className="j-cameraImg m-2 ">
                                        <img src="../images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                                    </div>
                                    <div className="d-flex flex-column flex-grow-1">
                                        <div className="j-content d-flex justify-content-between align-items-center ">
                                            <div className="j-itemDetail d-flex flex-column">
                                                <div><span className="j-brand j-publicFont">FUJIFILM</span><br />
                                                    <span className="j-model j-publicFont">X-T5 16-50mm</span>
                                                </div>
                                                <button className="j-detailcollapse" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                                                    +詳細資訊
                                                </button>
                                            </div>
                                            <div className="j-amount d-flex flex-row align-items-start">
                                                <button className="j-increase btn pb-0 ps-0 pt-0">+</button>
                                                <p className="j-amount-text mb-0 j-publicFont ">數量</p>
                                                <button className="j-decrease btn pb-0 ps-2 pt-0">-</button>
                                            </div>
                                            <p className="price me-3">NT$67000</p>
                                        </div>
                                        <div className="collapse" id="collapseExample2">
                                            <div className="accordion" id="accordionExample">
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                                                            影像規格 IMAGE SPECIFICATIONS
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                                        <div className="accordion-body j-accBody">
                                                            <div className="j-detialTypeContent d-flex flex-column j-publicFont">
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="effectivePixels mb-1">有效像素</p>
                                                                    <p className="effectivePixelsValue mb-1">2550 萬像素</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="pSensitivePixels mb-1">感光元件像素</p>
                                                                    <p className="pSensitivePixelsValue mb-1">2420 萬像素</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="sensorFormat mb-1">感光元件格式</p>
                                                                    <p className="sensorFormatValue mb-1">APS-C</p>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <p className="pSensitiveSize mb-1">感光元件大小</p>
                                                                    <p className="pSensitiveSizeValue mb-1">22.3 x 14.9mm</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                            觀景器 VIEWFINDER
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                            資料存取 DATA TRANSFER
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                                            機身資料 PHYSICAL SPECIFICATIONS
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="accordion-item j-accitem">
                                                    <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                                        <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                                            其它資料 OTHERS
                                                        </button>
                                                    </h2>
                                                    <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                                        <div className="accordion-body j-accBody">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <input type="checkbox" className="form-check" id="item3"/>
                            <div className="j-cartItemBox me-3 mb-2 d-flex">
                                <div className="shoppingLesson d-flex flex-column">
                                    <div className="j-lessonImg m-2 ">
                                        <img src="../images/shopping-cart-image/lesson1.png" alt="" className="object-fit-contain" />
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <div >
                                            <p>旅行攝影：按下快門，用攝影書寫故事</p>
                                        </div>
                                        <div>
                                            <p>食癮，拾影</p>
                                        </div>
                                        <div className="d-flex">
                                            <div >
                                                <p>4.2</p>
                                            </div>
                                            <div className="me-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                    <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                    <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                    <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                    <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                    <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                                </svg>(1566)
                                            </div>
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width={17} height={18} viewBox="0 0 17 18" fill="none">
                                                    <path d="M13.6002 10.1934C14.4979 10.8641 15.3002 12.5528 15.3002 13.5933C15.3002 13.9175 15.0637 14.1803 14.7719 14.1803H14.4502M11.0502 7.44415C11.6309 7.10822 12.0216 6.48035 12.0216 5.76122C12.0216 5.04209 11.6309 4.41421 11.0502 4.07828M2.22845 14.1803H11.5338C11.8256 14.1803 12.0621 13.9175 12.0621 13.5933C12.0621 11.5557 10.3598 9.90392 6.88115 9.90392C3.40251 9.90392 1.7002 11.5557 1.7002 13.5933C1.7002 13.9175 1.9367 14.1803 2.22845 14.1803ZM8.824 5.76122C8.824 6.83423 7.95416 7.70407 6.88115 7.70407C5.80814 7.70407 4.93829 6.83423 4.93829 5.76122C4.93829 4.68821 5.80814 3.81836 6.88115 3.81836C7.95416 3.81836 8.824 4.68821 8.824 5.76122Z" stroke="#807871" strokeLinecap="round" />
                                                </svg>2,183
                                            </div>
                                        </div>
                                        <div>
                                            <p>NT$ 2,180</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex">
                            <input type="checkbox" className="form-check" id="item4"/>
                            <div className="j-cartItemBox me-3 mb-2 d-flex flex-grow-1">
                                <div className="shoppingRent d-flex flex-column flex-grow-1">
                                    <div className="j-rentImg m-2 d-flex justify-content-center">
                                        <img src="../images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                                    </div>
                                    <div className="j-rentCameraBrand d-flex flex-column align-items-center mb-3">
                                        <span>FUJIFILM 富士</span>
                                        <span>X-T5 16-50mm</span>
                                    </div>
                                    <div className="d-flex flex-column align-items-center">
                                        <span className="mb-2">租賃日期: 2024-01-01</span>
                                        <span className="j-rentDeadLine">到期日: 2024-01-14</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="j-shoppingItemsMoblieBox col-md-auto d-sm-none d-block p-0">
                        <div className="j-cartItemBox mb-2">
                            <div className="j-cartItem d-flex flex-column">
                                <div className="j-content d-flex align-items-center justify-content-evenly flex-grow-1">
                                    <div className="j-cameraImg m-2 ">
                                        <img src="../images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                                    </div>
                                    <div className="j-itemDetail d-flex flex-column">
                                        <div>
                                            <span className="j-brand j-publicFont">FUJIFILM</span><br />
                                            <span className="j-model j-publicFont">X-T5 16-50mm</span>
                                        </div>
                                        <div className="j-detail j-publicFont">+詳細資訊</div>
                                    </div>
                                </div>
                                <div className="j-amount d-flex flex-row align-items-start justify-content-around">
                                    <div className="d-flex justify-content-center">
                                        <button className="j-increase btn pb-0 ps-0 pt-0">+</button>
                                        <p className="j-amount-text mb-0 j-publicFont ">數量</p>
                                        <button className="j-decrease btn pb-0 ps-2 pt-0">-</button>
                                    </div>
                                    <div>
                                        <p className="price">NT$67000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="j-cartItemBox mb-2">
                            <div className="j-cartItem d-flex">
                                <div className="d-flex flex-column flex-grow-1">
                                    <div className="j-content d-flex align-items-center justify-content-evenly flex-grow-1">
                                        <div className="j-cameraImg m-2 ">
                                            <img src="../images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                                        </div>
                                        <div className="j-itemDetail d-flex flex-column">
                                            <div>
                                                <span className="j-brand j-publicFont">FUJIFILM</span><br />
                                                <span className="j-model j-publicFont">X-T5 16-50mm</span>
                                            </div>
                                            <div className="j-detail j-publicFont">-詳細資訊</div>
                                        </div>
                                    </div>
                                    <div className="accordion" id="accordionExample">
                                        <div className="accordion-item j-accitem">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                                <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                                                    影像規格 IMAGE SPECIFICATIONS
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                                <div className="accordion-body j-accBody">
                                                    <div className="j-detialTypeContent d-flex flex-column j-publicFont">
                                                        <div className="d-flex justify-content-between">
                                                            <p className="effectivePixels mb-1">有效像素</p>
                                                            <p className="effectivePixelsValue mb-1">2550 萬像素</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="pSensitivePixels mb-1">感光元件像素</p>
                                                            <p className="pSensitivePixelsValue mb-1">2420 萬像素</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="sensorFormat mb-1">感光元件格式</p>
                                                            <p className="sensorFormatValue mb-1">APS-C</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="pSensitiveSize mb-1">感光元件大小</p>
                                                            <p className="pSensitiveSizeValue mb-1">22.3 x 14.9mm</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item j-accitem">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                                <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                                    觀景器 VIEWFINDER
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                                <div className="accordion-body j-accBody">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item j-accitem">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                                <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                                    資料存取 DATA TRANSFER
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                                <div className="accordion-body j-accBody">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item j-accitem">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                                <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                                                    機身資料 PHYSICAL SPECIFICATIONS
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                                                <div className="accordion-body j-accBody">
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item j-accitem">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                                <button className="accordion-button j-accBtn collapsed focus-ring focus-ring-light" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive">
                                                    其它資料 OTHERS
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFive" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFive">
                                                <div className="accordion-body j-accBody">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="j-amount d-flex flex-row align-items-start justify-content-around">
                                        <div className="d-flex justify-content-center">
                                            <button className="j-increase btn pb-0 ps-0 pt-0">+</button>
                                            <p className="j-amount-text mb-0 j-publicFont ">數量</p>
                                            <button className="j-decrease btn pb-0 ps-2 pt-0">-</button>
                                        </div>
                                        <div>
                                            <p className="price">NT$67000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="j-cartItemBox mb-2">
                            <div className="shoppingLesson d-flex flex-column">
                                <div className="j-lessonImg m-2 ">
                                    <img src="../images/shopping-cart-image/lesson1.png" alt="" className="object-fit-contain" />
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <div >
                                        <p>旅行攝影：按下快門，用攝影書寫故事</p>
                                    </div>
                                    <div>
                                        <p>食癮，拾影</p>
                                    </div>
                                    <div className="d-flex">
                                        <div>
                                            <p>4.2</p>
                                        </div>
                                        <div className="me-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={14} height={15} viewBox="0 0 14 15" fill="none">
                                                <path d="M6.70559 2.0835C6.82609 1.83935 7.17424 1.83935 7.29474 2.0835L8.85457 5.24408C8.90242 5.34103 8.99492 5.40823 9.10191 5.42378L12.5898 5.9306C12.8592 5.96975 12.9668 6.30086 12.7719 6.49091L10.248 8.95107C10.1706 9.02654 10.1352 9.13527 10.1535 9.24183L10.7493 12.7156C10.7954 12.984 10.5137 13.1886 10.2727 13.0619L7.15303 11.4218C7.05733 11.3715 6.943 11.3715 6.8473 11.4218L3.72763 13.0619C3.48664 13.1886 3.20498 12.984 3.251 12.7156L3.84681 9.24183C3.86508 9.13527 3.82976 9.02654 3.75233 8.95107L1.22847 6.49091C1.0335 6.30086 1.14108 5.96975 1.41052 5.9306L4.89842 5.42378C5.00542 5.40823 5.09791 5.34103 5.14576 5.24408L6.70559 2.0835Z" fill="#E68E41" stroke="#E68E41" strokeLinejoin="round" />
                                            </svg>(1566)
                                        </div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={17} height={18} viewBox="0 0 17 18" fill="none">
                                                <path d="M13.6002 10.1934C14.4979 10.8641 15.3002 12.5528 15.3002 13.5933C15.3002 13.9175 15.0637 14.1803 14.7719 14.1803H14.4502M11.0502 7.44415C11.6309 7.10822 12.0216 6.48035 12.0216 5.76122C12.0216 5.04209 11.6309 4.41421 11.0502 4.07828M2.22845 14.1803H11.5338C11.8256 14.1803 12.0621 13.9175 12.0621 13.5933C12.0621 11.5557 10.3598 9.90392 6.88115 9.90392C3.40251 9.90392 1.7002 11.5557 1.7002 13.5933C1.7002 13.9175 1.9367 14.1803 2.22845 14.1803ZM8.824 5.76122C8.824 6.83423 7.95416 7.70407 6.88115 7.70407C5.80814 7.70407 4.93829 6.83423 4.93829 5.76122C4.93829 4.68821 5.80814 3.81836 6.88115 3.81836C7.95416 3.81836 8.824 4.68821 8.824 5.76122Z" stroke="#807871" strokeLinecap="round" />
                                            </svg>2,183
                                        </div>
                                    </div>
                                    <div>
                                        <p>NT$ 2,180</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="j-cartItemBox mb-2">
                            <div className="shoppingRent d-flex flex-column">
                                <div className="j-rentImg m-2 d-flex justify-content-center">
                                    <img src="../images/shopping-cart-image/shoppingCartItemPhoto.png" alt="" className="object-fit-contain" />
                                </div>
                                <div className="j-rentCameraBrand d-flex flex-column align-items-center mb-3">
                                    <span>FUJIFILM 富士</span>
                                    <span>X-T5 16-50mm</span>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <span className="mb-2">租賃日期: 2024-01-01</span>
                                    <span className="j-rentDeadLine">到期日: 2024-01-14</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 價格摘要 */}
                    <div className="j-payStep col-md-4 mb-5 d-flex flex-column align-items-center">
                        <div className="j-pCount border-bottom mb-3 d-flex flex-column gap-2">
                            <div className="j-pTitle j-publicFont">摘要</div>
                            <div className="j-ifCouponUse j-publicFont">
                                <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={25} viewBox="0 0 24 25" fill="none">
                                        <circle cx={12} cy="12.5" r={11} stroke="#003150" strokeWidth={2} />
                                        <circle cx={12} cy="12.5" r="7.5" fill="#003150" />
                                    </svg>
                                </label>
                                是否使用優惠券
                            </div>
                            <div className="couponName d-flex flex-column j-publicFont">
                                <span>課程95折優惠券</span>
                                <span>相機1500折價券</span>
                            </div>
                            <div className="subTotalBox d-flex justify-content-between j-publicFont">
                                <div className="subTotal">小計</div>
                                <div className="subPrice">NT$8000</div>
                            </div>
                            <div className="freightBox d-flex justify-content-between j-publicFont">
                                <div className="freight">運費</div>
                                <div className="freightPrice">NT$8000</div>
                            </div>
                            <div className="totalPriceBox d-flex justify-content-between j-publicFont">
                                <div className="total ">總額</div>
                                <div className="totalPrice">NT$8000</div>
                            </div>
                        </div>
                        <div className="j-Checkout d-flex justify-content-center align-items-center align-self-stretch">
                            <button className="btn text-alig-center">結帳</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Button trigger modal */}
           
            <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossorigin="anonymous"></Script>
        </div>
    )
}