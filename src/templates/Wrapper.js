import React, { memo, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";

export default memo(({ children }) => {
  return (
    <Fragment>
      <Appbar />

      <Container fluid className="h-100">
        <Row className="h-100">
          <Col lg={2} className="h-100 bg-dark px-0">
            <Sidebar />
          </Col>
          <Col lg={10} className="h-100">
            {children}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
});
