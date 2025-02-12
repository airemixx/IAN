
'use client';  

import React from 'react';  
import styles from './index.module.scss';  

export default function TagLikeShareBtnIndex() {  
  return (  
    <div className={`d-flex justify-content-between align-items-center ${styles['y-tag-like-comment-share-fav-area']}`}>  
      <div className={`${styles['y-tag-area']}`}>  
        <button className="py-sm-1 px-sm-3 fw-medium rounded-pill">＃Sony</button>  
        <button className="py-sm-1 px-sm-3 fw-medium rounded-pill">＃旗艦</button>  
      </div>  
      <div className={`${styles['y-like-comment-share-fav']} d-flex`}>  
        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">  
          <img src="/images/article/heart.svg" className={`me-1 ${styles['y-like-comment-share-fav-pc']}`} alt="Heart" />  
          <span className={`${styles['y-count-num-pc']}`}>1234</span>  
          <img src="/images/article/heart.svg" className={`${styles['y-like-comment-share-fav-mb']}`} alt="Heart" />  
          <span className={`${styles['y-count-num']}`}>1234</span>  
        </button>  

        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">  
          <img src="/images/article/message-text-01.svg" className={`me-1 ${styles['y-like-comment-share-fav-pc']}`} alt="Message" />  
          <span className={`${styles['y-count-num-pc']}`}>34</span>  
          <img src="/images/article/message-text-01.svg" className={`${styles['y-like-comment-share-fav-mb']}`} alt="Message" />  
          <span className={`${styles['y-count-num']}`}>34</span>  
        </button>  

        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">  
          <img src="/images/article/share.svg" className={`me-1 ${styles['y-like-comment-share-fav-pc']}`} alt="Share" />  
          <img src="/images/article/share.svg" className={`${styles['y-like-comment-share-fav-mb']}`} alt="Share" />  
        </button>  

        <button className="py-sm-2 px-sm-3 d-flex align-items-center fw-medium rounded-pill">  
          <img src="/images/article/favourite.svg" className={`me-1 ${styles['y-like-comment-share-fav-pc']}`} alt="Favorite" />  
          <img src="/images/article/favourite.svg" className={`${styles['y-like-comment-share-fav-mb']}`} alt="Favorite" />  
        </button>  
      </div>  
    </div>  
  );  
}  
