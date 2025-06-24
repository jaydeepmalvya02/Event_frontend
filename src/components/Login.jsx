import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getDeviceInfo } from "../utils/GetDeviceInfo";

const Login = ({ onLoginSuccess, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    division: "",
    designation: "",
    city: "",
    state: "",
    department: "",
    mobile: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      // Remove all non-numeric characters
      value = value.replace(/\D/g, "");

      // Remove country code if entered (e.g. +91, 91, or leading 0)
      if (value.startsWith("91") && value.length > 10) {
        value = value.slice(2);
      } else if (value.startsWith("0")) {
        value = value.replace(/^0+/, "");
      }

      // Limit to 10 digits
      if (value.length > 10) {
        value = value.slice(0, 10);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          body: JSON.stringify({
            email: formData.email,
            mobile: formData.mobile,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        if (!toast.isActive("login-success")) {
          toast.success("Login Successful! 🎉", { toastId: "login-success" });
              setTimeout(() => {
          navigate("/EventDetails");
          onLoginSuccess?.(); // Optional chaining in case it's undefined
          onClose?.();
        }, 1000);
        }
    
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async () => {
    if (submitting) return;
    setSubmitting(true);
    const deviceInfo = getDeviceInfo();
    const payload = { ...formData, deviceInfo };
    try {
      const response = await fetch(
        "https://event-nine-xi.vercel.app/api/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Registration Successful! 🎉");
        setTimeout(() => {}, 1000);
        setIsLogin(true);
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
   
      <h2 className="text-center mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form>
        {!isLogin && (
          <>
            {[
              { name: "name", label: "Your Name" },
              { name: "companyName", label: "Company Name" },
              { name: "division", label: "Division" },
              { name: "designation", label: "Designation" },
              { name: "city", label: "City" },
              { name: "mobile", label: "Mobile Number" },
              { name: "email", label: "Email Address", type: "email" },
            ].map((field) => (
              <div className="form-floating mb-3" key={field.name}>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  className="form-control"
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
                <label>{field.label}</label>
              </div>
            ))}

            <div className="mb-3">
              <select
                name="department"
                className="form-select rounded-3 shadow-sm"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                {["Sales", "Marketing", "Student", "Others"].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

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
          </>
        )}

        {isLogin && (
          <>
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email Address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="mobile"
                className="form-control"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <label>Mobile Number</label>
            </div>
          </>
        )}

        <div className="d-grid">
          <button
            type="button"
            className="btn btn-primary"
            onClick={isLogin ? handleLogin : handleRegister}
            disabled={submitting}
          >
            {submitting
              ? isLogin
                ? "Logging in..."
                : "Registering..."
              : isLogin
              ? "Login"
              : "Register"}
          </button>
        </div>

        <div className="text-center mt-3">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
