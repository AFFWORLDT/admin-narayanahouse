import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

import AddIcon from "@mui/icons-material/Add";

import TextField from "@mui/material/TextField";
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

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    getStudents();
  }, [pageNo]);

  useEffect(() => {
    const startIndex = page * rowsPerPage;
    const dataForPage = student?.slice(startIndex, startIndex + rowsPerPage);
    setPageData(dataForPage);
  }, [page, rowsPerPage]);

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

  const handleDelete = async (Id) => {
    const url = `${URL}/student/${Id}`;
    try {
      const result = window.confirm("Are you sure to delete this user?");
      if (result) {
        const response = await axios.delete(url);
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
    <div className=" h-100 p-3 " style={{ marginLeft: "2%" }}>
      <h2 className="text-center">All Students </h2>
      <div className="d-flex justify-content-end">
        <h4 className="text-center ">Page No : {pageNo}</h4>
      </div>
      <div className="d-flex justify-content-between mb-3 ">
        <Button
          variant="contained"
          sx={{ marginBottom: "10px" }}
          onClick={handlePreviousPage}
          color="error"
        >
          Previous Page{" "}
        </Button>
        <Button
          variant="contained"
          onClick={() => setPageNo(pageNo + 1)}
          color="success"
        >
          Next Page
        </Button>
      </div>
      {/* </div> */}

      <TableContainer component={Paper}>
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
                  sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}
                >
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Bio</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Students_id</TableCell>
                  <TableCell align="center">Level</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Verified</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student?.length > 0 ? (
                  <>
                    {student?.map((row, index) => (
                      <TableRow
                        key={row?.affiliate_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          {row?.bio === null ? "N/A" : row?.bio}
                        </TableCell>
                        <TableCell align="center">
                          {row?.email === null ? "N/A" : row?.email}
                        </TableCell>
                        <TableCell align="center">
                          {row?.student_id === null ? "N/A" : row?.student_id}
                        </TableCell>
                        <TableCell align="center">
                          {row?.level === null ? "N/A" : row?.level}
                        </TableCell>
                        <TableCell align="center">
                          {row?.verified === true ? (
                            <CloudDoneIcon sx={{ color: "green" }} />
                          ) : (
                            <PauseIcon sx={{ color: "red" }} />
                          )}
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color={
                              row?.verified === true ? "warning" : "success"
                            }
                            onClick={() => {
                              updatestatus(row);
                            }}
                          >
                            {row?.verified === true ? "Pending" : "Approve"}
                          </Button>
                        </TableCell>

                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(row?.student_id)}
                          >
                            Delete
                          </Button>
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
