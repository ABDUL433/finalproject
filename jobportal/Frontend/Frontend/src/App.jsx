import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import JobForm from "./components/JobForm";
import JobList from "./components/JobLIst";

function App() {
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState("");

  const handleLoginSuccess = (userRole, userName) => {
    setRole(userRole);
    setUsername(userName);
  };

  if (!role) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Welcome, {username} ({role})
      </h2>

      {role === "admin" ? (
        <JobForm />
      ) : (
        <JobList username={username} />
      )}
    </div>
  );
}

export default App;
