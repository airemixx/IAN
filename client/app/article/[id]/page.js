'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BreadcrumbDetail from './_components/breadcrumb-detail';
import TitleShareFontSize from './_components/title-share-fontSize';
import Content from './_components/content';
import Aside from './_components/aside';
import Link from 'next/link';

function getFontSize(size) {
  switch (size) {
    case 'small':
      return '14px';
    case 'medium':
      return '16px';
    case 'large':
      return '18px';
    default:
      return '16px';
  }
}

export default function ArticleDetail() {
  const params = useParams();
  const id = "12";

  const [fontSize, setFontSize] = useState('medium');

  const changeFontSize = (size) => {
    setFontSize(size);
  };

  useEffect(() => {
    changeFontSize('medium');
  }, []);

  const getButtonStyle = (size) => {
    return fontSize === size
      ? { color: '#8F8F8F', textDecoration: 'none' }
      : { color: '#143146', textDecoration: 'underline' };
  };

  return (
    <div className='bg-light'>
      <h1>文章 ID: {id}</h1>
      <div className="d-flex flex-column min-vh-100 text-dark bg-light y-container">
        {/* 標題＋主圖區 */}
        <section className="y-container title-main-img">
          {/* 麵包屑 */}
          <BreadcrumbDetail  />
          
          {/* 文章標題＋日期＋分享按鈕 */}
          <TitleShareFontSize />
          {/* 主圖 */}
        </section>

        {/* 主內容區 */}
        <div className=" d-flex justify-content-between">
          {/* 文章區 */}
          <article className="y-article-content">
            <Content />


            <div className="y-tag-like-comment-share-fav-area d-flex justify-content-between align-items-center">
              <div className="y-tag-area">
                <button className="py-sm-1 px-sm-3 fw-medium rounded-pill">＃Sony</button>
                <button className="py-sm-1 px-sm-3 fw-medium rounded-pill">＃旗艦</button>
              </div>
              <div className="y-like-comment-share-fav d-flex">
                <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
                  <img src="/images/article/heart.svg" className="me-1 y-like-comment-share-fav-pc" /><span className="y-count-num-pc">1234</span>
                  <img src="/images/article/heart.svg" className="y-like-comment-share-fav-mb" /><span className="y-count-num">1234</span>
                </button>
                <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
                  <img src="/images/article/message-text-01.svg" className="me-1 y-like-comment-share-fav-pc" /><span className="y-count-num-pc">34</span>
                  <img src="/images/article/message-text-01.svg" className="y-like-comment-share-fav-mb" /><span className="y-count-num">34</span>
                </button>
                <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
                  <img src="/images/article/share.svg" className="me-1 y-like-comment-share-fav-pc" />
                  <img src="/images/article/share.svg" className="y-like-comment-share-fav-mb" />
                </button>
                <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">
                  <img src="/images/article/favourite.svg" className="me-1 y-like-comment-share-fav-pc" />
                  <img src="/images/article/favourite.svg" className="y-like-comment-share-fav-mb" />
                </button>
              </div>
            </div>
            {/* 留言輸入區 */}
            <div className="p-3 bg-white border border-secondary y-comment-area">
              <input type="text" id="comment" className="p-2 py-3" placeholder="留言" />
              <div className="mt-2 d-flex justify-content-end y-comment-area-icons">
                <div className="d-flex">
                  <button className="p-1">
                    <img src="/images/article/image-03.svg" />
                  </button>
                  <button className="p-1">
                    <img src="/images/article/send-01.svg" alt="發送" />
                  </button>
                </div>
              </div>
            </div>
            <div className="y-all-comment-btn">
              <button>- 全部留言 -</button>
            </div>
            <div className="y-sort-dropdown">
              <select id="sort-comments" name="sort-comments" className="form-select">
                <option value={1}>由新到舊</option>
                <option value={2}>由舊到新</option>
                <option value={3}>熱門留言</option>
              </select>
            </div>
            {/* 留言顯示區 */}
            <div className="pt-3">
              {/* 第一則留言 */}
              <div className="y-reply d-flex">
                {/* 使用者頭像 */}
                <div className="y-reply-user-profile">
                  <a href="#">
                    <img src="/images/article/user (3).jpg" />
                  </a>
                </div>
                {/* 留言內容 */}
                <div className="mx-3 y-reply-content">
                  <a href="#" className="text-black text-decoration-none">
                    <h6 className="mt-2 y-reply-user-name">jumpman23</h6>
                  </a>
                  <div className="y-reply-content">
                    <p className="mt-3 y-reply-text">新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王</p>
                  </div>
                  <div className="y-reply-img">
                    <img src="/images/article/gallery (3).jpg" />
                  </div>
                  <div className="mt-3 y-reply-time-like d-flex align-items-center">
                    <h6 className="my-auto me-3">10小時前</h6>
                    <div className="d-flex mb-like-reply">
                      <button className="ms-sm-3">
                        <img src="/images/article/heart-dark.svg" />
                      </button>
                      <button className="y-btn-reply-in-reply d-flex align-items-center ms-sm-3">
                        <img src="/images/article/message2.svg" /> <span className="ms-1">回覆</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* 第二則留言 */}
              <div className="y-reply d-flex">
                {/* 使用者頭像 */}
                <div className="y-reply-user-profile">
                  <a href="#">
                    <img src="/images/article/user (3).jpg" />
                  </a>
                </div>
                {/* 留言內容 */}
                <div className="mx-3 y-reply-content">
                  <a href="#" className="text-black text-decoration-none">
                    <h6 className="mt-2 y-reply-user-name">jumpman23</h6>
                  </a>
                  <div className="y-reply-content">
                    <p className="mt-3 y-reply-text">新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王</p>
                  </div>
                  <div className="y-reply-img">
                    <img src="/images/article/gallery (3).jpg" />
                  </div>
                  <div className="mt-3 y-reply-time-like d-flex align-items-center">
                    <h6 className="my-auto me-3">10小時前</h6>
                    <div className="d-flex mb-like-reply">
                      <button className="ms-sm-3">
                        <img src="/images/article/heart-dark.svg" />
                      </button>
                      <button className="y-btn-reply-in-reply d-flex align-items-center ms-sm-3">
                        <img src="/images/article/message2.svg" /> <span className="ms-1">回覆</span>
                      </button>
                    </div>
                  </div>
                  {/* 回覆中的回覆 */}
                  <div className="my-3 y-hidden-reply-btn">
                    <button>ㄧ 隱藏留言</button>
                  </div>
                  <div className="d-flex">
                    {/* 使用者頭像 */}
                    <div className="y-reply-user-profile">
                      <a href="#">
                        <img src="/images/article/user (3).jpg" />
                      </a>
                    </div>
                    {/* 留言內容 */}
                    <div className="mx-3 y-reply-content">
                      <a href="#" className="text-black text-decoration-none">
                        <h6 className="mt-2 y-reply-user-name">jumpman23</h6>
                      </a>
                      <div className="y-reply-content">
                        <p className="mt-3 y-reply-text"><strong>@jumpman23</strong> 新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王</p>
                      </div>
                      <div className="y-reply-img">
                        <img src="/images/article/gallery (3).jpg" />
                      </div>
                      <div className="mt-3 y-reply-time-like d-flex align-items-center">
                        <h6 className="my-auto me-sm-3">10小時前</h6>
                        <div className="d-flex mb-like-reply">
                          <button className="ms-sm-3">
                            <img src="/images/article/heart-dark.svg" />
                          </button>
                          <button className="y-btn-reply-in-reply d-flex align-items-center ms-sm-3">
                            <img src="/images/article/message2.svg" /> <span className="ms-1">回覆</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    {/* 使用者頭像 */}
                    <div className="y-reply-user-profile">
                      <a href="#">
                        <img src="/images/article/user (3).jpg" />
                      </a>
                    </div>
                    {/* 留言內容 */}
                    <div className="mx-3 y-reply-content">
                      <a href="#" className="text-black text-decoration-none">
                        <h6 className="mt-2 y-reply-user-name">jumpman23</h6>
                      </a>
                      <div className="y-reply-content">
                        <p className="mt-3 y-reply-text"><strong>@jumpman23</strong> 新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王</p>
                      </div>
                      <div className="y-reply-img">
                        <img src="/images/article/gallery (3).jpg" />
                      </div>
                      <div className="mt-3 y-reply-time-like d-flex align-items-center">
                        <h6 className="my-auto me-sm-3">10小時前</h6>
                        <div className="d-flex mb-like-reply">
                          <button className="ms-sm-3">
                            <img src="/images/article/heart-dark.svg" />
                          </button>
                          <button className="y-btn-reply-in-reply d-flex align-items-center ms-sm-3">
                            <img src="/images/article/message2.svg" /><span className="ms-1">回覆</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="my-3 y-hidden-reply-btn">
                    <button>ㄧ 隱藏留言</button>
                  </div>
                </div>
                {/* 回覆中的回覆END */}
              </div>
            </div></article>

          {/* 側欄: 最新消息/推薦閱讀...等 */}
          <Aside />
        </div>

        {/* 推薦區 */}
        <div className="y-recommends-area-bg">
          <div className="my-5 y-container y-recommends-area">
            <h2 className="px-4">Lenstudio Recommends</h2>
            <div className="y-recommends-line"></div>
            <div className="gap-3 y-recommends-card-area d-flex">
              {
                [...Array(5)].map((_, index) => (
                  <div key={index} className="my-4 card" style={{ width: '18rem' }}>
                    <div className="px-3 py-2 y-card-title d-flex justify-content-end">
                      <Link href="#">
                        <img src="/images/article/heart-dark.svg" alt="heart" />
                      </Link>
                    </div>
                    <img className="card-img-top object-fit-cover" src="/images/article/product (1).png" alt="product" />
                    <div className="card-body">
                      <h6 className="y-card-tag">Leica 徠卡</h6>
                      <h5 className="card-product-name">Q3 43</h5>
                      <h6 className="mt-3 y-card-price">NT$220,000</h6>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}