import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CountdownTimer from "./CountdownTimer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

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
              onClick={() => navigate("/liveEvents")}
              className="btn btn-outline-primary mb-3"
            >
              🔗 Watch Event
            </button>
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
