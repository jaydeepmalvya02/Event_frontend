import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDeviceInfo } from "../utils/GetDeviceInfo";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const RegistrationForm = ({ onEmailExists, onSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    division: "",
    designation: "",
    department: "",
    state: "",
    city: "",
    mobile: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "");
      if (value.startsWith("91") && value.length > 10) value = value.slice(2);
      else if (value.startsWith("0")) value = value.replace(/^0+/, "");
      if (value.length > 10) value = value.slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async () => {
    if (submitting) return;

    const requiredFields = Object.keys(formData);
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        toast.error(`Please fill in ${field}`);
        return;
      }
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(formData.mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address");
      return;
    }

    setSubmitting(true);
    const payload = { ...formData, deviceInfo: getDeviceInfo() };

    try {
      const res = await fetch("https://event-nine-xi.vercel.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Registration successful! 🎉", { autoClose: 3000 });
        localStorage.setItem("user", JSON.stringify(formData));
        setFormData({
          name: "",
          companyName: "",
          division: "",
          designation: "",
          department: "",
          state: "",
          city: "",
          mobile: "",
          email: "",
        });
        onSuccess?.();
        navigate("/EventDetails");
      } else {
        if (
          res.status === 401 &&
          result.message.includes("Email already exists")
        ) {
          onEmailExists?.();
        }
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
    <div className="container py-5">
      <ToastContainer />
      <div
        className="mx-auto bg-white shadow rounded-4 p-4"
        style={{ maxWidth: "550px" }}
      >
        <h4 className="mb-4 text-center fw-bold">Register for the Event</h4>

        <form>
          {[
            { name: "name", label: "Your Name" },
            { name: "companyName", label: "Company Name" },
            { name: "division", label: "Division" },
            { name: "designation", label: "Designation" },
            {
              name: "department",
              label: "Department",
              type: "select",
              options: ["Sales", "Marketing", "Student", "Others"],
            },
            { name: "city", label: "City" },
            { name: "mobile", label: "Mobile Number" },
            { name: "email", label: "Email Address", type: "email" },
          ].map(({ name, label, type = "text", options }) => (
            <div className="mb-3" key={name}>
              {type === "select" ? (
                <select
                  name={name}
                  className="form-select rounded-3 shadow-sm"
                  value={formData[name]}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select {label}</option>
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  name={name}
                  type={type}
                  className="form-control rounded-3 shadow-sm"
                  placeholder={label}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          ))}

          <div className="mb-3">
            <select
              name="state"
              className="form-select rounded-3 shadow-sm"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
                "Chandigarh",
                "Delhi",
                "Jammu and Kashmir",
                "Ladakh",
                "Lakshadweep",
                "Puducherry",
              ].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid mt-3">
            <button
              type="button"
              className="btn btn-primary fw-bold rounded-3 shadow-sm"
              onClick={handleRegister}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
