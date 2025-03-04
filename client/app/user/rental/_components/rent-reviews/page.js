// rent-reviews

import { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import StarRating from '../rent-rating/page';

const MySwal = withReactContent(Swal);

export default function RentReviews({ reviews = [] }) {
  const [reviewList, setReviewList] = useState(reviews);

  const handleReview = async (review) => {
    if (!review.id || review.comment_at !== null || review.status !== '已完成') {
      Swal.fire('錯誤', '此訂單無法評論', 'error');
      return;
    }

    let currentRating = review.rating || 0;
    MySwal.fire({
      title: '新增評論',
      html: `
        <textarea id="comment" class="swal2-textarea" placeholder="請輸入評論內容"></textarea>
        <div id="star-rating"></div>
      `,
      didOpen: () => {
        const container = document.getElementById('star-rating');
        if (container) {
          ReactDOM.render(
            <StarRating rating={currentRating} setRating={(value) => (currentRating = value)} />,
            container
          );
        }
      },
      showCancelButton: true,
      confirmButtonText: '提交',
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
          const response = await fetch(`http://localhost:8000/api/myorders/rent/reviews/${review.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('loginWithToken')}`,
            },
            body: JSON.stringify(result.value),
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
      {reviewList.map((review) => {
        console.log("檢查 RentReviews 傳入的 reviews:", reviews);

        return (
          <div key={review.id} className="review-item">
            <span>{review.comment || '尚未評論'}</span>
            {review.status === '已完成' && review.comment_at === null && (
              <button onClick={() => handleReview(review)}>新增評論</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
