  import React, { useState, useEffect } from 'react';
  import { GraduationCap, Users, Award, TrendingUp, Phone, Mail, Star, CheckCircle, ArrowRight, BookOpen, Target, Trophy } from 'lucide-react';
  import axios from "axios";
  import useScrollToHash from '../hooks/useScrollToHash';

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
    useScrollToHash();
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

    // if (loading) {
    //   return (
    //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-orange-50">
    //       <div className="text-center">
    //         <div className="relative">
    //           <div className="animate-spin rounded-full h-20 w-20 border-4 border-orange-100 border-t-orange-500 mx-auto mb-6"></div>
    //           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    //             <GraduationCap className="h-8 w-8 text-blue-600" />
    //           </div>
    //         </div>
    //         <p className="text-blue-700 font-semibold text-lg">Loading your future opportunities...</p>
    //         <p className="text-gray-600 mt-2">Preparing the best colleges for you</p>
    //       </div>
    //     </div>
    //   );
    // }

    return (
      <div className="min-h-screen w-screen bg-white">
    
     

  {/* Hero Section */}
  <header className="relative overflow-hidden min-h-[400px] md:min-h-[700px] lg:min-h-[800px]">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0">
      <img 
        src="/campus-background.png" 
        alt="University Campus"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 via-blue-800/80 to-blue-900/85"></div>
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
    </div>
    
    {/* Decorative elements - now more subtle */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-4 -right-4 w-96 h-96 bg-orange-400 rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute top-1/2 -left-32 w-80 h-80 bg-white rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-orange-300 rounded-full opacity-5 blur-2xl"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
      <div className="inline-flex items-center bg-white/15 backdrop-blur-md border border-white/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8 shadow-lg">
        <Star className="h-4 w-4 text-orange-300 mr-2" />
        <span className="text-white font-medium text-sm sm:text-base">Top College Consultancy for students</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight text-white px-4">
        Kick Start Your Dream Career
        <span className="block bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300 bg-clip-text text-transparent mt-2 drop-shadow-lg">
          With Ananta Education
        </span>
      </h1>
      
      <div className="max-w-4xl mx-auto px-4 mb-8 sm:mb-12">
  <div className="bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20">
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-medium">
      Expert guidance for Indian students to find the perfect college and course. 
      Join thousands who achieved their dreams with our personalized counseling.
    </p>
  </div>
</div>
      
      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-orange-500/90 rounded-full p-2 sm:p-3 shadow-lg">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-md">10,000+</div>
          <p className="text-blue-50 text-sm sm:text-base">Students Guided Successfully</p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-orange-500/90 rounded-full p-2 sm:p-3 shadow-lg">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-md">{colleges.length}+</div>
          <p className="text-blue-50 text-sm sm:text-base">Premium Partner Colleges</p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 sm:p-6 text-center shadow-xl hover:bg-white/20 transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="bg-orange-500/90 rounded-full p-2 sm:p-3 shadow-lg">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-md">95%</div>
          <p className="text-blue-50 text-sm sm:text-base">Admission Success Rate</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
        <button className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-xl">
          Start Your Journey
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={handleViewAllColleges}
          className="group border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-white hover:text-blue-700 transition-all duration-300 flex items-center justify-center shadow-xl"
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
                <p className="text-gray-600 leading-relaxed">  Choose from {colleges.length}+ elite institutions nationwide - featuring India's most sought-after colleges and universities with proven placement records
 </p>
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
        <main className="max-w-6xl mx-auto px-4 py-20 bg-gradient-to-br from-orange-50 via-orange-100 to-blue-100">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white border-2 border-orange-400 text-orange-600 rounded-full px-6 py-2 mb-6 font-bold shadow-lg">
              <Target className="h-4 w-4 mr-2" />
              Start Your Journey
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 drop-shadow-md" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.8), -1px -1px 2px rgba(0,0,0,0.1)'}}>
              Ready to Shape Your Future?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-gray-800 max-w-4xl mx-auto leading-relaxed px-4 font-bold drop-shadow-lg" style={{textShadow: '2px 2px 4px rgba(255,255,255,0.9), -1px -1px 2px rgba(0,0,0,0.2)'}}>
  Expert guidance for Indian students to find the perfect college and course. 
  Join thousands who achieved their dreams with our personalized counseling.
</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl p-2 border-4 border-orange-200">
            <StudentForm
          id="student-registration"
          courses={courses}
          colleges={colleges}
          registerStudent={registerStudent}
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
      
      {/* Colleges Section */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-orange-300">Colleges</h3>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              All Colleges
            </span>
          </li>
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Indian Colleges
            </span>
          </li>
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Abroad Colleges
            </span>
          </li>
        </ul>
      </div>
      
      {/* Courses Section */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-orange-300">Courses</h3>
        <ul className="space-y-3 text-gray-300">
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Engineering
            </span>
          </li>
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Medical
            </span>
          </li>
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Management
            </span>
          </li>
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Arts & Science
            </span>
          </li>
          <li>
            <span 
              onClick={() => {
                setCurrentView('colleges');
                setSelectedCollegeId(null);
                window.scrollTo(0, 0);
              }}
              className="hover:text-orange-300 transition-colors duration-200 cursor-pointer inline-block"
            >
              Law
            </span>
          </li>
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