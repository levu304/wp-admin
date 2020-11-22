import { memo, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default memo(({ actions, apply, ...other }) => {
  const [action, setAction] = useState("");

  return (
    <Form {...other}>
      <Form.Control
        as="select"
        size="sm"
        custom
        value={action}
        onChange={(e) => setAction(e.target.value)}
        className="text-capitalize mr-sm-1"
      >
        <option value="">Bulk Actions</option>
        {actions.map(({ value, name }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </Form.Control>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={(e) => apply(action)}
      >
        Apply
      </Button>
    </Form>
  );
});
