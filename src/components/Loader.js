import { memo } from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const Loader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.8);
`;

export default memo(({ toggle }) => {
  return (
    <Loader
      className={`d-${
        toggle ? "flex" : "none"
      } justify-content-center align-items-center`}
    >
      <Spinner animation="border" variant="primary" />
    </Loader>
  );
});
