import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRoles } from "../hooks/roles";
import { useUsers } from "../hooks/users";

export default () => {
  const { roles } = useRoles();
  const { addUser } = useUsers();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [role, setRole] = useState("subscriber");

  return (
    <div>
      <PageTitle title="Add New User" />
      <p>
        <small>Create a brand new user and add them to this site.</small>
      </p>

      <Form>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
            <small className="font-weight-bold">
              Username <span className="font-italic">(required)</span>
            </small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="text"
              size="sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
            <small className="font-weight-bold">
              Email <span className="font-italic">(required)</span>
            </small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="email"
              size="sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
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
          <Form.Label column lg="2">
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
          <Form.Label column lg="2">
            <small className="font-weight-bold">Password</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control
              type="password"
              size="sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
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
          onClick={(e) =>
            addUser({
              username: username.toLowerCase(),
              email,
              password,
              first_name,
              last_name,
              name:
                first_name !== "" && last_name !== ""
                  ? `${first_name} ${last_name}`
                  : "",
              roles: [role],
            })
          }
        >
          Add New User
        </Button>
      </Form>
    </div>
  );
};
