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
const Dashboard = () => {
  const [Student, setStudent] = useState([]);
  const [hostel, setHostel] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [order, setOrder] = useState([]);
  const [filterStudent, setFilteredStudents] = useState([]);
  const [pendingStudent, setPendingStudent] = useState([]);
  const [rejectStudent,setRejectStudent]=useState([])
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
  useEffect(() => {
    const filterStudent = Student?.filter((obj) => {
      if (obj.verified === false) {
        return obj;
      }
    });
    setRejectStudent(filterStudent);
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
        toast.success("Approv SuccessFully");
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
            padding: "10px 5px",
          },
          [theme.breakpoints.up("md")]: {
            marginLeft: "265px",
            padding: "10px",
          },
          [theme.breakpoints.up("sm")]: {
            marginLeft: "265px",
            padding: "10px",
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
          <Box
            sx={{
              margin: { xs: "10px  80px", sm: "0" },
            }}
          >
            <Avatar
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
            minHeight: 400,
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
                    height: { xs: 500, lg: 240 },
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
                      Contact{" "}
                      <Box
                        component={"span"}
                        sx={{
                          marginLeft: "93px",
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
                  <Box component={"div"} sx={{ margin: "20px 80px" }}>
                    <Link to={`/studentprofile/${student_id}`}>
                      <button
                        style={{
                          width: "350px",
                          border: "1.5px solid black",
                          height: "35px",
                          borderRadius: "10px",
                          color: "#384D6C",
                          fontSize: "16px",
                          fontWeight: "bold",
                          background: "#fff",
                          margin: "10px 30px",
                          display: "block",
                        }}
                      >
                        View Student Profile
                      </button>
                    </Link>
                    <button
                      style={{
                        width: "350px",
                        border: "1.5px solid black",
                        height: "35px",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        background: "#FF0404",
                        margin: "10px 30px",
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
                        width: "350px",
                        border: "none",
                        height: "35px",
                        borderRadius: "none",
                        color: "#441B1B",
                        fontSize: "20px",
                        fontWeight: "bold",
                        background: "#fff",
                        margin: "10px 30px",
                        display: "block",
                        cursor: "default",
                      }}
                    >
                      Room Rent : ₹ {room_rent}/-{" "}
                    </button>
                    <button
                      style={{
                        width: "350px",
                        border: "1.5px solid black",
                        height: "35px",
                        borderRadius: "10px",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        background: "#384D6C",
                        margin: "10px 30px",
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
        <Box>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="">Profile</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Number</TableCell>
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
                          <TableCell>
                            <Avatar
                              src={obj?.profile_pic}
                              alt="Profile Pic"
                              sx={{ height: 50, width: 50 }}
                            />
                          </TableCell>
                          <TableCell align="center">{obj?.name}</TableCell>
                          <TableCell align="center">
                            {obj?.contact_no}
                          </TableCell>
                          <TableCell align="center">
                            <Link to={`/studentprofile/${obj.student_id}`}>
                              <Button variant="outlined">View Profile</Button>
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
        <Box>
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
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="">Profile</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Number</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rejectStudent?.length > 0 ? (
                  rejectStudent?.map((obj) => {
                    return (
                      <>
                        <TableRow
                          key={obj.student_id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>
                            <Avatar
                              src={obj?.profile_pic}
                              alt="Profile Pic"
                              sx={{ height: 50, width: 50 }}
                            />
                          </TableCell>
                          <TableCell align="center">{obj?.name}</TableCell>
                          <TableCell align="center">
                            {obj?.contact_no}
                          </TableCell>
                          <TableCell align="center">
                            <Link to={`/studentprofile/${obj.student_id}`}>
                              <Button variant="outlined">View Profile</Button>
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
           
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
