import React, { memo } from "react";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default memo(({ children }) => {
  return <Background className="bg-light">{children}</Background>;
});
