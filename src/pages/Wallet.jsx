import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import PauseIcon from "@mui/icons-material/Pause";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import { Button, LinearProgress } from "@mui/material";

const Wallet = () => {
  const [transactionData, setTransactionData] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageData, setPageData] = useState([]);

  const walletTransaction = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = `${URL}/wallet/admin/balance-queries?api_key=${API_KEY}`;
      const res = await axios.get(url, config);
      // console.log("This is response balance Queries", res?.data);
      setTransactionData(res?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Tarnsaction:", error);
      toast.error("Error fetching Tarnsaction:");
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateTransactionStatus = async (data) => {
    try {
      const order_id = data?.order_id;
      const status = data?.verified;
      const url = `${URL}/wallet/admin/update-verification/${order_id}?verified=${
        status === "True" ? 0 : 1
      }&api_key=${API_KEY}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(url, config);
      console.log("This is response balance Queries", res);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        walletTransaction();
      }
    } catch (error) {
      console.error("Error Updating Tarnsaction Status:", error);
      toast.error("Error Updating Tarnsaction Status:");
    }
  };

  useEffect(() => {
    walletTransaction();
  }, []);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const dataForPage = transactionData?.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setPageData(dataForPage);
  }, [page, rowsPerPage, transactionData]);

  return (
    <>
      <div>
        <h1 className="text-center">All Transaction Queries </h1>

        <div style={{ marginLeft: "268px" }}>
          {loading ? (
            <>
              <LinearProgress />
            </>
          ) : (
            <>
              <TableContainer component={Paper}>
                <Table
                  id="offers-table"
                  sx={{ minWidth: 650 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Student Name</TableCell>
                      <TableCell align="center">Amount</TableCell>
                      <TableCell align="center">Order Id</TableCell>
                      <TableCell align="center">Verified</TableCell>
                      <TableCell align="center">Remarks</TableCell>

                      <TableCell align="center">Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pageData?.length > 0 ? (
                      pageData.map((row) => (
                        <TableRow
                          key={row.student_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="td" scope="row">
                            {row.student_name}
                          </TableCell>
                          <TableCell align="center">₹{row?.amount}</TableCell>

                          <TableCell align="center">{row?.order_id}</TableCell>

                          <TableCell align="center">
                            {row?.verified === "True" ? (
                              <CloudDoneIcon sx={{ color: "green" }} />
                            ) : (
                              <PauseIcon sx={{ color: "red" }} />
                            )}
                          </TableCell>

                          <TableCell align="center">
                            <Button
                              variant="contained"
                              color={
                                row?.verified === "True" ? "warning" : "success"
                              }
                              onClick={() => updateTransactionStatus(row)}
                            >
                              {" "}
                              {row?.verified === "True"
                                ? "Pending"
                                : "Approve"}{" "}
                            </Button>
                          </TableCell>
                          <TableCell align="center">
                            {new Date(row.timestamp).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <h3>No Transactions Available!!</h3>
                    )}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={transactionData?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </>
          )}
        </div>

        <Toaster />
      </div>
    </>
  );
};

export default Wallet;
