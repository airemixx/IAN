'use client';  

import React from 'react';  
import styles from './index.module.scss';

// 模擬的留言資料  
const comments = [  
  {  
    id: 1,  
    userName: 'jumpman23',  
    userProfile: '/images/article/user (3).jpg',  
    text: '新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王',  
    time: '10小時前',  
    image: '/images/article/gallery (3).jpg',  
    replies: [],  
  },  
  {  
    id: 2,  
    userName: 'jumpman23',  
    userProfile: '/images/article/user (3).jpg',  
    text: '新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王',  
    time: '10小時前',  
    image: '/images/article/gallery (3).jpg',  
    replies: [  
      {  
        id: 21,  
        userName: 'jumpman23',  
        userProfile: '/images/article/user (3).jpg',  
        text: '@jumpman23 新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王',  
        time: '10小時前',  
        image: '/images/article/gallery (3).jpg',  
      },  
      {  
        id: 22,  
        userName: 'jumpman23',  
        userProfile: '/images/article/user (3).jpg',  
        text: '@jumpman23 新機的話就Pentax17，啥濾鏡都免了如果比較尺度拉到所有相機來看，Contax T是我心目中的街拍之王',  
        time: '10小時前',  
        image: '/images/article/gallery (3).jpg',  
      },  
    ],  
  },  
];  

// 回覆中的回覆元件  
function NestedReplyItem({ userName, userProfile, text, time, image }) {  
  return (  
    <div className="d-flex">  
      {/* 使用者頭像 */}  
      <div className={styles['y-reply-user-profile']}>  
        <a href="#">  
          <img src={userProfile} alt={userName} />  
        </a>  
      </div>  
      {/* 留言內容 */}  
      <div className={`mx-3 ${styles['y-reply-content']}`}>  
        <a href="#" className="text-black text-decoration-none">  
          <h6 className={`mt-2 ${styles['y-reply-user-name']}`}>{userName}</h6>  
        </a>  
        <div className={styles['y-reply-content']}>  
          <p className={`mt-3 ${styles['y-reply-text']}`}>{text}</p>  
        </div>  
        {image && (  
          <div className={styles['y-reply-img']}>  
            <img src={image} alt="Reply attachment" />  
          </div>  
        )}  
        <div className={`mt-3 d-flex align-items-center ${styles['y-reply-time-like']}`}>  
          <h6 className="my-auto me-sm-3">{time}</h6>  
          <div className="d-flex mb-like-reply">  
            <button className="ms-sm-3">  
              <img src="/images/article/heart-dark.svg" alt="Like" />  
            </button>  
            <button  
              className={`d-flex align-items-center ms-sm-3 ${styles['y-btn-reply-in-reply']}`}  
            >  
              <img src="/images/article/message2.svg" alt="Reply" />  
              <span className="ms-1">回覆</span>  
            </button>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
}  

// 留言項目元件  
function ReplyItem({ userName, userProfile, text, time, image, replies }) {  
  return (  
    <div className={`d-flex ${styles['y-reply']}`}>  
      {/* 使用者頭像 */}  
      <div className={styles['y-reply-user-profile']}>  
        <a href="#">  
          <img src={userProfile} alt={userName} />  
        </a>  
      </div>  
      {/* 留言內容 */}  
      <div className={`mx-3 ${styles['y-reply-content']}`}>  
        <a href="#" className="text-black text-decoration-none">  
          <h6 className={`mt-2 ${styles['y-reply-user-name']}`}>{userName}</h6>  
        </a>  
        <div className={styles['y-reply-content']}>  
          <p className={`mt-3 ${styles['y-reply-text']}`}>{text}</p>  
        </div>  
        {image && (  
          <div className={styles['y-reply-img']}>  
            <img src={image} alt="Reply attachment" />  
          </div>  
        )}  
        <div className={`mt-3 d-flex align-items-center ${styles['y-reply-time-like']}`}>  
          <h6 className="my-auto me-3">{time}</h6>  
          <div className="d-flex mb-like-reply">  
            <button className="ms-sm-3">  
              <img src="/images/article/heart-dark.svg" alt="Like" />  
            </button>  
            <button  
              className={`d-flex align-items-center ms-sm-3 ${styles['y-btn-reply-in-reply']}`}  
            >  
              <img src="/images/article/message2.svg" alt="Reply" />  
              <span className="ms-1">回覆</span>  
            </button>  
          </div>  
        </div>  
        {/* 回覆中的回覆 */}  
        {replies && replies.length > 0 && (  
          <>  
            <div className={`my-3 ${styles['y-hidden-reply-btn']}`}>  
              <button>ㄧ 隱藏留言</button>  
            </div>  
            {replies.map((reply) => (  
              <NestedReplyItem key={reply.id} {...reply} />  
            ))}  
            <div className={`my-3 ${styles['y-hidden-reply-btn']}`}>  
              <button>ㄧ 隱藏留言</button>  
            </div>  
          </>  
        )}  
      </div>  
    </div>  
  );  
}  


// 主留言區元件  
export default function ShowReply() {  
  return (  
    <div className="pt-3">  
      {comments.map((comment) => (  
        <ReplyItem key={comment.id} {...comment} />  
      ))}  
    </div>   
  );  
}  