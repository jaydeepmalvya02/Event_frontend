// modal/LoginModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import Login from "../components/Login";

const LoginModal = ({ show, onClose, onLoginSuccess }) => {
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
        <Modal.Title className="text-warning w-100 text-center">
          To Join The Event, Login Below 👇
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 py-3" style={{ backgroundColor: "#f8f9fa" }}>
        <Login onLoginSuccess={onLoginSuccess} onClose={onClose} />
      </Modal.Body>
      <style>
        {`
          .modal-content {
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          }

          .modal-header {
            border-bottom: none;
          }

          .modal-title {
            font-weight: 600;
            font-size: 1.25rem;
          }

          .btn-close {
            filter: invert(1);
          }
        `}
      </style>
    </Modal>
  );
};

export default LoginModal;
