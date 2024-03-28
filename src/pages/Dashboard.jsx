import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import logo from "./../assets/img/logonarayana.png";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Dashboard = () => {
  const [Student, setStudent] = useState([]);
  const [hostel, setHostel] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [order, setOrder] = useState([]);
  const [filterStudent, setFilteredStudents] = useState([]);
  const [pendingStudent, setPendingStudent] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageData, setPageData] = useState([]);

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
  const getHostal = async () => {
    const url = `${URL}/hostel/?page=${1}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setHostel(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getAllocationverification = async () => {
    const url = `${URL}/allocation/allocation_requests`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.get(url, config);
      setOrder(res?.data);
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    const filterStudent = order?.filter((obj) => {
      if (obj.allotted === null) {
        return obj;
      }
    });
    setFilteredStudents(filterStudent);
  }, [order]);

  useEffect(() => {
    getStudents();
    getHostal();
    getAllocationverification();
  }, []);

  useEffect(() => {
    const filterStudent = Student?.filter((obj) => {
      if (obj.verified === null) {
        return obj;
      }
    });
    setPendingStudent(filterStudent);
  }, [Student]);

  const handelDeny = async (id) => {
    const url = `${URL}/allocation/verify_allocation?order_id=${id}&transaction_verification_status=false&allotted=false`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(url, config);
      if (res?.status === 200) {
        toast.success("Deny SuccessFully");
        getAllocationverification();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handelApprov = async (id) => {
    const url = `${URL}/allocation/verify_allocation?order_id=${id}&transaction_verification_status=true&allotted=true`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(url, config);
      if (res?.status === 200) {
        toast.success("Approved Successfully");
        getAllocationverification();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, pendingStudent?.length);
    const dataForPage = pendingStudent?.slice(startIndex, endIndex);
    setPageData(dataForPage);
  }, [page, rowsPerPage, pendingStudent]);

  return (
    <>
      <Box
        bgcolor={"#EEEEFF"}
        sx={{
          [theme.breakpoints.up("xs")]: {
            marginLeft: "0px",
            padding: "20px 10px",
          },
          [theme.breakpoints.up("md")]: {
            marginLeft: "265px",
            padding: "25px 10px",
          },
          [theme.breakpoints.up("sm")]: {
            marginLeft: "265px",
            padding: "20px 10px",
          },
        }}
      >
        <Box>
          <p
            className="container"
            style={{ fontSize: "20px", fontWeight: "700", color: "#384D6C" }}
          >
            Welcome, Admin !
          </p>
        </Box>
        <Box
          component={"div"}
          sx={{
            bgcolor: "#fff",
            width: { xs: "95%", sm: "96%", lg: "98%" },
            height: { xs: 500, sm: 350, lg: 220 },
            borderRadius: "8px",
            margin: { xs: "0 10px", sm: "0 10px", lg: "0 10px" },
            padding: { xs: "10px 30px", sm: "10px 30px", lg: "0 30px" },
            display: "flex",
            justifyContent: {
              xs: "center",
              sm: "space-between",
              lg: "space-between",
            },
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              margin: { xs: "10px  80px", sm: "0" },
            }}
          >
            <Avatar
              className="d-block mx-auto"
              alt="Remy Sharp"
              src={logo}
              sx={{
                width: 150,
                height: 150,
                borderRadius: "10px",
                boxShadow: "6px 6px 10px 2px #ccc",
              }}
            />
          </Box>
          <Box sx={{ width: { sm: "100%", lg: 300 } }}>
            <Typography
              sx={{
                color: "#384D6C",
                fontSize: "20px",
                fontWeight: "bold",
                margin: "10px 0",
                textAlign: { xs: "center", lg: "justify" },
              }}
            >
              Welcome to your dashboard
            </Typography>
            <Typography
              sx={{
                textAlign: { xs: "center", lg: "justify" },
                color: "#384D6C",
                fontSize: "15px",
                width: { sm: "100%", lg: 300 },
              }}
            >
              This is NARAYANA HOUSE admin dashboard designed to reflect an
              overview of the most important events inside the panel.
            </Typography>
          </Box>

          <Box>
            <Typography
              color={"#384D6C"}
              fontWeight={"bold"}
              fontSize={"20px"}
              textAlign={""}
            >
              Total Hostels: {hostel.length}
            </Typography>

            <Typography
              color={"#384D6C"}
              fontWeight={"bold"}
              fontSize={"20px"}
              textAlign={""}
            >
              Total Students: {Student.length}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "98%",
            // minHeight: 400,
            background: "#fff",
            borderRadius: "8px",
            margin: { xs: "30px 5px", lg: "30px 10px", sm: "30px 10px" },
            padding: "10px 0px",
          }}
        >
          <Typography
            sx={{
              margin: "10px 30px",
              color: "#384D6C",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Pending Requests
            <Box
              component={"span"}
              sx={{
                margin: "0px 20px",
                bgcolor: "#B4CBF6",
                padding: "10px 15px",
                borderRadius: "50%",
              }}
            >
              {filterStudent.length}
            </Box>
          </Typography>
          <Divider
            sx={{
              width: "100%",
              height: 2,
              bgcolor: "#CFCDCD",
            }}
          />
          {filterStudent?.map((obj) => {
            const { hostel_name, room_name, order_id, student_id, room_rent } =
              obj;
            return (
              <>
                <Box
                  sx={{
                    width: { xs: "98%", lg: "97%", sm: "98%" },

                    border: "1px solid black",
                    margin: "20px auto",
                    borderRadius: "11px",
                    display: "flex",
                    justifyContent: { xs: "center", lg: "space-between" },
                    gap: "20px",
                    flexWrap: { xs: "wrap", lg: "nowrap" },
                  }}
                >
                  <Box
                    component={"div"}
                    sx={{
                      margin: "8px 30px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#989696",
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "15px 0",
                      }}
                    >
                      Student Name{" "}
                      <Box
                        component={"span"}
                        sx={{
                          marginLeft: "40px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {" "}
                        {Student?.map((obj) => {
                          if (obj.student_id === student_id) {
                            return obj.name;
                          }
                        })}{" "}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#989696",
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "15px 0",
                      }}
                    >
                      Contact no.{" "}
                      <Box
                        component={"span"}
                        sx={{
                          marginLeft: "60px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {" "}
                        {Student?.map((obj) => {
                          if (obj.student_id === student_id) {
                            return obj.contact_no;
                          }
                        })}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#989696",
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "15px 0",
                      }}
                    >
                      Hostel Name{" "}
                      <Box
                        component={"span"}
                        sx={{
                          marginLeft: "50px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {"         "}
                        {hostel_name}{" "}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#989696",
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "15px 0",
                      }}
                    >
                      Room No.{" "}
                      <Box
                        component={"span"}
                        sx={{
                          marginLeft: "76px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "500",
                        }}
                      >
                        {" "}
                        {room_name}{" "}
                      </Box>
                    </Typography>
                    <Typography
                      sx={{
                        color: "#989696",
                        fontSize: "18px",
                        fontWeight: "bold",
                        margin: "15px 0",
                      }}
                    >
                      Order ID/UTR
                      <Box
                        component={"span"}
                        sx={{
                          marginLeft: "45px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "500",
                          wordBreak: "break-all",
                        }}
                      >
                        {order_id}
                      </Box>
                    </Typography>
                  </Box>
                  <Box
                    component={"div"}
                    sx={{ margin: "20px 80px" }}
                    className="d-flex  justify-content-center gap-3 flex-column align-items-center"
                  >
                    <Link
                      to={`/studentprofile/${student_id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          width: "300px",
                          border: "1.5px solid #346feb",
                          borderRadius: "10px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "bold",
                          background: "#fff",
                          margin: "0px auto",
                          display: "block",
                          padding: "7px 0",
                        }}
                      >
                        View Student Profile
                      </button>
                    </Link>
                    <button
                      style={{
                        width: "300px",
                        border: "1.5px solid black",
                        padding: "7px 0",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        background: "#ff6b6b",
                        margin: "0px auto",
                        display: "block",
                      }}
                      onClick={() => {
                        handelDeny(order_id);
                      }}
                    >
                      Deny Room Allocation Request
                    </button>
                    <button
                      style={{
                        width: "300px",
                        border: "1.5px solid black",
                        padding: "7px 0",
                        borderRadius: "10px",
                        color: "#384D6C",
                        fontSize: "16px",
                        fontWeight: "bold",
                        background: "",
                        margin: "0px auto",
                        display: "block",
                      }}
                    >
                      Room Rent : ₹ {room_rent}/-{" "}
                    </button>
                    <button
                      style={{
                        width: "300px",
                        border: "1.5px solid black",
                        padding: "7px 0",
                        borderRadius: "10px",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "0px auto",
                        display: "block",
                        background: "#384D6C",
                        margin: "0px 30px",
                        display: "block",
                      }}
                      onClick={() => {
                        handelApprov(order_id);
                      }}
                    >
                      Approve Room Allocation Request
                    </button>
                  </Box>
                </Box>
              </>
            );
          })}
        </Box>

        <Toaster />
        <Box
          sx={{
            width: "98%",
            // minHeight: 400,
            background: "#fff",
            borderRadius: "8px",
            margin: { xs: "30px 5px", lg: "30px 10px", sm: "30px 10px" },
            padding: "10px 0px",
          }}
        >
          <p
            style={{
              margin: "10px 30px",
              color: "#384D6C",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Pending Profile Verification Requests{" "}
          </p>
          <Divider
            sx={{
              width: "100%",
              height: 2,
              bgcolor: "#CFCDCD",
            }}
          />
          <TableContainer
            component={Paper}
            sx={{
              width: "98%",
              minHeight: 200,
              background: "#fff",
              borderRadius: "8px",
              margin: {
                xs: "30px 5px",
                lg: "30px 10px",
                sm: "30px 10px",
              },
              padding: "10px 0px",
            }}
          >
            <Table sx={{ minWidth: 100 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Profile</TableCell>

                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData?.length > 0 ? (
                  pageData?.map((obj) => {
                    return (
                      <>
                        <TableRow
                          key={obj.student_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            align="center"
                            className="d-flex justify-content-start"
                            style={{ color: "#384D6C", fontWeight: "bold" }}
                          >
                            {" "}
                            <Box
                              className="d-flex"
                              sx={{ width: "200px", marginX: "auto" }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#D9D9D9",
                                  height: "40px",
                                  width: "40px",
                                  borderRadius: "26px",
                                }}
                              >
                                <img
                                  style={{
                                    height: "40px",
                                    width: "40px",
                                    borderRadius: "26px",
                                  }}
                                  src={`${
                                    obj.profile_image
                                      ? obj.profile_image
                                      : "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"
                                  }`}
                                  alt="pic"
                                />
                              </div>
                              <div className="ms-2 mt-1">
                                {obj?.name}
                                <br />
                                <span
                                  style={{ color: "gray", fontSize: "12px" }}
                                >
                                  <LocalPhoneIcon
                                    sx={{ height: "13px", color: "#384D6C" }}
                                  />
                                  {obj?.contact_no || "Not available"}
                                </span>
                              </div>
                            </Box>
                          </TableCell>

                          <TableCell align="center">
                            <Link to={`/studentprofile/${obj.student_id}`}>
                              <Button
                                variant="outlined"
                                sx={{ whiteSpace: "nowrap" }}
                              >
                                View Profile
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No Students Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={pageData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
