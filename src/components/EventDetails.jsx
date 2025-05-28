import CountdownTimer from "./CountdownTimer";
const EventDetails = () => {
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
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4 text-white">Our Events</h2>
      <div className="row g-4">
        {events.map((event, index) => (
          <div key={index} className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <h4 className="fw-bold text-primary">{event.title}</h4>
              <p className="text-muted">{event.description}</p>

              <CountdownTimer targetDate={event.dateTime} />

              <p className="mb-1">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="mb-1">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="mb-3">
                <strong>Mode:</strong> {event.Mode}
              </p>

              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary mb-3"
              >
                🔗 Watch Event
              </a>

              <div className="row g-2">
                {event.coverImages.map((img, idx) => (
                  <div key={idx} className="col-6">
                    <img
                      src={img}
                      alt={`Event ${index} Image ${idx}`}
                      className="img-fluid rounded shadow-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDetails;
