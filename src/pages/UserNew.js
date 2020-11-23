import { Fragment } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useRoles } from "../hooks/roles";
import { useUsers } from "../hooks/users";
import Main from "../components/Main";
import { useFormik } from "formik";
import { string, object } from "yup";

export default () => {
  const { roles } = useRoles();
  const { addUser } = useUsers();

  const submit = (values, { setSubmitting }) =>
    addUser(
      {
        ...values,
        name:
          values.first_name !== "" && values.last_name !== ""
            ? `${values.first_name} ${values.last_name}`
            : "",
        roles: [values.roles],
      },
      () => setSubmitting(false)
    );

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
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      roles: "subscriber",
    },
    onSubmit: submit,
    validationSchema: object().shape({
      username: string()
        .matches(/^[a-z]+$/)
        .required("Please Enter username"),
      email: string().email().required("Please Enter password"),
      password: string().required("Please Enter password"),
    }),
  });

  return (
    <Main>
      <PageTitle title="Add New User" />
      <p>
        <small>Create a brand new user and add them to this site.</small>
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="3">
            <small className="font-weight-bold">
              Username <span className="font-italic">(required)</span>
            </small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="text"
              size="sm"
              name="username"
              value={values.username}
              isInvalid={touched.username && errors.username}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="3">
            <small className="font-weight-bold">
              Email <span className="font-italic">(required)</span>
            </small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="email"
              size="sm"
              name="email"
              value={values.email}
              isInvalid={touched.email && errors.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="3">
            <small className="font-weight-bold">First Name</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="text"
              size="sm"
              name="first_name"
              value={values.first_name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="3">
            <small className="font-weight-bold">Last Name</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="text"
              size="sm"
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="3">
            <small className="font-weight-bold">Password</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="text"
              size="sm"
              name="password"
              value={values.password}
              isInvalid={touched.password && errors.password}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="3">
            <small className="font-weight-bold">Role</small>
          </Form.Label>
          <Col lg="2">
            <Form.Control
              as="select"
              size="sm"
              custom
              name="role"
              value={values.roles}
              onChange={handleChange}
              className="text-capitalize"
              disabled={isSubmitting}
            >
              {roles.map(({ name }, index) => (
                <option key={index} value={name} className="text-capitalize">
                  {name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>

        <Button
          size="sm"
          className="mt-3"
          variant="primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Fragment>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Add New User
            </Fragment>
          ) : (
            "Add New User"
          )}
        </Button>
      </Form>
    </Main>
  );
};
