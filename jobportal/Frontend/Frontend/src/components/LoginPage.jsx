import React, { useState } from "react";
import axios from "axios";

function LoginPage({ onLoginSuccess, goToSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("Loading...");

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
        role,
      });

      if (response.data === "Login successful") {
        setMessage("✅ Login successful!");
        if (onLoginSuccess) onLoginSuccess(role, username);
      } else {
        setMessage("❌ " + response.data);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("⚠️ Server error or user not found");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Login
        </button>

        <button
          type="button"
          onClick={goToSignup}
          className="w-full bg-green-600 text-white py-2 rounded-lg mt-3 hover:bg-green-700"
        >
          Create Account (Signup)
        </button>

        {message && <p className="mt-3 text-center">{message}</p>}
      </form>
      <p
  className="mt-4 text-blue-600 cursor-pointer text-center"
  onClick={() => goToSignup()}
>
  Create a new account
</p>

    </div>
  );
}

export default LoginPage;
