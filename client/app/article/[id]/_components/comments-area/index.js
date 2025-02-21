'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { formatDistanceToNow, format } from 'date-fns'
import { zhTW } from 'date-fns/locale'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import ReplyInput from '../reply-input' // 引入 ReplyInput 組件
import MediaRenderer from '../media-render'
import GifImage from '../gif-image'

// 組織留言資料，將回覆中的回覆依照 parent_id 分組
const organizeComments = (comments) => {
  const topLevel = comments.filter((c) => !c.parent_id)
  const nestedMap = {}
  comments.forEach((c) => {
    if (c.parent_id) {
      if (!nestedMap[c.parent_id]) {
        nestedMap[c.parent_id] = []
      }
      nestedMap[c.parent_id].push(c)
    }
  })
  // 將 nested replies 嵌入對應頂層留言
  return topLevel.map((comment) => ({
    ...comment,
    replies: nestedMap[comment.id] || [],
  }))
}

// 留言項目元件
function ReplyItem({
  userName,
  userProfile,
  text,
  time,
  media_urls,
  media_types,
  replies,
  likeCount: initialLikeCount, // new prop for comment like count
  commentId, // new prop for identifying the comment
  articleId, // ← 讓 ReplyItem 同時接收 articleId
}) {
  const [isLiked, setIsLiked] = useState(false)
  const [commentLikeCount, setCommentLikeCount] = useState(initialLikeCount || 0)
  const [isClicked, setIsClicked] = useState(false)
  const [numVibrate, setNumVibrate] = useState(false)
  const [showReplyInput, setShowReplyInput] = useState(false) // 新增狀態來控制是否顯示輸入框
  // 新增 state 儲存新增的 nested replies
  const [nestedReplies, setNestedReplies] = useState(replies || [])
  const [showNestedReplies, setShowNestedReplies] = useState(true) // 新增 state
  const [replyTo, setReplyTo] = useState('') // 新增 state
  const inputRef = useRef(null)

  const timeAgo = formatDistanceToNow(new Date(time), {
    locale: zhTW,
    addSuffix: true,
  })

  const formattedTime = format(new Date(time), 'yyyy/MM/dd HH:mm')

  const handleLike = async () => {
    if (isLiked) {
      // Unlike action: decrease count and update state
      const newCount = commentLikeCount - 1
      setIsLiked(false)
      setCommentLikeCount(newCount)
      setNumVibrate(true)
      try {
        await fetch(`http://localhost:8000/api/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            likeableId: commentId, // comment id
            likeableType: 'article_comment',
            newLikeCount: newCount,
            // include userId if needed
          }),
          credentials: 'include',
        })
      } catch (error) {
        console.error('Error updating comment unlike:', error)
      }
    } else {
      // Like action: increase count and update state
      setIsLiked(true)
      setIsClicked(true)
      const newCount = commentLikeCount + 1
      setCommentLikeCount(newCount)
      setNumVibrate(true)
      setTimeout(() => setIsClicked(false), 300)
      try {
        await fetch(`http://localhost:8000/api/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            likeableId: commentId, // comment id
            likeableType: 'article_comment',
            newLikeCount: newCount,
            // include userId if needed
          }),
          credentials: 'include',
        })
      } catch (error) {
        console.error('Error updating comment like count:', error)
      }
    }
  }

  // 修改：每次點擊都更新 replyTo，但若未顯示則打開輸入框
  const handleReplyClick = (replyUserName) => {
    setReplyTo(`@${replyUserName} `)
    if (!showReplyInput) {
      setShowReplyInput(true)
    }
  }

  // 點擊外部時收起回覆輸入框，但 NestedReplyItem 不收
  useEffect(() => {
    function handleOutsideClick(e) {
      if (e.target.closest(`.${styles['y-btn-reply-in-reply']}`)) return
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowReplyInput(false);
      }
    }
    if (showReplyInput) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [showReplyInput]);

  // 當 newNestedReply 送出時將其加入 nestedReplies state
  const handleNestedReplySubmitted = (newNestedReply) => {
    setNestedReplies((prev) => [newNestedReply, ...prev])
    setShowReplyInput(false)
  }

  const toggleNestedReplies = () => {
    setShowNestedReplies(!showNestedReplies)
  }

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
            const media_type = media_types[index];
            return <MediaRenderer media_type={media_type} media_url={media_url} key={index} />;
          })}
        <div className={`mt-3 d-flex align-items-center ${styles['y-reply-time-like']}`}>
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
            <button className="ms-sm-3" onClick={handleLike}>
              <img
                src={
                  isLiked
                    ? '/images/article/thumb-up-red.svg'
                    : '/images/article/thumb-up-black.svg'
                }
                alt="Like"
                style={{
                  transform: isClicked ? 'scale(1.5)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />
              <span
                className={`${numVibrate ? styles.vibrate : ''}`}
                onAnimationEnd={() => setNumVibrate(false)}
                style={{ display: 'inline-block', width: '40px', textAlign: 'center' }} // 固定寬度，居中顯示
              >
                {commentLikeCount}
              </span>
            </button>
            {/* 點擊「回覆」按鈕，若是 nested reply 則會傳入用戶名稱 */}
            <button
              className={`d-flex align-items-center ms-sm-3 ${styles['y-btn-reply-in-reply']}`}
              onClick={() => handleReplyClick(userName)}
            >
              <img src="/images/article/reply-origin.svg" alt="Reply" />
              <span className={`ms-1 ${styles['reply-text']}`}>回覆</span>
            </button>
          </div>
        </div>
        {/* 顯示回覆輸入框 (fade-in 動畫由 scss 管理) */}
        {showReplyInput && (
          <div
            ref={inputRef}
            id={`reply-input-${commentId}`} // 加入唯一的 id
            className={styles['fade-in']}
            style={{ transition: 'opacity 0.3s', width: '850px' }}
          >
            <ReplyInput
              articleId={articleId}
              parentId={commentId}
              onCommentSubmitted={handleNestedReplySubmitted}
              replyTo={replyTo}
            />
          </div>
        )}
        {/* Render nested replies if available */}
        {nestedReplies && nestedReplies.length > 0 && (
          <>
            <div className={`my-3 ${styles['y-hidden-reply-btn']}`}>
              <button onClick={toggleNestedReplies}>
                {showNestedReplies
                  ? `ㄧ 隱藏回覆`
                  : `ㄧ ${nestedReplies.length}則回覆`}
              </button>
            </div>
            {showNestedReplies &&
              nestedReplies.map((reply, idx) => {
                if (!reply) return null
                return (
                  <NestedReplyItem
                    key={reply.id || idx}
                    userName={reply?.nickname || reply?.name}
                    userProfile={reply.head}
                    text={reply.content}
                    time={reply.created_at}
                    media_urls={reply.media_urls}
                    media_types={reply.media_types}
                    parentId={reply.parent_id}
                    commentId={reply.id}
                    initialLikeCount={reply.like_count}
                    onReplyClick={handleReplyClick}
                  />
                )
              })}
            {showNestedReplies && (
              <div className={`my-3 ${styles['y-hidden-reply-btn']}`}>
                <button onClick={toggleNestedReplies}>
                  ㄧ 隱藏回覆
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// 回覆中的回覆元件
function NestedReplyItem({ userName, onReplyClick, parentId, ...props }) {
  // 加入與父層相同的 state
  const [isLiked, setIsLiked] = useState(false)
  const [commentLikeCount, setCommentLikeCount] = useState(props.initialLikeCount || 0)
  const [isClicked, setIsClicked] = useState(false)
  const [numVibrate, setNumVibrate] = useState(false)

  const parsedTime = new Date(props.time)
  const validTime = isNaN(parsedTime.getTime()) ? new Date() : parsedTime
  const timeAgo = formatDistanceToNow(validTime, {
    locale: zhTW,
    addSuffix: true,
  })

  // 使用與父層相同的按讚邏輯
  const handleLike = async () => {
    if (isLiked) {
      const newCount = commentLikeCount - 1
      setIsLiked(false)
      setCommentLikeCount(newCount)
      setNumVibrate(true)
      try {
        await fetch(`http://localhost:8000/api/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            likeableId: props.commentId,
            likeableType: 'article_comment',
            newLikeCount: newCount,
          }),
          credentials: 'include',
        })
      } catch (error) {
        console.error('Error updating comment unlike:', error)
      }
    } else {
      setIsLiked(true)
      setIsClicked(true)
      const newCount = commentLikeCount + 1
      setCommentLikeCount(newCount)
      setNumVibrate(true)
      setTimeout(() => setIsClicked(false), 300)
      try {
        await fetch(`http://localhost:8000/api/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            likeableId: props.commentId,
            likeableType: 'article_comment',
            newLikeCount: newCount,
          }),
          credentials: 'include',
        })
      } catch (error) {
        console.error('Error updating comment like count:', error)
      }
    }
  }

  const handleNestedReplyClick = () => {
    onReplyClick && onReplyClick(userName)
    // 找到對應的輸入框元素並滾動到該位置
    const inputElement = document.querySelector(`#reply-input-${parentId}`)
    if (inputElement) {
      inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <div className="d-flex">
      <div className={styles['y-reply-user-profile']}>
        <a href="#">
          <img src={props.userProfile} alt={userName} />
        </a>
      </div>
      <div className={`mx-3 ${styles['y-reply-content']}`}>
        <a href="#" className="text-black text-decoration-none">
          <h6 className={`mt-2 ${styles['y-reply-user-name']}`}>{userName}</h6>
        </a>
        <div className={styles['y-reply-content']}>
          <p className={`mt-3 ${styles['y-reply-text']}`}>{props.text}</p>
        </div>
        {/* 直接在這裡處理 media 的渲染 */}
        {props.media_urls &&
          props.media_urls.length > 0 &&
          props.media_urls.map((media_url, index) => {
            const media_type = props.media_types[index]
            if (media_type === 'image') {
              return (
                <div className={styles['y-reply-img']} key={index}>
                  <img
                    src={`/images/article_com_media/${media_url}`}
                    alt="Reply attachment"
                    style={{
                      width: '40%',
                      height: 'auto',
                      aspectRatio: '16 / 9',
                      objectFit: 'contain',
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
                      width: '40%',
                      height: 'auto',
                      aspectRatio: '16/9',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              )
            } else if (media_type === 'gif') {
              return (
                <div
                  className={styles['y-reply-img']}
                  key={index}
                  style={{
                    width: '200px',
                    height: '200px',
                    overflow: 'hidden',
                  }}
                >
                  <GifImage
                    src={media_url}
                    alt="Reply attachment"
                    containerSize="200px"
                  />
                </div>
              )
            }
            return null
          })}
        <div className={`mt-3 d-flex align-items-center ${styles['y-reply-time-like']}`}>
          <h6 className="my-auto me-sm-3">{timeAgo}</h6>
          <div className="d-flex mb-like-reply">
            <button className="ms-sm-3" onClick={handleLike}>
              <img
                src={
                  isLiked
                    ? '/images/article/thumb-up-red.svg'
                    : '/images/article/thumb-up-black.svg'
                }
                alt="Like"
                style={{
                  transform: isClicked ? 'scale(1.5)' : 'scale(1)',
                  transition: 'transform 0.3s ease',
                }}
              />
              <span
                className={`${numVibrate ? styles.vibrate : ''}`}
                onAnimationEnd={() => setNumVibrate(false)}
                style={{ display: 'inline-block', width: '40px', textAlign: 'center' }}
              >
                {commentLikeCount}
              </span>
            </button>
            <button
              className={`d-flex align-items-center ms-sm-3 ${styles['y-btn-reply-in-reply']}`}
              onClick={handleNestedReplyClick}
            >
              <img src="/images/article/reply-origin.svg" alt="Reply" />
              <span className={`ms-1 ${styles['reply-text']}`}>回覆</span>
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
  refreshTrigger,
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
  }, [articleId, refreshTrigger])

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
        setComments(organizeComments(data.comments))
      } catch (error) {
        console.error('Could not fetch comments:', error)
      }
    }

    if (articleId) {
      fetchComments()
    }
  }, [articleId, refreshTrigger])

  return (
    <div>
      <div className={styles['y-all-comment-btn']}>
        <button onClick={toggleComments}>
          {isCollapsed
            ? `- 共${count}則留言 -`
            : `- 隱藏全部留言 -`}
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
                articleId={articleId}               // ← 從最外層傳給 ReplyItem
                commentId={comment.id}
                userName={comment.nickname || comment.name}
                userProfile={comment.head}
                text={comment.content}
                time={comment.created_at}
                media_urls={comment.media_urls}
                media_types={comment.media_types}
                replies={comment.replies}
                likeCount={comment.like_count}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

