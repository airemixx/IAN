
import { createContext, useContext, useState, useEffect } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]); // 所有課程
  const [course, setCourse] = useState(null); // 單筆課程
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/courses")
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
        setLoading(false);
      });
  }, []);

  // 取得單筆課程資料
  const fetchCourseById = (courseId) => {
    setLoading(true);
    fetch(`http://localhost:8000/api/courses/${courseId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch course:", err);
        setLoading(false);
      });
  };

  return (
    <CourseContext.Provider value={{ courses, course, fetchCourseById, loading }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  return useContext(CourseContext);
};
