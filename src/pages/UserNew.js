import React, { useState } from "react";
import PageTitle from "../components/PageTitle";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useRoles } from "../hooks/roles";

export default () => {
  const [role, setRole] = useState("subscriber");
  const { roles } = useRoles();

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
            <Form.Control type="text" size="sm" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
            <small className="font-weight-bold">
              Email <span className="font-italic">(required)</span>
            </small>
          </Form.Label>
          <Col lg="5">
            <Form.Control type="email" size="sm" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
            <small className="font-weight-bold">First Name</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control type="text" size="sm" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
            <small className="font-weight-bold">Last Name</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control type="text" size="sm" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="align-items-center">
          <Form.Label column lg="2">
            <small className="font-weight-bold">Password</small>
          </Form.Label>
          <Col lg="5">
            <Form.Control type="password" size="sm" />
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

        <Button size="sm" className="mt-3" variant="primary">
          Add New User
        </Button>
      </Form>
    </div>
  );
};
