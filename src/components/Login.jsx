import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ mobile: "", email: "" });
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
      const response = await fetch("https://event-nine-xi.vercel.app/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Login Successful! 🎉", { autoClose: 2000 });
        setFormData({ mobile: "", email: "" });
        navigate("/liveEvents");
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
      <div className="login-box p-4  rounded-4 mx-auto" style={{ maxWidth: 400 }}>
        {/* <h3 className="text-center fw-bold mb-4 " style={{ fontSize: "2rem" , color: "#0d6efd"}}>Welcome Back</h3> */}
        <form>
          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control rounded-3"
              id="floatingEmail"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              name="mobile"
              className="form-control rounded-3"
              id="floatingMobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingMobile">Mobile Number</label>
          </div>

          <div className="d-grid">
            <button
              type="button"
              className="btn btn-primary fw-bold py-2"
              onClick={handleLogin}
              disabled={submitting}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p className="mb-0">
              Don't have an account?{" "}
              <a href="/register" className=" fw-bold" style={{ color: "#F1C40F" }}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
