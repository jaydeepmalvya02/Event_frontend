import React from "react";
import RegistrationForm from "./RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
const RegisterModal = ({ onClose }) => {
  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        padding: "1rem",
      }}
    >
      <div
        className="modal-box"
        style={{
          background: "linear-gradient(to bottom right, #dce8ff, #a6c9ff)",
          backgroundImage: 'url("/images/bg2.jfif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
        }}
      >
        <div className="modal-header p-3 border-bottom">
          <h5 className="modal-title">Register for the Event</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
            aria-label="Close"
            style={{ filter: "invert(1)" }} // this turns the black icon white
          />
        </div>
        <div className="modal-body p-0">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
