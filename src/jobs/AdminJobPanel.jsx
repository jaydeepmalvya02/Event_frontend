import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const initialForm = {
  title: "",
  company: "",
  location: "",
  type: "Full-Time",
  experience: "",
  description: "",
};

const AdminJobPanel = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const baseUrl = "https://event-nine-xi.vercel.app";
  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${baseUrl}/api/jobs`);
      setJobs(data.jobData);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${baseUrl}/api/jobs/${editId}`, form);
        toast.success("Job updated!");
      } else {
        await axios.post(`${baseUrl}/api/jobs/${editId}`, form);
        toast.success("Job created!");
      }
      setShowModal(false);
      setForm(initialForm);
      setEditId(null);
      fetchJobs();
    } catch (err) {
      console.error(err);
      
      toast.error("Failed to submit job");
    }
  };

  const handleEdit = (job) => {
    setForm(job);
    setEditId(job._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`${baseUrl}/api/jobs/${id}`,);
        toast.success("Job deleted!");
        setTimeout(()=>{
          fetchJobs();
        },1000)
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job");
      }
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-white">Admin Job Panel</h2>

      <div className="text-end mb-3">
        <Button onClick={() => setShowModal(true)}>+ Add Job</Button>
      </div>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered responsive hover>
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Type</th>
              <th>Experience</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>{job.experience} yrs</td>
                  <td className="text-truncate" style={{ maxWidth: 150 }}>
                    {job.description?.slice(0, 80)}...
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="info"
                      className="me-2"
                      onClick={() => handleEdit(job)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No jobs found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{editId ? "Edit Job" : "Add Job"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {["title", "company", "location", "experience"].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            ))}
            <Form.Group className="mb-3">
              <Form.Label>Job Type</Form.Label>
              <Form.Select
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={4}
                value={form.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {editId ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminJobPanel;
