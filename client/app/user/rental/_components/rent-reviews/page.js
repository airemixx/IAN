// rent-reviews

import { useState } from 'react';
import Swal from 'sweetalert2';
import StarRating from '../rent-rating/page';
import withReactContent from 'sweetalert2-react-content';
import ReactDOM from 'react-dom/client'

const MySwal = withReactContent(Swal);

export default function RentReviews({ reviews = [] }) {
  const [reviewList, setReviewList] = useState(reviews);

  const handleReview = async (review) => {
    if (!review.id || review.status !== '已完成') {
      Swal.fire('錯誤', '訂單完成後可以留言唷～', 'error');
      return;
    }

    let currentRating = review.rating || 0;

    MySwal.fire({
      color: '#fff',
      background: '#23425a',
      html: `
          <h4>
          ${review.brand_name ? `<span class='me-1'>${review.brand_name}</span> ` : ''}
          <span> ${review.product_name}</span>

          </h4 >
          <img 
            src='${review.image_url || "/images/rental/test/Leica-Q3-0.png"}' 
            class='k-swal-label d-block mx-auto m-0' 
            style='width: 50%;' 
            alt='${review.product_name}' 
          />
          <label class="my-2 d-block k-swal-label">租賃日期</label>
          <div class='k-swal-label k-aux-color-3'>
            <span>${new Date(review.start_date).toISOString().split('T')[0]}</span>
            ~
            <span>${new Date(review.end_date).toISOString().split('T')[0]}</span>
          </div>
          <label class="my-2 d-block k-swal-label">評論內容</label>
          <textarea id="comment" class="form-control" rows="3" ${review.comment_at !== null ? 'disabled style="caret-color: transparent;"' : ''}>${review.comment || ''}</textarea>
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
      showConfirmButton: review.comment_at === null,
      confirmButtonText: '儲存',
      cancelButtonText: '關閉',
      focusConfirm: false,
      customClass: {
        actions: 'd-flex justify-content-ends k-review-swal-actions',
        popup: 'k-review-swal-popup',
        confirmButton: 'k-review-swal-btn-1',
        cancelButton: 'k-review-swal-btn-2'
      },
      preConfirm: () => {
        if (review.comment_at !== null) return false; // 確保 Swal 正確處理
        const comment = document.getElementById('comment').value.trim();
        if (!comment || currentRating < 1) {
          Swal.showValidationMessage('請填寫評論內容並選擇評分');
          return false;
        }
        return { comment, rating: currentRating };
      }

    }).then(async (result) => {
      if (result.isConfirmed && review.comment_at === null) {
        try {
          const response = await fetch(`http://localhost:8000/api/myorders/rent/reviews/${review.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('loginWithToken')}`,
            },
            body: JSON.stringify({
              comment: result.value.comment,
              rating: result.value.rating
            }),
          });

          if (!response.ok) throw new Error('提交失敗');

          Swal.fire('成功', '評論已提交', 'success');
          setReviewList((prev) => prev.map((r) => (r.id === review.id ? { ...r, ...result.value, comment_at: new Date().toISOString() } : r)));
        } catch (error) {
          Swal.fire('錯誤', '無法提交評論', 'error');
        }
      }
    });
  };


  return (
    <div>
      {reviewList.map((review) => (
        <div key={review.id} className="review-item">
          {review.status === '已完成' && (
            <button className="btn btn-info k-main-radius" onClick={() => handleReview(review)}>評論</button>
          )}
        </div>
      ))}
    </div>
  );
}
