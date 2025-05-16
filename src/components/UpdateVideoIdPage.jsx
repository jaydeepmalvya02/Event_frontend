import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateVideoIdPage = () => {
  const [videoId, setVideoId] = useState("");
  const [newVideoId, setNewVideoId] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("youtubeVideoId");
    if (storedId) {
      setVideoId(storedId);
      setNewVideoId(storedId);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newVideoId.trim()) {
      toast.error("Video ID cannot be empty.");
      return;
    }

    localStorage.setItem("youtubeVideoId", newVideoId.trim());
    setVideoId(newVideoId.trim());
    toast.success("YouTube Video ID updated!");
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-3">Update YouTube Video ID</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">New YouTube Video ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. YOcmSsBfafg"
            value={newVideoId}
            onChange={(e) => setNewVideoId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Video
        </button>
      </form>

      <div>
        <strong>Current Video ID:</strong> {videoId || "Not set"}
      </div>
    </div>
  );
};

export default UpdateVideoIdPage;
