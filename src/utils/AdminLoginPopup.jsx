import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AdminLoginPopup = ({ onClose, onAdminLoginSuccess }) => {
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdminLogin = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await fetch(
        "https://event-nine-xi.vercel.app/api/admin/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(adminData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        toast.success("Admin login successful! 👨‍💼");
        setTimeout(() => {
          onAdminLoginSuccess?.(); // trigger parent update
          onClose?.();
          navigate("/admin");
        }, 1500);
      } else {
        toast.error(result.message || "Admin login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <ToastContainer position="top-center" autoClose={4000} theme="colored" />
      <h4 className="text-center mb-4">Admin Login</h4>
      <form>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={adminData.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={adminData.password}
            onChange={handleChange}
            required
          />
          <label>Password</label>
        </div>

        <div className="d-grid">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleAdminLogin}
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login as Admin"}
          </button>
        </div>

        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link text-danger"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginPopup;
