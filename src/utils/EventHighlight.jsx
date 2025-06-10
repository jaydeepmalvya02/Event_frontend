import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EventHighlights = () => {
  const [passedEvents, setPassedEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://event-nine-xi.vercel.app/api/admin/event"
        );
        const data = await response.json();
        console.log("Fetched Events:", data);

        const now = new Date();

        const past = data.filter((event) => {
          // Convert ISO date + 24hr time to one datetime string
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
                      objectFit: "cover",
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
                  onClick={() => navigate(`/liveEvents/${event._id}`)}
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
