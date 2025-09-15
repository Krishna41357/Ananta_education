import React, { useState } from 'react';
import { ChevronDown, GraduationCap, MapPin, BookOpen, Users, Menu, X } from 'lucide-react';

const Navbar = ({ courses = [], colleges = [] }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

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

  const toggleMobileDropdown = (dropdown) => {
    setMobileActiveDropdown(mobileActiveDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileActiveDropdown(null);
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
                <a 
                  href="#home" 
                  className="text-yellow-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Home
                </a>
              </li>
              
              {/* Courses Dropdown */}
              <li 
                className="relative"
                onMouseEnter={() => setActiveDropdown('courses')}
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
                onMouseEnter={() => setActiveDropdown('colleges')}
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
                <a 
                  href="#contact" 
                  className="hover:text-yellow-200 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  Contact
                </a>
              </li>
              
              {/* CTA Button */}
              <li>
                <a 
                  href="#register" 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </a>
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
              <a 
                href="#home" 
                className="block px-3 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </a>
              
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
                    {Object.entries(mappedCoursesByLevel).map(([level, levelCourses]) => (
                      <div key={level} className="border-l-2 border-white/20 pl-4 py-2">
                        <h4 className="text-sm font-semibold text-yellow-200 mb-2">{level} Programs</h4>
                        {levelCourses.slice(0, 3).map((course) => (
                          <a
                            key={course._id}
                            href={`#course-${course._id}`}
                            className="block px-2 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 rounded transition-colors"
                            onClick={closeMobileMenu}
                          >
                            {course.name}
                          </a>
                        ))}
                        {levelCourses.length > 3 && (
                          <span className="block px-2 py-1 text-xs text-white/60">
                            +{levelCourses.length - 3} more
                          </span>
                        )}
                      </div>
                    ))}
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
                    {Object.keys(mappedCollegesByType).length > 0 ? (
                      Object.entries(mappedCollegesByType).map(([type, typeColleges]) => (
                        <div key={type} className="border-l-2 border-white/20 pl-4 py-2">
                          <h4 className="text-sm font-semibold text-yellow-200 mb-2">{type} Institutions ({typeColleges.length})</h4>
                          {typeColleges.map((college) => (
                            <a
                              key={college._id}
                              href={`#college-${college._id}`}
                              className="block px-2 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
                              onClick={closeMobileMenu}
                            >
                              <div>{college.name}</div>
                              <div className="text-xs text-white/60 mt-1 space-y-1">
                                {college.location && (
                                  <div className="flex items-center">
                                    <MapPin className="h-3 w-3 mr-1" />
                                    {college.location}
                                  </div>
                                )}
                                {college.courseCount && (
                                  <span className="inline-block bg-white/20 px-2 py-0.5 rounded-full">
                                    {college.courseCount} courses
                                  </span>
                                )}
                                {college.description && (
                                  <div className="text-white/50">
                                    {college.description.length > 80 
                                      ? `${college.description.substring(0, 80)}...` 
                                      : college.description
                                    }
                                  </div>
                                )}
                              </div>
                            </a>
                          ))}
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
              
              <a 
                href="#contact" 
                className="block px-3 py-3 text-white hover:bg-white/10 rounded-lg transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </a>
              
              <a 
                href="#register" 
                className="block mx-3 my-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-3 rounded-lg font-semibold text-center hover:shadow-lg transition-all duration-200"
                onClick={closeMobileMenu}
              >
                Get Started
              </a>
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
              
              {Object.keys(mappedCoursesByLevel).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(mappedCoursesByLevel).map(([level, levelCourses]) => (
                    <div key={level} className="bg-white rounded-lg border border-gray-200">
                      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          {level} Programs
                        </h4>
                      </div>
                      <div className="p-4 flex flex-wrap gap-2">
  {levelCourses.map((course) => (
    <a
      key={course._id}
      href={`#course-${course._id}`}
      className="p-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-blue-200 min-w-[200px] flex-1"
      onClick={() => setActiveDropdown(null)}
    >
      <div className="font-medium text-sm text-gray-800">{course.name}</div>
      <div className="text-xs text-gray-500 mt-2 flex items-center flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
          {course.level}
        </span>
        <span>{course.eligibility}</span>
      </div>
    </a>
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
              
              {Object.keys(mappedCollegesByType).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Object.entries(mappedCollegesByType).map(([type, typeColleges]) => (
                    <div key={type} className="bg-white rounded-lg border border-gray-200">
                      <div className="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {type} Institutions
                        </h4>
                      </div>
                      <div className="p-4 space-y-2">
                        {typeColleges.map((college) => (
                          <a
                            key={college._id}
                            href={`#college-${college._id}`}
                            className="block p-3 text-gray-700 hover:bg-green-50 transition-colors duration-200 rounded-lg border border-gray-100 hover:border-green-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="font-medium text-sm text-gray-800">{college.name}</div>
                            <div className="text-xs text-gray-500 mt-2 flex items-center justify-between flex-wrap">
                              <span className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {college.location}
                              </span>
                              {college.courseCount && (
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
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-500">
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