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
      "OS",
      "Browser",
      "Device Type",
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
          user.deviceInfo?.os || "",
          user.deviceInfo?.browser || "",
          user.deviceInfo?.deviceType || "",
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
      <h2 className="text-center text-white mb-4">User Management</h2>

      <div className="d-flex justify-content-between mb-3">
        <button
          className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white font-medium rounded-full shadow-md hover:bg-emerald-700 active:scale-95 transition-all duration-300"
          onClick={downloadCSV}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
            />
          </svg>
          Download CSV
        </button>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="w-full max-w-xs px-4 py-2 rounded-lg bg-[#443A52] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm"
            placeholder="Enter Template Name"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          />

          <button
            className="flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-full shadow-md hover:bg-green-700 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            // disabled={!selectedTemplate || selectedUsers.length === 0}
            onClick={sendTemplateMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.04 2.002c-5.512 0-9.985 4.471-9.985 9.982a9.94 9.94 0 001.362 5.053L2 22l5.107-1.336a9.973 9.973 0 004.933 1.263h.001c5.512 0 9.985-4.472 9.985-9.984S17.553 2.002 12.04 2.002zm.002 18.292a8.297 8.297 0 01-4.229-1.153l-.303-.18-3.031.793.809-2.958-.197-.309a8.273 8.273 0 01-1.278-4.403c0-4.576 3.724-8.3 8.3-8.3 4.576 0 8.3 3.724 8.3 8.3-.001 4.577-3.725 8.3-8.3 8.3zm4.673-6.23c-.256-.128-1.516-.747-1.752-.831-.236-.085-.408-.128-.58.128-.17.256-.664.831-.815.998-.149.17-.298.192-.554.064-.256-.128-1.08-.397-2.058-1.265-.76-.679-1.273-1.515-1.421-1.77-.149-.256-.017-.395.111-.523.113-.113.256-.298.384-.447.128-.149.17-.256.256-.426.085-.17.043-.319-.021-.447-.064-.128-.58-1.398-.794-1.91-.21-.507-.426-.439-.58-.447l-.495-.01c-.17 0-.447.064-.681.319s-.894.874-.894 2.133.916 2.473 1.045 2.643c.128.17 1.8 2.747 4.363 3.85.611.263 1.087.42 1.457.537.612.195 1.169.168 1.609.102.49-.073 1.516-.619 1.731-1.216.213-.597.213-1.108.149-1.216-.064-.106-.234-.17-.49-.298z" />
            </svg>
            Send WhatsApp
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
                <th>OS</th>
                <th>Browser</th>
                <th>Device Type</th>
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
                    <td>{user.deviceInfo?.os || "N/A"}</td>
                    <td>{user.deviceInfo?.browser || "N/A"}</td>
                    <td>{user.deviceInfo?.deviceType || "N/A"}</td>
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
