import React, { memo } from "react";
import { useCategories } from "../hooks/categories";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const ScrollView = styled.div`
  height: 20vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export default memo(({ data, onChange, ...other }) => {
  const { categories } = useCategories();

  return (
    <Form.Control as={ScrollView} {...other}>
      {data.map((value, index) => (
        <Form.Check
          key={index}
          checked={value}
          onChange={(e) => {
            onChange(index, e.target.checked);
          }}
          label={<small>{categories[index].name}</small>}
        />
      ))}
    </Form.Control>
  );
});
