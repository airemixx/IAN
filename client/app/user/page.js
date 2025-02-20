'use client'
import Link from 'next/link'
import styles from './user.module.scss'
import React, { useState, useEffect } from 'react'
import useAuth from '@/hooks/use-auth'
import Sidenav from './_components/Sidenav/page'

export default function UserPage(props) {
  const { token, user = {}, loading, setUser } = useAuth()
  const [name, setName] = useState('')
  const [birthday, setBirthday] = useState('')
  const [password, setPassword] = useState('')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      console.log("生日資料:", user.birthday); // ✅ 確保生日有正確讀取
      setName(user.name || '');
      setBirthday(user.birthday); // ✅ 這裡應該已經是 YYYY-MM-DD
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-5">載入中...</div>
  }

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.account}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await response.json()
      if (result.status !== 'success') throw new Error(result.message)

      setUser(result.data) // ✅ 更新本地 user 狀態
    } catch (error) {
      console.error('取得最新資料失敗:', error)
    }
  }

  //上傳圖片函式
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("account", user.account); // 傳遞帳號，讓後端知道要更新誰

    try {
      const response = await fetch("http://localhost:8000/api/users/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status !== "success") throw new Error(result.message);

      // ✅ 更新 user.head，讓前端立即顯示新頭像
      setUser({ ...user, head: result.imageUrl });
    } catch (error) {
      console.error("圖片上傳失敗:", error);
      alert("圖片上傳失敗，請稍後再試");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
  
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user.account}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            password: password || undefined, // 不傳遞空密碼
            birthday, // 確保格式是 YYYY-MM-DD
            head: user.head,
          }),
        }
      );
  
      const result = await response.json();
      if (result.status !== 'success') throw new Error(result.message);
  
      alert('更新成功！');
  
      // ✅ 直接更新 user 狀態，避免 UI 延遲
      await fetchUserData(); 
    } catch (error) {
      console.error('更新失敗:', error);
      alert('更新失敗，請稍後再試');
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <div>
      <div className={`container py-4`}>
        <div className={`row ${styles.marginTop}`}>
          <Sidenav />

          {/* 主要內容區 */}
          <div className="col-md-9">
            <div className="mb-4">
              <h1>會員資料修改</h1>
              <p className="text-muted">
                在此部分中，您可以尋找和編輯您的個人檔案和地址。您還可以管理您的相機電子報訂閱和更改密碼。
              </p>
            </div>

            {/* 橫幅區域 */}
            <div
              className={`${styles.heroSection} mb-4 p-4 d-flex flex-column justify-content-center`}
            >
              <h6 className="text-black ms-3">獲取相機最新文章</h6>
              <button className={styles.customBtn}>立即前往</button>
            </div>

            {/* 表單區域 */}
            <div className="row">
              {/* 個人資料表單 */}
              <div className="col-lg-7 mb-4">
                <div className={styles.customCard}>
                  <form onSubmit={handleUpdate}>
                    <div className="d-flex flex-column align-items-center ">
                      <div className="avatar-container mb-3">
                        <img
                          id="avatar"
                          src={user.head ? user.head : "/uploads/users.webp"} // ✅ 使用相對路徑
                          alt="大頭貼"
                          className={styles.avatar}
                        />
                      </div>
                      <div className="mb-3 ">
                        <input
                          type="file"
                          id="fileInput"
                          className="fileInput"
                          accept="image/*"
                          onChange={handleImageUpload} // ✅ 綁定上傳函式
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">電郵地址</label>
                      <input
                        type="email"
                        className={`form-control ${styles.customInput}`}
                        disabled
                        value={user?.mail || ''}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">名字 *</label>
                      <input
                        type="text"
                        className={`form-control ${styles.customInput}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">暱稱 *</label>
                      <input
                        type="text"
                        className={`form-control ${styles.customInput}`}
                        disabled
                        value={user?.nickname || ''}
                        readOnly
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">出生日期</label>
                      <input
                        type="date"
                        value={birthday || ""} // ✅ `YYYY-MM-DD` 格式
                        onChange={(e) => setBirthday(e.target.value)} // ✅ 確保不會帶時間
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className={styles.customBtn}
                      disabled={updating}
                    >
                      更新我的帳戶
                    </button>
                  </form>
                </div>
              </div>

              {/* 密碼修改區 */}
              <div className="col-lg-5 mb-4">
                <div className={styles.customCard}>
                  <h5>我的密碼</h5>
                  <p className="mt-4 text-muted">
                    如要更改密碼，您需要先輸入目前的密碼。
                  </p>
                  <Link href="/user/passwordChange">
                    <button className={`mt-4 ${styles.customBtn}`}>
                      更新我的密碼
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* 地址區域 */}
            <div className={`${styles.customCard} mt-4`}>
              <h4 className="mb-4">我的地址</h4>
              <div className="mb-3">
                <strong>送貨地址:</strong>
                <p className="text-muted">尚未填寫送貨地址</p>
              </div>
              <div>
                <Link href="#" className="text-decoration-none">
                  選擇預設送貨地址
                </Link>
                <br />
                <Link href="#" className="text-decoration-none">
                  添加新送貨地址
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
