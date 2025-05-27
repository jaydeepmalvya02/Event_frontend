import React from "react";
import ee from "/images/ee1.PNG";
import instamdlogo from "/images/instamd_logo.PNG";
import speaker1 from "/images/m1.jpeg";
import speaker2 from "/images/m2.jpeg";
import speaker3 from "/images/m3.jpeg";
import speaker4 from "/images/m4.jfif";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";
import RegisterModal from "./RegisterModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EventPage = () => {
  return (
    <div className="container-fluid px-0 bg-light">
      <ToastContainer />
      {/* Header */}
      <div className="py-5 bg-primary text-white text-center">
        <div className="container">
          <div className="text-center mb-4">
            <h5 className="mb-3">Powered by</h5>
            <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
              <img src={ee} alt="Logo 1" style={{ height: "100px" }} />
              <img
                src={instamdlogo}
                alt="Logo 2"
                style={{ height: "100px", width: "180px" }}
              />
            </div>
          </div>

          <h2 className="display-6 fw-bold">#pitchpoint On</h2>
          <h1 className="fw-bold mb-3">Data To Decision</h1>
          <div className="badge bg-light text-dark fs-6 fs-md-5 px-3 px-md-4 py-1 py-md-2">
            📅 07<sup>th</sup> JUNE 2025 &nbsp; | &nbsp; ⏰ 11:00 AM Onwards
          </div>
          <div className="mt-4">
            <button
              className="btn btn-warning fw-bold px-4 py-2"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              🚀 Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5">
        <div className="row">
          <h4 className="text-left text-primary fw-bold mb-4 border-bottom pb-2">
            Panel Members
          </h4>
          {/* Left Column */}
          <div className="col-lg-8">
            <div className="row g-4 mb-5">
              {/* Convenor */}
              <div className="col-md-6">
                <div className="card text-center shadow h-100">
                  <div className="card-body">
                    <img
                      src={speaker1}
                      className="rounded-circle mx-auto d-block mb-3"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: " fill",
                      }}
                      alt="Convenor"
                    />
                    <h5 className="text-primary fw-bold">
                      Dr. Subhojit Mukherjee
                    </h5>
                    <p className="text-muted small">
                      Head Of India Formulations At Celsius Healthcare Pvt. Ltd.
                      <br />
                    </p>
                  </div>
                </div>
              </div>

              {/* Keynote Speaker */}
              <div className="col-md-6">
                <div className="card text-center shadow h-100">
                  <div className="card-body">
                    <img
                      src={speaker2}
                      className="rounded-circle mx-auto d-block mb-3"
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: " fill",
                      }}
                      alt="Keynote"
                    />
                    <h5 className="text-primary fw-bold">Mr. Devesh Gangani</h5>
                    <p className="text-muted small">
                      Associate General Manager at Alkem Laboratories Ltd
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Panel */}
            <div className="mb-5">
              <div className="row g-4">
                {/* Panel Member 1 */}
                <div className="col-md-6">
                  <div className="card text-center shadow h-100">
                    <div className="card-body">
                      <img
                        src={speaker3}
                        className="rounded-circle mx-auto d-block mb-3"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: " fill",
                        }}
                        alt="Panel 1"
                      />
                      <h6 className="fw-bold text-primary">
                        Dr. Pramod Kumar Rajput
                      </h6>
                      <p className="text-muted small">
                        Global Leadership Coach| Pharma Business Leader | Author
                        | Sr. Vice President (F.), Cadila Pharma
                      </p>
                    </div>
                  </div>
                </div>

                {/* Panel Member 2 */}
                <div className="col-md-6">
                  <div className="card text-center shadow h-100">
                    <div className="card-body">
                      <img
                        src={speaker4}
                        className="rounded-circle mx-auto d-block mb-3"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: " fill",
                        }}
                        alt="Panel 2"
                      />
                      <h6 className="fw-bold text-primary">Mr. ICS Varma</h6>
                      <p className="text-muted small">
                        Co-Founder Of | Regson Healthcare | Live Pharma
                        Coalition| ExpertOnBoard
                        <br />
                        Visiting Faculty for MBA Programs at NIPER | Hyderabad,
                        SIES College | Mumbai, Anna University | Trichi and many
                        more
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Highlights */}
            <div className="bg-white border rounded shadow-sm p-4 mb-5">
              <h5 className="text-center fw-bold mb-3">Event Highlights</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  ✅ Insights on digital transformation in pharma
                </li>
                <li className="list-group-item">
                  ✅ Networking with industry leaders
                </li>
                <li className="list-group-item">✅ Q&A session with experts</li>
              </ul>
            </div>
          </div>

          {/* Right Column – Registration */}
          <div className="col-lg-4">
            <div className="sticky-top" style={{ top: "20px" }}>
              <div className="bg-white border rounded shadow p-4">
                <h4 className="text-center fw-bold mb-3">Login Now</h4>
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-2">
          For inquiries: support.instamd@gmail.com | +91 9876543210
        </p>
        <p className="mb-0">
          &copy; 2025 Pharma Digital Summit. All rights reserved.
        </p>
      </footer>
      <RegisterModal />
    </div>
  );
};

export default EventPage;
