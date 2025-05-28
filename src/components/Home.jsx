import React from "react";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import "../App.css";
import FeaturedSpeakers from "./FeaturedSpeakers";
import ConferenceInfo from "./ConferenceInfo";

const Home = () => {
  const [showRegistered, setShowRegistered] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
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
          {/* Section 1 */}
          <div className="row flex-lg-row-reverse align-items-center g-4 py-4 mx-auto">
            <motion.div
              className="col-12 col-lg-6"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1
                className="display-5 fw-bold mb-3 p-2 p-md-4 m-2 font-stretch-95% transition-colors duration-300"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 6vw, 85px)",
                  lineHeight: "1.2",
                  color: "#E9777C",
                  cursor: "pointer",
                  textAlign: window.innerWidth < 768 ? "center" : "left",
                }}
              >
                About our #PitchPoint.
                {/* <span style={{ fontStyle: "italic" }}>#PitchPoint.</span> */}
                {/* {" "} { <span style={{ fontFamily: "Harrington" }}> #PitchPoint.</span> } */}
              </h1>
              <p
                className="lead p-2 p-md-4 m-2 text-white"
                style={{
                  textAlign: window.innerWidth < 768 ? "center" : "left",
                  fontSize: "clamp(1rem, 2vw, 1.25rem)",
                }}
              >
                PitchPoint is a signature online webinar series by ExpertOnTalk,
                designed to bring together the thoughts of leaders, innovators,
                and professionals from the pharma space.
              </p>
              <div
                className="d-grid gap-2 d-md-flex justify-content-md-start p-2 p-md-4 m-2"
                style={{
                  justifyContent:
                    window.innerWidth < 768 ? "center" : "flex-start",
                }}
              >
                <button
                  onClick={() => setShowRegistered(true)}
                  className="btn fw-bold text-white position-relative px-4 px-lg-5 py-2 py-lg-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(118, 75, 162, 0.3)",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
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
                  Register Now
                  <span
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: "rgba(255, 255, 255, 0.15)",
                      transform: "skewX(-45deg) translateX(-100%)",
                      transition: "transform 0.5s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform =
                        "skewX(-45deg) translateX(100%)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform =
                        "skewX(-45deg) translateX(-100%)";
                    }}
                  />
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
                  onClick={() => setShowLogin(true)}
                >
                  Join Event
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {showRegistered && (
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
                  <h5
                    className="modal-title fw-bold"
                    style={{ color: "#9BA15D" }}
                  >
                    Let's Connect
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowRegistered(false)}
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
                  <RegistrationForm />
                </div>
              </div>
            </div>
          </div>
        )}

        {showLogin && (
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
                className="modal-content rounded-4 border-0 shadow"
                style={{
                  backgroundImage: 'url("/images/bg3.png")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "#fff",
                }}
              >
                <div
                  className="modal-header border-0"
                  style={{ background: "rgba(0, 0, 0, 0.4)" }}
                >
                  <h5
                    className="modal-title w-100 text-center fw-bold"
                    style={{ color: "#F1C40F" }}
                  >
                    To Join The Event, Login Below 👇
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowLogin(false)}
                  ></button>
                </div>
                <div
                  className="modal-body px-4 py-3"
                  style={{
                    borderRadius: "0 0 1rem 1rem",
                  }}
                >
                  <Login />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <FeaturedSpeakers />
      </div>
      <div>
        <ConferenceInfo />
      </div>
    </>
  );
};

export default Home;
