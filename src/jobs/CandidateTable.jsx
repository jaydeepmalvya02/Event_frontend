import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const baseUrl = "https://event-nine-xi.vercel.app";

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/api/jobs/candidate`);
      setCandidates(res.data.candidates);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load candidates");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        await axios.delete(`${baseUrl}/api/jobs/candidate/${id}`);
        toast.success("Candidate deleted!");
        fetchCandidates();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete candidate");
      }
    }
  };

  const handlePreview = (url) => {
    // Ensure the Cloudinary link uses /raw/upload/
    const rawUrl = url.includes("/raw/upload/")
      ? url
      : url.replace("/image/upload/", "/raw/upload/");

    // Use Google Docs Viewer to embed the file
    const googleDocsUrl = `https://docs.google.com/gview?url=${encodeURIComponent(
      rawUrl
    )}&embedded=true`;

    setPreviewUrl(googleDocsUrl);
    setShowPreview(true);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto" />;

  return (
    <div className="mt-5">
      <h4 className="text-center text-white mb-4">Candidate Applications</h4>
      <Table bordered responsive hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title</th>
            <th>Resume</th>
            <th>Actions</th>
         
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate,index) => (
              <tr key={candidate._id}>
                <td>{index+1}</td>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.phone}</td>
                <td>{candidate.jobData?.title || "N/A"}</td>
                <td className="d-flex flex-column gap-1">
                  <a
                    href={candidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Download
                  </a>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => handlePreview(candidate.resumeUrl)}
                  >
                    Preview
                  </Button>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(candidate._id)}
                  >
                    Delete
                  </Button>
                </td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No candidate applications found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Resume Preview Modal */}
      <Modal className="moadal-container"
        size="xl"
        show={showPreview}
        onHide={() => setShowPreview(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{ background: "black", color: "white" }}
        >
          <Modal.Title>Resume Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", padding: 0 }}>
          {previewUrl ? (
            <iframe
              src={previewUrl}
              title="Resume Preview"
              width="100%"
              height="100%"
              style={{ border: "none" }}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <p className="text-center mt-5">No preview available</p>
          )}
        </Modal.Body>
      </Modal>

      <style>{`
        .btn-close {
          filter: invert(1); /* White close button on black background */
        }
         
      `}</style>
    </div>
  );
};

export default CandidateTable;
