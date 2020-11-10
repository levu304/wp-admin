import React, { Fragment, useState } from "react";
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
import { PASSWORD_FORGET } from "../routes";
import { useAuthentication } from "../hooks/auth";

export default () => {
  const { isSubmit, error, login } = useAuthentication();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center">
        <Col
          xl={{
            span: 4,
            offset: 4,
          }}
        >
          {error && (
            <Alert
              variant="danger"
            >
              <small dangerouslySetInnerHTML={{ __html: error }} />
            </Alert>
          )}
          <Card className="mb-3">
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={isSubmit}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmit}
                  />
                </Form.Group>

                <Row className="align-items-center">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                  </Col>
                  <Col className="text-right">
                    <Button
                      variant="primary"
                      onClick={e => login(username, password, remember)}
                      disabled={isSubmit}
                    >
                      {isSubmit ? (
                        <Fragment>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Login
                        </Fragment>
                      ) : (
                        "Login"
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <Link to={PASSWORD_FORGET} className="text-muted">
            <small>Lost your password?</small>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
