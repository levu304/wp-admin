import { memo } from "react";
import styled from "styled-components";

const Cell = styled.div`
  min-height: 50px;
`;

export default memo(({ children, ...other }) => (
  <Cell {...other}>{children}</Cell>
));
