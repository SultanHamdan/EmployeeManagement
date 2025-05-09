import React from "react";
import { Link } from "react-router-dom"; // Make sure React Router is set up

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login
        </h2>

        <form className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg hover:bg-gray-100 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Not signed in?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Please register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
