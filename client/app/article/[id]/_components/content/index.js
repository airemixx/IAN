'use client';  

import React from 'react';  
import style from './index.module.scss';

export default function Content() {  
  return (  
    <>  
       <div className={style['y-article-content']}>  
        {/* 第一組 */}  
        <section className="mb-4 d-flex align-items-center" style={{ width: '100%', maxWidth: 1000 }}>  
          <div>  
            <p>  
              睽違將近4年，Sony重磅推出新一代旗艦全片幅可交換鏡頭式數位相機α1&nbsp;II（型號&nbsp;ILCE-1M2），搭載&nbsp;Sony&nbsp;最新&nbsp;AI&nbsp;處理元件、具備5,010萬畫素感光元件、高達&nbsp;30fps&nbsp;AF/AE&nbsp;連拍[1]及抗變形快門等特點，並優化了在中、高ISO設定下的畫質純淨度。α1&nbsp;II透過Sony&nbsp;AI&nbsp;處理元件不僅支援優異的主體辨識表現，更新增了「自動」模式，可由相機自動偵測人類、動物、飛機和汽車等多元主體，優化整體拍攝體驗。此外，α1&nbsp;II也繼承了α9&nbsp;III的創新技術，包括最長達1秒的預拍功能[2]及機身改良的人體工學設計；重量僅約&nbsp;743&nbsp;克的輕巧機身，適合各種需要高機動性的專業拍攝需求；Sony&nbsp;α1&nbsp;II結合高解析影像表現、高速效能以及卓越的對焦表現，完美定義全能旗艦的嶄新境界。  
            </p>  
          </div>  
        </section>  

        {/* 第二組 */}  
        <section className="flex-row mb-4 d-flex align-items-center">  
          <div className={style['y-content-image']}>  
            <img  
              src="/images/article/news (1).jpg"  
              className={`${style['y-img-fluid']} border rounded`}  
              alt="Camera Showcase"  
            />  
          </div>  
          <div className={`${style['y-content-text']} ms-sm-4`}>  
            <h5>高解析、速度與AI對焦的完美結合</h5>  
            <p>  
              α1&nbsp;II&nbsp;結合全片幅&nbsp;Exmor&nbsp;RS®&nbsp;堆疊式&nbsp;CMOS&nbsp;感光元件與最新的&nbsp;BIONZ&nbsp;XR®&nbsp;影像處理器，可拍攝具有寬廣動態範圍的5,010萬畫素高解析度影像，即使在&nbsp;APS-C&nbsp;片幅裁切模式下，也能捕捉2,100萬畫素之高解析度影像。  
              &nbsp; α1&nbsp;II相機可實現最高達30fps無黑畫面的AF/AE高速連拍，且具備高達每秒&nbsp;120&nbsp;次計算AF/AE的驚人速度，可以高度精準對焦拍攝快速移動的物體。α1&nbsp;II具備「預拍功能」可提前記錄完全按下快門前最多&nbsp;1&nbsp;秒的影像，拍攝過程中亦可透過「連拍加速功能」[3]暫時提高拍攝速度，不錯失稍縱即逝的精采瞬間。  
              &nbsp; 此外，最新的α1&nbsp;II搭載先進&nbsp;AI&nbsp;處理元件，透過豐富的主體姿態與動作資料數據進行運算，除了能即時準確地判定畫⾯中人類、動物/鳥類、車/火車、飛機與昆蟲等主體，更新增「自動」模式，無需指定主體模式即可自動辨識多元拍攝目標。  
            </p>  
          </div>  
        </section>  

        {/* 第三組 */}  
        <section className="flex-row-reverse mb-4 d-flex align-items-center">  
          <div className={style['y-content-image']}>  
            <img  
              src="/images/article/news (2).webp"  
              className={`${style['y-img-fluid']} border rounded`}  
              alt="Camera in Action"  
            />  
          </div>  
          <div className={`${style['y-content-text']} me-sm-4`}>  
            <h5>全面提升的影像品質與穩定拍攝系統&nbsp;</h5>  
            <p>  
              為了滿足許多專業攝影師對高速動作的拍攝需求，α1&nbsp;II&nbsp;配備抗變形快門以減少影像失真；此外也透過更進化的規格，提升中高感光度設定下的低雜訊表現，大幅提升影像純淨度，即使針對需要高快門速度的室內運動，也能捕捉雜訊更少、背景清晰的影像。α1&nbsp;II　亦配備&nbsp;8.5&nbsp;級&nbsp;(中央)及7.0&nbsp;級(邊角)&nbsp;[4]光學&nbsp;5&nbsp;軸內建影像穩定功能，並支援Steady-Shot「積極模式」[5]。，可呈現更穩定清晰的高品質影像。  
            </p>  
            <h5>專業操作與可靠性　支援高效工作流程和擴充性　影像傳輸更即時</h5>  
            <p>  
              為了滿足許多專業攝影師對高速動作的拍攝需求，α1&nbsp;II&nbsp;配備抗變形快門以減少影像失真；此外也透過更進化的規格，提升中高感光度設定下的低雜訊表現，大幅提升影像純淨度，即使針對需要高快門速度的室內運動，也能捕捉雜訊更少、背景清晰的影像。α1&nbsp;II　亦配備&nbsp;8.5&nbsp;級&nbsp;(中央)及7.0&nbsp;級(邊角)&nbsp;[4]光學&nbsp;5&nbsp;軸內建影像穩定功能，並支援Steady-Shot「積極模式」[5]。，可呈現更穩定清晰的高品質影像。  
            </p>  
          </div>  
        </section>  

        {/* 第四組 */}  
        <section className="flex-row mb-4 d-flex align-items-center">  
          <div className={`pe-sm-2 ${style['y-content-image']}`}>  
            <img  
              src="/images/article/news (3).webp"  
              className={`${style['y-img-fluid']} border rounded`}  
              alt="Camera Accessories"  
            />  
          </div>  
          <div className={`${style['y-content-image']} ps-sm-2`}>  
            <img  
              src="/images/article/news (3).webp"  
              className={`${style['y-img-fluid']} border rounded`}  
              alt="Camera Accessories"  
            />  
          </div>  
        </section>  

        {/* 第五組 */}  
        <section className="mb-4 d-flex align-items-center" style={{ width: '100%', maxWidth: 1000 }}>  
          <div>  
            <h5>為永續性⽽打造</h5>  
            <p>  
              &nbsp;Sony從產品開發、供應鏈、⽣產與包裝等產品⽣命週期都採取減少碳⾜跡的措施，α1&nbsp;II部分機⾝使⽤獨家可回收塑膠SORPLAS製造，並透過使⽤再⽣能源的設備生產，以達成更友善環境的能源與資源應用。  
            </p>  
          </div>  
        </section>  

        {/* 第六組 */}  
        <section className="flex-row mb-4 d-flex align-items-center">  
          <div className={`pe-sm-2 ${style['y-content-image']}`}>  
            <img src="/images/article/news (1).webp" className={`${style['y-img-fluid']} border rounded`} />  
          </div>  
          <div className={`${style['y-content-image']} ps-sm-2`}>  
            <img src="/images/article/news (2).webp" className={`${style['y-img-fluid']} border rounded`} />  
          </div>  
        </section>  

        {/* 第七組 */}  
        <section className={`${style['y-section-7-mb']} mb-4 d-flex align-items-center`} style={{ width: '100%', maxWidth: 1000 }}>  
          <div>  
            <p>  
              Sony致⼒於使⽤非塑膠性包材達到具耐震與耐撞的⽬標，並以植物性纖維製成的不織布進行產品包裝，透過全面性的考量減少對環境造成的衝擊。  
              <br />  
              <br />  
              全新Sony α1II全片幅相機將於2024/12/12在台上市，單機身建議售價NT$189,980；即日起至2024/12/29&nbsp;前購買，並於2025/1/5前完成註冊即可獲得&nbsp;Sony光影經典禮(內附α帆布袋、α相機鏡頭包布、α貼紙及&nbsp;α金屬熱靴蓋套組)，更多詳細產品訊息可洽詢或全台Sony&nbsp;Store直營通路：SonyStore台北101直營店、Sony&nbsp;Store台北復興直營店、Sony&nbsp;Store&nbsp;遠百信義直營店、Sony&nbsp;Store&nbsp;台中直營店、Sony&nbsp;Store&nbsp;高雄直營店、Sony客服中心（電話：4499111）以及各大消費性電子產品通路，或至Sony官方購物網站【www.sony.com.tw/store/】查詢。 產品連結：https://store.sony.com.tw/product/show/ILCE-1M2  
            </p>  
          </div>  
        </section>  
      </div>
      <div class={style['y-end-line']}></div>
    </>  
  );  
}