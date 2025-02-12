'use client'
import styles from './course-comment.module.scss'

export default function CourseComment({
  name,
  date,
  rating,
  title,
  content,
  imgSrc,
}) {
  return (
    <div className="col-md-6 col-sm-12 mt-0 my-3" data-aos="fade-up">
      <div className={styles['course-comment']}>
        <div className={styles['comment-card-nav']}>
          <div className={styles['commenter']}>
            <div className={styles['commenter-img']}>
              <img src={imgSrc} alt={`${name} 的頭像`} />
            </div>
            <div className={styles['commenter-info']}>
              <p className={styles['commenter-name']}>{name}</p>
              <p className={styles['commenter-time']}>{date}</p>
            </div>
          </div>
          <div className={styles['commenter-rating']}>
        
          </div>
        </div>
        <div className={styles['comment-card-content']}>
          <p className={styles['title']}>{title}</p>
          <p className={styles['content']}>{content}</p>
        </div>
        <div className={styles['go-page-link']}>
          <a href="">
            查看更多 <img src="/images/icon/arrow-right-gold.svg" alt="" />
          </a>
        </div>
      </div>
    </div>
  )
}
