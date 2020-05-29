import React, { useState } from "react";
import "./style.css";
import {
  Button,
  Container,
  Col,
  Row,
  Alert,
  FormControl,
  Form,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import Header from "./Header";
import StatusModal from "./StatusModal";

function App() {
  const [userCount, setUserCount] = useState(1);
  const [num, setNum] = useState(1);
  const [responseData, setResponseData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const startProcess = () => {
    setShowModal(true);
    axios.post("http://localhost:8082/commit", { count: userCount, delay: 30 });
  };

  return (
    <html>
      <Header name="Github Commit Booster" />
      <Container>
        <Row>
          <Col className="text-center main-form" xs={{ span: 6, offset: 3 }}>
            <Form>
              <Form.Group>
                <Form.Label className="sub-heading">
                  Number of Commits to perform
                </Form.Label>
                <FormControl
                  type="number"
                  min="1"
                  value={userCount}
                  onChange={(e) => {
                    setUserCount(e.target.value);
                  }}
                />
                <Alert variant="primary" className="mt-3">
                  Estimated time is <strong>{userCount * 0.5} minutes</strong>!
                </Alert>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={() => startProcess()}
                disabled={userCount === 0 || userCount === "" ? true : false}
                style={{
                  cursor:
                    userCount === 0 || userCount === ""
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                Start
              </Button>
            </Form>
          </Col>
        </Row>
        <StatusModal
          visibility={showModal}
          userCount={userCount}
          count={num}
          data={responseData}
        />
      </Container>
    </html>
  );
}

export default App;
