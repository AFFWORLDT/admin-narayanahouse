import axios from "axios";
import React, { useEffect, useState } from "react";
import "./../App.css";
import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Menu,
  Divider,
  NativeSelect,
  ListItemText,
} from "@mui/material";
import Table from "@mui/material/Table";
import Modal from "react-bootstrap/Modal";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import LinearProgress from "@mui/material/LinearProgress";
import { getResFromLocalStorage } from "../service/localstorage";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import PauseIcon from "@mui/icons-material/Pause";
import { fontWeight } from "@mui/system";
import toast, { Toaster } from "react-hot-toast";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TextField from "@mui/material/TextField";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import { Link, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import swal from "sweetalert";
const Students = () => {
  const [student, setStudent] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageData, setPageData] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const [filterdata, setFilterData] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [InstituteName, setInstituteName] = useState("");
  const [FathersName, setFathersName] = useState("");
  const [FathersOccupation, setFathersOccupation] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [MothersOccupation, setMothersOccupation] = useState("");
  const [LocalGuardianName, setLocalGuardianName] = useState("");
  const [LocalGuardianOccupation, setLocalGuardianOccupation] = useState("");
  const [RelationLocalguardian, setRelationLocalguardian] = useState("");
  const [PermanetAddress, setPermanetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [AddressBilding, setAddressBilding] = useState("");
  const [level, setLevel] = useState("");
  const [Id, setId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opendropdown = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handlePreviousPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    } else {
      setPageNo(1);
    }
  };

  const deleteStudentById = async (id) => {
    const response = await axios.delete(`${URL}/student/${id}`);
    if (response) {
      loadData();
      toast.success("student delete successfully");
    } else {
      toast.error(" error while deleting");
    }
  };

  const getStudents = async () => {
    setLoading(true);
    const url = `${URL}/student/?page=${pageNo}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setStudent(res?.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const url = process.env.REACT_APP_PROD_ADMIN_API;

  const [studentData, setStudentData] = useState([]);

  const loadData = async () => {
    try {
      const responce = await axios.get(`${url}/student/allocation-info`);
      setStudentData(responce?.data);
      console.log(studentData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getStudents();
    loadData();
  }, []);

  const updatestatus = async (data) => {
    const studentId = data?.student_id;
    const verified = data?.verified;
    const url = `${URL}/student/${studentId}/update-verification?verified=${
      verified === true ? 0 : 1
    }`;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.patch(url, config);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        getStudents();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (data) => {
    const {
      bio,
      city,
      email,
      fathers_name,
      fathers_occupation,
      institute_name,
      level,
      local_guardian_name,
      local_guardian_occupation,
      mother_name,
      mothers_occupation,
      name,
      permanent_address,
      relation_local_guardian,
      state,
      student_id,
      address_building,
    } = data;
    setBio(bio);
    setCity(city);
    setEmail(email);
    setFathersName(fathers_name);
    setFathersOccupation(fathers_occupation);
    setInstituteName(institute_name);
    setLevel(level);
    setLocalGuardianName(local_guardian_name);
    setRelationLocalguardian(relation_local_guardian);
    setMotherName(mother_name);
    setAddressBilding(address_building);
    setPermanetAddress(permanent_address);
    setState(state);
    setId(student_id);
    setMothersOccupation(mothers_occupation);
    setName(name);
    setLocalGuardianOccupation(local_guardian_occupation);
    handleShow();
  };

  const updatestudent = async () => {
    const data = {
      name: name,
      email: email,
      bio: bio,
      level: level,
      fathers_name: FathersName,
      mother_name: MotherName,
      fathers_occupation: FathersOccupation,
      mothers_occupation: MothersOccupation,
      local_guardian_name: LocalGuardianName,
      local_guardian_occupation: LocalGuardianOccupation,
      relation_local_guardian: RelationLocalguardian,
      state: state,
      city: city,
      address_building: AddressBilding,
      institute_name: InstituteName,
      permanent_address: PermanetAddress,
    };
    try {
      const url = `${URL}/student/${Id}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(url, data, config);

      if (res?.status === 200) {
        toast.success(res?.data?.message);
        getStudents();
        handleClose();
      }
    } catch (error) {
      console.error("Error Updating affiliate:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const filterData = studentData?.filter((student) => {
      if (
        !student ||
        (!student.name && !student.contact_no && !student.room_name)
      ) {
        return false;
      }

      if (!search || search === "") {
        return true;
      }

      const name = student.name?.toLowerCase() || "";
      const hostel = student.hostel_name
        ? student.hostel_name.toLowerCase()
        : "";
      const contactNo = student.contact_no
        ? student.contact_no.toLowerCase()
        : "";
      const roomName = student.room_name ? student.room_name.toLowerCase() : "";
      const query = search.toLowerCase();

      return (
        name.includes(query) ||
        hostel.includes(query) ||
        contactNo.includes(query) ||
        roomName.includes(query)
      );
    });
    setFilterData(filterData);
  }, [search, studentData]);

  useEffect(() => {
    const filterData = studentData?.filter((student) => {
      if (status === "all") {
        return student;
      }
      if (status === "pending") {
        return student?.verification_status === null;
      }
      if (status === "verify") {
        return student?.verification_status === true;
      }
      if (status === "reject") {
        return student?.verification_status === false;
      }
    });
    setFilterData(filterData);
  }, [status, studentData]);

  const sortedStudents = [...filterdata].sort((a, b) => {
    const dueDateA = new Date(a.payment_due_on);
    const dueDateB = new Date(b.payment_due_on);

    if (dueDateA < dueDateB) {
      return -1;
    } else if (dueDateA > dueDateB) {
      return 1;
    } else {
      return 0;
    }
  });
  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, filterdata?.length);
    const dataForPage = sortedStudents?.slice(startIndex, endIndex);
    setPageData(dataForPage);
  }, [page, rowsPerPage, filterdata]);

  const handleNavigate = (studentId) => {
    console.log("Navigating to student profile:", studentId);
    navigate(`/studentprofile/${studentId}`);
  };

  return (
    <div className=" h-100 main " style={{ backgroundColor: "#EEEEFF" }}>
      <p
        className="ms-5 pt-3 fs-5"
        style={{ fontWeight: "bold", color: "#384D6C" }}
      >
        Students
      </p>
      <div
        className="d-flex w-100 pb-4"
        style={{
          backgroundColor: "#EEEEFF",
          marginLeft: "0px",
          paddingTop: "25px",
        }}
      >
        <div className="w-100" style={{ position: "relative" }}>
          <input
            className="p-2 ms-4 ps-3 input-searchfield"
            style={{
              border: "2px solid black",
              borderRadius: "25px",
              color: "black",
              fontWeight: "bold",
            }}
            type="text"
            placeholder="Search"
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
          >
            <SearchIcon />
          </span>
        </div>
      </div>
      <div
        className="d-flex justify-content-between mb-3"
        style={{ backgroundColor: "#EEEEFF" }}
      ></div>
      {/* </div> */}

      <TableContainer
        component={Paper}
        style={{ color: "#384D6C", backgroundColor: "#EEEEFF" }}
      >
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <Table
              id="offers-table"
              sx={{ minWidth: 550 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ fontWeight: "bold" }}>
                  <TableCell
                    className="ms-5"
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
                      textAlign: "left",
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
                    RoomNo
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
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Payment due{" "}
                  </TableCell>
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Action
                  </TableCell>
                  <TableCell
                    style={{ color: "#384D6C", fontSize: "16px" }}
                    align="center"
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageData?.length > 0 ? (
                  <>
                    {pageData?.map((row, index) => (
                      <TableRow
                        key={row?.student_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          align="left"
                          style={{ color: "#384D6C", fontWeight: "bold" }}
                        >
                          {" "}
                          &nbsp; &nbsp; &nbsp;{page * rowsPerPage +
                            index +
                            1}{" "}
                          &nbsp; &nbsp; &nbsp;
                          <CropSquareIcon className="alignline" />
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#384D6C", fontWeight: "bold" }}
                        >
                          {" "}
                          <div className="d-flex">
                            <div
                              style={{
                                backgroundColor: "#D9D9D9",
                                height: "50px",
                                width: "46px",
                                borderRadius: "26px",
                                marginLeft: "0px",
                              }}
                            >
                              <img
                                style={{
                                  height: "40px",
                                  height: "50px",
                                  width: "46px",
                                  borderRadius: "26px",
                                }}
                                src={row.profile_image}
                                alt="pic"
                              />
                            </div>
                            <div className="ms-2 mt-1">
                              {row?.name}
                              <br />
                              <span style={{ color: "gray", fontSize: "12px" }}>
                                <LocalPhoneIcon
                                  sx={{ height: "13px", color: "#384D6C" }}
                                />
                                {row?.contact_no || "Not available"}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#384D6C", fontWeight: "bold" }}
                        >
                          {row?.bio === null
                            ? "N/A"
                            : row?.hostel_name || "Not available"}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ color: "#384D6C", fontWeight: "bold" }}
                        >
                          {row?.email === null
                            ? "N/A"
                            : row?.room_name || "Not available"}
                        </TableCell>
                        <TableCell align="center">
                          {row?.verification_status === false && (
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
                          {row?.verification_status === null && (
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
                          {row?.verification_status === true && (
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

                        <TableCell
                          align="center"
                          style={{ color: "#384D6C", fontWeight: "bold" }}
                        >
                          <Button
                            className="bg-primary px-3"
                            style={{ color: "white", borderRadius: "20px" }}
                          >
                            {row?.student_id === null
                              ? "N/A"
                              : new Date(
                                  row?.payment_due_on
                                ).toLocaleDateString("en-IN")}
                          </Button>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            color: "#384D6C",
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                        >
                          <Button
                            onClick={() => handleNavigate(row?.student_id)}
                            sx={{
                              border: "1.5px solid black",
                              padding: { xs: "5px 10px", md: "2px 10px" },
                              color: "#fff",
                              fontSize: { xs: "11px", md: "16px" },
                              bgcolor: "#384D6C",
                              width: { md: "150px", xs: "100px" },
                              borderRadius: "20px",
                              "&:hover": {
                                bgcolor: "#384D6C",
                              },
                            }}
                          >
                            View Profile
                          </Button>
                        </TableCell>

                        <TableCell
                          align="center"
                          style={{
                            color: "#384D6C",
                            fontSize: "25px",
                            cursor: "pointer",
                          }}
                        >
                          <Button
                            onClick={() => {
                              swal({
                                title: "Are you sure?",
                                text: "Once deleted, you will not be able to recover this record!",
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              }).then((willDelete) => {
                                if (willDelete) {
                                  deleteStudentById(row.student_id);
                                } else {
                                  swal("Your Record is safe");
                                }
                              });
                            }}
                            sx={{
                              border: "1.5px solid black",
                              padding: { xs: "5px 10px", md: "2px 10px" },
                              color: "#fff",
                              fontSize: { xs: "11px", md: "16px" },
                              bgcolor: "#ff4f42",
                              width: { md: "150px", xs: "100px" },
                              borderRadius: "20px",
                              "&:hover": {
                                bgcolor: "#ff4f42",
                              },
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
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
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={sortedStudents?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </TableContainer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="scroll-bar">
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={name}
                placeholder="Enter Name"
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                value={bio}
                placeholder="Enter Bio"
                onChange={(event) => setBio(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Email"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Father Name"
                variant="outlined"
                value={FathersName}
                onChange={(event) => setFathersName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Father occupation"
                variant="outlined"
                value={FathersOccupation}
                onChange={(event) => setFathersOccupation(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Mother Name"
                variant="outlined"
                value={MotherName}
                onChange={(event) => setMotherName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Mothers Occupation"
                variant="outlined"
                value={MothersOccupation}
                onChange={(event) => setMothersOccupation(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Institute Name"
                variant="outlined"
                value={InstituteName}
                onChange={(event) => setInstituteName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Local Guardian Name"
                variant="outlined"
                value={LocalGuardianName}
                onChange={(event) => setLocalGuardianName(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Local Guardian Occupation"
                variant="outlined"
                value={LocalGuardianOccupation}
                onChange={(event) =>
                  setLocalGuardianOccupation(event.target.value)
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Permanent Address"
                variant="outlined"
                value={PermanetAddress}
                onChange={(event) => setPermanetAddress(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter State"
                variant="outlined"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter city"
                variant="outlined"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Relation local guardian"
                variant="outlined"
                value={RelationLocalguardian}
                onChange={(event) =>
                  setRelationLocalguardian(event.target.value)
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Address building"
                variant="outlined"
                value={AddressBilding}
                onChange={(event) => setAddressBilding(event.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Select Level</InputLabel>
              <Select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                placeholder="Select Level"
              >
                <MenuItem value="silver">Silver</MenuItem>
                <MenuItem value="gold">Gold</MenuItem>
                <MenuItem value="diamond">Diamond</MenuItem>
              </Select>
            </FormControl>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="success"
            onClick={updatestudent}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster />
    </div>
  );
};

export default Students;
