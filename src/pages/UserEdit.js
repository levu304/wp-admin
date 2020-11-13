import React, { useState, useEffect, useRef, Fragment } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, Form, Row, Col, Image, Alert } from "react-bootstrap";
import PageTitle from "../components/PageTitle";
import { USER_NEW, USERS } from "../routes";
import { useRoles } from "../hooks/roles";
import { useUsers } from "../hooks/users";
import Section from "../components/Section";
import Main from "../components/Main";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSettings } from "../hooks/settings";

export default () => {
  const {
    state: { user },
  } = useLocation();
  const { roles } = useRoles();
  const {
    hashPassword,
    updated,
    toggleUpdateAlert,
    generatePassword,
    updateUser,
  } = useUsers();
  const ref = useRef();
  const { languages } = useSettings();

  const [role, setRole] = useState(user.roles[0]);
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [nickname, setNickname] = useState(user.nickname);
  const [display_name, setDisplayName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [url, setURL] = useState(user.url);
  const [description, setDescription] = useState(user.description);
  const [password, setPassword] = useState(hashPassword);
  const [locale, setLocale] = useState(user.locale);

  useEffect(() => {
    if (hashPassword) {
      setPassword(hashPassword);
    }
  }, [hashPassword]);

  return (
    <Main className="pt-4 pb-5" ref={ref}>
      <div className="d-flex flex-row align-items-center mb-3">
        <PageTitle title={`Edit User ${user.name}`} />
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
        <Alert variant="success" onClose={toggleUpdateAlert} dismissible>
          <p className="font-weight-bold mb-0">
            <small>User updated.</small>
          </p>
          <Link to={USERS}>
            <FaLongArrowAltLeft size="0.8em" className="mr-1" />
            <small>Back To Users</small>
          </Link>
        </Alert>
      )}
      <Form>
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
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
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

          {user.roles[0] === "administrator" && (
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column lg="3">
                <small className="font-weight-bold">Role</small>
              </Form.Label>
              <Col lg="2">
                <Form.Control
                  as="select"
                  size="sm"
                  custom
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
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
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
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
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
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
                value={display_name}
                onChange={(e) => setDisplayName(e.target.value)}
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
                type="text"
                size="sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={url}
                onChange={(e) => setURL(e.target.value)}
              />
            </Col>
          </Form.Group>
        </Section>

        <Section title="About the user">
          <Form.Group as={Row}>
            <Form.Label column lg="3">
              <small className="font-weight-bold">Biographical Info</small>
            </Form.Label>
            <Col lg="6">
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              {!password ? (
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    generatePassword();
                  }}
                >
                  Generate Password
                </Button>
              ) : (
                <Form.Control
                  type="text"
                  size="sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </Col>
          </Form.Group>

          <Button
            size="sm"
            className="mt-3"
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
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
                password
              );
              ref.current.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Update User
          </Button>
        </Section>
      </Form>
    </Main>
  );
};
