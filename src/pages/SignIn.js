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
import { Link, useHistory } from "react-router-dom";
import { setUser } from "../redux/actions/user";
import { useDispatch } from "react-redux";
import cookie from "react-cookies";
import API from "../api";
import { LANDING, PASSWORD_FORGET } from "../routes";

export default () => {
  const { replace } = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [IsSubmit, setIsSubmit] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    setIsSubmit(true);

    API.post("/api/v1/login", {
      user_login: username,
      user_password: password,
      remember,
    })
      .then((response) => {
        setIsSubmit(false);
        const {
          status,
          data: { data },
        } = response;
        if (status === 200) {
          const { user, authorization } = data;
          cookie.save("Authorization", authorization, { path: "/" });
          cookie.save("user", user, { path: "/" });
          dispatch(setUser(user));
          replace(LANDING, "urlhistory");
        }
      })
      .catch((error) => {
        setIsSubmit(false);
        const { data, status } = error.response;
        switch (status) {
          case 401:
            const { message } = data.data[0];
            setErrorMessage(message);
            break;
          default:
            break;
        }
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
          {IsError && (
            <Alert
              variant="danger"
              onClose={() => setIsError(false)}
              dismissible
            >
              <small dangerouslySetInnerHTML={{ __html: errorMessage }} />
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
                    disabled={IsSubmit}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={IsSubmit}
                  />
                </Form.Group>

                <Row className="align-items-center">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={remember}
                    />
                  </Col>
                  <Col className="text-right">
                    <Button
                      variant="primary"
                      onClick={login}
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
