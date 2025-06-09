import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EventHighlights = () => {
  const events = [
    {
      title: "Data To Decision",
      description: "Learn from top healthcare leaders and innovators.",
      date: "June 07, 2025",
      time: "11:00 AM",
      dateTime: "2025-06-07T11:00:00",
      Mode: "Online Event",
      eventLink: "https://www.youtube.com/watch?v=VZsPZ08tceE",
      coverImages: ["/images/eventbg.jpeg"],
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

  if (passedEvents.length === 0) return null;

  return (
    <div className="container py-5">
      <h4 className="display-5 text-center fw-bold text-white mb-5">
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

      {/* Grid container with max 2 cards per row */}
      <div className="row g-4 justify-content-center">
        {passedEvents.map((event, index) => {
          // Take only the first image for display
          const imageSrc = event.coverImages[0];

          return (
            <div key={index} className="col-12 col-md-6">
              <div
                className="card shadow-sm border-0 rounded-4 p-4 mx-auto"
                style={{ maxWidth: "700px" }}
              >
                {/* Single image on top */}
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

                {/* Text content */}
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventHighlights;
