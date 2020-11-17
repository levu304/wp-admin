import React, { memo } from "react";
import { useCategories } from "../hooks/categories";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const ScrollView = styled.div`
  height: 20vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default memo(({ ...other }) => {
  const { categories } = useCategories();

  return (
    <Form.Control as={ScrollView} {...other}>
      {categories.map((cat, index) => (
        <Form.Check custom key={index} label={cat.name} />
      ))}
    </Form.Control>
  );
});
