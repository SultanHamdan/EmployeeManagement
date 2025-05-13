import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Employees() {
  const location = useLocation();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(location.state?.employees || []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleView = (emp) => {
    alert(`Viewing employee:\nName: ${emp.name}\nEmail: ${emp.email}\nPhone: ${emp.phone}\nDepartment: ${emp.department}`);
  };

  const handleEdit = (index) => {
    const newName = prompt('Enter new name:', employees[index].name);
    if (newName !== null) {
      const updated = [...employees];
      updated[index].name = newName;
      setEmployees(updated);
    }
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updated = employees.filter((_, i) => i !== index);
      setEmployees(updated);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-br from-blue-900 to-blue-500 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h2 className="text-2xl font-bold">Employee Management</h2>
        <button
          onClick={handleBack}
          className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition-all duration-300"
        >
          ← Back to Dashboard
        </button>
      </nav>

      {/* Table Section */}
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Employee Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone</th>
                <th className="py-2 px-4">Department</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx} className="text-center border-b">
                  <td className="py-2 px-4">{emp.name}</td>
                  <td className="py-2 px-4">{emp.email}</td>
                  <td className="py-2 px-4">{emp.phone}</td>
                  <td className="py-2 px-4">{emp.department}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleView(emp)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(idx)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(idx)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-4 text-gray-500">
                    No employees added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Employees;
