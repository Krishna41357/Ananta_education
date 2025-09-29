import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
  getColleges,
  addCollege,
  updateCollege,
  deleteCollege,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} from "../services/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "course" or "college"
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([fetchStudents(), fetchColleges(), fetchCourses()]);
  };

  const fetchStudents = async () => {
    try {
      setStudents(await getStudents());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchColleges = async () => {
    try {
      setColleges(await getColleges());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      setCourses(await getCourses());
    } catch (err) {
      console.error(err);
    }
  };

  // Delete handlers
  const handleDeleteStudent = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      await deleteStudent(id);
      fetchStudents();
    }
  };

  const handleDeleteCollege = async (id) => {
    if (window.confirm("Are you sure you want to delete this college?")) {
      await deleteCollege(id);
      fetchColleges();
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      await deleteCourse(id);
      fetchCourses();
    }
  };

  // Add/Edit handlers
  const handleSaveCollege = async () => {
    if (formData._id) {
      await updateCollege(formData._id, formData);
    } else {
      await addCollege(formData);
    }
    fetchColleges();
    setModalOpen(false);
    setFormData({});
  };

  const handleSaveCourse = async () => {
    if (formData._id) {
      await updateCourse(formData._id, formData);
    } else {
      await addCourse(formData);
    }
    fetchCourses();
    setModalOpen(false);
    setFormData({});
  };

  // Export Excel
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      students.map((s) => ({
        Name: s.name,
        Phone: s.phone,
        Email: s.email,
        College: s.collegeInterested || "",
        Course: s.courseInterested || "",
        SubmittedAt: new Date(s.submittedAt).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "students.xlsx");
  };

  // Stat card
  const StatCard = ({ title, count, icon, color }) => (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{count}</p>
        </div>
        <div
          className={`p-3 rounded-full ${color
            .replace("border-l-", "bg-")
            .replace("-500", "-100")}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage students, courses, and colleges
            </p>
          </div>
          <button
            onClick={exportExcel}
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Students"
            count={students.length}
            color="border-l-blue-500"
            icon={<span className="text-blue-500">👨‍🎓</span>}
          />
          <StatCard
            title="Total Courses"
            count={courses.length}
            color="border-l-orange-500"
            icon={<span className="text-orange-500">📘</span>}
          />
          <StatCard
            title="Total Colleges"
            count={colleges.length}
            color="border-l-purple-500"
            icon={<span className="text-purple-500">🏫</span>}
          />
        </div>
      </div>

      {/* Courses & Colleges Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* COURSES */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Courses</h2>
              <button
                onClick={() => {
                  setModalType("course");
                  setFormData({});
                  setModalOpen(true);
                }}
                className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg"
              >
                + Add Course
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {courses.length === 0 ? (
                <p className="text-gray-600">No courses found.</p>
              ) : (
                <ul className="space-y-3">
                  {courses.map((course) => (
                    <li
                      key={course._id}
                      className="flex justify-between items-center border p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-black font-medium">{course.name}</p>
                        <p className="text-sm text-gray-700">
                          Level: {course.level || "N/A"}
                        </p>
                        <p className="text-sm text-gray-700">
                          Eligibility: {course.eligibility || "N/A"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setModalType("course");
                            setFormData(course);
                            setModalOpen(true);
                          }}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* COLLEGES */}
          <div className="bg-white rounded-xl shadow-lg p-6 h-[500px] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-black">Colleges</h2>
              <button
                onClick={() => {
                  setModalType("college");
                  setFormData({});
                  setModalOpen(true);
                }}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                + Add College
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {colleges.length === 0 ? (
                <p className="text-gray-600">No colleges found.</p>
              ) : (
                <ul className="space-y-3">
                  {colleges.map((college) => (
                    <li
                      key={college._id}
                      className="flex justify-between items-center border p-3 rounded-lg"
                    >
                      <div>
                        <p className="text-black font-medium">{college.name}</p>
                        <p className="text-sm text-gray-700">
                          Location: {college.location || "N/A"}
                        </p>
                        <p className="text-sm text-gray-700 line-clamp-2">
                          {college.description || ""}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setModalType("college");
                            setFormData(college);
                            setModalOpen(true);
                          }}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCollege(college._id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="bg-white rounded-xl shadow-2xl max-w-md mx-auto mt-20 p-6 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {formData._id
              ? `Edit ${modalType === "course" ? "Course" : "College"}`
              : `Add New ${modalType === "course" ? "Course" : "College"}`}
          </h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            ✖
          </button>
        </div>

        <div className="space-y-4">
          {modalType === "course" ? (
            <>
              <input
                type="text"
                placeholder="Course Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Level"
                value={formData.level || ""}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Eligibility"
                value={formData.eligibility || ""}
                onChange={(e) =>
                  setFormData({ ...formData, eligibility: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="College Name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
              <textarea
                placeholder="Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black"
              />
            </>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              modalType === "course" ? handleSaveCourse() : handleSaveCollege();
            }}
            className={`px-4 py-2 text-white font-medium rounded-lg ${
              modalType === "course"
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            Save {modalType === "course" ? "Course" : "College"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
