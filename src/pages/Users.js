import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

export default () => {
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "checkbox",
        Cell: ({ row }) => <input type="checkbox" />,
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Posts",
        accessor: "posts",
      },
    ],
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: [],
  });

  return (
    <Table striped bordered {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
