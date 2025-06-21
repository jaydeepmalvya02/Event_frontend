import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import Login from "./Login";
import axios from "axios";
import { FaCalendarAlt, FaClock, FaGlobe } from "react-icons/fa";

const API_URL = "https://event-nine-xi.vercel.app/api/admin/event";

const CurrentEvent = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const buildISTTargetDate = (dateISO, time = "00:00") => {
    if (!dateISO) return null;

    // Extract date part (yyyy-mm-dd) from ISO
    const datePart = new Date(dateISO).toISOString().split("T")[0];

    // Combine date and time into a single string (IST assumed)
    const combined = `${datePart}T${time}:00+05:30`;

    // Convert to ISO in UTC
    const utcDate = new Date(combined).toISOString();

    return utcDate;
  };
  

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        const allEvents = response.data;
        const now = new Date();

        const upcomingEvents = allEvents.filter(
          (e) => new Date(buildISTTargetDate(e.date, e.time)) >= now
        );
        const passedEvents = allEvents.filter(
          (e) => new Date(buildISTTargetDate(e.date, e.time)) < now
        );

        upcomingEvents.sort(
          (a, b) =>
            new Date(buildISTTargetDate(a.date, a.time)) -
            new Date(buildISTTargetDate(b.date, b.time))
        );
        passedEvents.sort(
          (a, b) =>
            new Date(buildISTTargetDate(b.date, b.time)) -
            new Date(buildISTTargetDate(a.date, a.time))
        );

        const selectedEvent =
          upcomingEvents.length > 0
            ? upcomingEvents[0]
            : passedEvents[0] || null;

        setEvents(allEvents);
        setCurrentEvent(selectedEvent);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const isUserLoggedIn = () => localStorage.getItem("user") !== null;

  const handleJoinClick = () =>
    isUserLoggedIn()
      ? navigate(`/liveEvents/${currentEvent._id}`)
      : setShowLoginPopup(true);

  const closeLoginPopup = () => setShowLoginPopup(false);

  if (loading)
    return (
      <div className="text-center py-5 text-dark">⏳ Loading event...</div>
    );

  if (!currentEvent)
    return (
      <div className="text-center py-5 text-dark">
        📭 No current event found.
      </div>
    );

  const targetDate = buildISTTargetDate(currentEvent.date, currentEvent.time);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 fs-3 text-primary">
        {new Date(targetDate) >= new Date()
          ? "Upcoming Event"
          : "Recent Past Event"}
      </h2>

      <h5
        className="text-gray-600 text-center mt-2"
        style={{ fontStyle: "italic" }}
      >
        Join the <span className="text-red-400">#PitchPoint</span> event and
        unlock powerful insights, <br />
        real-world strategies, and expert connections to supercharge your
        growth!
      </h5>

      <div
        className="card event-card border-0 p-3 p-md-4 mt-4"
        style={{
          borderRadius: "20px",
          backgroundColor: "#d7dde2",
          animation: "fadeInUp 0.7s ease-in-out",
        }}
      >
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <div className="image-wrapper">
              <img
                src={currentEvent.image}
                alt="Event"
                className="img-fluid w-100 event-image"
              />
            </div>
          </div>

          <div
            className="col-lg-6 ps-lg-4"
            style={{
              borderLeft: "5px solid #007bff",
              paddingLeft: "1rem",
            }}
          >
            <h4 className="fw-bold text-dark mb-3">{currentEvent.title}</h4>
            <p className="text-dark mb-3" style={{ fontSize: "0.95rem" }}>
              {currentEvent.description}
            </p>

            <CountdownTimer targetDate={targetDate} />

            <p className="mb-2 text-dark">
              <FaCalendarAlt className="me-2 text-primary fs-5 inline" />
              <strong className="me-1">Date:</strong>
              {new Date(currentEvent.date).toLocaleDateString()}
            </p>
            <p className="mb-2 text-dark">
              <FaClock className="me-2 text-primary fs-5 inline" />
              <strong className="me-1">Time:</strong>
              {currentEvent.time} AM
            </p>
            <p className="mb-3 text-dark">
              <FaGlobe className="me-2 text-primary fs-5 inline" />
              <strong className="me-1">Mode:</strong>
              {currentEvent.mode}
            </p>

            <button
              onClick={handleJoinClick}
              className="btn fw-bold text-white position-relative px-4 px-lg-5 py-2 py-lg-3"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(118, 75, 162, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.3)";
              }}
            >
              Join on ExpertOnBoard
            </button>
            <button
              onClick={() => navigate("/EventDetails")}
              className="btn fw-bold text-white position-relative px-4 px-lg-5 py-2 py-lg-3"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
                e.target.style.boxShadow = "0 8px 25px rgba(118, 75, 162, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.3)";
              }}
            >
              View More Events
            </button>
          </div>
        </div>

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
                    To Join The Event, Login Below 👇
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={closeLoginPopup}
                  ></button>
                </div>
                <div className="modal-body px-4 py-3">
                  <Login />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentEvent;
