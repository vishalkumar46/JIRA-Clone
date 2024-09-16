import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import BasicButtonGroup from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { gettaskList, deleteTask } from "../app/taskSlice";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("desc");
  const { rows, columns, isLoading } = useSelector((state) => state.task);
  const [tableData, setTableData] = useState(rows);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gettaskList());
    setTableData(rows);
  }, [rows]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (sortField, sortOrder) => {
    if (sortField) {
      const sorted = [...tableData].sort((a, b) => {
        if (a[sortField] === null) return 1;
        if (b[sortField] === null) return -1;
        if (a[sortField] === null && b[sortField] === null) return 0;
        if (sortOrder === "asc") {
          return a[sortField] < b[sortField]
            ? -1
            : a[sortField] > b[sortField]
            ? 1
            : 0;
        } else {
          return b[sortField] < a[sortField]
            ? -1
            : b[sortField] > a[sortField]
            ? 1
            : 0;
        }
      });

      setTableData(sorted);
      setOrder((preVal) => (preVal === "desc" ? "asc" : "desc"));
    }
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(property, order);
  };

  const editHandler = (taskID) => {
    navigate(`task/edit/${taskID}`);
  };

  const deleteHandler = (taskID) => {
    dispatch(deleteTask({ taskID }));
  };
  if (isLoading) return <h2>Loading Task....</h2>;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column, i) => (
                <TableCell
                  key={`${column.id}-${i}`}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sortDirection={column.isSorting ? order : false}
                >
                  <TableSortLabel
                    active={column.isSorting}
                    direction={column.isSorting ? order : "asc"}
                    onClick={createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover tabIndex={-1} key={row["task"]}>
                    {columns?.map((column, i) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          width={column.minWidth}
                          key={`${column.id}-${i}`}
                          align={column.align}
                        >
                          {column.id === "action" ? (
                            <BasicButtonGroup
                              deleteHandler={() => deleteHandler(row["task"])}
                              editHandler={() => editHandler(row["task"])}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
