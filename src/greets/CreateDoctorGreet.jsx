import React, {  useState } from "react";
import { useAuth} from "../context/AuthContext"
import Login from "../components/Login";
import { Modal } from "react-bootstrap";

const CreateDoctorGreet = () => {
 const {isLoggedIn,login} = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);
  const handleLoginSuccess = (user) => {
    login(user);
    closeLoginModal();
    window.open(
      "https://instamd.in/v6/common/eposter/create.php?poster_id=1199&user_id=26825&auth_key=173d7c9f88edd8f3d06624cd3&customer_id=&customer_type=",
      "_blank"
    );
  };
  return (
    <div className="relative w-full h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/greet.webp')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-transparent bg-opacity-40"></div>

      {/* Slogan Text */}
      <h1 className="relative z-10 text-white text-3xl sm:text-5xl font-bold font-serif  mb-6">
        Your words. Your design. Their smile.
        <br />
        Start your Doctor’s Day poster now!
      </h1>

      {/* Button BELOW slogan */}
      <button
        onClick={() => {
          isLoggedIn
            ? window.open(
                "https://instamd.in/v6/common/eposter/create.php?poster_id=1199&user_id=26825&auth_key=173d7c9f88edd8f3d06624cd3&customer_id=&customer_type=",
                "_blank"
              )
            : (openLoginModal());
        }}
        className="btn fw-bold text-white position-relative px-4 px-lg-5 py-2 py-lg-3"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          border: "none",
          boxShadow: "0 4px 15px rgba(118, 75, 162, 0.3)",
          transition: "all 0.3s ease",
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          letterSpacing: "0.5px",
          margin: "0.5rem",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 8px 25px rgba(118, 75, 162, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.3)";
        }}
      >
        Create Poster
      </button>
      <Modal
        show={showLoginModal}
        onHide={closeLoginModal}
        centered
        backdrop="static"
        dialogClassName="modal-lg"
      >
        <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
          <Modal.Title className="text-white w-100 text-center">
            To Join The Event, Login Below
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
          <Login
            onClose={closeLoginModal}
            onLoginSuccess={handleLoginSuccess}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CreateDoctorGreet;
