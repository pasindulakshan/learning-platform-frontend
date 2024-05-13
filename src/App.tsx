import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/shared/Sign-in";
import Register from "./components/shared/Sign-up";
import DashboardLayout from "./layouts/DashboardLayout";
import ViewAllCourses from "./pages/ViewAllCourses";
import CreateCourseTitle from "./pages/CreateCourseTitle";
import CreateCourse from "./pages/CreateCourse";
import BrowseCourses from "./pages/student/BrowseCourses";
import StudentDashboard from "./pages/student/StudentDashboard";
import ViewCourse from "./pages/student/ViewCourse";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
        </Route>

        <Route path="/instructor" element={<DashboardLayout />}>
          <Route path="courses" element={<ViewAllCourses />} />
          <Route path="create" element={<CreateCourseTitle />} />
          <Route path="courses/:courseId" element={<CreateCourse />} />
        </Route>

        <Route path="/student" element={<DashboardLayout />}>
          <Route path="browse" element={<BrowseCourses />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="courses/:courseId" element={<ViewCourse />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
