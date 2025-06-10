import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialFormState = {
  name: "",
  title: "",
  bio: "",
  image: "",
  description: "",
};

const AdminSpeaker = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const UPLOAD_URL = "https://event-nine-xi.vercel.app/api/upload";

  const handleImageUpload = async (file) => {
    if (!file) return toast.warning("⚠️ Please select a file first!");

    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await axios.post(UPLOAD_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = res.data.url;
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      toast.success("✅ Image uploaded successfully!");
    } catch (err) {
      console.error("Image upload failed", err);
      toast.error("❌ Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const fetchSpeakers = async () => {
    try {
      const res = await axios.get(
        "https://event-nine-xi.vercel.app/api/speaker"
      );
      setSpeakers(res.data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (speaker) => {
    setFormData(speaker);
    setEditId(speaker._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this speaker?")) {
      try {
        await axios.delete(
          `https://event-nine-xi.vercel.app/api/speaker/${id}`
        );
        toast.success("Speaker deleted");
        fetchSpeakers();
      } catch (error) {
        console.error("Delete failed:", error);
        toast.error("Failed to delete speaker");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `https://event-nine-xi.vercel.app/api/speaker/${editId}`,
          formData
        );
        toast.success("Speaker updated!");
      } else {
        await axios.post(
          "https://event-nine-xi.vercel.app/api/speaker",
          formData
        );
        toast.success("Speaker created!");
      }
      setShowModal(false);
      fetchSpeakers();
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to save speaker");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer autoClose={1000} closeButton/>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Speakers</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Add Speaker
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : speakers.length === 0 ? (
        <p>No speakers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{speaker.name}</h3>
                <p className="text-sm text-[#0F93CA]">{speaker.title}</p>
                <p className="text-sm text-gray-600">{speaker.bio}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(speaker)}
                    className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(speaker._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative">
            <h3 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Speaker" : "Add New Speaker"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Short Bio"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="file"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="w-full px-3 py-2 border rounded"
              />
              {uploading && (
                <p className="text-sm text-gray-500">Uploading...</p>
              )}
              {formData.image && (
                <img
                  src={formData.image}
                  alt="preview"
                  className="w-full h-32 object-cover rounded"
                />
              )}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Full Description"
                className="w-full px-3 py-2 border rounded"
                rows={4}
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSpeaker;
