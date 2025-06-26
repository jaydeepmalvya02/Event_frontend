import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Modal, Button, Form } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiDownload } from "react-icons/fi";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://event-nine-xi.vercel.app/api/");
        setUsers(res.data);
        setFilteredUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch users.");
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
      const allEmails = filteredUsers.map((user) => user.email);
      setSelectedUsers(allEmails);
    }
    setSelectAll(!selectAll);
  };

  const handleSearch = (value) => {
    setSearchKeyword(value);
    const keyword = value.toLowerCase();
    const filtered = users.filter((user) =>
      [user.name, user.email, user.companyName, user.city].some((field) =>
        field?.toLowerCase().includes(keyword)
      )
    );
    setFilteredUsers(filtered);
  };

  const sendTemplateMessage = async () => {
    if (!selectedTemplate || selectedUsers.length === 0) {
      toast.warning("Please select a template and users.");
      return;
    }

    try {
      await Promise.all(
        selectedUsers.map(async (email) => {
          await axios.post(
            "https://event-nine-xi.vercel.app/api/send-whatsapp",
            {
              messaging_product: "whatsapp",
              to: `91${email}`,
              type: "template",
              template: {
                name: selectedTemplate,
                language: { code: "en" },
              },
            }
          );
        })
      );
      toast.success("WhatsApp messages sent!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send WhatsApp messages.");
    }
  };

  const sendEmails = async () => {
    if (!emailSubject || !emailMessage || selectedUsers.length === 0) {
      toast.warning("Fill all fields and select users.");
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
      "Role",
      "LinkedIn",
      "Experience",
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
          user.role || "",
          user.linkedin || "",
          user.experience || "",
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

      <div className="row g-3 align-items-center mb-4">
        <div className="col-12 col-md-4">
          <input
            type="text"
            className="form-control rounded shadow-sm px-3 py-2"
            placeholder="🔍 Search name, email, company..."
            value={searchKeyword}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-3">
          <input
            type="text"
            className="form-control rounded shadow-sm px-3 py-2"
            placeholder="Template Name"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-5 d-flex flex-wrap gap-2 justify-content-md-end">
          <button
            className="btn btn-success shadow-sm"
            onClick={sendTemplateMessage}
          >
            <FaWhatsapp className="me-1" /> Send WhatsApp
          </button>
          <button
            className="btn btn-info text-white shadow-sm"
            onClick={() => setShowEmailModal(true)}
          >
            <MdEmail className="me-1" /> Send Email
          </button>
          <button
            className="btn btn-outline-primary shadow-sm"
            onClick={downloadCSV}
          >
            <FiDownload className="me-1" /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover text-nowrap small">
            <thead className="table-dark">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>#</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Division</th>
                <th>Designation</th>
                <th>State</th>
                <th>City</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Role</th>
                <th>LinkedIn</th>
                <th>Experience</th>
                <th>OS</th>
                <th>Browser</th>
                <th>Device Type</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user,index) => (
                  <tr key={user._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.email)}
                        onChange={() => handleUserSelect(user.email)}
                      />
                    </td>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.companyName}</td>
                    <td>{user.division}</td>
                    <td>{user.designation}</td>
                    <td>{user.state}</td>
                    <td>{user.city}</td>
                    <td>{user.mobile}</td>
                    <td>{user.email}</td>
                    <td>{user.role || "N/A"}</td>
                    <td>
                      {user.linkedin ? (
                        <a
                          href={user.linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          LinkedIn
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>{user.experience || "N/A"}</td>
                    <td>{user.deviceInfo?.os || "N/A"}</td>
                    <td>{user.deviceInfo?.browser || "N/A"}</td>
                    <td>{user.deviceInfo?.deviceType || "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="15" className="text-center text-muted">
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
