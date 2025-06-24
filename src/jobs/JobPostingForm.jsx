import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  company: "",
  location: "",
  type: "Full-Time", // Full-Time, Part-Time, Internship, Remote
  experience: "",
  description: "",
};

const JobPostingForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/jobs",
        formData
      );

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

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow"
      style={{ maxWidth: 800, margin: "auto" }}
    >
      <h4 className="mb-4 text-center">Post a Job Opening</h4>
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
              placeholder="e.g., Bengaluru, Remote"
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
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Remote</option>
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

      <div className="text-end mt-3">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Post Job"}
        </Button>
      </div>
    </Form>
  );
};

export default JobPostingForm;
