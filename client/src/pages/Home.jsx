import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Award, TrendingUp, Phone, Mail, Star, CheckCircle, ArrowRight, BookOpen, Target, Trophy } from 'lucide-react';
import axios from "axios";

// Import components
import Navbar from '../components/Navbar';
import StudentForm from '../components/StudentForm';
import Colleges from './Colleges'; 

const API_URL = 'https://ananta-education.onrender.com'; 

// API functions - same as your existing ones
const getCourses = async () => {
  try{
    const res = await axios.get(`${API_URL}/courses`)
    return res.data;
  }
  catch(err){
    console.log("Error fetching courses:" , err);
    return [];
  }
};

const getColleges = async () => {
  try{
    const res = await axios.get(`${API_URL}/colleges`);
    return res.data;
  }
  catch(err){
    console.log("Error fetching colleges:" , err);
    return [];
  }
};

const registerStudent = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation state
  const [currentView, setCurrentView] = useState('home');
  const [selectedCollegeId, setSelectedCollegeId] = useState(null);

  // Navigation handlers
  const handleCollegeClick = (collegeId) => {
    setSelectedCollegeId(collegeId);
    setCurrentView('colleges');
  };

  const handleViewAllColleges = () => {
    setSelectedCollegeId(null);
    setCurrentView('colleges');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedCollegeId(null);
  };

  // Map courses and colleges data on component mount
  useEffect(() => {
    const fetchAndMapData = async () => {
      try {
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
          type: college.name.includes('IIT') || college.name.includes('IIM') || college.name.includes('AIIMS') 
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

  // Show colleges page if currentView is 'colleges'
  if (currentView === 'colleges') {
    return (
      <Colleges
        selectedCollegeId={selectedCollegeId}
        courses={courses}
        colleges={colleges}
        onBackToHome={handleBackToHome}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-100 border-t-orange-500 mx-auto mb-6"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <p className="text-blue-700 font-semibold text-lg">Loading your future opportunities...</p>
          <p className="text-gray-600 mt-2">Preparing the best colleges for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-white">
  
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-96 h-96 bg-orange-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/2 -left-32 w-80 h-80 bg-white rounded-full opacity-5 blur-2xl"></div>
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-orange-300 rounded-full opacity-10 blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
            <Star className="h-4 w-4 text-orange-300 mr-2" />
            <span className="text-white font-medium">Top College Consultancy for students</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-white">
            Your Dream Career
            <span className="block bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent mt-2">
              Starts Here
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-4xl mx-auto leading-relaxed">
            Expert guidance for Indian students to find the perfect college and course. 
            Join thousands who achieved their dreams with our personalized counseling.
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-orange-500 rounded-full p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <p className="text-blue-100">Students Guided Successfully</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-orange-500 rounded-full p-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">{colleges.length}+</div>
              <p className="text-blue-100">Premium Partner Colleges</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="flex items-center justify-center mb-3">
                <div className="bg-orange-500 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <p className="text-blue-100">Admission Success Rate</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={handleViewAllColleges}
              className="group border-2 border-white text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              Explore Colleges
              <BookOpen className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-orange-100 text-orange-600 rounded-full px-6 py-2 mb-6 font-medium">
              <Trophy className="h-4 w-4 mr-2" />
              Why Students Choose Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose Ananta Education?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide comprehensive guidance tailored specifically for Indian students to achieve their academic dreams
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-transparent hover:border-blue-100">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Counselors</h3>
              <p className="text-gray-600 leading-relaxed">Get personalized guidance from experienced education counselors who understand the Indian education system inside out</p>
              <div className="mt-6 flex items-center justify-center text-blue-600 font-semibold group-hover:text-orange-600 transition-colors">
                <CheckCircle className="h-4 w-4 mr-2" />
                Certified Professionals
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-transparent hover:border-orange-100">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Top Colleges</h3>
              <p className="text-gray-600 leading-relaxed">Access to {colleges.length}+ premier institutions across India including IITs, IIMs, AIIMS, and top private colleges</p>
              <div className="mt-6 flex items-center justify-center text-orange-600 font-semibold group-hover:text-blue-600 transition-colors">
                <Target className="h-4 w-4 mr-2" />
                Premium Partnerships
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center border-2 border-transparent hover:border-blue-100">
              <div className="bg-gradient-to-r from-blue-600 to-orange-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Career Success</h3>
              <p className="text-gray-600 leading-relaxed">95% of our students secure admission to their preferred colleges with scholarships and financial aid support</p>
              <div className="mt-6 flex items-center justify-center text-blue-600 font-semibold group-hover:text-orange-600 transition-colors">
                <Star className="h-4 w-4 mr-2" />
                Proven Excellence
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Colleges Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 rounded-full px-6 py-2 mb-6 font-medium">
              <BookOpen className="h-4 w-4 mr-2" />
              Our Partner Institutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Colleges
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our premium partner institutions offering world-class education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.slice(0, 6).map((college, index) => (
              <div 
                key={college._id}
                onClick={() => handleCollegeClick(college._id)}
                className="group bg-white border-2 border-gray-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 hover:border-orange-200"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                      {college.name}
                    </h3>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-2 rounded-full whitespace-nowrap ml-3 ${
                    college.type === 'Government' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {college.type}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mr-3"></div>
                  <span className="font-medium">{college.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-50 rounded-full p-2 mr-3">
                      <BookOpen className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-blue-600 font-semibold">
                      {college.courseCount} Courses
                    </span>
                  </div>
                  <div className="flex items-center text-orange-600 group-hover:text-orange-700 font-semibold transition-colors">
                    <span className="mr-2">Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={handleViewAllColleges}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              View All Colleges
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <main className="max-w-6xl mx-auto px-4 py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-orange-100 text-orange-600 rounded-full px-6 py-2 mb-6 font-medium">
            <Target className="h-4 w-4 mr-2" />
            Start Your Journey
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards your dream career. Our expert counselors are here to guide you through every step of your educational journey.
          </p>
        </div>
        
        <div className="bg-white rounded-3xl shadow-xl p-2">
          <StudentForm 
            courses={courses} 
            colleges={colleges} 
            registerStudent={registerStudent}
            id="student-registration"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-6">
                
                  <img 
      src="/logo.jpg" 
      alt="Ananta Education Logo" 
      className="h-24 w-24 object-contain m-4"
    />
                
                <span className="text-3xl font-bold">Ananta Education</span>
              </div>
              <p className="text-gray-300 mb-6 max-w-md leading-relaxed text-lg">
                Empowering Indian students to achieve their academic dreams through expert counseling and personalized guidance since 2020.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <div className="bg-blue-700 rounded-lg p-2 mr-3">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="bg-orange-600 rounded-lg p-2 mr-3">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>info@anantaeducation.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-300">Quick Links</h3>
              <ul className="space-y-3 text-gray-300">
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />About Us</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Our Services</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Success Stories</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-orange-300">Categories</h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <button 
                    onClick={handleViewAllColleges}
                    className="hover:text-orange-300 transition-colors duration-200 text-left flex items-center"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />
                    All Colleges
                  </button>
                </li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Engineering</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Management</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Medical</a></li>
                <li><a href="#" className="hover:text-orange-300 transition-colors duration-200 flex items-center"><ArrowRight className="h-4 w-4 mr-2 opacity-0 hover:opacity-100 transition-opacity" />Arts & Science</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-300">
              <p>&copy; 2025 Ananta Education. All rights reserved.</p>
              <p className="mt-4 md:mt-0">Helping students achieve their dreams since 2020.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;