"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./teacher-edit.module.scss";
import { FaBars } from "react-icons/fa";

export default function TeacherEdit() {
  const { id } = useParams(); // ✅ 取得 URL 的 `teacherId`
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 📌 取得講師資料
  useEffect(() => {
    if (!id) return;

    const fetchTeacher = async () => {
      try {
        const res = await fetch(`/api/teachers/${id}`);
        if (!res.ok) throw new Error(`❌ API 錯誤: ${res.statusText}`);

        const data = await res.json();
        setFormData(data);
      } catch (error) {
        console.error("❌ 無法獲取講師資料:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  // 📌 監聽輸入框變更
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📌 處理圖片上傳
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 📌 更新講師資料
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("❌ 更新講師資料失敗");

      alert("✅ 講師資料更新成功");
    } catch (error) {
      console.error(error);
      alert("❌ 更新失敗");
    }
  };

  if (loading) return <p>載入中...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!formData) return <p>找不到講師資料</p>;

  return (
    <div className="col-12 col-xl-10">
      {/* 🔥 Sidebar 開關按鈕 (小螢幕) */}
      <button className="btn btn-dark d-xl-none">
        <FaBars />
      </button>

      <div className={styles["center-content"]}>
        <div className={styles["nav-bar"]}>
          <h1>編輯講師資料</h1>
        </div>

        {/* 📌 編輯表單 */}
        <form className={styles["teacher-edit"]} onSubmit={handleSubmit}>
          <div className="row">
            {/* 🔹 講師照片上傳 */}
            <div className="col-md-4">
              <div className={styles["form-group"]}>
                <label>講師照片 <span className={styles["required"]}>*</span></label>
                <div className={styles["image-upload"]}>
                  <img src={formData.image || "/images/teacher/default.avif"} alt="講師圖片" />
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
              </div>
            </div>

            {/* 🔹 右側輸入區 */}
            <div className="col-md-8">
              <div className={styles["form-row"]}>
                <div className={styles["form-group"]}>
                  <label>講師名稱</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className={styles["form-group"]}>
                  <label>電子郵件</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
              </div>

              <div className={styles["form-group"]}>
                <label>講師簡介</label>
                <textarea name="bio" rows="5" value={formData.bio} onChange={handleInputChange} required />
              </div>

              {/* 🔹 社群連結 */}
              {["website", "facebook", "instagram", "youtube"].map((field) => (
                <div key={field} className={styles["form-group"]}>
                  <label>{field.toUpperCase()}</label>
                  <input type="text" name={field} value={formData[field]} onChange={handleInputChange} />
                </div>
              ))}

              {/* 🔹 按鈕區 */}
              <div className={styles["form-actions"]}>
                <button type="submit" className={styles["save-btn"]}>儲存</button>
                <button type="button" className={styles["cancel-btn"]}>返回課程列表</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
