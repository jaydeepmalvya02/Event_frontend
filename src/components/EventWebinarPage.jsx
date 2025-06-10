import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EventWebinarPage = () => {
  const { eventId } = useParams(); // get ID from URL
  const [videoId, setVideoId] = useState("");
  const [question, setQuestion] = useState("");
  // const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventVideo = async () => {
      try {
        const response = await fetch(
          `https://event-nine-xi.vercel.app/api/admin/event/${eventId}`
        );
        const data = await response.json();
        console.log(data);
        
        if (!data.eventLink) throw new Error("Video ID missing.");
        setVideoId(data.eventLink);
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
    <div className="bg-grey text-light min-vh-100">
      <div className="container py-4">
        <div className="ratio ratio-16x9 mb-4">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Live Event"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-muted text-center">Loading video...</div>
          )}
        </div>

        <form
          className="bg-light p-3 rounded shadow-sm"
          onSubmit={handleSubmit}
        >
          <textarea
            className="form-control mb-3"
            rows="3"
            value={question}
            placeholder="Type your question..."
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit Question
          </button>
        </form>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
          className="btn btn-danger mt-3"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default EventWebinarPage;
