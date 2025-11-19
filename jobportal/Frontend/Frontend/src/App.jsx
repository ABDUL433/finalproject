import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  const [role, setRole] = useState(null);
  const [page, setPage] = useState("login");

  const handleLoginSuccess = (r) => {
    setRole(r);
  };

  if (page === "signup") {
    return (
      <SignupPage onSignupSuccess={() => setPage("login")} />
    );
  }

  if (!role) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        goToSignup={() => setPage("signup")}
      />
    );
  }

  return (
    <div className="p-6">
      {role === "admin" ? <JobForm /> : <JobList />}
    </div>
  );
}

export default App;
