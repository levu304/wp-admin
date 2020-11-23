import { memo, forwardRef } from "react";
import styled from "styled-components";

const Main = styled.div`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll !important;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default memo(
  forwardRef(({ children, ...other }, ref) => {
    return (
      <Main ref={ref} className="pt-4 pb-5" {...other}>
        {children}
      </Main>
    );
  })
);
