import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./Login";
import axios from "axios";
import { MdUpcoming } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa";

const API_URL = "https://event-nine-xi.vercel.app/api/admin/event";

const EventDetails = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingEventId, setPendingEventId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setLoading(false);
    }
  };

  const now = new Date();
  const passedEvents = [];
  const upcomingEvents = [];

  events.forEach((event) => {
    const eventDate = new Date(event.dateTime || event.date);
    if (eventDate < now) passedEvents.push(event);
    else upcomingEvents.push(event);
  });

  upcomingEvents.sort(
    (a, b) => new Date(a.dateTime || a.date) - new Date(b.dateTime || b.date)
  );
  const currentEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  const isUserLoggedIn = () => localStorage.getItem("user") !== null;

  const handleJoinClick = (eventId) => {
    if (isUserLoggedIn()) {
      navigate(`/liveEvents/${eventId}`);
    } else {
      setPendingEventId(eventId);
      setShowLoginPopup(true);
    }
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    setPendingEventId(null);
  };

  const handleLoginSuccess = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && pendingEventId) {
      navigate(`/liveEvents/${pendingEventId}`);
      setPendingEventId(null);
      setShowLoginPopup(false);
    }
  };

  if (loading)
    return (
      <div className="text-white text-center my-5">⏳ Loading events...</div>
    );

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-white fs-3 font-serif">Our Events</h2>

      {/* Current/Upcoming Event */}
      {currentEvent && (
        <div className="mb-5">
          <h4 className="fw-bold text-light font-serif mb-4 fs-2 d-flex align-items-center gap-2">
           Current & Upcoming Event
          </h4>

          <div className="card shadow border-0 rounded-4 p-3 p-md-4 bg-light">
            <div className="row g-4 align-items-start">
              <div className="col-lg-6">
                <img
                  src={currentEvent.image || currentEvent.coverImages?.[0]}
                  alt="Current Event"
                  className="img-fluid rounded-3 w-100"
                  style={{
                    objectFit: "cover",
                    maxHeight: "400px",
                    aspectRatio: "16 / 9",
                  }}
                />
              </div>
              <div className="col-lg-6">
                <h4 className="fw-bold text-primary mb-2">
                  {currentEvent.title}
                </h4>
                <p className="text-muted">{currentEvent.description}</p>

                <CountdownTimer
                  targetDate={currentEvent.dateTime || currentEvent.date}
                />

                <p className="mb-1">
                  <strong>Date:</strong>{" "}
                  {new Date(currentEvent.date).toDateString()}
                </p>
                <p className="mb-1">
                  <strong>Time:</strong> {currentEvent.time}
                </p>
                <p className="mb-3">
                  <strong>Mode:</strong> {currentEvent.mode}
                </p>

                <button
                  onClick={() => handleJoinClick(currentEvent._id)}
                  className="btn btn-outline-primary"
                >
                  🔗 Watch Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Past Events */}
      {passedEvents.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold text-white font-serif mb-4 fs-2 d-flex align-items-center gap-2">
             Past Events
          </h4>
          {passedEvents.map((event, index) => (
            <div
              key={index}
              className="card shadow border-0 rounded-4 p-3 p-md-4 mb-4 bg-light"
            >
              <div className="row g-4 align-items-start">
                <div className="col-lg-6">
                  <img
                    src={event.image || event.coverImages?.[0]}
                    alt={`Event ${index}`}
                    className="img-fluid rounded-3 w-100"
                    style={{
                      objectFit: "cover",
                      maxHeight: "400px",
                      aspectRatio: "16 / 9",
                    }}
                  />
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold text-primary mb-2">{event.title}</h4>
                  <p className="text-muted">{event.description}</p>
                  <p className="mb-1">
                    <strong>Date:</strong> {new Date(event.date).toDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Time:</strong> {event.time}
                  </p>
                  <p className="mb-3">
                    <strong>Mode:</strong> {event.mode}
                  </p>
                  <button
                    onClick={() => handleJoinClick(event._id)}
                    className="btn btn-outline-primary"
                  >
                    🔗 Watch Highlight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Login Modal */}
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
            <div className="modal-content rounded-4 overflow-hidden shadow">
              <div className="modal-header bg-dark border-0">
                <h5 className="modal-title w-100 text-center text-white fw-semibold">
                  To Join The Event, Login Below 
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeLoginPopup}
                ></button>
              </div>
              <div className="modal-body bg-light p-4">
                <Login
                  onLoginSuccess={handleLoginSuccess}
                  onClose={closeLoginPopup}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Optional close icon fix */}
      <style>{`
        .btn-close {
          filter: invert(1);
        }
      `}</style>
    </div>
  );
};

export default EventDetails;
