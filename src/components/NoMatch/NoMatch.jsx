import React from "react";
import { useNavigate } from "react-router-dom";

function NoMatch() {
  const navigate = useNavigate();

  const goToEmployeeTable = () => {
    navigate("/employees");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-white">
      {/* Navbar */}
      <nav className="bg-blue-500 px-6 py-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold animate-pulse">ExcelSoft Dashboard</h2>
        <div className="flex gap-4">
          <button className="hover:bg-blue-600 px-3 py-2 rounded transition-all duration-300">
            Home
          </button>
          <button className="hover:bg-blue-600 px-3 py-2 rounded transition-all duration-300">
            Profile
          </button>
          <button className="hover:bg-blue-600 px-3 py-2 rounded transition-all duration-300">
            Settings
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded transition-all duration-300"
            onClick={goToEmployeeTable}
          >
            View Employees
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition-all duration-300"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* 404 Message */}
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold text-gray-800">404 - Not Found</h1>
      </div>
    </div>
  );
}

export default NoMatch;
