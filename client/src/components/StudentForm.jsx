import React, { useState } from 'react';
import { BookOpen, User, Phone, Mail, GraduationCap, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const StudentForm = ({ courses = [], colleges = [], registerStudent }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    courseInterested: "",
    collegeInterested: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Map courses by level for organized display
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Basic validation
    if (!form.name || !form.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call the registerStudent function passed from modal
      const success = await registerStudent(form);
      
      if (success !== false) {
        setShowSuccess(true);

        // Reset form after successful submission
        setForm({
          name: "",
          phone: "",
          email: "",
          courseInterested: "",
          collegeInterested: "",
        });

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      }
    } catch (err) {
      alert("Registration failed. Please try again later. ❌");
      console.error("Registration error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get selected course and college details for display
  const selectedCourse = courses.find(course => course._id === form.courseInterested);
  const selectedCollege = colleges.find(college => college._id === form.collegeInterested);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {showSuccess && (
        <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Registration Successful! 🎉</h3>
              <p className="text-green-700 mt-1">
                Thank you for registering with EduPath India. Our expert counselor will contact you within 24 hours to discuss your career goals.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Start Your Journey to Success</h2>
          <p className="text-blue-100 text-lg">Fill out the form below and our expert counselors will guide you to your dream career!</p>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <User className="h-4 w-4 mr-2 text-blue-600" />
                  Full Name *
                </label>
                <input
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder-gray-400"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone and Email */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Phone className="h-4 w-4 mr-2 text-blue-600" />
                    Phone Number *
                  </label>
                  <input
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder-gray-400"
                    name="phone"
                    placeholder="Your phone number"
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="h-4 w-4 mr-2 text-blue-600" />
                    Email Address
                  </label>
                  <input
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder-gray-400"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Course Selection (writable + selectable) */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <GraduationCap className="h-4 w-4 mr-2 text-blue-600" />
                  Course of Interest
                </label>
                <input
                  list="coursesList"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-white text-black"
                  name="courseInterested"
                  placeholder="Select or type your preferred course"
                  value={form.courseInterested}
                  onChange={handleChange}
                />
                <datalist id="coursesList">
                  {Object.entries(mappedCoursesByLevel).map(([level, levelCourses]) =>
                    levelCourses.map((course) => (
                      <option key={course._id} value={course.name} />
                    ))
                  )}
                </datalist>
              </div>

              {/* College Selection (writable + selectable) */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                  Preferred College
                </label>
                <input
                  list="collegesList"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none bg-white text-black"
                  name="collegeInterested"
                  placeholder="Select or type your preferred college"
                  value={form.collegeInterested}
                  onChange={handleChange}
                />
                <datalist id="collegesList">
                  {colleges.map((college) => (
                    <option key={college._id} value={college.name} />
                  ))}
                </datalist>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !form.name || !form.phone}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-100 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Processing Your Registration...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Get Free Career Counseling 🚀
                  </div>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                By submitting this form, you agree to receive counseling calls from our expert advisors.
              </p>
            </div>

            {/* Info Section */}
            <div className="lg:pl-8">
              {/* Selected Course Info */}
              {selectedCourse && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Selected Course
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">{selectedCourse.name}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {selectedCourse.level}
                      </span>
                      {selectedCourse.category && (
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                          {selectedCourse.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <strong>Eligibility:</strong> {selectedCourse.eligibility}
                    </p>
                  </div>
                </div>
              )}

              {/* Selected College Info */}
              {selectedCollege && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Selected College
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-800">{selectedCollege.name}</p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedCollege.location}
                    </p>
                    {selectedCollege.description && (
                      <p className="text-sm text-gray-600">{selectedCollege.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {selectedCollege.type}
                      </span>
                      {selectedCollege.courseCount && (
                        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">
                          {selectedCollege.courseCount} courses
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  What happens next?
                </h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Our expert counselor will call you within 24 hours</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Get personalized career guidance based on your interests</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Receive detailed information about admission processes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>Access exclusive scholarship and placement information</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;