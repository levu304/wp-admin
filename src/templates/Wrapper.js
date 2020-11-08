import React, { memo, Fragment } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";
import styled from 'styled-components'

const Column = styled(Col)`
  overflow-x: hidden;
  overflow-y: auto;
`

export default memo(({ children }) => {
  return (
    <Fragment>
      <Appbar />

      <Container fluid className="h-100 overflow-hidden">
        <Row className="h-100 overflow-hidden">
          <Column lg={2} className="h-100 bg-dark px-0">
            <Sidebar />
          </Column>
          <Column lg={10} className="overflow-hidden">{children}</Column>
        </Row>
      </Container>
    </Fragment>
  );
});
