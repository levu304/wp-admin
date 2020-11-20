import React, { useMemo, useState, useEffect, Fragment } from "react";
import { Table, Form, FormControl, Button } from "react-bootstrap";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useTable, useRowSelect } from "react-table";
import { useUsers } from "../hooks/users";
import { POSTS, USERS, USER_DELETE, USER_EDIT } from "../routes";
import { paramsToObject } from "../common";
import UsersListSub from "./UsersListSub";
import RowCheck from "./RowCheck";
import { useRoles } from "../hooks/roles";
import cookie from "react-cookies";
import styled from "styled-components";

const UsersTable = styled(Table)`
  & tbody tr .row-actions {
    display: none;
  }
  & tbody tr:hover .row-actions {
    display: flex;
  }
`;

export default () => {
  const currentUser = cookie.load("user");
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

  const {
    users,
    updated,
    getUsers,
    updateUser,
    toggleUpdateAlert,
  } = useUsers();
  const { roles } = useRoles();

  useEffect(() => {
    if (updated) {
      getUsers(params);
      setNewRole("");
      toggleUpdateAlert();
    }
  }, [updated]);

  useEffect(() => {
    getUsers(params);
  }, [params]);

  const [query, setQuery] = useState("");
  const [newRole, setNewRole] = useState("");
  const [action, setAction] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ row: { original } }) => (
          <Fragment>
            <p className="mb-0">{original.username}</p>
            <div className="row-actions flex-row align-items-center">
              <Link
                to={{
                  pathname: USER_EDIT,
                  state: {
                    user: original,
                  },
                }}
              >
                <small>Edit</small>
              </Link>
              {currentUser.id !== original.id && (
                <Fragment>
                  <span className="mx-2">{`|`}</span>
                  <Link
                    to={{
                      pathname: USER_DELETE,
                      state: {
                        user: original,
                      },
                    }}
                    className="text-danger"
                  >
                    <small>Delete</small>
                  </Link>
                </Fragment>
              )}
              {/* <Link>View</Link> */}
            </div>
          </Fragment>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({
          row: {
            original: { name },
          },
        }) => <small>{name}</small>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({
          row: {
            original: { email },
          },
        }) => (
          <a href={`mailto:${email}`}>
            <small>{email}</small>
          </a>
        ),
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({
          row: {
            original: { roles },
          },
        }) => (
          <p className="mb-0 text-capitalize">
            <small>{roles[0]}</small>
          </p>
        ),
      },
      {
        Header: "Posts",
        accessor: "posts",
        Cell: ({
          row: {
            original: { id, posts },
          },
        }) => (
          <Link to={`${POSTS}?author=${id}`}>
            <small>{posts}</small>
          </Link>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data: users,
    },
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <RowCheck {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <RowCheck {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );

  const applyAction = (e) => {
    e.preventDefault();

    switch (action) {
      case "delete":
        break;

      default:
        break;
    }
  };

  const changeRole = (e) => {
    e.preventDefault();
    if (newRole === "") {
      return;
    }

    // updateUser({
    //   id: user.id,
    //   first_name: user.first_name,
    //   last_name: user.last_name,
    //   nickname: user.nickname,
    //   name: user.display_name,
    //   email: user.email,
    //   url: user.url,
    //   description: user.description,
    //   roles: [newRole],
    //   locale: [user.locale],
    // });
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
              to={{
                pathname: USERS,
                search: `search=${query}`,
              }}
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
            <Button variant="outline-primary" size="sm" onClick={changeRole}>
              Change
            </Button>
          </Form>
        </div>

        <div>
          <p className="mb-0">
            <small>{`${users.length} items`}</small>
          </p>
        </div>
      </div>
      <UsersTable hover bordered borderless {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length === 0 && (
            <tr>
              <td colSpan={visibleColumns.length} className="text-center">
                <small>No users found.</small>
              </td>
            </tr>
          )}
          {rows.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <Fragment key={rowProps.key}>
                <tr {...rowProps}>
                  {row.cells.map(({ getCellProps, render }) => (
                    <td {...getCellProps()}>{render("Cell")}</td>
                  ))}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </UsersTable>
    </Fragment>
  );
};
