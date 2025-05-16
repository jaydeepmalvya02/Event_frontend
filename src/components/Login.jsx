import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch(
        "https://event-nine-xi.vercel.app/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Login Successful! 🎉", { autoClose: 2000 });
        setFormData({ mobile: "", email: "" });
        navigate("/Event");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            name="email"
            className="form-control"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Mobile Number</label>
          <input
            name="mobile"
            className="form-control"
            placeholder="Enter your mobile number"
            type="text"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary fw-bold"
            onClick={handleLogin}
            disabled={submitting}
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;



// const user = JSON.parse(localStorage.getItem("user"));
// console.log(user?.name); // e.g., "Rohit Chakrawarti"
