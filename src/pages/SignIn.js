import { useState } from "react";
import { Card, Container, Row, Col, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PASSWORD_FORGET } from "../routes";
import { useAuthentication } from "../hooks/auth";
import { useFormik } from "formik";
import { string, object } from "yup";
import { LANDING } from "../routes";
import { useHistory } from "react-router-dom";
import { save } from "react-cookies";
import SubmitButton from "../components/SubmitButton";

export default () => {
  const { login } = useAuthentication();
  const { replace } = useHistory();

  const [errorMessage, setErrorMessage] = useState(null);

  const submit = (values, { setSubmitting }) =>
    login(values, (response, error = false) => {
      setSubmitting(false);
      if (error) {
        setErrorMessage(response.data[0].message);
        return;
      }
      const { user, authorization } = response;
      save("Authorization", authorization, { path: "/" });
      save("user", user, { path: "/" });
      replace(LANDING, "urlhistory");
    });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      remember: false,
    },
    onSubmit: submit,
    validationSchema: object({
      username: string().required(),
      password: string().required(),
    }),
  });

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center">
        <Col
          xl={{
            span: 4,
            offset: 4,
          }}
        >
          {errorMessage && (
            <Alert variant="danger">
              <small dangerouslySetInnerHTML={{ __html: errorMessage }} />
            </Alert>
          )}
          <Card className="mb-3">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    value={values.username}
                    isInvalid={touched.username && errors.username}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    disabled={isSubmitting}
                    value={values.password}
                    isInvalid={touched.password && errors.password}
                  />
                </Form.Group>

                <Row className="align-items-center">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      name="remember"
                    />
                  </Col>
                  <Col className="text-right">
                    <SubmitButton isSubmitting={isSubmitting} label="Login" />
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
