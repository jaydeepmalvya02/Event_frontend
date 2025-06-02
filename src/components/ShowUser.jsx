import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://event-nine-xi.vercel.app/api/");
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch users. Please try again later.");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleUserSelect = (userMobile) => {
    setSelectedUsers((prev) =>
      prev.includes(userMobile)
        ? prev.filter((num) => num !== userMobile)
        : [...prev, userMobile]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const allMobiles = users.map((user) => user.mobile);
      setSelectedUsers(allMobiles);
    }
    setSelectAll(!selectAll);
  };

  const sendTemplateMessage = async () => {
    if (!selectedTemplate || selectedUsers.length === 0) {
      alert("Please select a template and at least one user.");
      return;
    }

    try {
      await Promise.all(
        selectedUsers.map(async (mobile) => {
          await axios.post(
            "https://event-nine-xi.vercel.app/api/send-whatsapp",
            {
              messaging_product: "whatsapp",
              to: `91${mobile}`, // Add country code
              type: "template",
              template: {
                name: selectedTemplate,
                language: { code: "en" },
              },
            }
          );
        })
      );

      toast.success("WhatsApp template messages sent successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send WhatsApp messages.");
    }
  };

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
      headers.join(","),
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

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-success" onClick={downloadCSV}>
          📥 Download CSV
        </button>

        <div className="d-flex gap-2">
          <select
            className="form-select"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          >
            <option value="">-- Select WhatsApp Template --</option>
            <option value="welcome_msg">Registration Successful</option>
            <option value="template_2">Thank You Message</option>
            <option value="template_3">Custom Invite</option>
          </select>
          <button
            className="btn btn-primary"
            disabled={!selectedTemplate || selectedUsers.length === 0}
            onClick={sendTemplateMessage}
          >
            📤 Send WhatsApp
          </button>
        </div>
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
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
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
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.mobile)}
                        onChange={() => handleUserSelect(user.mobile)}
                      />
                    </td>
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
                  <td colSpan="9" className="text-center">
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
