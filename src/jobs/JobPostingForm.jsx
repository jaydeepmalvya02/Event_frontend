import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Spinner,
  ToastContainer,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  company: "",
  location: "",
  type: "Full-Time",
  experience: "",
  department: "",
  description: "",
};

const JobPostingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const baseUrl = "https://event-nine-xi.vercel.app";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${baseUrl}/api/jobs`, formData);

      if (data.success) {
        toast.success("✅ Job posted successfully!");
        setFormData(initialState);
        onSuccess?.();
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <section className="jobPosting-section py-5">
      <Form
        onSubmit={handleSubmit}
        className="bg-white p-5 rounded shadow-lg border"
        style={{ maxWidth: 850, margin: "auto" }}
      >
        <h4 className="mb-4 text-center text-primary fw-bold">
          Post a Job Opening
        </h4>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title*</Form.Label>
              <Form.Control
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Frontend Developer"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name*</Form.Label>
              <Form.Control
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Tech Corp"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Location*</Form.Label>
              <Form.Control
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Bengaluru or Remote"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Type*</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Department*</Form.Label>
              <Form.Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
              >
                <option value="">Select Department</option>
                <option value="Technical">Technical</option>
                <option value="Sales Marketing">Sales Marketing</option>
                <option value="Customer Support">Customer Support</option>
                <option value="HR">Human Resources</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Experience Required (in years)*</Form.Label>
              <Form.Control
                name="experience"
                type="number"
                required
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 2"
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Job Description*</Form.Label>
              <Form.Control
                name="description"
                as="textarea"
                rows={5}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief about responsibilities, skills required, etc."
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : "Post Job"}
          </Button>
        </div>
      </Form>

      <style>
        {`
          .jobPosting-section {
            background: linear-gradient(to right, #f8f9fa, #e9f1ff);
          }

          form input,
          form textarea,
          form select {
            border-radius: 8px;
            border: 1px solid #ccc;
            transition: border-color 0.2s ease-in-out;
          }

          form input:focus,
          form textarea:focus,
          form select:focus {
            border-color: #0d6efd;
            box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
          }

          h4 {
            font-size: 1.5rem;
          }
        `}
      </style>
    </section>
  );
};

export default JobPostingForm;
