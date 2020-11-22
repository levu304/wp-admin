import React, { memo, useState } from "react";
import { Form, Button } from "react-bootstrap";

export default memo(({ buttonName = "Search", submit, ...other }) => {
  const [query, setQuery] = useState("");
  return (
    <Form inline {...other}>
      <Form.Control
        type="text"
        className="mr-sm-1"
        size="sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        onClick={(e) => submit(query)}
        variant="outline-primary"
        size="sm"
      >
        {buttonName}
      </Button>
    </Form>
  );
});
