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
  const [filterType, setFilterType] = useState("all");
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
    if (filterType !== "all") {
      filtered = filtered.filter((college) =>
        filterType === "government"
          ? college.type === "Government"
          : college.type === "Private"
      );
    }
    setFilteredColleges(filtered);
  }, [searchTerm, filterType, colleges]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-emerald-50">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-lg text-center border border-blue-100">
          <div className="animate-spin h-14 w-14 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4 rounded-full"></div>
          <h3 className="text-xl font-semibold text-gray-800">Loading Colleges</h3>
          <p className="text-gray-500">Fetching the latest institutions...</p>
        </div>
      </div>
    );
  }

  // ---------- ERROR ----------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white/80 backdrop-blur-xl p-10 rounded-2xl shadow-lg text-center border border-red-200">
          <X className="h-16 w-16 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-gray-800">Error Loading</h3>
          <p className="text-gray-600">{error}</p>
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
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-10 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{selectedCollege.name}</h1>
              <p className="flex items-center text-blue-100">
                <MapPin className="h-4 w-4 mr-2" />
                {selectedCollege.location || "Location not specified"}
              </p>
            </div>
            <GraduationCap className="h-14 w-14" />
          </div>
        </div>

        {/* About */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
              <Globe className="h-5 w-5 text-blue-600 mr-2" />
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {selectedCollege.description ||
                `${selectedCollege.name} is a prestigious educational institution committed to excellence and holistic development.`}
            </p>
          </div>
        </div>

        {/* Courses */}
        <div className="max-w-7xl mx-auto px-6 pb-10">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {selectedCollege.coursesOffered?.map((course, idx) => (
              <div
                key={course._id || idx}
                className="bg-white/80 backdrop-blur-lg rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course.name}
                  </h3>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <p className="text-sm text-gray-600">
                  Eligibility: {course.eligibility || "Open"}
                </p>
                <p className="text-sm text-gray-600">
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
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-emerald-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {onBackToHome && (
            <button
              onClick={onBackToHome}
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Home
            </button>
          )}
          <h1 className="text-2xl font-bold text-gray-800">College Directory</h1>
          <div></div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search colleges, courses, locations..."
                className="w-full pl-10 pr-9 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
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

            {/* Filters */}
            <div className="flex items-center gap-2">
              {["all", "government", "private"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    filterType === type
                      ? "bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type === "all"
                    ? "All"
                    : type === "government"
                    ? "Government"
                    : "Private"}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-gray-600 text-sm">
            Showing {filteredColleges.length} of {colleges.length} institutions
          </p>
        </div>
      </div>

      {/* College Cards */}
      <div className="max-w-7xl mx-auto px-6 pb-10 grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredColleges.map((college) => {
          const isExpanded = expandedCards.has(college._id);
          return (
            <div
              key={college._id}
              className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-emerald-600 h-20 flex items-center justify-between px-4 text-white">
                <GraduationCap className="h-8 w-8" />
                <Star className="h-4 w-4" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  onClick={() => handleCollegeSelect(college)}
                  className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  {highlightSearchTerm(college.name, searchTerm)}
                </h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="h-3 w-3 mr-1 text-orange-500" />
                  {highlightSearchTerm(college.location || "Location not available", searchTerm)}
                </p>

                {/* Tags */}
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {college.coursesOffered?.length || 0} Programs
                  </span>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
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
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {college.description?.substring(0, 150) + "..." ||
                        "A premier educational institution committed to excellence."}
                    </p>
                    <button
                      onClick={() => handleCollegeSelect(college)}
                      className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 text-white py-2 px-3 rounded-lg font-medium hover:shadow-md transition-all"
                    >
                      View Details
                    </button>
                  </div>
                )}

                {/* Toggle */}
                <button
                  onClick={(e) => toggleCardExpansion(college._id, e)}
                  className="w-full mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center"
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
