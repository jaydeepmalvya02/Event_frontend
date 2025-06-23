import React, { useState } from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  name: "",
  designation: "",
  company: "",
  department: "",
  experience: "",
  linkedin: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  division: "",
  bio: "",
  image: "",
};

const RegisterAsSpeakerForm = ({ onSuccess, onClose }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);


  const UPLOAD_URL = "https://event-nine-xi.vercel.app/api/upload";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://event-nine-xi.vercel.app/api/speakers",
        formData
      );
      if (res.status === 200 || res.status === 201) {
        toast.success("✅ Speaker registration submitted!");
        setFormData(initialState);
        onSuccess?.();
      } else {
        toast.error("❌ Submission failed. Try again.");
      }
    } catch (error) {
      console.error(error.message);
      
      toast.error("❌ Network or server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} pauseOnHover closeOnClick />
      <Form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-4"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name*</Form.Label>
              <Form.Control
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Designation*</Form.Label>
              <Form.Control
                name="designation"
                required
                value={formData.designation}
                onChange={handleChange}
                placeholder="Senior Developer"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company*</Form.Label>
              <Form.Control
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                placeholder="Company/Organization"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Optional"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Years of Experience*</Form.Label>
              <Form.Control
                name="experience"
                type="number"
                required
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g., 5"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>LinkedIn</Form.Label>
              <Form.Control
                name="linkedin"
                type="url"
                value={formData.linkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number*</Form.Label>
              <Form.Control
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Division</Form.Label>
              <Form.Control
                name="division"
                value={formData.division}
                onChange={handleChange}
                placeholder="e.g., Product, Marketing"
              />
            </Form.Group>
          </Col>

        </Row>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default RegisterAsSpeakerForm;
