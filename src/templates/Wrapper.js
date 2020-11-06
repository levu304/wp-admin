import React, { memo, Fragment } from "react";
import { Col, Container } from "react-bootstrap";
import Appbar from "../components/Appbar";

export default memo(({ children }) => {
  return (
    <Fragment>
      <Appbar />

      <Container>
        <Col></Col>
        <Col>{children}</Col>
      </Container>
    </Fragment>
  );
});
