import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Users,
  Award,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  Filter,
  X,
  Star,
  Clock,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:5000";

const Colleges = ({ selectedCollegeId, onBackToHome }) => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch colleges with populated courses (directly from backend)
  const fetchColleges = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/colleges`);
      const mappedColleges = res.data.map((college) => ({
        ...college,
        type:
          college.name.includes("IIT") ||
          college.name.includes("IIM") ||
          college.name.includes("AIIMS") ||
          college.name.includes("NIT") ||
          college.name.includes("IIIT") ||
          college.name.includes("Central University")
            ? "Government"
            : "Private",
      }));
      setColleges(mappedColleges);
      setFilteredColleges(mappedColleges);
    } catch (err) {
      console.error("Error fetching colleges:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // ✅ Enhanced filter + search (search in college & courses)
  useEffect(() => {
    let filtered = colleges;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((college) => {
        const collegeMatch =
          college.name.toLowerCase().includes(searchLower) ||
          (college.location &&
            college.location.toLowerCase().includes(searchLower));

        const courseMatch = college.coursesOffered?.some(
          (course) =>
            course.name.toLowerCase().includes(searchLower) ||
            (course.level &&
              course.level.toLowerCase().includes(searchLower)) ||
            (course.eligibility &&
              course.eligibility.toLowerCase().includes(searchLower))
        );

        return collegeMatch || courseMatch;
      });
    }

    if (filterType !== "all") {
      filtered = filtered.filter((college) => {
        if (filterType === "government") {
          return college.type === "Government";
        } else if (filterType === "private") {
          return college.type === "Private";
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

  // ✅ Helper for search highlighting
  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-900 px-1.5 py-0.5 rounded-md font-semibold"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 border-t-indigo-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 animate-pulse">
              <Sparkles className="h-6 w-6 text-indigo-400 absolute top-2 right-2" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Discovering Excellence</h3>
          <p className="text-slate-600 font-medium">
            Loading premium colleges and world-class courses...
          </p>
        </div>
      </div>
    );
  }

  // ✅ College Detail Page
  if (selectedCollege) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Navbar />

        {/* Back Navigation */}
        <div className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-5">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleBackToList}
                className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to All Colleges
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={onBackToHome}
                className="text-slate-600 hover:text-slate-800 font-medium transition-colors duration-200"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>

        {/* College Detail View */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden mb-10 border border-slate-200/50">
            <div className="bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-800 text-white p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      {selectedCollege.name}
                    </h1>
                    <div className="flex items-center text-blue-100 mb-4 text-lg">
                      <MapPin className="h-6 w-6 mr-3 text-blue-200" />
                      <span className="font-medium">
                        {selectedCollege.location || "Location not specified"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <Star className="h-8 w-8 text-yellow-300" fill="currentColor" />
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Award className="h-5 w-5 mr-2 text-yellow-300" />
                    <span className="font-semibold">
                      Est. {selectedCollege.established || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center text-blue-100 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                    <Building2 className="h-5 w-5 mr-2 text-green-300" />
                    <span className="font-semibold">{selectedCollege.type} Institution</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Image Placeholder */}
            <div className="h-80 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
              <div className="text-center z-10">
                <GraduationCap className="h-24 w-24 mx-auto mb-4 text-indigo-300" />
                <p className="text-xl font-semibold text-slate-600">Campus Preview</p>
                <p className="text-slate-500 mt-1">Beautiful learning environment</p>
              </div>
            </div>

            {/* About Section */}
            <div className="p-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
                <Sparkles className="h-8 w-8 text-indigo-600 mr-3" />
                About {selectedCollege.name}
              </h2>
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                <p className="text-slate-700 leading-relaxed text-lg font-medium">
                  {selectedCollege.description ||
                    `Discover excellence at ${selectedCollege.name} - where innovation meets tradition in higher education. Our institution is committed to fostering academic excellence, research innovation, and holistic development of every student.`}
                </p>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-slate-200/50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl mr-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">
                    Premium Courses Available
                  </h2>
                  <p className="text-slate-600 mt-1">World-class education programs</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                <span className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  {selectedCollege.coursesOffered?.length || 0} Programs
                </span>
              </div>
            </div>

            {selectedCollege.coursesOffered?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedCollege.coursesOffered.map((course, idx) => (
                  <div
                    key={course._id || idx}
                    className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-2xl p-6 hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {course.name}
                      </h3>
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                        <GraduationCap className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-slate-600">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm font-medium">
                          Eligibility: {course.eligibility || "Open to all"}
                        </span>
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          Duration: {course.duration || "Flexible"}
                        </span>
                      </div>
                    </div>
                    
                    <span
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-md ${
                        course.level === "Bachelor"
                          ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white"
                          : "bg-gradient-to-r from-purple-400 to-pink-500 text-white"
                      }`}
                    >
                      <Star className="h-3 w-3 mr-1" fill="currentColor" />
                      {course.level} Program
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-slate-100 to-blue-100 rounded-full p-6 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-700 mb-2">
                  Courses Coming Soon
                </h3>
                <p className="text-slate-500">New programs are being added regularly</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ✅ College List Page
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />

      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold transition-all duration-200 hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </button>
          )}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 bg-clip-text text-transparent">
              Discover Elite Colleges
            </h1>
            <p className="text-slate-600 mt-2 font-medium">Find your path to academic excellence</p>
          </div>
          <div></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Enhanced Search + Filter */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-10 border border-slate-200/50">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-6 w-6" />
              <input
                type="text"
                placeholder="Search colleges, courses, or specializations..."
                className="w-full pl-12 pr-12 py-4 border-2 border-slate-200 rounded-2xl text-lg font-medium focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Filter className="h-5 w-5 text-white" />
              </div>
              {["all", "government", "private"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-200 hover:scale-105 ${
                    filterType === type
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  {type === "all" ? "All Institutions" : 
                   type === "government" ? "Government" : "Private"}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-200">
            <p className="text-slate-600 font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
              Showing {filteredColleges.length} of {colleges.length} premium institutions
            </p>
            <div className="flex items-center space-x-2 text-slate-500 text-sm">
              <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />
              <span>Curated by experts</span>
            </div>
          </div>
        </div>

        {/* Enhanced Colleges Grid */}
        {filteredColleges.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredColleges.map((college) => (
              <div
                key={college._id}
                onClick={() => handleCollegeSelect(college)}
                className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer group overflow-hidden border border-slate-200/50 hover:scale-105"
              >
                <div className="h-56 bg-gradient-to-br from-indigo-500 via-blue-600 to-purple-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-20 w-20 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Star className="h-5 w-5 text-yellow-300" fill="currentColor" />
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200 mb-3">
                    {highlightSearchTerm(college.name, searchTerm)}
                  </h3>
                  
                  <div className="flex items-center text-slate-600 mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-500" />
                    <span className="font-medium">
                      {highlightSearchTerm(
                        college.location || "Premier Location",
                        searchTerm
                      )}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {college.description?.substring(0, 120) + "..." ||
                      "Experience world-class education with state-of-the-art facilities and expert faculty dedicated to your success."}
                  </p>

                  {/* Enhanced Popular Courses */}
                  {college.coursesOffered?.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-bold text-slate-700 mb-3 flex items-center">
                        <Sparkles className="h-4 w-4 mr-1 text-indigo-500" />
                        Featured Programs:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {college.coursesOffered.slice(0, 3).map((course, idx) => (
                          <span
                            key={course._id || idx}
                            className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-2 rounded-full font-semibold border border-indigo-200"
                          >
                            {course.name}
                          </span>
                        ))}
                        {college.coursesOffered.length > 3 && (
                          <span className="text-xs text-slate-500 bg-slate-100 px-3 py-2 rounded-full font-medium">
                            +{college.coursesOffered.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full font-bold flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {college.coursesOffered?.length || 0} Programs
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                      college.type === "Government" 
                        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white" 
                        : "bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
                    }`}>
                      {college.type}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 max-w-md mx-auto shadow-2xl border border-slate-200">
              <div className="bg-gradient-to-r from-slate-100 to-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Search className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                No Matching Institutions
              </h3>
              <p className="text-slate-600 mb-6">Try adjusting your search criteria to discover more colleges</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("all");
                }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-indigo-700 hover:to-purple-700 font-bold transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;