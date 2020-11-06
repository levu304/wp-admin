import React, { useState, Fragment } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SIGN_IN } from "../routes";
import API from "../api";

export default () => {
  const [userLogin, setUserLogin] = useState("");
  const [IsSubmit, setIsSubmit] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const send = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    API.post("/api/v1/reset", {
      user_login: userLogin,
      origin: window.location.origin,
    })
      .then((response) => {
        setIsSubmit(false);
        const { status, data } = response;
        if (status === 200) {
        }
      })
      .catch((error) => {
        setIsSubmit(false);
        const {
          data: { data },
        } = error.response;
        const { message } = data[0];
        setErrorMessage(message);
        setIsError(true);
      });
  };

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center">
        <Col
          xl={{
            span: 4,
            offset: 4,
          }}
        >
          <Alert variant="primary">
            <small>
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </small>
          </Alert>
          {IsError && (
            <Alert
              variant="danger"
              onClose={() => setIsError(false)}
              dismissible
            >
              <small dangerouslySetInnerHTML={{ __html: errorMessage }} />
            </Alert>
          )}
          <Card>
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    value={userLogin}
                    onChange={(e) => setUserLogin(e.target.value)}
                    disabled={IsSubmit}
                  />
                </Form.Group>

                <Row className="align-items-center">
                  <Col>
                    <Link to={SIGN_IN} className="text-muted">
                      <small>Log in</small>
                    </Link>
                  </Col>
                  <Col className="text-right">
                    <Button
                      variant="primary"
                      onClick={send}
                      disabled={IsSubmit}
                    >
                      {IsSubmit ? (
                        <Fragment>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Send
                        </Fragment>
                      ) : (
                        "Send"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
