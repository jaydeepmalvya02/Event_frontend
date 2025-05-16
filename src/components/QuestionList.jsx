import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          "https://event-nine-xi.vercel.app/api/query/get"
        ); // Replace with your actual API
        const data = await res.json();

        if (res.ok) {
          setQuestions(data);
        } else {
          setError(data.message || "Failed to fetch questions.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <Container className="my-5">
      <h3 className="mb-4">Submitted Questions</h3>

      {loading && <Spinner animation="border" variant="primary" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Question</th>
              <th>Email</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={q._id}>
                <td>{index + 1}</td>
                <td>{q.question}</td>
                <td>{q.email || "-"}</td>
                <td>{new Date(q.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default QuestionList;
