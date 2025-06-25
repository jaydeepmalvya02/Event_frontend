import React, { useEffect, useState } from "react";
import { Card, Form, Button, Row, Col, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Login from "../components/Login";
import { useAuth } from "../context/AuthContext"; // ✅ AuthContext

const FindJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [pendingJob, setPendingJob] = useState(null);

  const { user, isLoggedIn } = useAuth(); // ✅ use context
  const navigate = useNavigate();
  const baseUrl = "https://event-nine-xi.vercel.app";

  const [candidateData, setCandidateData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.mobile || "",
    department: "",
  });

  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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

  const handleFilter = () => {
    const keyword = search.toLowerCase();
    const result = jobs.filter((job) => {
      const matchSearch =
        !keyword ||
        [job.title, job.company, job.location].some((field) =>
          field?.toLowerCase().includes(keyword)
        );
      const matchLocation =
        !selectedLocation || job.location === selectedLocation;
      const matchType = !selectedType || job.type === selectedType;
      const matchDepartment =
        !selectedDepartment || job.department === selectedDepartment;
      return matchSearch && matchLocation && matchType && matchDepartment;
    });
    setFiltered(result);
  };

  const handleApply = async () => {
    if (!selectedJob) return;
    try {
      let resumeUrl = localStorage.getItem("resumeUrl");
      if (!resumeUrl) {
        if (!resumeFile) {
          alert("Please upload your resume.");
          return;
        }
        const fileFormData = new FormData();
        fileFormData.append("pdf", resumeFile);
        const uploadRes = await axios.post(
          `${baseUrl}/api/uploadPdf`,
          fileFormData
        );
        resumeUrl = uploadRes.data?.url;
        if (!resumeUrl) throw new Error("Resume upload failed");
        localStorage.setItem("resumeUrl", resumeUrl);
      }

      const payload = {
        jobId: selectedJob._id,
        name: candidateData.name,
        email: candidateData.email,
        phone: candidateData.phone,
        resumeUrl,
        department: candidateData.department,
        jobData: selectedJob,
      };

      const { data } = await axios.post(`${baseUrl}/api/jobs/apply`, payload);
      if (data.success) {
        toast.success("Application submitted successfully!");
        setShowApplyModal(false);
        setCandidateData((prev) => ({ ...prev, department: "" }));
        setResumeFile(null);
      }
    } catch (err) {
      console.error("Failed to apply:", err);
      toast.error("Failed to apply. Please try again.");
    }
  };

  const unique = (field) => Array.from(new Set(jobs.map((job) => job[field])));

  const handleCreateJobClick = () => {
    if (isLoggedIn) {
      navigate("/createJobs");
    } else {
      setPendingJob("redirectToCreateJob");
      setShowLoginPopup(true);
    }
  };

  return (
    <section className="job-section">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="text-gray-800 font-serif">
            Explore Job Opportunities
          </h2>
          <Button variant="primary" onClick={handleCreateJobClick}>
            + Create Job
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-3 mb-4 shadow-sm bg-light">
          <Row className="g-2 align-items-center">
            <Col md={3} sm={6}>
              <Form.Control
                placeholder="Search title, company, location"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  handleFilter();
                }}
              />
            </Col>
            <Col md={3} sm={6}>
              <Form.Select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  handleFilter();
                }}
              >
                <option value="">All Locations</option>
                {unique("location").map((loc) => (
                  <option key={loc}>{loc}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3} sm={6}>
              <Form.Select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  handleFilter();
                }}
              >
                <option value="">All Types</option>
                {unique("type").map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </Form.Select>
            </Col>
            <Col md={3} sm={6}>
              <Form.Select
                value={selectedDepartment}
                onChange={(e) => {
                  setSelectedDepartment(e.target.value);
                  handleFilter();
                }}
              >
                <option value="">All Departments</option>
                {unique("department").map((dept) => (
                  <option key={dept}>{dept}</option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} className="d-flex justify-content-end mt-2">
              <Button
                variant="outline-dark"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setSelectedLocation("");
                  setSelectedType("");
                  setSelectedDepartment("");
                  setFiltered(jobs);
                }}
              >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Job Cards */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted">No jobs found.</p>
        ) : (
          <Row xs={1} className="g-4">
            {filtered.map((job) => (
              <Col key={job._id}>
                <Card className="h-100 shadow job-card border-0 rounded-4 bg-white bg-opacity-75">
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Location:</strong> {job.location} <br />
                      <strong>Type:</strong> {job.type} <br />
                      <strong>Department:</strong> {job.department} <br />
                      <strong>Experience:</strong> {job.experience} yrs
                    </Card.Text>
                    <Card.Text className="small text-muted">
                      {job.description?.slice(0, 100)}...
                    </Card.Text>
                    <Button
                      variant="outline-success"
                      onClick={() => {
                        if (isLoggedIn) {
                          setSelectedJob(job);
                          setShowApplyModal(true);
                        } else {
                          setPendingJob(job);
                          setShowLoginPopup(true);
                        }
                      }}
                    >
                      Apply
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Apply Modal */}
        <Modal
          show={showApplyModal}
          onHide={() => setShowApplyModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Apply to {selectedJob?.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {["name", "email", "phone"].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>
                    {field.charAt(0).toUpperCase() + field.slice(1)}*
                  </Form.Label>
                  <Form.Control
                    type={field === "email" ? "email" : "text"}
                    value={candidateData[field]}
                    onChange={(e) =>
                      setCandidateData({
                        ...candidateData,
                        [field]: e.target.value,
                      })
                    }
                    required
                  />
                </Form.Group>
              ))}
              <Form.Group className="mb-3">
                <Form.Label>Department*</Form.Label>
                <Form.Select
                  value={candidateData.department}
                  onChange={(e) =>
                    setCandidateData({
                      ...candidateData,
                      department: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Technical">Technical</option>
                  <option value="Sales Marketing">Sales Marketing</option>
                  <option value="Customer Support">Customer Support</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>
                  Upload Resume (PDF only){" "}
                  {localStorage.getItem("resumeUrl") && (
                    <span className="text-success">(Already uploaded)</span>
                  )}
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  disabled={!!localStorage.getItem("resumeUrl")}
                />
                {localStorage.getItem("resumeUrl") && (
                  <Button
                    size="sm"
                    variant="danger"
                    className="mt-2"
                    onClick={() => {
                      localStorage.removeItem("resumeUrl");
                      setResumeFile(null);
                    }}
                  >
                    Remove Resume
                  </Button>
                )}
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowApplyModal(false)}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleApply}>
              Submit Application
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Login Modal */}
        <Modal
          show={showLoginPopup}
          onHide={() => setShowLoginPopup(false)}
          centered
        >
          <Modal.Body>
            <Login
              onLoginSuccess={() => {
                const updatedUser = JSON.parse(localStorage.getItem("user"));
                if (pendingJob === "redirectToCreateJob") {
                  setShowLoginPopup(false);
                  setPendingJob(null);
                  navigate("/createJobs");
                  return;
                }
                if (pendingJob && updatedUser) {
                  setCandidateData({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.mobile,
                    department: "",
                  });
                  setSelectedJob(pendingJob);
                  setShowApplyModal(true);
                  setPendingJob(null);
                }
                setShowLoginPopup(false);
              }}
              onClose={() => setShowLoginPopup(false)}
            />
          </Modal.Body>
        </Modal>
      </div>

      <style>
        {`
        .job-section {
          background: linear-gradient(to right, #f8f9fa, #e9f1ff);
        }

        .job-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        }

        .job-card .card-title {
          color: #0d6efd;
          font-weight: 600;
        }

        .job-card .card-subtitle {
          font-weight: 500;
        }
      `}
      </style>
    </section>
  );
};

export default FindJobs;
