import React, { useEffect, useState } from "react";
import { Modal, Button, ProgressBar, Spinner, Alert } from "react-bootstrap";

function Header(props) {
  const [status, setStatus] = useState("ok"); //ok,aborted,error.

  useEffect(() => {
    setStatus("ok");
  }, [props.visibility]);

  return (
    <Modal show={props.visibility} size="lg" centered>
      <Modal.Header>
        <Modal.Title>Status</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="sub-heading">
          commits : {props.count}/{props.userCount}
        </p>
        <hr />
        <p className="sub-heading">
          Progress : {Math.round((props.count / props.userCount) * 100)}%
        </p>
        <ProgressBar
          animated
          variant="success"
          now={
            props.count === 0
              ? 3
              : Math.round((props.count / props.userCount) * 100)
          }
        />
        <hr/>

        <Alert variant="primary" show={status === "ok" ? true : false}>
          Commiting...<Spinner animation="grow" size="sm" />
        </Alert>

        <Alert variant="danger" show={status === "aborted" ? true : false}>
          Aborting please wait...<Spinner animation="grow" size="sm" />
        </Alert>

        <Alert
          variant="success"
          show={props.count >= props.userCount ? true : false}
        >
          Success!
        </Alert>

      </Modal.Body>

      <Modal.Footer>
        <Button
          block
          variant="danger"
          style={{ display: props.count < props.userCount ? "block" : "none" }}
          onClick={() => {
            setStatus("aborted");
            props.stopCommits();
            setTimeout(() => {
              props.hideModal();
            }, 10000);
          }}
        >
          Stop
        </Button>
        <Button
          block
          variant="info"
          onClick={() => props.hideModal()}
          style={{
            display: props.count >= props.userCount ? "block" : "none",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Header;
