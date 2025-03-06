// rent-reviews

'use client'

import { useState } from 'react'
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5'
import { FaRegPenToSquare } from 'react-icons/fa6'
import Swal from 'sweetalert2';
import StarRating from '../rent-rating/page'
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom/client'

const MySwal = withReactContent(Swal);

export default function RentReviews({ reviews = [], setReviews, currentUserId }) {
  console.log("🔍 [前端] 當前登入者 ID (currentUserId):", currentUserId);

  const [itemsPerPage, setItemsPerPage] = useState(3)

  // 📌計算平均評分
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0

  // 📌計算星星顯示（包括半星處理）
  const getStarDisplay = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (rating >= i - 0.3) {
        stars.push(<IoStar key={i} className="k-warn-text" />)
      } else if (rating >= i - 0.8) {
        stars.push(<IoStarHalf key={i} className="k-warn-text" />)
      } else {
        stars.push(<IoStarOutline key={i} className="k-warn-text" />)
      }
    }
    return <span>{stars}</span>
  }

  // 📌顯示更多評論 (每次顯示3條)
  const showMore = () => {
    setItemsPerPage(itemsPerPage + 3)
  }

  // 📌 格式化時間 (依照年份區分顯示)
  const formatDate = (timestamp) => {
    if (!timestamp) return '未設定';

    const date = new Date(timestamp);
    const now = new Date();

    // ✅ 今年的評論 → 顯示 MM/DD HH:mm
    if (date.getFullYear() === now.getFullYear()) {
      return {
        full: `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
        display: `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
      };
    } else {
      // ✅ 去年或更早的評論 → 顯示 YYYY/MM/DD
      return {
        full: `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`,
        display: `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
      };
    }
  };

  const handleEdit = async (review) => {

    if (!review.id) {
      Swal.fire('錯誤', '評論 ID 不存在！', 'error');
      return;
    }

    if (review.user_id !== currentUserId) {
      Swal.fire('錯誤', '你只能編輯自己的評論', 'error');
      return;
    }

    let currentRating = review.rating || 0;

    MySwal.fire({
      color: '#fff',
      background: '#23425a',
      title: '編輯留言',
      html: `
          <label class="my-2 d-block k-swal-label">評論內容</label>
          <textarea id="comment" class="form-control" rows="3" >${review.comment}</textarea>
          <label class="my-2 d-block k-swal-label">評分</label>
          <div id="star-rating"></div>
      `,
      didOpen: () => {
        const container = document.getElementById('star-rating')
        if (container) {
          const root = ReactDOM.createRoot(container)
          root.render(
            <StarRating
              rating={currentRating}
              setRating={(value) => {
                currentRating = value
              }}
            />
          );
        }
      },
      showCancelButton: true,
      confirmButtonText: '儲存',
      cancelButtonText: '取消',
      focusConfirm: false,
      customClass: {
        actions: 'd-flex justify-content-ends k-review-swal-actions',
        popup: 'k-review-swal-popup',
        confirmButton: 'k-review-swal-btn-1',
        cancelButton: 'k-review-swal-btn-2'
      },
      preConfirm: () => {
        const comment = document.getElementById('comment').value.trim();
        if (!comment || currentRating < 1) {
          Swal.showValidationMessage('請填寫評論內容並選擇評分');
          return false;
        }
        return { comment, rating: currentRating };
      }

    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("🚀 [前端] 發送 API 請求:", `http://localhost:8000/api/rental/reviews/${review.id}`, result.value);

          const res = await fetch(`http://localhost:8000/api/rental/reviews/${review.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('loginWithToken')}`,
            },
            body: JSON.stringify(result.value),
          });
          const responseData = await res.json(); // 🟢 確保 API 回應被解析

          if (!res.ok) {
            Swal.fire('錯誤', responseData.error || '更新失敗', 'error'); // 🟢 確保錯誤訊息被顯示
            return;
          }

          Swal.fire('成功', '評論已更新', 'success');
          // 🟢 確保 state 更新
          setReviews((prev) =>
            prev.map((r) =>
              r.id === review.id
                ? { ...r, ...result.value, comment_at: new Date().toISOString() }
                : r
            )
          );
        } catch (error) {
          Swal.fire('錯誤', error.message, 'error'); // 🟢 顯示錯誤訊息
        }
      }
    });
  };

  return (
    <div className="mt-4">
      <h5>評價</h5>
      <div className="d-flex align-items-center">
        <span className="k-star">{getStarDisplay(averageRating)}</span>
        <span className="k-warn-text ms-2">{averageRating.toFixed(1)} 分</span>
        <span className="ms-2">{reviews.length} 條評論</span>
      </div>
      <div className="mt-3" id="reviewContainer">
        {reviews.slice(0, itemsPerPage).map((review, index) => (
          <div key={index} className="border p-3 mb-3 d-flex">
            <img
              src={review.avatar || '/uploads/users.webp'}
              alt={review.name}
              onError={(e) => e.target.src = '/uploads/users.webp'}
              className="rounded-circle me-3"
              width="50"
              height="50"
            />
            <div>
              <strong className='me-1'>{review.name}</strong>
              <small className="text-muted" title={review.comment_at ? formatDate(review.comment_at).full : ''}>
                {review.comment_at ? formatDate(review.comment_at).display : <span className="k-no-time">🚫</span>}
              </small>
              <span>
                {review.user_id === currentUserId && (
                  <FaRegPenToSquare
                    className="k-main-text cursor-pointer k-pen ms-1"
                    onClick={() => handleEdit(review)}
                  />
                )}
              </span>
              <p>
                {review.comment.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <span className='k-star'>{getStarDisplay(review.rating)}</span>

            </div>
          </div>
        ))}

        {itemsPerPage < reviews.length && (
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-warning k-main-radius"
              onClick={showMore}
            >
              顯示更多
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
