'use client'

import React, { useState, useEffect } from 'react'
import styles from './index.module.scss'
import { formatDistanceToNow, format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

// 留言項目元件
function ReplyItem({
  userName,
  userProfile,
  text,
  time,
  media_urls,
  media_types,
  replies,
}) {
  const timeAgo = formatDistanceToNow(new Date(time), {
    locale: zhTW,
    addSuffix: true,
  })

  const formattedTime = format(new Date(time), 'yyyy/MM/dd HH:mm')

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
        {media_urls &&
          media_urls.length > 0 &&
          media_urls.map((media_url, index) => {
            const media_type = media_types[index]
            if (media_type === 'image') {
              return (
                <div className={styles['y-reply-img']} key={index}>
                  <img
                    src={`/images/article_com_media/${media_url}`}
                    alt="Reply attachment"
                    style={{
                      width: '100%', // Make the image take up the full width of its container
                      height: 'auto', // Maintain aspect ratio
                      aspectRatio: '16 / 9', // Enforce 16:9 aspect ratio
                      objectFit: 'cover', // Cover the container, potentially cropping the image
                    }}
                  />
                </div>
              )
            } else if (media_type === 'video') {
              return (
                <div className={styles['y-reply-img']} key={index}>
                  <video
                    src={`/images/article_com_media/${media_url}`}
                    controls
                    style={{
                      width: '100%', // Make the video take up the full width of its container
                      height: 'auto', // Maintain aspect ratio
                      aspectRatio: '16 / 9', // Enforce 16:9 aspect ratio
                      objectFit: 'cover', // Cover the container, potentially cropping the video
                    }}
                  />
                </div>
              )
            } else if (media_type === 'gif') {
              return (
                <div className={styles['y-reply-img']} key={index}>
                  <img
                    src={media_url}
                    alt="Reply attachment"
                    style={{
                      width: '60%',
                      height: 'auto',
                      aspectRatio: '16 / 9',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )
            }
            return null
          })}
        <div
          className={`mt-3 d-flex align-items-center ${styles['y-reply-time-like']}`}
        >
          <h6
            data-tooltip-id={`tooltip-${time}`}
            style={{ cursor: 'pointer' }}
            className="my-auto me-3"
          >
            {timeAgo}
          </h6>
          <Tooltip
            id={`tooltip-${time}`}
            content={formattedTime}
            place="bottom"
            style={{ backgroundColor: '#7E7267' }}
          />
          <div className="d-flex mb-like-reply">
            <button className="ms-sm-3">
              <img src="/images/article/thumb-up-black.svg" alt="Like" />
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
  )
}

// 回覆中的回覆元件
function NestedReplyItem({ userName, userProfile, text, time, image }) {
  const timeAgo = formatDistanceToNow(new Date(time), {
    locale: zhTW,
    addSuffix: true,
  })
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
        <div
          className={`mt-3 d-flex align-items-center ${styles['y-reply-time-like']}`}
        >
          <h6 className="my-auto me-sm-3">{timeAgo}</h6>
          <div className="d-flex mb-like-reply">
            <button className="ms-sm-3">
              <img src="/images/article/thumb-up-black.svg" alt="Like" />
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
  )
}

// 主留言區元件
export default function CommentsArea({
  articleId,
  commentCount: initialCount,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [count, setCount] = useState(initialCount ?? 0)
  const [comments, setComments] = useState([])

  const toggleComments = () => setIsCollapsed((prev) => !prev)

  useEffect(() => {
    if (!articleId) return
    // 從後端取得該文章的留言數量
    fetch(`http://localhost:8000/api/comments/count?articleId=${articleId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.count !== undefined) {
          setCount(data.count)
        }
      })
      .catch((err) => {
        console.error('取得留言數量失敗：', err)
      })
  }, [articleId])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/article_comments?articleId=${articleId}`
        )
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setComments(data.comments)
      } catch (error) {
        console.error('Could not fetch comments:', error)
      }
    }

    if (articleId) {
      fetchComments()
    }
  }, [articleId])

  return (
    <div>
      <div className={styles['y-all-comment-btn']}>
        <button onClick={toggleComments}>
          {isCollapsed
            ? `- 顯示全部(${count})留言 -`
            : `- 摺疊全部(${count})留言 -`}
        </button>
      </div>
      {/* 當展開留言時同時顯示排序下拉選單與留言內容 */}
      {!isCollapsed && (
        <>
          <div className={`${styles['y-sort-dropdown']} my-4`}>
            <select
              id="sort-comments"
              name="sort-comments"
              className="form-select"
            >
              <option value="1">由新到舊</option>
              <option value="2">由舊到新</option>
              <option value="3">熱門留言</option>
            </select>
          </div>
          <div className="pt-3">
            {comments.map((comment) => (
              <ReplyItem
                key={comment.id}
                userName={comment.nickname || comment.name}
                userProfile={comment.head}
                text={comment.content}
                time={comment.created_at}
                media_urls={comment.media_urls}
                media_types={comment.media_types}
                replies={[]} // Assuming replies are not directly fetched here
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
