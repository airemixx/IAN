import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";


// 創建 Context
const TeacherContext = createContext();

// 提供者組件
export const TeacherProvider = ({ children }) => {
  const [teachers, setTeachers] = useState([]); // 所有老師
  const [teacher, setTeacher] = useState(null); // 單筆老師資料
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ 用於重導向

  // ✅ 取得所有老師（包含 Token）
  const fetchAllTeachers = async () => {
    setLoading(true);
    const token = localStorage.getItem("loginWithToken");
    if (!token) {
      console.error("❌ Token 不存在，請先登入");
      router.push("/login"); // ✅ 自動導向登入頁面
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/teachers", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        console.error("❌ 未授權，請重新登入");
        localStorage.removeItem("loginWithToken"); // ✅ 清除過期 Token
        router.push("/login"); // ✅ 跳轉到登入頁面
        return;
      }

      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      console.error("❌ 獲取講師列表失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 取得單筆老師資料（支援 `me`）
  const fetchTeacherById = async (teacherId) => {
    setLoading(true);
    const token = localStorage.getItem("loginWithToken");
    if (!token) {
      console.error("❌ Token 不存在，請先登入");
      router.push("/login"); // ✅ 導向登入頁面
      return;
    }

    try {
      const res = await fetch(`http://localhost:8000/api/teachers/${teacherId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 401) {
        console.error("❌ 未授權，請重新登入");
        localStorage.removeItem("loginWithToken"); // ✅ 清除過期 Token
        router.push("/login"); // ✅ 導向登入頁面
        return;
      }

      const data = await res.json();
      setTeacher(data);
    } catch (err) {
      console.error("❌ 獲取講師資料失敗:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeachers(); // ✅ 頁面載入時獲取所有老師
  }, []);

  return (
    <TeacherContext.Provider value={{ teachers, teacher, fetchTeacherById, loading }}>
      {children}
    </TeacherContext.Provider>
  );
};

// ✅ 自訂 Hook，確保 `useTeachers` 只能在 `TeacherProvider` 內使用
export const useTeachers = () => {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useTeachers 必須在 TeacherProvider 內使用！");
  }
  return context;
};
