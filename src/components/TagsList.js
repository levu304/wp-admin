import { useEffect, useMemo, useCallback, Fragment } from "react";
import { useTags } from "../hooks/tags";
import { useTable, useRowSelect, useExpanded } from "react-table";
import { Button } from "react-bootstrap";
import TableActions from "./TableActions";
import { Link } from "react-router-dom";
import RowCheck from "./RowCheck";
import { CATEGORY_EDIT } from "../routes";
import FormActions from "./FormActions";

export default () => {
  const { tags, getTags } = useTags();

  useEffect(() => {
    getTags({ context: "edit" });
  }, []);

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
      data: tags,
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
          <p className="mb-0">
            <small>{`${tags.length} items`}</small>
          </p>
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
                <small>No tags found.</small>
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
      </TableActions>
    </Fragment>
  );
};
