import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import RegisterAsSpeakerForm from "../utils/RegisterAsSpeakerForm";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import "../App.css";
import FeaturedSpeakers from "./FeaturedSpeakers";
import ConferenceInfo from "./ConferenceInfo";
import FeaturedFounders from "./FeaturedFounders";
import CurrentEvent from "./CurrentEvent";
import Founder from "./Founder";
import EventHighlights from "../utils/EventHighlight";

const Home = () => {
  const [showRegistered, setShowRegistered] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSpeakerModal, setShowSpeakerModal] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  const navigate = useNavigate();

  const isUserLoggedIn = () => {
    return localStorage.getItem("user") !== null;
  };

  const switchToLogin = () => {
    setShowRegistered(false);
    setShowLoginPopup(true);
  };

  const handleRegisterClick = () => {
    if (isUserLoggedIn()) {
      navigate("/EventDetails");
    } else {
      isSpeaker ? setShowSpeakerModal(true) : setShowRegistered(true);
    }
  };

  const handleJoinClick = () => {
    if (isUserLoggedIn()) {
      navigate("/EventDetails");
    } else {
      setShowLoginPopup(true);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: 'url("/images/bg4.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          padding: "2rem 0",
        }}
      >
        <div
          style={{
            borderRadius: "1rem",
            padding: "1rem",
            margin: "0 auto",
            maxWidth: "1400px",
          }}
        >
          <div className="row flex-lg-row-reverse align-items-center g-4 py-4 mx-auto">
            <motion.div
              className="col-12 col-lg-6"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1
                className="display-5 fw-bold mb-3 p-2 p-md-4 m-2"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 6vw, 85px)",
                  lineHeight: "1.2",
                  color: "#E9777C",
                  textAlign: window.innerWidth < 768 ? "center" : "left",
                }}
              >
                About our #PitchPoint.
              </h1>
              <p
                className="lead p-2 p-md-4 m-2 text-white"
                style={{
                  textAlign: window.innerWidth < 768 ? "center" : "left",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                }}
              >
                PitchPoint is a signature online webinar series by
                ExpertOnBoard, designed to bring together the thoughts of
                leaders, innovators, and professionals from the pharma space.
              </p>

              <div
                className="d-grid gap-2 d-md-flex justify-content-md-start p-2 p-md-4 m-2"
                style={{
                  justifyContent:
                    window.innerWidth < 768 ? "center" : "flex-start",
                }}
              >
                <button
                  onClick={handleRegisterClick}
                  className="btn fw-bold text-white position-relative px-4 px-lg-5 py-2 py-lg-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(118, 75, 162, 0.3)",
                    transition: "all 0.3s ease",
                    fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                    letterSpacing: "0.5px",
                    margin: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(118, 75, 162, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(118, 75, 162, 0.3)";
                  }}
                >
                  {isSpeaker ? "Register as Speaker" : "Register Now"}
                </button>

                <button
                  className="btn btn-outline-secondary btn-md px-3 px-lg-4 py-2 fw-semibold shadow-sm"
                  style={{
                    backgroundColor: "#f8f9fa",
                    color: "#6c757d",
                    transition: "all 0.3s ease",
                    border: "2px solid #6c757d",
                    margin: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#6c757d";
                    e.target.style.color = "#fff";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f8f9fa";
                    e.target.style.color = "#6c757d";
                    e.target.style.transform = "scale(1)";
                  }}
                  onClick={handleJoinClick}
                >
                  Join Event
                </button>
              </div>
            </motion.div>
            {/* Speaker Tagline + Switch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white p-3 ps-4"
            >
              <h5 className="mb-2">
                <span className="fw-bold">Become a Speaker</span>
              </h5>
              <Form className="mb-3">
                <Form.Check
                  type="switch"
                  id="speaker-switch"
                  label="Toggle to register as a speaker"
                  checked={isSpeaker}
                  onChange={() => setIsSpeaker((prev) => !prev)}
                />
              </Form>
            </motion.div>
          </div>
        </div>

        {/* Register Modal */}
        <Modal
          show={showRegistered}
          onHide={() => setShowRegistered(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
            <Modal.Title className="text-white w-100 text-center">
              Let's Connect
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
            <RegistrationForm
              onSuccess={() => {
                setShowRegistered(false);
                setShowLoginPopup(true);
              }}
              onEmailExists={switchToLogin}
            />
          </Modal.Body>
        </Modal>

        {/* Login Modal */}
        <Modal
          show={showLoginPopup}
          onHide={() => setShowLoginPopup(false)}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
            <Modal.Title className="text-white w-100 text-center">
              To Join The Event, Login Below
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#f8f9fa" }}>
            <Login
              onLoginSuccess={() => {
                setShowLoginPopup(false);
                navigate("/EventDetails");
              }}
            />
          </Modal.Body>
        </Modal>

        {/* Register as Speaker Modal */}
        <Modal
          show={showSpeakerModal}
          onHide={() => setShowSpeakerModal(false)}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Header closeButton style={{ backgroundColor: "#212529" }}>
            <Modal.Title className="text-white w-100 text-center">
              Become a Speaker
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#ffffff" }}>
            <RegisterAsSpeakerForm
              onSuccess={() => {
                setShowSpeakerModal(false);
                setShowLoginPopup(true);
              }}
              onClose={() => setShowSpeakerModal(false)}
            />
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
      </div>

      {/* Other Sections */}
      <div className="bg-red-200">
        <CurrentEvent />
      </div>
      <FeaturedSpeakers />
      <ConferenceInfo />
      <FeaturedFounders />
      <Founder />
      <div
        style={{
          backgroundImage: "url('/images/bg6.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <EventHighlights />
      </div>
    </>
  );
};

export default Home;
