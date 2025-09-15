import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, Award, BookOpen, ArrowLeft, GraduationCap, Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const Colleges = ({ selectedCollegeId, courses = [], colleges = [], onBackToHome }) => {
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize colleges and handle selected college
  useEffect(() => {
    if (colleges && colleges.length > 0) {
      setFilteredColleges(colleges);
      
      // If a specific college is selected, find and display it
      if (selectedCollegeId) {
        const college = colleges.find(c => c._id === selectedCollegeId);
        if (college) {
          setSelectedCollege(college);
        }
      }
    }
  }, [colleges, selectedCollegeId]);

  // Filter colleges based on search and filter type
  useEffect(() => {
    if (!colleges || colleges.length === 0) {
      setFilteredColleges([]);
      return;
    }

    let filtered = colleges;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter(college => {
        if (filterType === 'government') {
          return college.name.includes('IIT') || college.name.includes('IIM') || 
                 college.name.includes('AIIMS') || college.name.includes('NIT');
        } else if (filterType === 'private') {
          return !college.name.includes('IIT') && !college.name.includes('IIM') && 
                 !college.name.includes('AIIMS') && !college.name.includes('NIT');
        }
        return true;
      });
    }

    setFilteredColleges(filtered);
  }, [searchTerm, filterType, colleges]);

  const handleCollegeSelect = (college) => {
    setSelectedCollege(college);
  };

  const handleBackToList = () => {
    setSelectedCollege(null);
  };

  const getCollegeCourses = (college) => {
    if (!college.coursesOffered || !courses || !courses.length) return [];
    
    return college.coursesOffered.map(courseId => {
      const course = courses.find(c => c._id === courseId);
      return course || { name: 'Course not found', eligibility: 'N/A', duration: 'N/A' };
    });
  };

  // Loading state
  if (!colleges || !courses) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
        <div className="text-center">
          <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-blue-500 mx-auto mb-4 animate-pulse" />
          <p className="text-lg sm:text-xl text-gray-600">Loading colleges...</p>
        </div>
      </div>
    );
  }

  // If a specific college is selected, show detailed view
  if (selectedCollege) {
    const collegeCourses = getCollegeCourses(selectedCollege);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar courses={courses} colleges={colleges} />
        
        {/* Back Navigation - Mobile Responsive */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  onClick={handleBackToList}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Colleges</span>
                  <span className="sm:hidden">Back</span>
                </button>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <button
                  onClick={onBackToHome}
                  className="text-gray-600 hover:text-gray-800 transition-colors text-sm sm:text-base"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* College Detail View - Fully Responsive */}
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          {/* College Header - Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
                    {selectedCollege.name}
                  </h1>
                  <div className="flex items-center text-blue-100 mb-2 sm:mb-3">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base lg:text-lg">{selectedCollege.location}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                    <div className="flex items-center text-blue-100">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm lg:text-base">
                        Established: {selectedCollege.established || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center text-blue-100">
                      <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                      <span className="text-xs sm:text-sm lg:text-base">
                        {selectedCollege.type || 'Institute'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-3 sm:p-4 rounded-lg self-center lg:self-start">
                  <GraduationCap className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-white" />
                </div>
              </div>
            </div>
            
            {/* College Photo Placeholder - Responsive Height */}
            <div className="h-48 sm:h-56 lg:h-64 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 mx-auto mb-2 sm:mb-4 opacity-30" />
                <p className="text-sm sm:text-base lg:text-lg">College Photo</p>
                <p className="text-xs sm:text-sm">Image coming soon</p>
              </div>
            </div>
            
            {/* College Description - Responsive Padding and Text */}
            <div className="p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                About {selectedCollege.name}
              </h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                {selectedCollege.description || 
                  `${selectedCollege.name} is a prestigious educational institution located in ${selectedCollege.location}. 
                  The college is known for its excellent academic programs, experienced faculty, and state-of-the-art facilities. 
                  With a commitment to providing quality education, the institution has been nurturing students and preparing 
                  them for successful careers in their chosen fields.`
                }
              </p>
            </div>
          </div>

          {/* Courses Offered Section - Fully Responsive */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <div className="flex items-center mb-4 sm:mb-6">
              <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-blue-600 mr-2 sm:mr-3" />
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Courses Offered</h2>
            </div>
            
            {collegeCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {collegeCourses.map((course, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                      {course.name}
                    </h3>
                    
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">Eligibility:</h4>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {course.eligibility || 'Contact college for details'}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1 text-sm sm:text-base">Duration:</h4>
                        <p className="text-gray-600 text-xs sm:text-sm">
                          {course.duration || 'N/A'}
                        </p>
                      </div>
                      
                      {course.level && (
                        <div>
                          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                            course.level === 'Bachelor' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {course.level}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12 text-gray-500">
                <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-3 sm:mb-4 opacity-30" />
                <p className="text-lg sm:text-xl mb-2">No courses information available</p>
                <p className="text-sm sm:text-base">Contact the college directly for course details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // College List View - Fully Responsive
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar courses={courses} colleges={colleges} />
      
      {/* Header with Back Navigation - Mobile Responsive */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-4 order-2 sm:order-1">
              <button
                onClick={onBackToHome}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Home</span>
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-center order-1 sm:order-2">
              All Colleges
            </h1>
            <div className="hidden sm:block sm:order-3"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Search and Filter Section - Responsive Layout */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Bar - Full Width on Mobile */}
            <div className="flex-1 lg:mr-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons - Responsive Layout */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 sm:space-x-3">
              <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 hidden sm:block" />
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    filterType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('government')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    filterType === 'government'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Government
                </button>
                <button
                  onClick={() => setFilterType('private')}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm ${
                    filterType === 'private'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Private
                </button>
              </div>
            </div>
          </div>

          {/* Results Count - Responsive Text */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600 text-sm sm:text-base">
              Showing {filteredColleges.length} of {colleges.length} colleges
              {searchTerm && (
                <span className="block sm:inline">
                  <span className="hidden sm:inline"> for </span>
                  <span className="sm:hidden">Search: </span>
                  "{searchTerm}"
                </span>
              )}
              {filterType !== 'all' && (
                <span className="block sm:inline">
                  <span className="hidden sm:inline"> in </span>
                  <span className="sm:hidden">Filter: </span>
                  {filterType} category
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Colleges Grid - Responsive Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredColleges.map((college) => {
              const collegeCourses = getCollegeCourses(college);
              
              return (
                <div
                  key={college._id}
                  onClick={() => handleCollegeSelect(college)}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 sm:hover:-translate-y-2 group overflow-hidden"
                >
                  {/* College Image Placeholder - Responsive Height */}
                  <div className="h-36 sm:h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-white opacity-80" />
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex-1 pr-2 leading-tight">
                        {college.name}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                        {college.type || 'Institute'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 flex-shrink-0" />
                      <span className="text-sm sm:text-base">{college.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                      {college.description?.substring(0, 100) + '...' || 
                       'A premier educational institution offering quality education and excellent facilities.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-blue-600 font-semibold">
                        {collegeCourses.length} Course{collegeCourses.length !== 1 ? 's' : ''} Available
                      </span>
                      <span className="text-blue-600 group-hover:text-blue-800 font-medium text-xs sm:text-sm">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 lg:p-12 max-w-md mx-auto">
              <Search className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Colleges Found</h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                {searchTerm 
                  ? `No colleges match your search for "${searchTerm}"` 
                  : `No colleges found in the ${filterType} category`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;