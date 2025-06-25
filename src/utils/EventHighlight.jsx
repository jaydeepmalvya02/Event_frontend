import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Login"; // Ensure path is correct

const EventHighlights = () => {
  const [passedEvents, setPassedEvents] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingEventId, setPendingEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://event-nine-xi.vercel.app/api/admin/event"
        );
        const data = await response.json();
        const now = new Date();

        const past = data.filter((event) => {
          const eventDate = new Date(event.date);
          const [hours, minutes] = event.time.split(":");
          eventDate.setHours(+hours);
          eventDate.setMinutes(+minutes);
          return eventDate < now;
        });

        setPassedEvents(past);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const isUserLoggedIn = () => localStorage.getItem("user") !== null;

  const handleWatchHighlight = (eventId) => {
    if (isUserLoggedIn()) {
      navigate(`/liveEvents/${eventId}`);
    } else {
      setPendingEventId(eventId); // Save for post-login redirect
      setShowLoginPopup(true);
    }
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    setPendingEventId(null);
  };

  const handleLoginSuccess = () => {
    const updatedUser = JSON.parse(localStorage.getItem("user"));
    if (updatedUser && pendingEventId) {
      navigate(`/liveEvents/${pendingEventId}`);
      setPendingEventId(null);
      setShowLoginPopup(false);
    }
  };

  if (passedEvents.length === 0) {
    return (
      <div className="text-center text-light py-5">
        <h5>No past events available.</h5>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h4 className="display-5 text-center fw-bold text-white mb-5">
        <span
          style={{ fontSize: "2.5rem", fontStyle: "italic", color: "#0F93CA" }}
        >
          #PitchPoint
        </span>{" "}
        <span
          style={{ fontSize: "2.5rem", fontStyle: "italic", color: "#ffff" }}
        >
          Highlights
        </span>
      </h4>

      <div className="row g-4 justify-content-center">
        {passedEvents.map((event, index) => {
          const imageSrc = event.image || "/images/default.jpg";

          return (
            <div key={event._id || index} className="col-12 col-md-6">
              <div
                className="card shadow-sm border-0 rounded-4 p-4 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                <div
                  className="mb-4 mx-auto"
                  style={{
                    height: "250px",
                    overflow: "hidden",
                    width: "700px",
                    maxWidth: "100%",
                  }}
                >
                  <img
                    src={imageSrc}
                    alt={`Highlight-${index}-img`}
                    className="img-fluid rounded shadow-sm"
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                </div>

                <h4 className="fw-bold text-primary">{event.title}</h4>
                <p className="text-muted">{event.description}</p>
                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {event.time}
                </p>
                <p className="mb-3">
                  <strong>Mode:</strong> {event.mode}
                </p>

                <button
                  onClick={() => handleWatchHighlight(event._id)}
                  className="btn btn-outline-primary mb-3"
                >
                  🔗 Watch Highlight
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Login Modal Popup */}
      {showLoginPopup && (
        <div
          className="modal show d-block"
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
                <h5 className="modal-title w-100 text-center fw-bold text-warning">
                  To Watch the Highlight, Please Login 👇
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeLoginPopup}
                ></button>
              </div>
              <div className="modal-body px-4 py-3">
                <Login
                  onLoginSuccess={handleLoginSuccess}
                  onClose={closeLoginPopup}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventHighlights;
