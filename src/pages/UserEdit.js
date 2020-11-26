import { useState, useMemo, useRef, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Button,
  Form,
  Row,
  Col,
  Image,
  Alert,
  InputGroup,
} from "react-bootstrap";
import PageTitle from "../components/PageTitle";
import { USER_NEW, USERS } from "../routes";
import { useRoles } from "../hooks/roles";
import { useUsers } from "../hooks/users";
import Section from "../components/Section";
import Main from "../components/Main";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSettings } from "../hooks/settings";
import { generatePassword } from "../common";
import { useFormik } from "formik";
import { string, object } from "yup";
import { useAuthentication } from "../hooks/auth";
import SubmitButton from "../components/SubmitButton";

export default () => {
  const {
    state: { user },
    pathname,
  } = useLocation();

  const path = useMemo(() => pathname.replace("/", ""), [pathname]);

  const { roles } = useRoles();
  const { updateUser } = useUsers();
  const ref = useRef();
  const { languages } = useSettings();
  const { logout } = useAuthentication();

  const [updated, setUpdated] = useState(false);
  const [passwordType, setPasswordType] = useState(false);

  const submit = (
    {
      first_name,
      last_name,
      nickname,
      display_name,
      email,
      url,
      description,
      locale,
      password,
      role,
    },
    { setSubmitting }
  ) =>
    updateUser(
      {
        id: user.id,
        first_name,
        last_name,
        nickname,
        name: display_name,
        email,
        url,
        description,
        roles: [role],
        locale,
      },
      password,
      (success, { data, status }) => {
        setSubmitting(false);
        if (success) {
          setUpdated(true);
          ref.current.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        switch (status) {
          case 401:
            logout();
            break;
          default:
            console.log(data);
            break;
        }
      }
    );

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      role: user.roles[0],
      email: user.email,
      password: null,
      first_name: user.first_name,
      last_name: user.last_name,
      description: user.description,
      locale: user.locale,
      url: user.url,
      nickname: user.nickname,
      display_name: user.name,
    },
    onSubmit: submit,
    validationSchema: object().shape({
      nickname: string().required("Please Enter nickname"),
      email: string().email().required("Please Enter password"),
    }),
  });

  return (
    <Main className="pt-4 pb-5" ref={ref}>
      <div className="d-flex flex-row align-items-center mb-3">
        <PageTitle
          title={path !== "profile" ? `Edit User ${user.name}` : "Profile"}
        />
        <Button
          as={Link}
          to={USER_NEW}
          size="sm"
          variant="outline-primary"
          className="ml-3 font-weight-bold"
        >
          Add new
        </Button>
      </div>
      {updated && (
        <Alert variant="success" onClose={() => setUpdated(false)} dismissible>
          <p className="font-weight-bold mb-0">
            <small>{path === "profile" ? "Profile" : "User"} updated.</small>
          </p>
          {path !== "profile" && (
            <Link to={USERS}>
              <FaLongArrowAltLeft size="0.8em" className="mr-1" />
              <small>Back To Users</small>
            </Link>
          )}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Section className="Personal Options">
          <Form.Group as={Row} className="align-items-center">
            <Form.Label column lg="3">
              <small className="font-weight-bold">Language</small>
            </Form.Label>
            <Col lg="2">
              <Form.Control
                as="select"
                size="sm"
                custom
                name="locale"
                value={values.locale}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {languages.map(({ native_name, language }, index) => (
                  <option key={index} value={language}>
                    {native_name}
                  </option>
                ))}
              </Form.Control>
            </Col>
          </Form.Group>
        </Section>

        <Section title="Name">
          <Form.Group as={Row} className="align-items-center">
            <Form.Label column lg="3">
              <small className="font-weight-bold">Username</small>
            </Form.Label>
            <Col lg="5">
              <Form.Control
                type="text"
                size="sm"
                disabled
                value={user.username}
              />
            </Col>
          </Form.Group>

          {values.role === "administrator" && (
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
                  value={values.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="text-capitalize"
                >
                  {roles.map(({ name }, index) => (
                    <option
                      key={index}
                      value={name}
                      className="text-capitalize"
                    >
                      {name}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
          )}

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
              <small className="font-weight-bold">
                Nickname <span className="font-italic">(required)</span>
              </small>
            </Form.Label>
            <Col lg="5">
              <Form.Control
                type="text"
                size="sm"
                name="nickname"
                value={values.nickname}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="align-items-center">
            <Form.Label column lg="3">
              <small className="font-weight-bold">
                Display name publicly as
              </small>
            </Form.Label>
            <Col lg="2">
              <Form.Control
                as="select"
                size="sm"
                custom
                name="display_name"
                value={values.display_name}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                {user.username === user.name ? (
                  <option value={user.name}>{user.name}</option>
                ) : (
                  <Fragment>
                    <option value={user.name}>{user.name}</option>
                    <option value={user.username}>{user.username}</option>
                  </Fragment>
                )}
              </Form.Control>
            </Col>
          </Form.Group>
        </Section>

        <Section title="Contact Info">
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
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="align-items-center">
            <Form.Label column lg="3">
              <small className="font-weight-bold">Website</small>
            </Form.Label>
            <Col lg="5">
              <Form.Control
                type="text"
                size="sm"
                name="url"
                value={values.url}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </Col>
          </Form.Group>
        </Section>

        <Section
          title={`About ${path === "profile" ? "Yourself" : "the user"}`}
        >
          <Form.Group as={Row}>
            <Form.Label column lg="3">
              <small className="font-weight-bold">Biographical Info</small>
            </Form.Label>
            <Col lg="6">
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={values.description}
                onChange={handleChange}
                disabled={isSubmitting}
              />
              <p className="font-italic">
                <small>
                  Share a little biographical information to fill out your
                  profile. This may be shown publicly.
                </small>
              </p>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column lg="3">
              <small className="font-weight-bold">Profile Picture</small>
            </Form.Label>
            <Col lg="5">
              <Image
                src={user.avatar_urls["96"]}
                rounded
                width="96"
                height="96"
              />
            </Col>
          </Form.Group>
        </Section>

        <Section title="Account Management">
          <Form.Group as={Row}>
            <Form.Label column lg="3">
              <small className="font-weight-bold">Password</small>
            </Form.Label>
            <Col lg="6">
              {!values.password ? (
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={(e) => setFieldValue("password", generatePassword())}
                >
                  Generate Password
                </Button>
              ) : (
                <InputGroup size="sm">
                  <Form.Control
                    type={passwordType ? "password" : "text"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  <InputGroup.Append>
                    <Button
                      variant="outline-primary"
                      onClick={(e) => setPasswordType(!passwordType)}
                    >
                      Hide
                    </Button>
                    <Button
                      variant="outline-primary"
                      onClick={(e) => setFieldValue("password", null)}
                    >
                      Cancel
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              )}
            </Col>
          </Form.Group>

          <SubmitButton
            isSubmitting={isSubmitting}
            label={`Update ${path === "profile" ? "Profile" : "User"}`}
          />
        </Section>
      </Form>
    </Main>
  );
};
