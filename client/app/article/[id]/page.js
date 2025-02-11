'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BreadcrumbDetail from './_components/breadcrumb-detail';
import TitleShareFontSize from './_components/title-share-fontSize';
import Content from './_components/content';
import Aside from './_components/aside';
import TagLikeShareBtn from './_components/tag-like-share-btn';
import ReplyInput from './_components/reply-input';
import SortAllBtn from './_components/sort-all-btn';
import Recommends from './_components/recommends';
import ShowReply from './_components/show-reply';

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
            <Content fontSize={getFontSize(fontSize)}/>
            <TagLikeShareBtn />
            {/* 留言輸入區 */}
            <ReplyInput />

            <SortAllBtn />
            {/* 留言顯示區 */}
            <ShowReply />
            </article>

          {/* 側欄: 最新消息/推薦閱讀...等 */}
          <Aside />
        </div>

        {/* 推薦區 */}
      </div>
        <Recommends />
    </div>
  );
}