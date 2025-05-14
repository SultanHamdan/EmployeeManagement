import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleView = (emp) => {
    setSelectedEmployee(emp);
  };

  const handleEdit = (index) => {
    const newName = prompt("Enter new name:", employees[index].name);
    if (newName !== null) {
      const updated = [...employees];
      updated[index].name = newName;
      setEmployees(updated);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employee/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        } else {
          console.error("Failed to delete employee:", response.status);
          alert("Error deleting employee.");
        }
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Navbar */}
      <nav className="bg-gradient-to-br from-blue-900 to-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <button
          onClick={handleBack}
          className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-all duration-300"
        >
          ← Back to Dashboard
        </button>
      </nav>

      {/* Employee Table */}
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Employee Table by Department
        </h2>

        {[
          "HR",
          "Administration",
          "IT Teams",
          "Trainee Engineer",
          "ASE",
          "JAVA SDE",
        ].map((dept) => {
          const filtered = employees.filter((emp) => emp.department === dept);
          if (filtered.length === 0) return null;

          return (
            <div
              key={dept}
              className="mb-10 bg-gray-50 rounded-lg shadow-sm p-4"
            >
              <h3 className="text-2xl font-semibold mb-4 text-blue-800 border-b pb-2">
                {dept} Department
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full table-auto bg-white shadow-md rounded">
                  <thead>
                    <tr className="bg-blue-500 text-white text-left">
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Phone</th>
                      <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((emp, idx) => (
                      <tr
                        key={idx}
                        className="border-b hover:bg-gray-100 text-left"
                      >
                        <td className="py-2 px-4">{emp.name}</td>
                        <td className="py-2 px-4">{emp.email}</td>
                        <td className="py-2 px-4">{emp.phone}</td>
                        <td className="py-2 px-4 flex justify-center gap-2">
                          <button
                            onClick={() => handleView(emp)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleEdit(employees.indexOf(emp))}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(emp.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {employees.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No employees found.</p>
        )}
      </div>

      {/* Popup Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative animate-fade-in">
            <button
              onClick={() => setSelectedEmployee(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-700">
              Employee Details
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {selectedEmployee.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedEmployee.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedEmployee.phone}
              </p>
              <p>
                <strong>Department:</strong> {selectedEmployee.department}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employees;
