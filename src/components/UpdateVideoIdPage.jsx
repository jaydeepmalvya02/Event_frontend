import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateVideoIdPage = () => {
  const [videoId, setVideoId] = useState("");
  const [newVideoId, setNewVideoId] = useState("");

  useEffect(() => {
    const fetchVideoId = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/videoId");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setVideoId(data.videoId);
        setNewVideoId(data.videoId);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to fetch video ID from server.");
      }
    };

    fetchVideoId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newVideoId.trim()) {
      toast.error("Video ID cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        "https://event-nine-xi.vercel.app/api/videoId",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId: newVideoId.trim() }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update video ID.");
      }

      setVideoId(data.videoId);
      toast.success("YouTube Video ID updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Server error.");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Update YouTube Video ID</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="videoIdInput" className="form-label">
            New YouTube Video ID
          </label>
          <input
            id="videoIdInput"
            type="text"
            className="form-control"
            placeholder="e.g. YOcmSsBfafg"
            value={newVideoId}
            onChange={(e) => setNewVideoId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Video
        </button>
      </form>

      <div className="alert alert-info text-center">
        <strong>Current Video ID:</strong> {videoId || "Not set"}
      </div>
    </div>
  );
};

export default UpdateVideoIdPage;
