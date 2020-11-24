import { useEffect, useState, useMemo, useCallback, Fragment } from "react";
import { useCategories } from "../hooks/categories";
import { useTable, useRowSelect, useExpanded } from "react-table";
import { Button } from "react-bootstrap";
import TableActions from "./TableActions";
import { Link, useLocation } from "react-router-dom";
import RowCheck from "./RowCheck";
import { CATEGORY_EDIT } from "../routes";
import FormActions from "./FormActions";
import Pagination from "./Pagination";
import { paramsToObject } from "../common";
import TableCell from "./TableCell";

export default () => {
  const { search } = useLocation();
  const defaultParams = { context: "edit", taxonomy: "category", per_page: 10 };
  const params = useMemo(
    () =>
      search !== ""
        ? { ...defaultParams, ...paramsToObject(search) }
        : defaultParams,
    [search]
  );
  const { categories, getCatetories } = useCategories();
  const [page, setPage] = useState(1);

  useEffect(() => {
    getCatetories({ ...params, page });
  }, [page]);

  useEffect(() => {
    setPage(1);
    getCatetories({ ...params, page: 1 });
  }, [params]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
        Cell: ({
          rows,
          row: { id, original, getToggleRowExpandedProps },
          toggleRowExpanded,
        }) => (
          <Fragment>
            <p className="mb-0"></p>
            <Link
              to={{
                pathname: CATEGORY_EDIT,
                state: {
                  category: original,
                },
              }}
            >
              <small className="font-weight-bold">{original.name}</small>
            </Link>
            <div className="row-actions flex-row align-items-center">
              <Link
                to={{
                  pathname: CATEGORY_EDIT,
                  state: {
                    category: original,
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
              {/* <Link>View</Link> */}
            </div>
          </Fragment>
        ),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({
          row: {
            original: { description },
          },
        }) => <small>{description}</small>,
      },
      {
        Header: "Slug",
        accessor: "slug",
        Cell: ({
          row: {
            original: { slug },
          },
        }) => <small>{slug}</small>,
      },
      {
        Header: "Count",
        accessor: "count",
        Cell: ({
          row: {
            original: { count },
          },
        }) => <small>{count}</small>,
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
      data: categories,
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

  const applyAction = useCallback((value) => {
    switch (value) {
      case "delete":
        break;

      default:
        break;
    }
  }, []);

  return (
    <Fragment>
      <div className="mb-3 d-flex flex-row align-items-center justify-content-between">
        <FormActions
          inline
          actions={[
            {
              value: "delete",
              name: "Delete",
            },
          ]}
          className="mr-3"
          apply={applyAction}
        />

        <div>
          <p className="mb-0 d-inline-block">
            <small>{`${categories.length} items`}</small>
          </p>

          <Pagination
            className="d-inline-flex ml-2 mb-0"
            page={page}
            disabledPrev={page === 1}
            disabledNext={categories.length === 0 || categories.length < 10}
            prev={useCallback((e) => setPage(page - 1), [page])}
            next={useCallback((e) => setPage(page + 1), [page])}
          />
        </div>
      </div>
      <TableActions {...getTableProps()}>
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
                <small>No categories found.</small>
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
                    <td {...getCellProps()}>
                      <TableCell>{render("Cell")}</TableCell>
                    </td>
                  ))}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </TableActions>
    </Fragment>
  );
};
