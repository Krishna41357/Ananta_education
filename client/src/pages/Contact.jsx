import React, { useState, useEffect } from 'react';
import { Search, MapPin, Users, Award, BookOpen, ArrowLeft, GraduationCap, Filter, X } from 'lucide-react';
import Navbar from '../components/Navbar';

const Colleges = ({ selectedCollegeId, courses, colleges, onBackToHome }) => {
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Initialize colleges and handle selected college
  useEffect(() => {
    if (colleges.length> 0) {
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
    if (!college.coursesOffered || !courses.length) return [];
    
    return college.coursesOffered.map(courseId => {
      const course = courses.find(c => c._id === courseId);
      return course || { name: 'Course not found', eligibility: 'N/A', duration: 'N/A' };
    });
  };

  // If a specific college is selected, show detailed view
  if (selectedCollege) {
    const collegeCourses = getCollegeCourses(selectedCollege);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar courses={courses} colleges={colleges} />
        
        {/* Back Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToList}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Colleges
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={onBackToHome}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>

        {/* College Detail View */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* College Header */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-4">{selectedCollege.name}</h1>
                  <div className="flex items-center text-blue-100 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{selectedCollege.location}</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-blue-100">
                      <Award className="h-5 w-5 mr-2" />
                      <span>Established: {selectedCollege.established || 'N/A'}</span>
                    </div>
                    <div className="flex items-center text-blue-100">
                      <Users className="h-5 w-5 mr-2" />
                      <span>{selectedCollege.type || 'Institute'}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 p-4 rounded-lg">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            
            {/* College Photo Placeholder */}
            <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <GraduationCap className="h-20 w-20 mx-auto mb-4 opacity-30" />
                <p className="text-lg">College Photo</p>
                <p className="text-sm">Image coming soon</p>
              </div>
            </div>
            
            {/* College Description */}
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About {selectedCollege.name}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {selectedCollege.description || 
                  `${selectedCollege.name} is a prestigious educational institution located in ${selectedCollege.location}. 
                  The college is known for its excellent academic programs, experienced faculty, and state-of-the-art facilities. 
                  With a commitment to providing quality education, the institution has been nurturing students and preparing 
                  them for successful careers in their chosen fields.`
                }
              </p>
            </div>
          </div>

          {/* Courses Offered Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Courses Offered</h2>
            </div>
            
            {collegeCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collegeCourses.map((course, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{course.name}</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Eligibility:</h4>
                        <p className="text-gray-600 text-sm">{course.eligibility || 'Contact college for details'}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Duration:</h4>
                        <p className="text-gray-600 text-sm">{course.duration || 'N/A'}</p>
                      </div>
                      
                      {course.level && (
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
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
              <div className="text-center py-12 text-gray-500">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-xl">No courses information available</p>
                <p>Contact the college directly for course details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // College List View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar courses={courses} colleges={colleges} />
      
      {/* Header with Back Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">All Colleges</h1>
            <div></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search Bar */}
            <div className="flex-1 lg:mr-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search colleges by name or location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('government')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterType === 'government'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Government
                </button>
                <button
                  onClick={() => setFilterType('private')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
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

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Showing {filteredColleges.length} of {colleges.length} colleges
              {searchTerm && ` for "${searchTerm}"`}
              {filterType !== 'all' && ` in ${filterType} category`}
            </p>
          </div>
        </div>

        {/* Colleges Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredColleges.map((college) => {
              const collegeCourses = getCollegeCourses(college);
              
              return (
                <div
                  key={college._id}
                  onClick={() => handleCollegeSelect(college)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 group overflow-hidden"
                >
                  {/* College Image Placeholder */}
                  <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <GraduationCap className="h-16 w-16 text-white opacity-80" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors flex-1 pr-2">
                        {college.name}
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap">
                        {college.type || 'Institute'}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{college.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {college.description?.substring(0, 120) + '...' || 
                       'A premier educational institution offering quality education and excellent facilities.'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-semibold">
                        {collegeCourses.length} Courses Available
                      </span>
                      <span className="text-blue-600 group-hover:text-blue-800 font-medium">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Colleges Found</h3>
              <p className="text-gray-600 mb-4">
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
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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