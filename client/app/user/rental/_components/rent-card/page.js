import React, { useState, useEffect } from 'react';
import styles from "./RentCard.module.scss";
import Link from 'next/link'

export default function RentCard() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //日期格式化
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : "N/A";
  };

  useEffect(() => {
    const token = localStorage.getItem("loginWithToken");
    console.log("發送 API 請求，Token:", token);

    if (!token) {
      setError("未登入，請先登入後查看租賃紀錄");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/myrent/rent", { 
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then(response => {
        console.log("API 回應狀態碼:", response.status);
        if (response.status === 401) {
          throw new Error("未授權，請重新登入");
        }
        if (!response.ok) {
          throw new Error(`HTTP 錯誤! 狀態碼: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("API 回應資料:", data);
        setRentals(data.products || []); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching rentals:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-5">載入中...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">❌ {error}</div>;
  }

  return (
    <section className="mb-5">
      <h5 className="mb-3">租賃</h5>
      <div className="row g-4">
        {rentals.length === 0 ? (
          <div className="text-center">暫無租賃紀錄</div>
        ) : (
          rentals.map((rental) => (
            <div key={rental.rental_order_id} className="col-12 col-md-6 col-lg-4">
              <div className={`p-4 ${styles.collectionCard}`}>
                <div 
                  className={`text-end ${styles.maturity}`} 
                  style={{ color: rental.status === "已完成" ? "green" : "red" }}
                >
                  {rental.status}
                </div>
                {/* ✅ 確保圖片可用 */}
                <img 
                  src={rental.image_url || "/images/product/default.png"} 
                  alt={rental.product_name} 
                  className="mb-3 img-fluid"
                />
                <div className={styles.cardDivider} />
                <h6 className={styles.textGray}>{rental.brand_name}</h6>
                <h5 className="mb-3">{rental.product_name}</h5>
                <div>
                  <h6>租賃日期: {formatDate(rental.start_date)}</h6>
                  <h6 className={styles.maturity}>  到期日期:   {formatDate(rental.end_date)}</h6>
                </div>
              </div>
            </div>
          ))
        )}

        {/* ✅ 添加收藏區塊 */}
  
        <div className="col-12 col-md-6 col-lg-4">
        <Link href="/rental" className={`${styles.noUnderline}`}>
          <div className={`${styles.addCollection} ${styles.collectionCard}`}>
            <div className="text-center">
              <div className={`${styles.addCircle} mx-auto mb-2`} />
              <h5>尋找租賃相機</h5>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
