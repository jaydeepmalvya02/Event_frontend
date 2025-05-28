import { useState } from "react";
import { Container, Row, Col, Form, FormCheck, Button } from "react-bootstrap";

function ContactUs() {
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreed) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://event-nine-xi.vercel.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        alert(result.message || "Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="px-4 py-5 contact-section"
      style={{
        backgroundImage: "url('/images/bg6.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="text-center mb-5 mx-auto fade-in-up"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="display-5 fw-bold text-white mb-3">
          Contact Us{" "}
          <span
            style={{
              fontSize: "2.5rem",
              fontStyle: "italic",
              color: "#0F93CA",
            }}
          >
            #PitchPoint
          </span>
        </h2>
        <p className="lead text-light">
          Interested in our events or have questions? We’d love to hear from
          you!
        </p>
      </div>

      <Form
        className="mx-auto bg-white shadow-lg rounded-4 p-4 p-sm-5 form-animate"
        style={{ maxWidth: "720px" }}
        onSubmit={handleSubmit}
      >
        <Row className="g-4">
          <Col sm={6}>
            <Form.Group controlId="firstName">
              <Form.Label className="fw-semibold">First Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="field-focus"
                required
              />
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group controlId="lastName">
              <Form.Label className="fw-semibold">Last Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="field-focus"
                required
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group controlId="company">
              <Form.Label className="fw-semibold">Company</Form.Label>
              <Form.Control
                type="text"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                className="field-focus"
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group controlId="email">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="field-focus"
                required
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group controlId="phone">
              <Form.Label className="fw-semibold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="1234567890"
                className="field-focus"
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <Form.Group controlId="message">
              <Form.Label className="fw-semibold">Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="field-focus"
                required
              />
            </Form.Group>
          </Col>

          <Col sm={12}>
            <FormCheck
              type="switch"
              id="agreement"
              label={
                <>
                  I agree to the{" "}
                  <a
                    href="#"
                    className="fw-semibold text-decoration-underline text-primary"
                  >
                    privacy policy
                  </a>
                  .
                </>
              }
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="d-flex align-items-center gap-3"
            />
          </Col>
        </Row>

        <Button
          variant="primary"
          type="submit"
          className="mt-4 w-100 py-2 fw-semibold submit-btn"
          disabled={!agreed || loading}
        >
          {loading ? "Submitting..." : "Let's Talk"}
        </Button>

        {submitted && (
          <p className="text-success text-center mt-3 fw-medium">
            Message sent successfully! ✅
          </p>
        )}
      </Form>

      {/* Inline styles (keep as is) */}
      <style>{`/* your CSS here */`}</style>
    </Container>
  );
}

export default ContactUs;
