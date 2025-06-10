import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Email Modal States
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

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

  const handleUserSelect = (userEmail) => {
    setSelectedUsers((prev) =>
      prev.includes(userEmail)
        ? prev.filter((email) => email !== userEmail)
        : [...prev, userEmail]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      const allEmails = users.map((user) => user.email);
      setSelectedUsers(allEmails);
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
        selectedUsers.map(async (email) => {
          await axios.post(
            "https://event-nine-xi.vercel.app/api/send-whatsapp",
            {
              messaging_product: "whatsapp",
              to: `91${email}`, // Add country code if mobile
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

  const sendEmails = async () => {
    if (!emailSubject || !emailMessage || selectedUsers.length === 0) {
      toast.warning("Fill all fields and select at least one user.");
      return;
    }

    try {
      await axios.post("https://event-nine-xi.vercel.app/api/send-email", {
        emails: selectedUsers,
        subject: emailSubject,
        message: emailMessage,
      });

      toast.success("Emails sent successfully!");
      setShowEmailModal(false);
      setEmailSubject("");
      setEmailMessage("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send emails.");
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
          className="px-5 py-2 bg-emerald-600 text-white rounded-full"
          onClick={downloadCSV}
        >
          Download CSV
        </button>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="px-4 py-2 rounded bg-[#443A52] text-white border"
            placeholder="Enter Template Name"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={sendTemplateMessage}
          >
            Send WhatsApp
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowEmailModal(true)}
          >
            Send Email
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
                        checked={selectedUsers.includes(user.email)}
                        onChange={() => handleUserSelect(user.email)}
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
                  <td colSpan="12" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Email Modal */}
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendEmails}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowUser;
