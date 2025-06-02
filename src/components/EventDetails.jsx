import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from "./Login";

const EventDetails = () => {
  const navigate = useNavigate();

  const events = [
    {
      title: "Data To Decision",
      description: "Learn from top healthcare leaders and innovators.",
      date: "June 07, 2025",
      time: "11:00 AM",
      dateTime: "2025-06-07T11:00:00",
      Mode: "Online Event",
      eventLink: "https://www.youtube.com/watch?v=qJvclEApNrE",
      coverImages: ["/images/meeting3.avif", "/images/meeting4.jpg"],
    },
    {
      title: "Digital Transformation in Pharma Industry",
      description: "Explore advancements in pharmaceutical sciences.",
      date: "May 17, 2025",
      time: "11:00 PM",
      dateTime: "2025-05-17T11:00:00",
      Mode: "Online Event",
      eventLink: "https://www.youtube.com/watch?v=VlmDT_8YyH0&t=2s",
      coverImages: ["/images/meeting5.png", "/images/meeting6.png"],
    },
    {
      title: "Digital Transformation in Pharma Industry",
      description: "Explore advancements in pharmaceutical sciences.",
      date: "May 17, 2025",
      time: "11:00 PM",
      dateTime: "2025-05-17T11:00:00",
      Mode: "Online Event",
      eventLink: "https://www.youtube.com/watch?v=VlmDT_8YyH0&t=2s",
      coverImages: ["/images/meeting5.png", "/images/meeting6.png"],
    },
    {
      title: "Digital Transformation in Pharma Industry",
      description: "Explore advancements in pharmaceutical sciences.",
      date: "May 17, 2025",
      time: "11:00 PM",
      dateTime: "2025-05-17T11:00:00",
      Mode: "Online Event",
      eventLink: "https://www.youtube.com/watch?v=VlmDT_8YyH0&t=2s",
      coverImages: ["/images/meeting5.png", "/images/meeting6.png"],
    },
  ];
  const [showLoginPopup,setShowLoginPopup]=useState(false)
  const now = new Date();
  const passedEvents = [];
  const upcomingEvents = [];

  events.forEach((event) => {
    const eventDate = new Date(event.dateTime);
    if (eventDate < now) {
      passedEvents.push(event);
    } else {
      upcomingEvents.push(event);
    }
  });

  upcomingEvents.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  const currentEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  // Auto initialize carousel
  useEffect(() => {
    const carousel = document.querySelector("#highlightsCarousel");
    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 500,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);
  const isUserLoggedIn = () => {
    return localStorage.getItem("user") !== null; // Replace with your actual login logic
  };
  const handleJoinClick = () => {
    if (isUserLoggedIn()) {
      navigate("/liveEvents");
    } else {
      setShowLoginPopup(true);
    }
  };
  const closeLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-white">Our Events</h2>

      {/* Current Event */}
      {currentEvent && (
        <div className="mb-5">
          <h4 className="fw-bold text-info mb-3">
            🔥 Current & Upcoming Event
          </h4>
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <h4 className="fw-bold text-primary">{currentEvent.title}</h4>
            <p className="text-muted">{currentEvent.description}</p>
            <CountdownTimer targetDate={currentEvent.dateTime} />
            <p className="mb-1">
              <strong>Date:</strong> {currentEvent.date}
            </p>
            <p className="mb-1">
              <strong>Time:</strong> {currentEvent.time}
            </p>
            <p className="mb-3">
              <strong>Mode:</strong> {currentEvent.Mode}
            </p>
            <button
              onClick={handleJoinClick}
              className="btn btn-outline-primary mb-3"
            >
              🔗 Watch Event
            </button>

            {/* Login Popup */}
            {showLoginPopup && (
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
                    className=" modal-content rounded-4 border-0 shadow"
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
                        onClick={closeLoginPopup}
                      ></button>
                    </div>
                    <div
                      className="modal-body px-4 py-3"
                      style={{
                        borderRadius: "0 0 1rem 1rem",
                      }}
                    >
                      <Login/>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="row g-2">
              {currentEvent.coverImages.map((img, idx) => (
                <div key={idx} className="col-6">
                  <img
                    src={img}
                    className="img-fluid rounded shadow-sm"
                    alt={`current-${idx}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Highlights Carousel */}
      {passedEvents.length > 0 && (
        <div className="mt-5">
          <h4 className="fw-bold text-white mb-4">📽️ Highlights</h4>
          <div
            id="highlightsCarousel"
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="2000"
          >
            <div className="carousel-inner">
              {passedEvents.map((event, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <div
                    className="card shadow-sm border-0 rounded-4 p-4 mx-auto"
                    style={{ maxWidth: "700px" }}
                  >
                    <h4 className="fw-bold text-primary">{event.title}</h4>
                    <p className="text-muted">{event.description}</p>
                    <p className="mb-1">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <p className="mb-1">
                      <strong>Time:</strong> {event.time}
                    </p>
                    <p className="mb-3">
                      <strong>Mode:</strong> {event.Mode}
                    </p>
                    <button
                      onClick={() => window.open(event.eventLink, "_blank")}
                      className="btn btn-outline-primary mb-3"
                    >
                      🔗 Watch Highlight
                    </button>
                    <div className="row g-2">
                      {event.coverImages.map((img, idx) => (
                        <div key={idx} className="col-6">
                          <img
                            src={img}
                            alt={`Highlight-${index}-img-${idx}`}
                            className="img-fluid rounded shadow-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Manual Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#highlightsCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#highlightsCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
