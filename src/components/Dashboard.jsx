import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleAddEmployee = (e) => {
  //   e.preventDefault();
  //   console.log('Form Submitted:', formData); // ✅ Log formData
  //   setEmployees([...employees, formData]);
  //   setFormData({ name: '', email: '', phone: '', department: '' });
  // };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8080/api/employee", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Employee created", data);
      navigate("/dashboard");
    } catch (error) {
      console.log("Error creating employee", error.message);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const goToEmployeeTable = () => {
    navigate("/employees", { state: { employees } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 text-white">
      {/* Navigation Bar */}
      <nav className="bg-blue-800 p-4 flex justify-between items-center shadow-lg transition-all duration-500">
        <h2 className="text-xl font-bold animate-pulse">ExcelSoft Dashboard</h2>
        <div className="flex gap-4">
          <button className="hover:bg-blue-600 px-3 py-2 rounded transition-all duration-300">
            Dashboard
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

      {/* Employee Form */}
      <div className="flex justify-center mt-10">
        <form
          onSubmit={handleAddEmployee}
          className="bg-white text-black p-8 rounded-lg shadow-lg w-full max-w-lg space-y-4"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Add Employee
          </h2>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Administration">Administration</option>
            <option value="IT Teams">IT Teams</option>
            <option value="Trainee Engineer">Trainee Engineer</option>
            <option value="ASE">ASE</option>
            <option value="JAVA SDE">JAVA SDE</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
