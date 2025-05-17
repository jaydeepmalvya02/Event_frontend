import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    division: "",
    designation: "",
    state: "",
    city: "",
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

  const handleRegister = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch("https://event-nine-xi.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Registration successful! 🎉", { autoClose: 5000 });
        setFormData({
          name: "",
          companyName: "",
          division: "",
          designation: "",
          state: "",
          city: "",
          mobile: "",
          email: "",
        });
        navigate("/Event");
      } else {
        toast.error(result.message || "Registration failed");
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
          <input
            name="name"
            className="form-control"
            placeholder="Your Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="companyName"
            className="form-control"
            placeholder="Company Name*"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="division"
            className="form-control"
            placeholder="Division*"
            value={formData.division}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="designation"
            className="form-control"
            placeholder="Designation*"
            value={formData.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <select
            name="state"
            className="form-select"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State*</option>
            {[
              "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
              "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
              "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
              "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
              "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
              "Chandigarh", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
            ].map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <input
            name="city"
            className="form-control"
            placeholder="City*"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="mobile"
            className="form-control"
            placeholder="Mobile Number*"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <input
            name="email"
            className="form-control"
            placeholder="Email Address*"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary fw-bold"
            onClick={handleRegister}
            disabled={submitting}
          >
            {submitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </>
  );
};

export default RegistrationForm;
