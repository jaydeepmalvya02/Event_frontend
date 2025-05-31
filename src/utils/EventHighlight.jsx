// components/EventHighlights.js
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const EventHighlights = () => {
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
    
  ];

  const now = new Date();
  const passedEvents = events.filter((event) => new Date(event.dateTime) < now);

  useEffect(() => {
    const carousel = document.querySelector("#highlightsCarousel");
    if (carousel && window.bootstrap) {
      new window.bootstrap.Carousel(carousel, {
        interval: 5000,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    }
  }, []);

  if (passedEvents.length === 0) return null;

  return (
    <div className="container py-5">
      <h4 className="display-5 text-center fw-bold text-white mb-3">
        <span
          style={{
            fontSize: "2.5rem",
            fontStyle: "italic",
            color: "#0F93CA",
          }}
        >
          #PitchPoint
        </span>{" "}
        <span
          style={{
            fontSize: "2.5rem",
            fontStyle: "italic",
            color: "#ffff",
          }}
        >
          Highlights
        </span>
      </h4>
      <div
        id="highlightsCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
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

        {/* Controls */}
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
  );
};

export default EventHighlights;
