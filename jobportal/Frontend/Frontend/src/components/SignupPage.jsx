import React, { useState } from "react";
import axios from "axios";

function SignupPage({ onSignupSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        form
      );

      if (response.data === "Signup successful") {
        setMessage("✅ Signup successful!");
        onSignupSuccess();
      } else {
        setMessage("❌ " + response.data);
      }
    } catch (error) {
      setMessage("⚠️ Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Signup Page
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={form.username}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 mb-4 border rounded-lg"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Signup
        </button>

        {message && (
          <p className="mt-4 text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}

export default SignupPage;
