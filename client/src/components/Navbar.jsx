import React, { useState, useEffect } from 'react';
import { ChevronDown, GraduationCap, MapPin, BookOpen, Users, Menu, X, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getCourses, getColleges } from '../services/api';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [courses, setCourses] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState({ courses: false, colleges: false });
  const navigate = useNavigate();

  // Fetch courses when courses dropdown is opened
  const fetchCourses = async () => {
    if (courses.length > 0) return; // Don't fetch if already loaded
    
    setLoading(prev => ({ ...prev, courses: true }));
    try {
      const coursesData = await getCourses();
      setCourses(coursesData);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  };

  // Fetch colleges when colleges dropdown is opened
  const fetchColleges = async () => {
    if (colleges.length > 0) return; // Don't fetch if already loaded
    
    setLoading(prev => ({ ...prev, colleges: true }));
    try {
      const collegesData = await getColleges();
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
      setColleges(mappedColleges);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    } finally {
      setLoading(prev => ({ ...prev, colleges: false }));
    }
  };

  // Map courses by category/level for organized display
  const mappedCoursesByLevel = courses.reduce((acc, course) => {
    const level = course.level || 'Other';
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(course);
    return acc;
  }, {});

  // Map colleges by type for organized display
  const mappedCollegesByType = colleges.reduce((acc, college) => {
    const type = college.type || 'Other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(college);
    return acc;
  }, {});

  const handleCoursesDropdown = () => {
    setActiveDropdown('courses');
    fetchCourses();
  };

  const handleCollegesDropdown = () => {
    setActiveDropdown('colleges');
    fetchColleges();
  };

  const toggleMobileDropdown = (dropdown) => {
    setMobileActiveDropdown(mobileActiveDropdown === dropdown ? null : dropdown);
    if (dropdown === 'courses' && mobileActiveDropdown !== 'courses') {
      fetchCourses();
    }
    if (dropdown === 'colleges' && mobileActiveDropdown !== 'colleges') {
      fetchColleges();
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileActiveDropdown(null);
  };

  // Handle course click - navigate to colleges page
  const handleCourseClick = (courseId) => {
    setActiveDropdown(null);
    closeMobileMenu();
    navigate('/colleges', { state: { selectedCourseId: courseId } });
  };

  // Handle college click - navigate to colleges page
  const handleCollegeClick = (collegeId) => {
    setActiveDropdown(null);
    closeMobileMenu();
    navigate('/colleges', { state: { selectedCollegeId: collegeId } });
  };

  // Handle "Read more" click - navigate to colleges page
  const handleReadMoreClick = () => {
    setActiveDropdown(null);
    navigate('/colleges');
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-lg sticky top-0 z-50 relative"
           onMouseLeave={() => setActiveDropdown(null)}>  
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Ananta Education Logo" 
                className="h-16 w-16 object-contain"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                Ananta Education
              </h1>
            </div>

            {/* Desktop Navigation Menu */}
            <ul className="hidden md:flex space-x-8 items-center">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="text-yellow-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Home
                </button>
              </li>
              
              {/* Courses Dropdown */}
              <li 
                className="relative"
                onMouseEnter={handleCoursesDropdown}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 hover:text-yellow-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Courses</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'courses' ? 'rotate-180' : ''
                  }`} />
                </button>
              </li>
              
              {/* Colleges Dropdown */}
              <li 
                className="relative"
                onMouseEnter={handleCollegesDropdown}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className="flex items-center space-x-1 hover:text-yellow-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <Users className="h-4 w-4" />
                  <span>Colleges</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === 'colleges' ? 'rotate-180' : ''
                  }`} />
                </button>
              </li>
              
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="hover:text-yellow-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Contact
                </button>
              </li>
              
              {/* CTA Button */}
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </button>
              </li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-yellow-200 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-700 border-t border-white/20">
            <div className="px-4 py-2 space-y-1">
              <button 
                onClick={() => {
                  navigate('/');
                  closeMobileMenu();
                }}
                className="block w-full text-left px-3 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Home
              </button>
              
              {/* Mobile Courses Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('courses')}
                  className="w-full flex items-center justify-between px-3 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Courses</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    mobileActiveDropdown === 'courses' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {mobileActiveDropdown === 'courses' && (
                  <div className="ml-4 mt-2 space-y-1">
                    {loading.courses ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                        <span className="ml-2 text-white/80">Loading courses...</span>
                      </div>
                    ) : Object.keys(mappedCoursesByLevel).length > 0 ? (
                      Object.entries(mappedCoursesByLevel).map(([level, levelCourses]) => (
                        <div key={level} className="border-l-2 border-white/20 pl-4 py-2">
                          <h4 className="text-sm font-semibold text-yellow-200 mb-2">{level} Programs ({levelCourses.length})</h4>
                          {levelCourses.map((course) => (
                            <button
                              key={course._id}
                              onClick={() => handleCourseClick(course._id)}
                              className="block w-full text-left px-3 py-2 mb-1 text-sm bg-white text-gray-800 hover:bg-gray-50 rounded-lg transition-colors shadow-sm border border-gray-200"
                            >
                              <div className="font-medium">{course.name}</div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mr-2">
                                  {course.level}
                                </span>
                                {course.eligibility}
                              </div>
                            </button>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-white/60">
                        <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No courses available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Mobile Colleges Dropdown */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown('colleges')}
                  className="w-full flex items-center justify-between px-3 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Colleges</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    mobileActiveDropdown === 'colleges' ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {mobileActiveDropdown === 'colleges' && (
                  <div className="ml-4 mt-2 space-y-2 max-h-80 overflow-y-auto">
                    {loading.colleges ? (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-white" />
                        <span className="ml-2 text-white/80">Loading colleges...</span>
                      </div>
                    ) : Object.keys(mappedCollegesByType).length > 0 ? (
                      Object.entries(mappedCollegesByType).map(([type, typeColleges]) => (
                        <div key={type} className="border-l-2 border-white/20 pl-4 py-2">
                          <h4 className="text-sm font-semibold text-yellow-200 mb-2">{type} Institutions ({typeColleges.length})</h4>
                          {typeColleges.slice(0, 4).map((college) => (
                            <button
                              key={college._id}
                              onClick={() => handleCollegeClick(college._id)}
                              className="block w-full text-left px-3 py-2 mb-1 bg-white text-gray-800 hover:bg-gray-50 rounded-lg transition-colors shadow-sm border border-gray-200"
                            >
                              <div className="font-medium text-sm">{college.name}</div>
                              <div className="text-xs text-gray-500 mt-1 space-y-1">
                                {college.location && (
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {college.location}
                                  </div>
                                )}
                                {college.courseCount > 0 && (
                                  <span className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                                    {college.courseCount} courses
                                  </span>
                                )}
                              </div>
                            </button>
                          ))}
                          {typeColleges.length > 4 && (
                            <button
                              onClick={() => {
                                handleReadMoreClick();
                                closeMobileMenu();
                              }}
                              className="block w-full text-left px-3 py-2 mb-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 rounded-lg transition-colors shadow-sm"
                            >
                              <div className="font-medium text-sm flex items-center justify-center">
                                <ArrowRight className="h-4 w-4 mr-2" />
                                View All {typeColleges.length} {type} Colleges
                              </div>
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-white/60">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No colleges available</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => {
                  navigate('/contact');
                  closeMobileMenu();
                }}
                className="block w-full text-left px-3 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                Contact
              </button>
              
              <button 
                onClick={() => {
                  navigate('/contact');
                  closeMobileMenu();
                }}
                className="block mx-3 my-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        
        {/* Desktop Courses Dropdown */}
        {activeDropdown === 'courses' && (
          <div 
            className="hidden md:block absolute top-full left-0 right-0 bg-white rounded-none shadow-2xl border-t-4 border-blue-500 z-50"
            onMouseEnter={() => setActiveDropdown('courses')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-lg mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Available Courses ({courses.length})
                </h3>
              </div>
              
              {loading.courses ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  <span className="ml-3 text-gray-600 font-medium">Loading courses...</span>
                </div>
              ) : Object.keys(mappedCoursesByLevel).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(mappedCoursesByLevel).map(([level, levelCourses]) => (
                    <div key={level} className="bg-white rounded-lg border border-gray-200 shadow-lg">
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b border-gray-200">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {level} Programs ({levelCourses.length})
                        </h4>
                      </div>
                      <div className="p-4 space-y-2 bg-white">
                        {levelCourses.map((course) => (
                          <button
                            key={course._id}
                            onClick={() => handleCourseClick(course._id)}
                            className="w-full p-3 text-left bg-white text-gray-800 hover:bg-blue-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-blue-200 hover:shadow-md"
                          >
                            <div className="font-medium text-sm text-gray-900 mb-2">{course.name}</div>
                            <div className="text-xs text-gray-500 flex items-center flex-wrap gap-2">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {course.level}
                              </span>
                              <span>{course.eligibility}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-500">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No courses available at the moment</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Desktop Colleges Dropdown */}
        {activeDropdown === 'colleges' && (
          <div 
            className="hidden md:block absolute top-full left-0 right-0 bg-white rounded-none shadow-2xl border-t-4 border-green-500 z-50"
            onMouseEnter={() => setActiveDropdown('colleges')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-t-lg mb-4">
                <h3 className="font-semibold text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Partner Colleges ({colleges.length})
                </h3>
              </div>
              
              {loading.colleges ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  <span className="ml-3 text-gray-600 font-medium">Loading colleges...</span>
                </div>
              ) : Object.keys(mappedCollegesByType).length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(mappedCollegesByType).map(([type, typeColleges]) => (
                    <div key={type} className="bg-white rounded-lg border border-gray-200 shadow-lg">
                      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg border-b border-gray-200">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {type} Institutions ({typeColleges.length})
                        </h4>
                      </div>
                      
                      {type === 'Private' ? (
                        // Horizontal layout for Private colleges
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {typeColleges.slice(0, 4).map((college) => (
                              <button
                                key={college._id}
                                onClick={() => handleCollegeClick(college._id)}
                                className="p-3 bg-white text-gray-800 hover:bg-green-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-md text-left"
                              >
                                <div className="font-medium text-sm text-gray-900 mb-2">{college.name}</div>
                                <div className="text-xs text-gray-500 space-y-1">
                                  <span className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {college.location}
                                  </span>
                                  {college.courseCount > 0 && (
                                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                      {college.courseCount} courses
                                    </span>
                                  )}
                                </div>
                                {college.description && (
                                  <div className="text-xs text-gray-400 mt-2">
                                    {college.description.length > 60 
                                      ? `${college.description.substring(0, 60)}...` 
                                      : college.description
                                    }
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                          {typeColleges.length > 4 && (
                            <div className="mt-6 text-center">
                              <button
                                onClick={handleReadMoreClick}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                              >
                                <ArrowRight className="h-5 w-5 mr-2" />
                                View All {typeColleges.length} Private Colleges
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        // Vertical layout for other college types
                        <div className="p-4 space-y-2 bg-white">
                          {typeColleges.slice(0, 3).map((college) => (
                            <button
                              key={college._id}
                              onClick={() => handleCollegeClick(college._id)}
                              className="w-full text-left p-3 bg-white text-gray-800 hover:bg-green-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-green-200 hover:shadow-md"
                            >
                              <div className="font-medium text-sm text-gray-900 mb-2">{college.name}</div>
                              <div className="text-xs text-gray-500 flex items-center justify-between flex-wrap">
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {college.location}
                                </span>
                                {college.courseCount > 0 && (
                                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full mt-1">
                                    {college.courseCount} courses
                                  </span>
                                )}
                              </div>
                              {college.description && (
                                <div className="text-xs text-gray-400 mt-2">
                                  {college.description.length > 60 
                                    ? `${college.description.substring(0, 60)}...` 
                                    : college.description
                                  }
                                </div>
                              )}
                            </button>
                          ))}
                          {typeColleges.length > 3 && (
                            <div className="pt-4">
                              <button
                                onClick={handleReadMoreClick}
                                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                              >
                                <ArrowRight className="h-5 w-5 mr-2" />
                                View All {typeColleges.length} {type} Colleges
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-500 bg-white">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">No colleges available at the moment</p>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;