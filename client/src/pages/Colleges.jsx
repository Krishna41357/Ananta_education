import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  BookOpen,
  ArrowLeft,
  GraduationCap,
  Filter,
  X,
  Star,
  Clock,
  CheckCircle2,
  Building2,
  ChevronRight,
  ChevronDown,
  Calendar,
  Target,
  Globe,
} from "lucide-react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// Base API instance
const API = axios.create({
  baseURL: "https://ananta-education.onrender.com",
  headers: { "Content-Type": "application/json" },
});

const handleRequest = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

const getColleges = () => handleRequest(API.get("/colleges"));

const Colleges = ({ selectedCollegeId, onBackToHome }) => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [filterRegion, setFilterRegion] = useState("all");
  const [loading, setLoading] = useState(false);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [error, setError] = useState(null);

  const fetchColleges = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getColleges();
      const mappedColleges = data.map((college) => ({
        ...college,
        type:
          college.type ||
          (college.name.includes("IIT") ||
          college.name.includes("IIM") ||
          college.name.includes("AIIMS") ||
          college.name.includes("NIT") ||
          college.name.includes("IIIT") ||
          college.name.includes("Central University")
            ? "Government"
            : "Private"),
        region: college.region || "India",
      }));
      setColleges(mappedColleges);
      setFilteredColleges(mappedColleges);
    } catch (err) {
      setError("Failed to load colleges. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

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
    
    if (filterRegion !== "all") {
      filtered = filtered.filter((college) =>
        filterRegion === "india"
          ? college.region === "India"
          : college.region === "Abroad"
      );
    }
    
    setFilteredColleges(filtered);
  }, [searchTerm, filterRegion, colleges]);

  const handleCollegeSelect = (college) => setSelectedCollege(college);
  const handleBackToList = () => setSelectedCollege(null);

  const toggleCardExpansion = (collegeId, e) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedCards);
    newExpanded.has(collegeId)
      ? newExpanded.delete(collegeId)
      : newExpanded.add(collegeId);
    setExpandedCards(newExpanded);
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm || !text) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className="bg-gradient-to-r from-emerald-200 to-blue-200 text-gray-900 px-1 rounded"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };
  const navigate = useNavigate();
  const backToHome = ()=>{
    navigate('/');
    if(onBackToHome) onBackToHome();
  }

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4">
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-lg text-center border border-blue-100 max-w-md w-full">
          <div className="animate-spin h-12 w-12 sm:h-14 sm:w-14 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4 rounded-full"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Loading Colleges</h3>
          <p className="text-sm sm:text-base text-gray-500">Fetching the latest institutions...</p>
        </div>
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 px-4">
        <div className="bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-2xl shadow-lg text-center border border-red-200 max-w-md w-full">
          <X className="h-12 w-12 sm:h-16 sm:w-16 text-red-500 mx-auto mb-3" />
          <h3 className="text-base sm:text-lg font-bold text-gray-800">Error Loading</h3>
          <p className="text-sm sm:text-base text-gray-600">{error}</p>
          <button
            onClick={fetchColleges}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---------- DETAIL VIEW ----------
  if (selectedCollege) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-white via-blue-50 to-emerald-50">
        {/* Hero Banner */}
        <div className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 break-words">{selectedCollege.name}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="flex items-center text-blue-100 text-sm sm:text-base">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                    <span className="break-words">{selectedCollege.location || "Location not specified"}</span>
                  </p>
                  <span className="flex items-center text-blue-100 bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm">
                    <Globe className="h-3 w-3 mr-1 flex-shrink-0" />
                    {selectedCollege.region || "India"}
                  </span>
                </div>
              </div>
              <GraduationCap className="h-10 w-10 sm:h-14 sm:w-14 flex-shrink-0" />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <button
            onClick={handleBackToList}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to List
          </button>
        </div>

        {/* About */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />
              About
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {selectedCollege.description ||
                `${selectedCollege.name} is a prestigious educational institution committed to excellence and holistic development.`}
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Available Programs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {selectedCollege.coursesOffered?.map((course, idx) => (
              <div
                key={course._id || idx}
                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-gray-200 p-4 sm:p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex-1 break-words pr-2">
                    {course.name}
                  </h3>
                  <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  Eligibility: {course.eligibility || "Open"}
                </p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Duration: {course.duration || "Flexible"}
                </p>
                <span className="inline-block mt-3 text-xs bg-gradient-to-r from-emerald-100 to-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                  {course.level} Program
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ---------- LIST VIEW ----------
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50">
      {/* Header */}
    <div className="sticky top-0 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 backdrop-blur-lg border-b-4 border-orange-400 shadow-xl z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
    <div className="flex justify-between items-center">
      {/* Left: Home Button - Always visible */}
      <button
        onClick={backToHome}
        className="group flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-2.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 border border-white/20 hover:border-orange-300 shadow-lg hover:shadow-xl"
      >
        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Home</span>
      </button>
      
      {/* Center: Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        <div className="hidden md:block">
          <div className="bg-orange-500 rounded-full p-3 shadow-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white drop-shadow-lg whitespace-nowrap">
            Explore Top Colleges
          </h1>
          <p className="hidden sm:block text-xs sm:text-sm text-blue-100 font-medium">
            Find your perfect institution
          </p>
        </div>
      </div>
      
      {/* Right: Spacer for balance */}
      <div className="w-20 sm:w-32"></div>
    </div>
  </div>
</div>


      {/* Search + Filters */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-gray-100">
    <div className="flex flex-col gap-3 sm:gap-4">
      {/* Search */}
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 h-5 w-5" />
        <input
          type="text"
          placeholder="Search colleges, courses, locations..."
          className="w-full pl-11 pr-10 py-3 sm:py-3.5 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm sm:text-base transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Regional Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {["all", "india", "abroad"].map((region) => (
          <button
            key={region}
            onClick={() => setFilterRegion(region)}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 border-2 ${
              filterRegion === region
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-blue-600 scale-105"
                : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-orange-300"
            }`}
          >
            {region === "all" && <Filter className="h-4 w-4" />}
            {region === "india" && <MapPin className="h-4 w-4" />}
            {region === "abroad" && <Globe className="h-4 w-4" />}
            {region === "all"
              ? "All Colleges"
              : region === "india"
              ? "Indian Colleges"
              : "Abroad Colleges"}
          </button>
        ))}
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <p className="text-gray-600 text-xs sm:text-sm font-medium">
        Showing <span className="text-blue-600 font-bold">{filteredColleges.length}</span> of <span className="text-blue-600 font-bold">{colleges.length}</span> institutions
      </p>
    </div>
  </div>
</div>


      {/* College Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
  {filteredColleges.map((college) => {
    const isExpanded = expandedCards.has(college._id);
    return (
      <div
        key={college._id}
        className="group bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 h-20 sm:h-24 flex items-center justify-between px-4 sm:px-5 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent"></div>
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl"></div>
          
          <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white relative z-10 drop-shadow-lg" />
          <div className="flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30 relative z-10">
            {college.region === "Abroad" ? (
              <Globe className="h-3.5 w-3.5 flex-shrink-0 text-orange-300" />
            ) : (
              <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-orange-300" />
            )}
            <span className="truncate text-white font-medium">{college.region || "India"}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3
            onClick={() => handleCollegeSelect(college)}
            className="text-base sm:text-lg font-bold text-gray-900 mb-3 cursor-pointer hover:text-blue-700 transition-colors line-clamp-2 group-hover:text-blue-600"
          >
            {highlightSearchTerm(college.name, searchTerm)}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-4">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mr-2"></div>
            <p className="text-xs sm:text-sm truncate">
              {highlightSearchTerm(college.location || "Location not available", searchTerm)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-semibold border border-blue-100">
              <BookOpen className="h-3 w-3 mr-1" />
              {college.coursesOffered?.length || 0} Programs
            </span>
            <span
              className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${
                college.type === "Government"
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-orange-50 text-orange-700 border-orange-200"
              }`}
            >
              {college.type}
            </span>
          </div>

          {/* Expandable */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 space-y-4 animate-fadeIn">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {college.description?.substring(0, 150) + "..." ||
                  "A premier educational institution committed to excellence and holistic development."}
              </p>
              <button
                onClick={() => handleCollegeSelect(college)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2.5 px-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
              >
                View Details
                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* Toggle */}
          <button
            onClick={(e) => toggleCardExpansion(college._id, e)}
            className="w-full mt-4 text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-semibold flex items-center justify-center transition-colors"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronDown className="h-4 w-4 ml-1 rotate-180 transition-transform" />
              </>
            ) : (
              <>
                Read More <ChevronDown className="h-4 w-4 ml-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default Colleges;