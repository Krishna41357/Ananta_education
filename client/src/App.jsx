import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Colleges from "./pages/Colleges";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin"; 
import StudentFormModal from "./components/StudentFormModal";

const API_URL = 'https://ananta-education.onrender.com';

// API functions
const getCourses = async () => {
  try {
    const res = await axios.get(`${API_URL}/courses`);
    return res.data;
  } catch (err) {
    console.log("Error fetching courses:", err);
    return [];
  }
};

const getColleges = async () => {
  try {
    const res = await axios.get(`${API_URL}/colleges`);
    return res.data;
  } catch (err) {
    console.log("Error fetching colleges:", err);
    return [];
  }
};

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const navigate = useNavigate();

  // Fetch data on app mount
  useEffect(() => {
    const fetchAndMapData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from APIs
        const [coursesData, collegesData] = await Promise.all([
          getCourses(),
          getColleges()
        ]);

        // Map courses by level for better organization
        const mappedCourses = coursesData.map(course => ({
          ...course,
          category: course.level === 'Bachelor' ? 'Undergraduate' : 'Postgraduate'
        }));

        // Map colleges with additional computed properties
        const mappedColleges = collegesData.map(college => ({
          ...college,
          type: college.name.includes('IIT') || 
                college.name.includes('IIM') || 
                college.name.includes('AIIMS') || 
                college.name.includes('NIT') || 
                college.name.includes('IIIT') || 
                college.name.includes('Central University')
            ? 'Government' : 'Private',
          courseCount: college.coursesOffered?.length || 0
        }));

        setCourses(mappedCourses);
        setColleges(mappedColleges);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndMapData();
  }, []);

  // Navigation handlers
  const handleCollegeClick = (collegeId) => {
    // Navigate to colleges page with specific college ID
    navigate('/colleges', { state: { selectedCollegeId: collegeId } });
  };

  const handleViewAllColleges = () => {
    // Navigate to colleges page without specific college
    navigate('/colleges');
  };

  const handleCourseClick = (courseId) => {
    // Navigate to courses page with specific course ID
    navigate('/courses', { state: { selectedCourseId: courseId } });
  };

  const handleViewAllCourses = () => {
    // Navigate to courses page without specific course
    navigate('/courses');
  };

  // Show loading screen while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 border-t-indigo-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-pulse">
              <div className="h-6 w-6 bg-indigo-400 rounded absolute top-2 right-2"></div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Loading Application</h3>
          <p className="text-slate-600 font-medium">
            Fetching colleges, courses, and preparing your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Show Navbar on all pages except admin */}
      {location.pathname !== "/admin" && (
        <Navbar 
          courses={courses} 
          colleges={colleges}
          onCollegeClick={handleCollegeClick}
          onViewAllColleges={handleViewAllColleges}
          onCourseClick={handleCourseClick}
          onViewAllCourses={handleViewAllCourses}
        />
      )}
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              courses={courses} 
              colleges={colleges}
              onCollegeClick={handleCollegeClick}
              onViewAllColleges={handleViewAllColleges}
            />
          } 
        />
        <Route 
          path="/colleges" 
          element={
            <Colleges 
              courses={courses} 
              colleges={colleges}
            />
          } 
        />
        <Route 
          path="/courses" 
          element={
            <Courses 
              courses={courses} 
              colleges={colleges}
            />
          } 
        />
        <Route 
          path="/contact" 
          element={<Contact />} 
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <AdminDashboard onLogout={() => setIsAdminLoggedIn(false)} />
            ) : (
              <AdminLogin onLogin={() => setIsAdminLoggedIn(true)} />
            )
          }
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Only show StudentFormModal if NOT on admin route */}
      {location.pathname !== "/admin" && (
        <StudentFormModal courses={courses} colleges={colleges} />
      )}
    </>
  );
}

// Wrap App with Router outside
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}