import React, { useMemo, useState, useEffect, Fragment } from "react";
import { Table, Form, FormControl, Button } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTable } from "react-table";
import { useUsers } from "../hooks/users";
import { POSTS, USERS, USER_DELETE } from "../routes";
import { paramsToObject } from "../common";
import UsersListSub from "./UsersListSub";
import { useRoles } from "../hooks/roles";

export default () => {
  const { search } = useLocation();
  const { push } = useHistory();
  const defaultParams = { context: "edit" };
  const params = useMemo(
    () =>
      search !== ""
        ? { ...defaultParams, ...paramsToObject(search) }
        : defaultParams,
    [search]
  );

  const { users, getUsers } = useUsers(params);
  const { roles } = useRoles();

  useEffect(() => {
    getUsers(params);
  }, [params]);

  const [query, setQuery] = useState("");
  const [checkAll, setCheckAll] = useState(false);
  const [checkRows, setCheckRows] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [action, setAction] = useState("");

  const data = useMemo(
    () =>
      users.map(({ id, username, name, email, roles, posts }) => {
        checkRows.push(false);
        setCheckRows([...checkRows]);
        return {
          id,
          username,
          name,
          email,
          role: roles[0],
          posts,
        };
      }),
    [users]
  );

  useEffect(() => {
    if (checkAll) {
      const all = checkRows.map((value) => true);
      setCheckRows([...all]);
      return;
    }

    const filter = checkRows.filter((value) => value === false);

    if (filter.length !== 0) {
      return;
    }

    const all = checkRows.map((value) => false);
    setCheckRows([...all]);
  }, [checkAll]);

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <Form.Check
            type="checkbox"
            checked={checkAll}
            onChange={(e) => {
              setCheckAll(e.target.checked);
            }}
          />
        ),
        id: "checkbox",
        Cell: ({ row: { index } }) => (
          <Form.Check
            type="checkbox"
            checked={checkRows[index]}
            onChange={(e) => {
              checkRows[index] = e.target.checked;
              setCheckRows([...checkRows]);
              setCheckAll(false);
            }}
          />
        ),
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
    [checkRows, checkAll]
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data,
  });

  const applyAction = (e) => {
    e.preventDefault();
    const user = data.find((value, index) => checkRows[index] === true);
    if (typeof user === "undefined") {
      return;
    }
    switch (action) {
      case "delete":
        push(USER_DELETE, {
          user,
        });
        break;

      default:
        break;
    }
  };

  const renderCell = ({
    render,
    column: { id: columnId },
    row: {
      original: { id: userId },
    },
  }) => {
    switch (columnId) {
      case "posts":
        return <Link to={`${POSTS}?author=${userId}`}>{render("Cell")}</Link>;
      case "role":
        return <p className="mb-0 text-capitalize">{render("Cell")}</p>;
      default:
        return render("Cell");
    }
  };

  return (
    <Fragment>
      <div className="my-2 d-flex flex-row align-items-center justify-content-between">
        <UsersListSub roles={roles} />

        <div>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-1"
              size="sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              as={Link}
              to={query === "" ? USERS : USERS + `?search=${query}`}
              variant="outline-primary"
              size="sm"
            >
              Search
            </Button>
          </Form>
        </div>
      </div>
      <div className="my-3 d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row">
          <Form inline className="mr-3">
            <Form.Control
              as="select"
              size="sm"
              custom
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="text-capitalize mr-sm-1"
            >
              <option value="">Bulk Actions</option>
              <option value="delete">Delete</option>
            </Form.Control>
            <Button variant="outline-primary" size="sm" onClick={applyAction}>
              Apply
            </Button>
          </Form>
          <Form inline>
            <Form.Control
              as="select"
              size="sm"
              custom
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="text-capitalize mr-sm-1"
            >
              <option value="">Change role to…</option>
              {roles.map(({ name }, index) => (
                <option key={index} value={name} className="text-capitalize">
                  {name}
                </option>
              ))}
            </Form.Control>
            <Button
              as={Link}
              to={query === "" ? USERS : USERS + `?search=${query}`}
              variant="outline-primary"
              size="sm"
            >
              Search
            </Button>
          </Form>
        </div>

        <div>
          <p className="mb-0">
            <small>{`${data.length} items`}</small>
          </p>
        </div>
      </div>
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
                  const { getCellProps } = cell;
                  return <td {...getCellProps()}>{renderCell(cell)}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Fragment>
  );
};
