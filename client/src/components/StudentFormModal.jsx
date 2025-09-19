// StudentFormModal.js
import React, { useState, useEffect, useRef } from "react";
import StudentForm from "./StudentForm";

const StudentFormModal = ({ courses, colleges }) => {
  const [showForm, setShowForm] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const registered = localStorage.getItem("studentRegistered");
    if (registered) return;

    const interval = setInterval(() => {
      setShowForm(true);
    }, 10000);

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

      localStorage.setItem("studentRegistered", "true");
      setShowForm(false);
    } catch (err) {
      console.error("❌ Registration error:", err);
      alert("Failed to register. Try again later.");
    }
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 10;
    setAtBottom(isBottom);
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2">
      <div className="relative w-full max-w-4xl h-screen md:max-h-[95vh] scale-[0.9] sm:scale-[0.95] md:scale-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setShowForm(false)}
          className="absolute text-black top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition z-10"
        >
          ✕
        </button>

        {/* Scrollable Form Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="max-h-full overflow-y-scroll hide-scrollbar relative px-2 sm:px-4"
        >
          <StudentForm
            courses={courses}
            colleges={colleges}
            registerStudent={registerStudent}
          />
        </div>

        {/* Scroll Down Indicator (now outside form content) */}
        {!atBottom && (
          <div className="absolute bottom-4 left-[60%] text-gray-600 animate-bounce pointer-events-none text-sm sm:text-base md:text-lg">
            ↓ Scroll down to submit
          </div>
        )}
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE/Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }
      `}</style>
    </div>
  );
};

export default StudentFormModal;
