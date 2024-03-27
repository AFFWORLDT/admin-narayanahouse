import {
  Box,
  Button,
  FormControl,
  LinearProgress,
  ListItemText,
  NativeSelect,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import PauseIcon from "@mui/icons-material/Pause";

function RoomAllocationHistory() {
  const theme = useTheme();
  const [RoomAllocationHistory, setRoomAllocationHistory] = useState([]);
  const [student, setStudent] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const getRoomAllocationHistory = async () => {
    const url = `${URL}/allocation/allocation_requests`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get(url, config);
      setRoomAllocationHistory(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getStudents = async () => {
    const url = `${URL}/student/?page=${1}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setStudent(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getRoomAllocationHistory();
    getStudents();
  }, []);

  useEffect(() => {
    const filterData = RoomAllocationHistory?.filter((room) => {
      if (!room || (!room.order_id && !room.room_name)) {
        return false;
      }

      if (!search || search === "") {
        return true;
      }
      const hostel = room.hostel_name ? room.hostel_name.toLowerCase() : "";
      const Order = room.order_id ? room.order_id.toLowerCase() : "";
      const roomName = room.room_name ? room.room_name.toLowerCase() : "";
      const query = search.toLowerCase();

      return (
        hostel.includes(query) ||
        Order.includes(query) ||
        roomName.includes(query)
      );
    });
    setFilterData(filterData);
  }, [search, RoomAllocationHistory]);

  useEffect(() => {
    const filterData = RoomAllocationHistory?.filter((room) => {
      if (status === "all") {
        return RoomAllocationHistory;
      }
      if (status === "pending") {
        return room?.allotted === null;
      }
      if (status === "verify") {
        return room?.allotted === true;
      }
      if (status === "reject") {
        return room?.allotted === false;
      }
    });
    setFilterData(filterData);
  }, [status, RoomAllocationHistory]);

  const sortData = [...filterData].sort((a, b) => {
    const dueDateA = new Date(a.allocation_request_at);
    const dueDateB = new Date(b.allocation_request_at);

    if (dueDateA < dueDateB) {
      return -1;
    } else if (dueDateA > dueDateB) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <Box bgcolor={"#EEEEFF"} minHeight={"100vh"}>
      <Box
        sx={{
          [theme.breakpoints.up("xs")]: {
            marginLeft: "0px",
            padding: "10px 0px",
          },
          [theme.breakpoints.up("md")]: {
            marginLeft: "265px",
            padding: "10px 10px",
          },
        }}
      >
        <p
          className="container mt-3"
          style={{ fontSize: "20px", fontWeight: "700", color: "#384D6C" }}
        >
          Room Allocation History
        </p>

        <div
          className="d-flex w-100 pb-4"
          style={{
            backgroundColor: "#EEEEFF",
            marginLeft: "0px",
            paddingTop: "10px",
          }}
        >
          <div className="w-100" style={{ position: "relative" }}>
            <input
              className="p-2 ms-1 ps-3 input-searchfield"
              style={{
                border: "2px solid black",
                borderRadius: "25px",
                color: "black",
                fontWeight: "bold",
              }}
              type="text"
              placeholder="Enter Order Id"
              onChange={(e) => setSearch(e.target.value)}
            />
            <span
              className="serchicon"
              style={{
                position: "absolute",
                top: "50%",
                right: "965px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            ></span>
          </div>
        </div>
        <div style={{ backgroundColor: "#EEEEFF" }}></div>
        {/* </div> */}

        <TableContainer
          component={Paper}
          style={{ color: "#384D6C", backgroundColor: "#EEEEFF" }}
        >
          <>
            <Table
              id="offers-table"
              sx={{ minWidth: 550 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ fontWeight: "bold" }}>
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="left"
                  >
                    {" "}
                    &nbsp; &nbsp; No.
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#384D6C",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                    align="center"
                  >
                    Name
                  </TableCell>

                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Hostel
                  </TableCell>
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Room Rent
                  </TableCell>

                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Order ID/UTR{" "}
                  </TableCell>
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Allocation Req at
                  </TableCell>
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    <FormControl>
                      <NativeSelect
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                        align="center"
                      >
                        <option
                          value={"all"}
                          style={{ color: "#384D6C", fontSize: "16px" }}
                          align="center"
                        >
                          All
                        </option>
                        <option
                          value={"pending"}
                          style={{ color: "#384D6C", fontSize: "16px" }}
                          align="center"
                        >
                          Pending
                        </option>
                        <option
                          value={"verify"}
                          style={{ color: "#384D6C", fontSize: "16px" }}
                          align="center"
                        >
                          Verified
                        </option>
                        <option
                          value={"reject"}
                          style={{ color: "#384D6C", fontSize: "16px" }}
                          align="center"
                        >
                          Rejected
                        </option>
                      </NativeSelect>
                    </FormControl>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortData?.map((obj, i) => {
                  const {
                    allocation_request_at,
                    allotted,
                    hostel_name,
                    order_id,
                    payment_due_on,
                    room_id,
                    room_name,
                    room_rent,
                    student_id,
                  } = obj;
                  return (
                    <>
                      <TableRow key={room_id}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="center">
                          {student?.map((obj) => {
                            if (obj?.student_id === student_id) {
                              if (obj?.name) {
                                return obj.name;
                              }
                            }
                          })}
                        </TableCell>
                        <TableCell align="center">
                          {hostel_name}
                          <br />
                          <span style={{ color: "gray", fontSize: "12px" }}>
                            {room_name || "Not available"}
                          </span>
                        </TableCell>
                        <TableCell align="center">{room_rent}</TableCell>
                        <TableCell align="center">{order_id}</TableCell>
                        <TableCell align="center">
                          {new Date(allocation_request_at).toLocaleDateString(
                            "en-IN"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {allotted === false && (
                            <Button
                              variant="contained"
                              style={{
                                height: "34px",
                                width: "140px",
                                fontSize: "16px",
                                borderRadius: "25px",
                                backgroundColor: "red",
                              }}
                            >
                              <CancelIcon /> <ListItemText>Reject</ListItemText>
                            </Button>
                          )}
                          {allotted === null && (
                            <Button
                              variant="contained"
                              style={{
                                height: "34px",
                                width: "140px",
                                fontSize: "16px",
                                borderRadius: "25px",
                                backgroundColor: "#F7B946",
                              }}
                            >
                              <PauseIcon />{" "}
                              <ListItemText> Pending</ListItemText>
                            </Button>
                          )}
                          {allotted === true && (
                            <Button
                              variant="contained"
                              style={{
                                height: "34px",
                                width: "140px",
                                fontSize: "16px",
                                borderRadius: "25px",
                                background: "#CBFDB3",
                                color: "green",
                                fontWeight: "bold",
                              }}
                            >
                              <CloudDoneIcon sx={{ fill: "green" }} />{" "}
                              <ListItemText> Verified</ListItemText>
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={""}
              rowsPerPage={""}
              page={""}
              onPageChange={""}
              onRowsPerPageChange={""}
            />
          </>
        </TableContainer>
        <Toaster />
      </Box>
    </Box>
  );
}

export default RoomAllocationHistory;
