// components/RegisterModal.js
import React from "react";
import RegistrationForm from "../components/RegistrationForm";

const RegisterModal = ({ onClose, onEmailExists, onSuccess }) => {
  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(3px)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1050,
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content"
          style={{
            backgroundImage: 'url("/images/bg2.jfif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title fw-bold" style={{ color: "#9BA15D" }}>
              Let's Connect
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              style={{
                filter: "invert(1)",
                opacity: 0.9,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 1)}
              onMouseLeave={(e) => (e.target.style.opacity = 0.9)}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <RegistrationForm
              onSuccess={onSuccess}
              onEmailExists={onEmailExists}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
