import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  InputGroup,
  Button,
  Row,
  Col,
  Spinner,
  Table,
  Modal,
} from "react-bootstrap";
import axios from "axios";

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card");

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    experience: "",
    description: "",
  });
  const baseUrl = "https://event-nine-xi.vercel.app";
  const [resumeFile, setResumeFile] = useState(null);
  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/jobs`);
        setJobs(data.jobData || []);
        setFiltered(data.jobData || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    const keyword = value.toLowerCase();
    const result = jobs.filter((job) =>
      [job.title, job.company, job.location].some((field) =>
        field?.toLowerCase().includes(keyword)
      )
    );
    setFiltered(result);
  };

  const handleCreateJob = async () => {
    try {
      const res = await axios.post(`${baseUrl}/api/jobs`, newJob);
      const savedJob = res.data.savedJob;
      setJobs((prev) => [...prev, savedJob]);
      setFiltered((prev) => [...prev, savedJob]);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Error creating job:", err);
    }
  };

  const handleApply = async () => {
    if (
      !resumeFile ||
      !selectedJob ||
      !candidateData.name ||
      !candidateData.email
    ) {
      alert("Please fill all required fields and upload your resume.");
      return;
    }

    try {
      const fileFormData = new FormData();
      fileFormData.append("pdf", resumeFile);

      const uploadRes = await axios.post(`${baseUrl}/api/uploadPdf`, fileFormData);
      const resumeUrl = uploadRes.data?.url;
      if (!resumeUrl) throw new Error("Resume upload failed");

      const payload = {
        jobId: selectedJob._id,
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone,
        resumeUrl,
        jobData: {
          _id: selectedJob._id,
          title: selectedJob.title,
          company: selectedJob.company,
          location: selectedJob.location,
          type: selectedJob.type,
          experience: selectedJob.experience,
          description: selectedJob.description,
          createdAt: selectedJob.createdAt,
          updatedAt: selectedJob.updatedAt,
        },
      };

      await axios.post(`${baseUrl}/api/jobs/apply`, payload);
      alert("🎉 Application submitted successfully!");
      setShowApplyModal(false);
      setCandidateData({ name: "", email: "", phone: "" });
      setResumeFile(null);
    } catch (err) {
      console.error("Failed to apply:", err);
      alert("❌ Failed to apply. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-white">Explore Job Opportunities</h2>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <InputGroup className="flex-grow-1">
          <Form.Control
            placeholder="🔍 Search by title, company, or location"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => handleSearch("")}>
            Reset
          </Button>
        </InputGroup>

        <div className="d-flex gap-2">
          <Button variant="primary" onClick={() => setShowCreateModal(true)}>
            Create Job Opening
          </Button>
          <Button
            variant="light"
            onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
          >
            Switch to {viewMode === "card" ? "Table View" : "Card View"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-white text-center">No jobs found.</p>
      ) : viewMode === "card" ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filtered.map((job) => (
            <Col key={job._id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Location:</strong> {job.location} <br />
                    <strong>Type:</strong> {job.type} <br />
                    <strong>Experience:</strong> {job.experience} yrs
                  </Card.Text>
                  <Card.Text className="small text-muted">
                    {job.description?.slice(0, 100)}...
                  </Card.Text>
                  <Button
                    variant="outline-success"
                    onClick={() => {
                      setSelectedJob(job);
                      setShowApplyModal(true);
                    }}
                  >
                    Apply
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Experience</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.company}</td>
                  <td>{job.location}</td>
                  <td>{job.type}</td>
                  <td>{job.experience} yrs</td>
                  <td>{job.description?.slice(0, 100)}...</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Create Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Job Opening</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              "title",
              "company",
              "location",
              "type",
              "experience",
              "description",
            ].map((field) => (
              <Form.Group className="mb-3" key={field}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  type={field === "experience" ? "number" : "text"}
                  value={newJob[field]}
                  onChange={(e) =>
                    setNewJob({ ...newJob, [field]: e.target.value })
                  }
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateJob}>
            Post Job
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Apply Modal */}
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Apply to {selectedJob?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name*</Form.Label>
              <Form.Control
                type="text"
                value={candidateData.name}
                onChange={(e) =>
                  setCandidateData({ ...candidateData, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email*</Form.Label>
              <Form.Control
                type="email"
                value={candidateData.email}
                onChange={(e) =>
                  setCandidateData({ ...candidateData, email: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={candidateData.phone}
                onChange={(e) =>
                  setCandidateData({ ...candidateData, phone: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Resume (PDF only)*</Form.Label>
              <Form.Control
                type="file"
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleApply}>
            Submit Application
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FindJobs;
