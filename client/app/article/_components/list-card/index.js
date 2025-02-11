'use client';  

import React from 'react';  
import styles from './index.module.scss';  

const CardList = () => {  
  return (  
    <div className={`row ${styles['y-list-card-area']}`}>  
      {/* 以陣列迭代模擬 4 個卡片 */}  
      {Array.from({ length: 4 }).map((_, index) => (  
        <div className="col-md-3" key={index}>  
          <div className={`card ${styles['y-card']}`}>  
            <img  
              src="/images/article/social.jpg"  
              className={`card-img-top ${styles['y-card-img-top-css']}`}  
              alt="Social Image"  
            />  
            <div className={`px-0 card-body ${styles['y-card-body-css']}`}>  
              <div  
                className={`mb-3 ${styles['y-article-list-tag']} d-flex justify-content-between`}  
              >  
                <p className="mb-0">產品情報</p>  
              </div>  
              <div className={`mb-5 ${styles['y-list-card-content']}`}>  
                <a href="#" className="text-decoration-none">  
                  <h4 className="card-title">  
                    Sony α1 II 當代全能旗艦相機重磅登場  
                  </h4>  
                </a>  
              </div>  
              <div className={styles['y-author-date']}>  
                <p className="mb-0">  
                  <img  
                    className={`mb-2 ${styles['y-user-list-profile']} rounded-pill me-2`}  
                    src="/images/article/user (1).jpg"  
                    alt="User Profile"  
                  />  
                  編輯部  
                </p>  
                <p>2024-10-10</p>  
              </div>  
            </div>  
          </div>  
        </div>  
      ))}  
    </div>  
  );  
};  

export default CardList;