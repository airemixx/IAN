'use client'
import Link from 'next/link'
import styles from './register.module.scss'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";


export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: '',
    firstName: '',
    nickName: '',
    password: '',
    confirmPassword: '',
    email: '',
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState('/uploads/users.webp') // 預設大頭貼
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // 處理輸入變更
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // 改用 name 屬性
    });
  };

  // 處理圖片選擇 & 預覽
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file }); // 儲存檔案
      setAvatarPreview(URL.createObjectURL(file)); // 預覽圖片
    }
  };

  // 提交表單
  const handleRegister = async (e) => {
    e.preventDefault();

    // 驗證密碼是否一致
    if (formData.password !== formData.confirmPassword) {
      setError('❌ 密碼與確認密碼不一致！');
      return;
    }

    setLoading(true); // 設定 loading 狀態
    setError('');
    setSuccessMessage('');

    try {
      // 用 FormData 處理檔案上傳
      const formDataToSend = new FormData();
      formDataToSend.append('account', formData.email); // 使用 email 作為帳號
      formDataToSend.append('name', formData.firstName);
      formDataToSend.append('nickname', formData.nickName);
      formDataToSend.append('mail', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('gender', formData.gender);

      // 如果有選擇圖片，就加入 FormData
      if (formData.avatar) {
        formDataToSend.append('avatar', formData.avatar);
      }

      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.status === 'success') {
        setSuccessMessage('✅ 帳戶創建成功！請登入');
        setError('');
        await new Promise((resolve) => {
          setFormData({ 
            gender: '', 
            firstName: '', 
            nickName: '', 
            password: '', 
            confirmPassword: '', 
            email: '', 
            avatar: null,
          });
          setAvatarPreview('/uploads/users.webp');
          alert('✅ 帳戶創建成功！請登入');
          resolve();
        });

        router.push('/login');
      } else {
        setError(`❌ ${result.message}`);
      }
    } catch (err) {
      setError('❌ 註冊失敗，請稍後再試！');
    } finally {
      setLoading(false); // 解除 loading 狀態
    }
  };


  return (
    <div className={`container ${styles.container1}`}>
      <div className={styles.formBox}>
        <h2 className="text-center">建立帳戶</h2>
        <p className="text-center mb-4">
          映相坊邀請您進入非凡世界，提供豐富的作品、文章資訊和服務。
        </p>

        {/* 顯示錯誤或成功訊息 */}
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <form onSubmit={handleRegister}>
          {/* 大頭貼上傳 */}
          <div className="mb-3 text-center">
            <div className="avatar-container mb-3">
              <img id="avatar" src={avatarPreview} alt="大頭貼" className={styles.avatar} />
            </div>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="gender">
              稱謂 *
            </label>
            <select
              name="gender"
              className={`form-control ${styles.formControl}`}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                請選擇
              </option>
              <option value="先生">先生</option>
              <option value="女士">女士</option>
            </select>
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="firstName">
              名字 *
            </label>
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="nickName">
              暱稱 *
            </label>
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              name="nickName"
              value={formData.nickName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="email">
              電子郵件 *
            </label>
            <input
              type="email"
              className={`form-control ${styles.formControl}`}
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="password">
              密碼 *
            </label>
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className={styles.formLabel} htmlFor="confirmPassword">
              確認您的密碼 *
            </label>
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreePrivacy"
              required
            />
            <label className={styles.formLabel} htmlFor="agreePrivacy">
              我已閱讀並同意隱私條款。
            </label>
          </div>

          <button type="submit" className={styles.btnCustom} disabled={loading}>
            {loading ? '註冊中...' : '建立帳戶'}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link href="/login">我已擁有帳戶</Link>
        </div>
      </div>
    </div>
  )
}
