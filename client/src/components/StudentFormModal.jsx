// StudentFormModal.js
import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";

const StudentFormModal = ({ courses, colleges }) => {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Check if already registered (saved in localStorage)
    const registered = localStorage.getItem("studentRegistered");
    if (registered) return;

    const interval = setInterval(() => {
      setShowForm(true);
    }, 40000); // every 60 seconds

    return () => clearInterval(interval);
  }, []);

  const registerStudent = async (formData) => {
    try {
      const res = await fetch("https://ananta-education.onrender.com/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to register student");

      // Mark as registered
      localStorage.setItem("studentRegistered", "true");
      setShowForm(false);
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert("Failed to register. Try again later.");
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 mb-10 md:mb-0">
      <div className="relative w-full max-w-4xl h-screen md:max-h-[95vh] scale-[0.75] sm:scale-[0.85] md:scale-95 lg:scale-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowForm(false)}
          className="absolute text-black top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition z-10"
        >
          ✕
        </button>

        {/* Student Form Container with scroll */}
        <div className="max-h-full overflow-y-auto">
          <StudentForm 
            courses={courses}
            colleges={colleges}
            registerStudent={registerStudent}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentFormModal;