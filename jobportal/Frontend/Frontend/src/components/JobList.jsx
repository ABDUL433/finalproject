import React, { useState, useEffect } from "react";
import axios from "axios";

function JobList({ isAdmin }) {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/jobs") // your backend endpoint
      .then(res => setJobs(res.data))
      .catch(err => console.error("Error fetching jobs:", err));
  }, []);

  const handleApply = async (jobId) => {
    try {
      // Simulate apply
      setAppliedJobs(prev => [...prev, jobId]);

      // Optional backend save (if you have API)
      await axios.post(`http://localhost:8080/api/user/apply`, { jobId });

      console.log("Job applied:", jobId);
    } catch (err) {
      console.error("Error applying:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
        {isAdmin ? "All Jobs (Admin View)" : "Available Jobs"}
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <div key={job.id} className="bg-white shadow-lg rounded-2xl p-5 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 mt-1">{job.company}</p>
            <p className="text-gray-500 text-sm mt-2">{job.location}</p>
            <p className="text-gray-700 mt-3">{job.description}</p>

            {!isAdmin && (
              <button
                onClick={() => handleApply(job.id)}
                disabled={appliedJobs.includes(job.id)}
                className={`mt-4 px-4 py-2 rounded-lg font-semibold text-white w-full 
                  ${appliedJobs.includes(job.id)
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {appliedJobs.includes(job.id) ? "Applied ✅" : "Apply"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
