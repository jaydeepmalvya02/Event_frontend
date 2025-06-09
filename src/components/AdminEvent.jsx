import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://event-nine-xi.vercel.app/api/admin/event";

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    mode: "Online Event",
    eventLink: "",
    image: "",
  });

  const [editEvent, setEditEvent] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = async () => {
    try {
      const res = await axios.post(API_URL, newEvent);
      setEvents([...events, res.data]);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        mode: "Online Event",
        eventLink: "",
        image: "",
      });
      toast.success("✅ Event added successfully!");
    } catch (err) {
      console.error("Create event failed:", err);
      toast.error("❌ Event creation failed!");
    }
  };

  const openEditModal = async (eventId) => {
    try {
      const res = await axios.get(`${API_URL}/${eventId}`);
      setEditEvent(res.data);
      setShowEditModal(true);
    } catch (err) {
      console.error("Failed to fetch event by ID:", err);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateEvent = async () => {
    try {
      const res = await axios.put(`${API_URL}/${editEvent._id}`, editEvent);
      setEvents((prev) =>
        prev.map((ev) => (ev._id === res.data._id ? res.data : ev))
      );
      setShowEditModal(false);
      toast.success("✅ Event updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Event update failed!");
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="mb-4 text-white">🛠 Admin Event Dashboard</h2>

      {/* Create Form */}
      <div className="card p-4 mb-5 shadow-sm">
        <h4 className="mb-3">Create New Event</h4>
        <div className="row g-3">
          {[
            { label: "Title", name: "title" },
            { label: "Description", name: "description" },
            { label: "Event Link", name: "eventLink" },
            { label: "Image URL", name: "image" },
          ].map((field) => (
            <div className="col-md-6" key={field.name}>
              <input
                type="text"
                className="form-control"
                placeholder={field.label}
                name={field.name}
                value={newEvent[field.name]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="date"
              value={newEvent.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="time"
              className="form-control"
              name="time"
              value={newEvent.time}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              name="mode"
              value={newEvent.mode}
              onChange={handleChange}
            >
              <option value="Online Event">Online Event</option>
              <option value="Offline Event">Offline Event</option>
            </select>
          </div>
          <div className="col-12 text-end">
            <button className="btn btn-success" onClick={handleAddEvent}>
              ➕ Add Event
            </button>
          </div>
        </div>
      </div>

      {/* Display Events */}
      <div className="row g-4">
        {events.map((event) => (
          <div key={event._id} className="col-md-6">
            <div className="card p-3 shadow-sm">
              <img
                src={event.image}
                alt={event.title}
                className="img-fluid rounded mb-3"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <h5 className="text-primary fw-bold">{event.title}</h5>
              <p>{event.description}</p>
              <p>
                📅 {new Date(event.date).toLocaleDateString()} | ⏰ {event.time}
              </p>
              <p>🎯 {event.mode}</p>
              <a
                href={event.eventLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm me-2"
              >
                🔗 View
              </a>
              <button
                className="btn btn-outline-warning btn-sm"
                onClick={() => openEditModal(event._id)}
              >
                ✏️ Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editEvent && (
            <div className="row g-3">
              {[
                { label: "Title", name: "title" },
                { label: "Description", name: "description" },
                { label: "Event Link", name: "eventLink" },
                { label: "Image URL", name: "image" },
              ].map((field) => (
                <div className="col-12" key={field.name}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={field.label}
                    name={field.name}
                    value={editEvent[field.name]}
                    onChange={handleEditChange}
                  />
                </div>
              ))}
              <div className="col-6">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={editEvent.date?.substring(0, 10)}
                  onChange={handleEditChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="time"
                  className="form-control"
                  name="time"
                  value={editEvent.time}
                  onChange={handleEditChange}
                />
              </div>
              <div className="col-12">
                <select
                  className="form-control"
                  name="mode"
                  value={editEvent.mode}
                  onChange={handleEditChange}
                >
                  <option value="Online Event">Online Event</option>
                  <option value="Offline Event">Offline Event</option>
                </select>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdateEvent}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminEvent;
