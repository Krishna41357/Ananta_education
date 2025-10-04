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

  // ---------- LOADING ----------
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50 px-4">
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
      <div className="sticky top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Home</span>
            </button>
          )}
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">College Directory</h1>
          <div className="w-16 sm:w-20"></div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search colleges, courses, locations..."
                className="w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm sm:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Regional Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {["all", "india", "abroad"].map((region) => (
                <button
                  key={region}
                  onClick={() => setFilterRegion(region)}
                  className={`px-3 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all flex items-center gap-1 ${
                    filterRegion === region
                      ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {region === "all" && <Filter className="h-3 w-3" />}
                  {region === "india" && <MapPin className="h-3 w-3" />}
                  {region === "abroad" && <Globe className="h-3 w-3" />}
                  {region === "all"
                    ? "All"
                    : region === "india"
                    ? "India"
                    : "Abroad"}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-gray-600 text-xs sm:text-sm">
            Showing {filteredColleges.length} of {colleges.length} institutions
          </p>
        </div>
      </div>

      {/* College Cards */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredColleges.map((college) => {
          const isExpanded = expandedCards.has(college._id);
          return (
            <div
              key={college._id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-16 sm:h-20 flex items-center justify-between px-4 text-white">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" />
                <div className="flex items-center gap-1 text-xs bg-white/20 px-2 py-1 rounded-full">
                  {college.region === "Abroad" ? (
                    <Globe className="h-3 w-3 flex-shrink-0" />
                  ) : (
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                  )}
                  <span className="truncate">{college.region || "India"}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3
                  onClick={() => handleCollegeSelect(college)}
                  className="text-base sm:text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2"
                >
                  {highlightSearchTerm(college.name, searchTerm)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-orange-500 flex-shrink-0" />
                  <span className="truncate">{highlightSearchTerm(college.location || "Location not available", searchTerm)}</span>
                </p>

                {/* Tags */}
                <div className="flex items-center justify-between mt-3 gap-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 sm:px-3 py-1 rounded-full truncate">
                    {college.coursesOffered?.length || 0} Programs
                  </span>
                  <span
                    className={`text-xs px-2 sm:px-3 py-1 rounded-full font-medium truncate ${
                      college.type === "Government"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {college.type}
                  </span>
                </div>

                {/* Expandable */}
                {isExpanded && (
                  <div className="mt-4 border-t pt-3 space-y-3">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {college.description?.substring(0, 150) + "..." ||
                        "A premier educational institution committed to excellence."}
                    </p>
                    <button
                      onClick={() => handleCollegeSelect(college)}
                      className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 px-3 rounded-lg font-medium hover:shadow-md transition-all text-sm"
                    >
                      View Details
                    </button>
                  </div>
                )}

                {/* Toggle */}
                <button
                  onClick={(e) => toggleCardExpansion(college._id, e)}
                  className="w-full mt-3 text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center justify-center"
                >
                  {isExpanded ? (
                    <>
                      Show Less <ChevronDown className="h-3 w-3 ml-1 rotate-180" />
                    </>
                  ) : (
                    <>
                      Read More <ChevronDown className="h-3 w-3 ml-1" />
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