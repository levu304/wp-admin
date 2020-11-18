import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  Fragment,
} from "react";
import { usePosts } from "../hooks/posts";
import { Link, useLocation } from "react-router-dom";
import { paramsToObject, toCapitalize } from "../common";
import { useTable, useExpanded, useRowSelect } from "react-table";
import { Table, Button } from "react-bootstrap";
import { FaCommentAlt } from "react-icons/fa";
import { POSTS, POST_EDIT } from "../routes";
import { format } from "date-fns";
import styled from "styled-components";
import RowCheck from "./RowCheck";
import QuickEditPost from "./QuickEditPost";
import { useCategories } from "../hooks/categories";

const PostsTable = styled(Table)`
  & tbody tr .row-actions {
    display: none;
  }
  & tbody tr:hover .row-actions {
    display: flex;
  }
`;

export default () => {
  const { search } = useLocation();
  const defaultParams = { context: "edit", post_type: "post" };
  const [offset, setOffset] = useState(1);

  const params = useMemo(
    () =>
      search !== ""
        ? { ...defaultParams, ...paramsToObject(search), offset }
        : { ...defaultParams, offset },
    [search]
  );
  const { posts, getPosts, getAuthors, getPostStatuses } = usePosts();
  const { getCatetories } = useCategories();

  useEffect(() => {
    getCatetories({ context: "edit", per_page: 100 });
    getAuthors();
    getPostStatuses();
  }, []);

  useEffect(() => {
    getPosts(params);
  }, [params]);

  const [query, setQuery] = useState("");

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({
          row: {
            original: { title },
            index,
            getToggleRowExpandedProps,
          },
        }) => (
          <Fragment>
            <Link
              to={{
                pathname: POST_EDIT,
                state: {
                  post: posts[index],
                },
              }}
            >
              <small className="font-weight-bold">{title}</small>
            </Link>
            <div className="row-actions flex-row align-items-center">
              <Link
                to={{
                  pathname: POST_EDIT,
                  state: {
                    post: posts[index],
                  },
                }}
              >
                <small>Edit</small>
              </Link>
              <span className="mx-2">{`|`}</span>
              <Button
                variant="link"
                className="px-0"
                {...getToggleRowExpandedProps()}
              >
                <small>Quick Edit</small>
              </Button>
              <span className="mx-2">{`|`}</span>
              <Button variant="link" className="text-danger px-0">
                <small>Trash</small>
              </Button>
              {/* <span className="mx-2">{`|`}</span>
                <Link
                  to={{
                    pathname: USER_DELETE,
                    state: {
                      user: users[index],
                    },
                  }}
                  className="text-danger"
                >
                  <small>Delete</small>
                </Link> */}
            </div>
          </Fragment>
        ),
      },
      {
        Header: "Author",
        accessor: "author",
        Cell: ({
          row: {
            original: {
              author: { display_name, id },
            },
          },
        }) => (
          <Link
            to={{
              pathname: POSTS,
              search: `?author=${id}`,
            }}
          >
            <small>{display_name}</small>
          </Link>
        ),
      },
      {
        Header: "Categories",
        accessor: "categories",
        Cell: ({
          row: {
            original: { categories },
          },
        }) => (
          <Fragment>
            {categories.map(({ name, cat_ID }, index) => (
              <Fragment key={index}>
                <Link
                  to={{
                    pathname: POSTS,
                    search: `?categories[]=${cat_ID}`,
                  }}
                >
                  <small>{name}</small>
                </Link>
                {index !== categories.length - 1 &&
                  categories.length !== 1 &&
                  ", "}
              </Fragment>
            ))}
          </Fragment>
        ),
      },
      {
        Header: "Tags",
        accessor: "tags",
        Cell: ({
          row: {
            original: { tags },
          },
        }) => (
          <Fragment>
            {tags &&
              tags.map(({ name, term_id }, index) => (
                <Fragment key={index}>
                  <Link
                    to={{
                      pathname: POSTS,
                      search: `?tags[]=${term_id}`,
                    }}
                  >
                    <small>{name}</small>
                  </Link>
                  {index !== tags.length - 1 && tags.length !== 1 && ", "}
                </Fragment>
              ))}
          </Fragment>
        ),
      },
      {
        Header: () => <FaCommentAlt />,
        id: "comments",
        Cell: ({ row }) => {
          // console.log(row);
          return null;
        },
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({
          row: {
            original: { date, status },
          },
        }) => (
          <small>
            <span title={format(new Date(date), "yyyy/MM/dd")}>
              {toCapitalize(status)}
              <br />
              {format(new Date(date), "yyyy/MM/dd")}
            </span>
          </small>
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
      data: posts,
    },
    useExpanded,
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

  const renderRow = useCallback(
    ({ getRowProps, cells }) => (
      <tr {...getRowProps()}>
        {cells.map(({ getCellProps, render }) => {
          return <td {...getCellProps()}>{render("Cell")}</td>;
        })}
      </tr>
    ),
    []
  );

  return (
    <Fragment>
      <PostsTable striped bordered {...getTableProps()}>
        <thead>
          {headerGroups.map(({ getHeaderGroupProps, headers }) => (
            <tr {...getHeaderGroupProps()}>
              {headers.map(({ getHeaderProps, render }) => (
                <th {...getHeaderProps()}>{render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              <Fragment key={rowProps.key}>
                {row.isExpanded ? (
                  <QuickEditPost
                    row={row}
                    rowProps={rowProps}
                    visibleColumns={visibleColumns}
                    onCancel={(e) => row.toggleRowExpanded()}
                  />
                ) : (
                  renderRow(row)
                )}
              </Fragment>
            );
          })}
        </tbody>
      </PostsTable>
    </Fragment>
  );
};
