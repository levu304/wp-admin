import { memo } from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";

const ScrollView = styled.div`
  height: 20vh;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export default memo(({ children, ...other }) => (
  <Form.Control as={ScrollView} {...other}>
    {children}
  </Form.Control>
));
