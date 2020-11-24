import { useMemo, useState, useEffect, useCallback, Fragment } from "react";
import { usePosts } from "../hooks/posts";
import { Link, useLocation, useHistory } from "react-router-dom";
import { paramsToObject, toCapitalize } from "../common";
import { useTable, useExpanded, useRowSelect } from "react-table";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaCommentAlt } from "react-icons/fa";
import { POSTS, POST_EDIT } from "../routes";
import { format } from "date-fns";
import styled from "styled-components";
import RowCheck from "./RowCheck";
import QuickEditPost from "./QuickEditPost";
import { useCategories } from "../hooks/categories";
import CommentBadge from "./CommentBadge";
import { load } from "react-cookies";
import PostsFilter from "./PostsFilter";
import TableActions from "./TableActions";
import FormActions from "./FormActions";
import Pagination from "./Pagination";
import BulkEditPosts from "./BulkEditPosts";
import TableCell from "./TableCell";

const PostsTable = styled(TableActions)`
  & td:nth-child(1) {
    width: 2%;
  }
  & td:nth-child(3) {
    width: 8%;
  }
  & td:nth-child(4),
  & td:nth-child(5) {
    width: 18%;
  }
`;

export default () => {
  const { search } = useLocation();
  const { push } = useHistory();

  const defaultParams = { context: "edit", post_type: "post", per_page: 10 };
  const [page, setPage] = useState(1);
  const user = load("user");

  const params = useMemo(
    () =>
      search !== ""
        ? { ...defaultParams, ...paramsToObject(search) }
        : { ...defaultParams },
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
    getPosts({ ...params, page });
  }, [page]);

  useEffect(() => {
    setPage(1);
    getPosts({ ...params, page: 1 });
  }, [params]);

  const [query, setQuery] = useState("");
  const [isBulkEdit, setIsBulkEdit] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({
          rows,
          row: { id, original, getToggleRowExpandedProps },
          toggleRowExpanded,
        }) => (
          <Fragment>
            <Link
              to={{
                pathname: POST_EDIT,
                state: {
                  post: original,
                },
              }}
            >
              <small className="font-weight-bold">{original.title}</small>
            </Link>
            <div className="row-actions flex-row align-items-center">
              <Link
                to={{
                  pathname: POST_EDIT,
                  state: {
                    post: original,
                  },
                }}
              >
                <small>Edit</small>
              </Link>
              <span className="mx-2">{`|`}</span>
              <Button
                variant="link"
                className="p-0"
                {...getToggleRowExpandedProps({
                  onClick: () => {
                    setIsBulkEdit(false);
                    const expandedRow = rows.find((row) => row.isExpanded);
                    if (typeof expandedRow !== "undefined") {
                      toggleRowExpanded(expandedRow.id, false);
                    }
                    toggleRowExpanded(id, true);
                  },
                })}
              >
                <small>Quick Edit</small>
              </Button>
              <span className="mx-2">{`|`}</span>
              <Button variant="link" className="text-danger p-0">
                <small>Trash</small>
              </Button>
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
        Cell: ({
          row: {
            original: { comments },
          },
        }) =>
          comments.length !== 0 ? (
            <CommentBadge>{comments.length}</CommentBadge>
          ) : (
            <span aria-hidden="true">—</span>
          ),
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
    toggleRowSelected,
    toggleRowExpanded,
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

  const applyAction = useCallback(
    (value) => {
      if (selectedFlatRows.length === 0) return;
      switch (value) {
        case "delete":
          break;
        case "edit":
          const expandedRow = rows.find((row) => row.isExpanded);
          if (typeof expandedRow !== "undefined") {
            toggleRowExpanded(expandedRow.id, false);
          }
          setIsBulkEdit(true);
          break;
        default:
          break;
      }
    },
    [isBulkEdit, selectedFlatRows]
  );

  const onCancelBulkEdit = useCallback((e) => setIsBulkEdit(false), [
    isBulkEdit,
  ]);

  const onRemoveBulkEdit = useCallback((id) => toggleRowSelected(id), []);

  const onFilter = useCallback((category, { before, after }) => {
    setIsBulkEdit(false);
    const expandedRow = rows.find((row) => row.isExpanded);
    if (typeof expandedRow !== "undefined") {
      toggleRowExpanded(expandedRow.id, false);
    }
    if (category === "") {
      push({
        pathname: POSTS,
        search: `before=${before}&after=${after}`,
      });
      return;
    }
    push({
      pathname: POSTS,
      search: `before=${before}&after=${after}&categories[]=${category}`,
    });
  }, []);

  const renderRow = useCallback(
    ({ getRowProps, cells }) => (
      <tr {...getRowProps()}>
        {cells.map(({ getCellProps, render }) => (
          <td {...getCellProps()}>
            <TableCell>{render("Cell")}</TableCell>
          </td>
        ))}
      </tr>
    ),
    []
  );

  return (
    <Fragment>
      <div className="my-2 d-flex flex-row align-items-center justify-content-between">
        <div>
          <Link to={POSTS}>
            <small>All</small>
          </Link>
          <span className="mx-2">{" | "}</span>
          <Link
            to={{
              pathname: POSTS,
              search: `author=${user.id}`,
            }}
          >
            <small>Mine</small>
          </Link>
          <span className="mx-2">{" | "}</span>
          <Link
            to={{
              pathname: POSTS,
              search: `status=publish`,
            }}
          >
            <small>Published</small>
          </Link>
          <span className="mx-2">{" | "}</span>
          <Link
            to={{
              pathname: POSTS,
              search: `sticky=true`,
            }}
          >
            <small>Sticky</small>
          </Link>
          <span className="mx-2">{" | "}</span>
          <Link
            to={{
              pathname: POSTS,
              search: `status=private`,
            }}
          >
            <small>Private</small>
          </Link>
        </div>
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
                pathname: POSTS,
                search: `search=${query}`,
              }}
              variant="outline-primary"
              size="sm"
            >
              Search Posts
            </Button>
          </Form>
        </div>
      </div>
      <div className="my-3 d-flex flex-row align-items-center justify-content-between">
        <div className="d-flex flex-row">
          <FormActions
            inline
            actions={[
              {
                value: "edit",
                name: "Edit",
              },
              {
                value: "trash",
                name: "Move To Trash",
              },
            ]}
            className="mr-3"
            apply={applyAction}
          />
          <PostsFilter onFilter={onFilter} />
        </div>

        <div>
          <p className="mb-0 d-inline-block">
            <small>{`${posts.length} items`}</small>
          </p>

          <Pagination
            className="d-inline-flex ml-2 mb-0"
            page={page}
            disabledPrev={page === 1}
            disabledNext={posts.length === 0 || posts.length < 10}
            prev={useCallback((e) => setPage(page - 1), [page])}
            next={useCallback((e) => setPage(page + 1), [page])}
          />
        </div>
      </div>
      <PostsTable {...getTableProps()}>
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
          {rows.length === 0 && (
            <tr>
              <td colSpan={visibleColumns.length} className="text-center">
                <small>No posts found.</small>
              </td>
            </tr>
          )}
          {isBulkEdit && (
            <BulkEditPosts
              rows={selectedFlatRows}
              columns={visibleColumns.length}
              onCancel={onCancelBulkEdit}
              onRemove={onRemoveBulkEdit}
            />
          )}
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
                    onCancel={(e) => {
                      row.toggleRowExpanded();
                      getPosts(params);
                    }}
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
