import axios from "axios";
import React, { useEffect, useState } from "react";

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
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from "@mui/icons-material/Add";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import TextField from "@mui/material/TextField";
import CropSquareIcon from '@mui/icons-material/CropSquare';
const Students = () => {
  const [student, setStudent] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageData, setPageData] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;

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
      const responce = await axios.get(`${url}/student/allocation-info`)
      setStudentData(responce?.data)
      console.log(studentData)
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getStudents();
    loadData();
  }, []);

  useEffect(() => {
    getStudents();
  }, [pageNo]);
  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const dataForPage = student?.slice(
      startIndex,
      startIndex + rowsPerPage
    );
    setPageData(dataForPage);
  }, [page, rowsPerPage]);

  const slicePage = () => {
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, student.length);
    // Ensure pageData is always within bounds of affiliatedata
    const dataForPage = student.slice(startIndex, endIndex);
    setPageData(dataForPage);
  };

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const dataForPage = student?.slice(startIndex, startIndex + rowsPerPage);
    setPageData(dataForPage);
  }, [page, rowsPerPage]);

  const updatestatus = async (data) => {
    const studentId = data?.student_id;
    const verified = data?.verified;
    const url = `${URL}/student/${studentId}/update-verification?verified=${verified === true ? 0 : 1
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

  const handleDelete = async (Id) => {
    const url = `${URL}/student/${Id}`;
    try {
      const result = window.confirm("Are you sure to delete this user?");
      if (result) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.delete(url, config);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          getStudents();
        }
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

  return (
    <div className=" h-100 " style={{ marginLeft: "16%", backgroundColor: "#EEEEFF"}}>
      <p className="ms-5 pt-3 fs-5" style={{ fontWeight: "bold", color: "#384D6C" }}>Students</p>
      <div className="d-flex w-100 pb-4" style={{ backgroundColor: "#EEEEFF", marginLeft: "5px", paddingTop: "25px" }}>

        <div className="w-100" style={{ position: 'relative' }}>
          <input
            className="p-2 ms-4 w-25 ps-3"
            style={{ backgroundColor: "#EEEEFF", border: "2px solid black", borderRadius: "25px", color: "black", fontWeight: "bold" }}
            type="text"
            placeholder="Search"
          />
          <span style={{ position: 'absolute', top: '50%', right: '965px', transform: 'translateY(-50%)', color: '#888' }}><SearchIcon /></span>
        </div>

      </div>
      <div className="d-flex justify-content-between mb-3" style={{ backgroundColor: "#EEEEFF" }}>


      </div>
      {/* </div> */}

      <TableContainer component={Paper} style={{ color: "#384D6C", backgroundColor: "#EEEEFF" }}>

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
                <TableRow
                  sx={{ fontWeight: "bold" }}
                >
                  <TableCell className="ms-5" style={{ color: "#384D6C", fontSize: "16px" }} align="left"> &nbsp;  &nbsp; No.</TableCell>
                  <TableCell style={{ color: "#384D6C", fontSize: "16px", fontWeight: "bold", textAlign: "left" }} align="center">Name</TableCell>

                  <TableCell style={{ color: "#384D6C", fontSize: "16px" }} align="center">Hostel</TableCell>
                  <TableCell style={{ color: "#384D6C", fontSize: "16px" }} align="center">Room No</TableCell>
                  <TableCell style={{ color: "#384D6C", fontSize: "16px" }} align="center">Status</TableCell>
                  <TableCell style={{ color: "#384D6C", fontSize: "16px" }} align="center">Payment due on</TableCell>
                  <TableCell style={{ color: "#384D6C", fontSize: "16px" }} align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student?.length > 0 ? (
                  <>
                    {studentData?.map((row, index) => (
                      <TableRow
                        key={row?.affiliate_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left" style={{ color: "#384D6C", fontWeight: "bold" }}> &nbsp; &nbsp; &nbsp;{index + 1} &nbsp; &nbsp; &nbsp;<CropSquareIcon /></TableCell>
                        <TableCell align="center" style={{ color: "#384D6C", fontWeight: "bold" }}> <div className="d-flex"><div style={{ backgroundColor: '#D9D9D9', height: "50px", width: "46px", borderRadius: "26px", marginLeft: "0px" }}>
                          <img style={{ height: "40px", height: "50px", width: "46px", borderRadius: "26px" }} src={row.profile_image} alt="pic" /></div><div className="ms-2 mt-1">{row?.name}<br /><span style={{ color: 'gray', fontSize: '12px' }}><LocalPhoneIcon sx={{ height: "13px", color: "#384D6C" }} />{row?.contact_no}</span></div></div></TableCell>
                        <TableCell align="center" style={{ color: "#384D6C", fontWeight: "bold" }}>
                          {row?.bio === null ? "N/A" : row?.hostel_name}
                        </TableCell>
                        <TableCell align="center" style={{ color: "#384D6C", fontWeight: "bold" }}>
                          {row?.email === null ? "N/A" : row?.room_name}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color={row?.verification_status === true ? "warning" : "primary"}
                            onClick={() => {
                              updatestatus(row);
                            }}
                            style={{
                              height: "34px",
                              fontSize: "16px",
                              borderRadius: "25px",
                              backgroundColor: row?.verification_status === true ? "#C9D8FF" : "#CBFDB3",
                              color: row?.verification_status === true ? "#264C95" : "#248A00"
                            }}
                          >
                            {row?.verification_status === false ? (
                              <CloudDoneIcon />
                            ) : (
                              <PauseIcon />
                            )} &nbsp; {row?.verification_status === true ? "Pending" : "Verified"}
                          </Button>
                        </TableCell>

                        <TableCell align="center" style={{ color: "#384D6C", fontWeight: "bold" }}>
                          <Button className="bg-primary ps-3 pe-3" style={{ color: "white", borderRadius: "20px" }}>{row?.student_id === null ? "N/A" : new Date(row?.payment_due_on).toLocaleDateString('en-IN')}</Button>
                        </TableCell>
                        <TableCell align="center" style={{ color: "#384D6C", fontWeight: "bold", fontSize: "25px", cursor: "pointer" }}>

                          <IconButton

                            aria-label="open menu"
                            aria-controls="account-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            edge="end"
                            sx={{ ml: "auto" }}
                          >...</IconButton>
                          <Menu
                            onClick={handleCloses}
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={opendropdown}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            PaperProps={{
                              style: {
                                boxShadow: "none",
                              },
                            }}
                          >
                            <h6 style={{ textAlign: "center" }}>Take Action</h6>
                            <Divider />
                            <MenuItem sx={{ backgroundColor: "#FFC2C2", margin: "5px 10px", borderRadius: "25px" }}>Room Allocation</MenuItem>
                            <MenuItem sx={{ backgroundColor: "#FFC2C2", margin: "5px 10px", borderRadius: "25px" }} onClick={handleCloses}>&nbsp; View Payments</MenuItem>
                            <MenuItem sx={{ backgroundColor: "#FFC2C2", margin: "5px 10px", borderRadius: "25px", paddingLeft: "20px" }}> &nbsp; &nbsp; View Profile</MenuItem>
                          </Menu>



                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <h1>No Students Found</h1>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={student.length}
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
