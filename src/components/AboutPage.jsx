import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function AboutPage() {
  return (
    <section className="about-section py-5">
      <Container>
        <Row className="justify-content-center mb-4">
          <Col lg={8} className="text-center">
            <h1 className="display-5 fw-bold  fade-in-up" style={{ fontSize: "2.5rem", lineHeight: "1.2",color: "#0F93CA" }}>
              About ExpertOnBoard
            </h1>
            <h5 className="lead text-muted fade-in-up delay-1">
              Bridging wisdom with aspiration in the pharmaceutical world.
            </h5>
          </Col>
        </Row>

        {/* What is ExpertOnBoard */}
        <Row className="align-items-center my-5 fade-in-up delay-2">
          <Col md={6}>
            <h3 className="text-secondary fw-semibold mb-3">
              What is ExpertOnBoard?
            </h3>
            <p>
              <strong>ExpertOnBoard.org</strong> is a unique platform that
              connects experienced pharma leaders with the next generation of
              professionals. Through shared wisdom, we help learners evolve,
              grow, and succeed in the real world.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="/images/moto1.png"
              alt="What is ExpertOnBoard"
              className="img-fluid rounded shadow zoom-hover"
            />
          </Col>
        </Row>

        {/* Why ExpertOnBoard */}
        <Row className="align-items-center flex-md-row-reverse my-5 fade-in-up delay-3">
          <Col md={6}>
            <h3 className="text-secondary fw-semibold mb-3">
              Why ExpertOnBoard?
            </h3>
            <p>
              Whether you're a budding marketer or curious student,
              ExpertOnBoard gives you exclusive access to the untaught insights
              of pharmaceutical marketing — through masterclasses, mentorship,
              and real-world discussions.
            </p>
            <p>
              Learn strategies that textbooks miss, decode regulations, and stay
              ahead with emerging trends shaping today’s pharma industry.
            </p>
          </Col>
          <Col md={6}>
            <img
               src="/images/moto2.png"
              alt="Why ExpertOnBoard"
              className="img-fluid rounded shadow zoom-hover"
            />
          </Col>
        </Row>

        {/* Our Motive */}
        <Row className="align-items-center my-5 fade-in-up delay-4">
          <Col md={6}>
            <h3 className="text-secondary fw-semibold mb-3">Our Motive</h3>
            <p>
              We aim to decode the unspoken language of pharmaceutical marketing
              — the nuance, strategy, and real challenges that academia often
              overlooks.
            </p>
            <p>
              By connecting ambitious learners with seasoned professionals, we
              empower action-driven knowledge that drives innovation, builds
              relationships, and creates real impact.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="/images/moto5.jpg"
              alt="Our Motive"
              className="img-fluid rounded shadow zoom-hover"
            />
          </Col>
        </Row>
      </Container>
      <style>
        {`.about-section {
  background: linear-gradient(to right, #f8f9fa, #e9f1ff);
}

.fade-in-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease-out forwards;
}

.delay-1 { animation-delay: 0.2s; }
.delay-2 { animation-delay: 0.4s; }
.delay-3 { animation-delay: 0.6s; }
.delay-4 { animation-delay: 0.8s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.zoom-hover {
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}
.zoom-hover:hover {
  transform: scale(1.03);
  box-shadow: 0 0.5rem 1.5rem rgba(0, 123, 255, 0.2);
}
`}
      </style>
    </section>
  );
}

export default AboutPage;
