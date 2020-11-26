import { memo } from "react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const TableActions = styled(Table)`
  & {
    background-color: white;
  }
  & tbody tr .row-actions {
    display: none;
  }
  & tbody tr:hover .row-actions {
    display: flex;
  }
`;

export default memo(({ children, ...other }) => (
  <TableActions striped bordered {...other}>
    {children}
  </TableActions>
));
