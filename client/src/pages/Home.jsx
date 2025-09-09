import React, { useState, useEffect } from 'react';
import { GraduationCap, Users, Award, TrendingUp, Phone, Mail } from 'lucide-react';

// Mock API functions - replace with your actual API calls
const getCourses = async () => {
  return [
    { _id: '1', name: 'Computer Science Engineering', level: 'Bachelor', eligibility: '12th PCM with 60%' },
    { _id: '2', name: 'Information Technology', level: 'Bachelor', eligibility: '12th PCM with 60%' },
    { _id: '3', name: 'Electronics Engineering', level: 'Bachelor', eligibility: '12th PCM with 60%' },
    { _id: '4', name: 'Business Administration', level: 'Master', eligibility: 'Graduation in any stream' },
    { _id: '5', name: 'Data Science', level: 'Master', eligibility: 'B.Tech/BCA/BSc in relevant field' },
    { _id: '6', name: 'Medicine', level: 'Bachelor', eligibility: '12th PCB with NEET qualification' }
  ];
};

const getColleges = async () => {
  return [
    { 
      _id: '1', 
      name: 'IIT Delhi', 
      location: 'New Delhi', 
      description: 'Premier engineering institute',
      image: '/api/placeholder/400/200',
      coursesOffered: ['1', '2', '3']
    },
    { 
      _id: '2', 
      name: 'IIT Bombay', 
      location: 'Mumbai', 
      description: 'Leading technology institute',
      image: '/api/placeholder/400/200',
      coursesOffered: ['1', '2', '3']
    },
    { 
      _id: '3', 
      name: 'IIM Ahmedabad', 
      location: 'Ahmedabad', 
      description: 'Top management institute',
      image: '/api/placeholder/400/200',
      coursesOffered: ['4']
    },
    { 
      _id: '4', 
      name: 'AIIMS Delhi', 
      location: 'New Delhi', 
      description: 'Premier medical institute',
      image: '/api/placeholder/400/200',
      coursesOffered: ['6']
    }
  ];
};

const registerStudent = async (formData) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
};

// Import components (these would be in separate files)
import Navbar from '../components/Navbar';
import StudentForm from '../components/StudentForm';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

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
          courseCount: college.coursesOffered.length
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Loading your future opportunities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 ">
      <Navbar courses={courses} colleges={colleges} />
      
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center relative">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full"></div>
              <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full"></div>
              <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Your Dream Career
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Expert guidance for Indian students to find the perfect college and course. 
                Join thousands who achieved their dreams with our personalized counseling.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-yellow-300 mr-2" />
                    <span className="text-2xl font-bold text-yellow-300">10,000+</span>
                  </div>
                  <p className="text-blue-100 text-sm">Students Guided</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Award className="h-6 w-6 text-yellow-300 mr-2" />
                    <span className="text-2xl font-bold text-yellow-300">500+</span>
                  </div>
                  <p className="text-blue-100 text-sm">Top Colleges</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="h-6 w-6 text-yellow-300 mr-2" />
                    <span className="text-2xl font-bold text-yellow-300">95%</span>
                  </div>
                  <p className="text-blue-100 text-sm">Success Rate</p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                  Start Your Journey
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose EduPath India?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive guidance tailored specifically for Indian students
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Counselors</h3>
              <p className="text-gray-600">Get guidance from experienced education counselors who understand the Indian education system</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Top Colleges</h3>
              <p className="text-gray-600">Access to {colleges.length}+ premier colleges across India including IITs, IIMs, and top private institutions</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Career Success</h3>
              <p className="text-gray-600">95% of our students get admission to their preferred colleges and courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take the first step towards your dream career. Our expert counselors are here to guide you through every step of your journey.
          </p>
        </div>
        
        <StudentForm 
          courses={courses} 
          colleges={colleges} 
          registerStudent={registerStudent}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-8 w-8 text-yellow-300 mr-3" />
                <span className="text-2xl font-bold">EduPath India</span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Empowering Indian students to achieve their academic dreams through expert counseling and personalized guidance.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center text-gray-300">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@edupathindia.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Our Services</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Engineering</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Management</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Medical</a></li>
                <li><a href="#" className="hover:text-yellow-300 transition-colors">Arts & Science</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 EduPath India. All rights reserved. | Helping students achieve their dreams since 2020.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;