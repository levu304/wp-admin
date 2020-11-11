import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import { Button, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useUsers } from "../hooks/users";

export default () => {
  const {
    state: { user },
  } = useLocation();
  const defaultParams = { context: "edit" };
  const [reassign, setReassign] = useState("");
  const [value, setValue] = useState("delete");

  const { users, deleteUser } = useUsers(defaultParams);

  useEffect(() => {
    if (users.length !== 0) {
      setReassign(users[0].id);
    }
  }, [users]);

  return (
    <div>
      <PageTitle title="Delete Users" />

      <p>You have specified this user for deletion:</p>
      <p>
        ID #{user.id}: {user.name}
      </p>
      <p>What should be done with content owned by this user?</p>
      <Form>
        <Form.Check
          type="radio"
          value="delete"
          checked={value === "delete"}
          onChange={(e) => setValue(e.target.value)}
          label="Delete all content."
          className="mb-3 d-flex align-items-center"
        />
        <Form.Check className="mb-3 d-flex flex-row align-items-center">
          <Form.Check.Input
            type="radio"
            value="reassign"
            checked={value === "reassign"}
            onChange={(e) => setValue(e.target.value)}
          />
          <Form.Check.Label>Attribute all content to: </Form.Check.Label>
          <Form.Control
            as="select"
            size="sm"
            custom
            value={reassign}
            disabled={value !== "reassign"}
            onChange={(e) => setReassign(e.target.value)}
            className="ml-2 col-lg-2"
          >
            {users.map(({ id, name }, index) => (
              <option key={index} value={id}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Check>

        <Button
          variant="primary"
          size="sm"
          className="mt-3"
          onClick={(e) =>
            deleteUser({
              id: user.id,
              reassign: value === "delete" ? null : parseInt(reassign),
            })
          }
        >
          Confirm Deletion
        </Button>
      </Form>
    </div>
  );
};
