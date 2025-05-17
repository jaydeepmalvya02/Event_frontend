import axios from "axios";
import React, { useEffect, useState } from "react";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://event-nine-xi.vercel.app/api/");
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const downloadCSV = () => {
    if (users.length === 0) return;

    const headers = [
      "Name",
      "Company Name",
      "Division",
      "Designation",
      "State",
      "City",
      "Mobile",
      "Email",
    ];

    const csvRows = [
      headers.join(","), // Header row
      ...users.map((user) =>
        [
          user.name,
          user.companyName,
          user.division,
          user.designation,
          user.state,
          user.city,
          user.mobile,
          user.email,
        ]
          .map((field) => `"${field}"`)
          .join(",")
      ),
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User Management</h2>

      <div className="text-end mb-3">
        <button className="btn btn-success" onClick={downloadCSV}>
          📥 Download CSV
        </button>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Company Name</th>
                <th>Division</th>
                <th>Designation</th>
                <th>State</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.companyName}</td>
                    <td>{user.division}</td>
                    <td>{user.designation}</td>
                    <td>{user.state}</td>
                    <td>{user.city}</td>
                    <td>{user.mobile}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowUser;
