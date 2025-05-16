import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EventWebinarPage = () => {
  const [question, setQuestion] = useState("");
  const [status, setStatus] = useState(null);
  const [videoId, setVideoId] = useState(""); // <-- add videoId state
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch video ID from backend
    const fetchVideoId = async () => {
      try {
        const res = await fetch("https://event-nine-xi.vercel.app/api/videoId");
        const data = await res.json();
        setVideoId(data.videoId);
      } catch (error) {
        console.error("Failed to fetch video ID", error);
        toast.error("Unable to load video.");
      }
    };

    fetchVideoId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    if (!email || !question) {
      toast.error("User not logged in or question is empty.");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch(
        "https://event-nine-xi.vercel.app/api/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question, email }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Question submitted successfully!");
        setQuestion("");
        setStatus("success");
      } else {
        toast.error(result.message || "Submission failed");
        setStatus("error");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong.");
      setStatus("error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="bg-grey text-light min-vh-100">
      <div className="container py-4">
        {/* YouTube Video */}
        <div className="ratio ratio-16x9 mb-4">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Webinar Video"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="text-center text-muted">Loading video...</div>
          )}
        </div>

        {/* Question Form & Logout */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
          <form
            className="p-3 bg-light rounded shadow-sm w-100"
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <textarea
                id="question"
                className="form-control border-primary"
                placeholder="Type your question here..."
                value={question}
                rows={3}
                required
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary px-4 fw-bold">
                🚀 Submit Question
              </button>
            </div>
          </form>

          <button className="btn btn-danger btn-sm mt-3" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Feedback */}
        <div className="mt-3">
          {status === "sending" && (
            <div className="text-info">Sending your question...</div>
          )}
          {status === "success" && (
            <div className="text-success">Question submitted!</div>
          )}
          {status === "error" && (
            <div className="text-danger">Failed to submit question.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventWebinarPage;
