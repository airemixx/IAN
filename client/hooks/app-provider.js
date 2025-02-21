
import { TeacherProvider } from "./use-teachers"
import { UserProvider } from "./use-users";
import { CourseProvider } from ".//use-courses";

const AppProvider = ({ children }) => {
  return (
    <UserProvider>
      <TeacherProvider> 
        <CourseProvider>
          {children}
        </CourseProvider>
      </TeacherProvider>
    </UserProvider>
  );
};

export default AppProvider;
