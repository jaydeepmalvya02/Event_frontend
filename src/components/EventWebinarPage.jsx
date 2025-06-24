import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const EventWebinarPage = () => {
  const { eventId } = useParams();
  const [videoId, setVideoId] = useState("");
  const [question, setQuestion] = useState("");
  const [eventData, setEventData] = useState(null);
 

  useEffect(() => {
    const fetchEventVideo = async () => {
      try {
        const response = await fetch(
          `https://event-nine-xi.vercel.app/api/admin/event/${eventId}`
        );
        const data = await response.json();

        if (!data.eventLink) throw new Error("Video ID missing.");
        setVideoId(data.eventLink);
        setEventData(data); // Save full event details
      } catch (err) {
        console.error(err);
        toast.error("Failed to load event video.");
      }
    };

    fetchEventVideo();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email || !question.trim()) {
      toast.error("Login and write a question to submit.");
      return;
    }

    try {
      const res = await fetch("https://event-nine-xi.vercel.app/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, email: user.email }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      toast.success("Question submitted!");
      setQuestion("");
    } catch (error) {
      console.error(error);
      toast.error("Submission failed.");
    }
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <ToastContainer />
      <div className="container">
        {/* Main Row: Video + Interaction */}
        <div className="row g-4 mb-4">
          <div className="col-lg-8">
            <div className="ratio ratio-16x9 rounded shadow">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Live Event"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="text-muted text-center pt-5">Loading video...</div>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <form
              className="bg-white p-4 rounded shadow"
              onSubmit={handleSubmit}
            >
              <h5 className="mb-3 fw-bold text-primary">Ask a Question</h5>
              <textarea
                className="form-control mb-3"
                rows="4"
                value={question}
                placeholder="Type your question..."
                onChange={(e) => setQuestion(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Submit Question
              </button>
            </form>
            
          </div>
        </div>

        {/* Event Details Below */}
        {eventData && (
          <div className="bg-white p-4 rounded  text-start">
            <h4 className="fw-bold text-primary mb-2">{eventData.title}</h4>
            <p className="text-muted">{eventData.description}</p>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default EventWebinarPage;
