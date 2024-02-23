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
const Hostels = () => {
  const [hostel, setHostel] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageData, setPageData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;

  const [tagline, setTagline] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [nearestPoint, setNearestPoint] = useState("");

  const [Id, setId] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getHostal = async () => {
    setLoading(true);
    const url = `${URL}/hostel/?page=${pageNo}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setHostel(res?.data);
      setLoading(false);
    } catch (error) {}
  };

  const addHostel = async () => {
    const url = `${URL}/hostel/`;
    const data = {
      name: name,
      tagline: tagline,
      location: location,
      features: features,
      description: description,
      nearest_point: nearestPoint,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        alert("hostel Add Successfully");
      }
      handleClose();
      getHostal();
    } catch (error) {
      console.log(error.message);
      handleClose();
    }
  };

  useEffect(() => {
    getHostal();
  }, []);

  const handleDelete = async (Id) => {
    const url = `${URL}/hostel/${Id}`;

    try {
      const result = window.confirm("Are you sure to delete this Hostel?");
      if (result) {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.delete(url, config);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          getHostal();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = (data) => {
    const {
      name,
      tagline,
      description,
      features,
      location,
      nearest_point,
      id,
    } = data;
    setIsEdit(true);
    setName(name);
    setTagline(tagline);
    setDescription(description);
    setFeatures(features);
    setLocation(location);
    setNearestPoint(nearest_point);
    setId(id);
    handleShow();
  };

  const updateHostel = async () => {
    const url = `${URL}/hostel/${Id}`;
    const data = {
      name: name,
      tagline: tagline,
      location: location,
      features: features,
      description: description,
      nearest_point: nearestPoint,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(url, data, config);
      if (res.status===200){
          alert(res?.data?.message);
      } 
      setIsEdit(false);
      handleClose();
    } catch (error) {
      console.log(error.message);
      setIsEdit(false);
      handleClose();
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
          sx={{ margin: "10px" }}
          onClick={handleShow}
          variant="contained"
          color="success"
        >
          <AddIcon /> Add Hostels
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
                  <TableCell align="center">location</TableCell>
                  <TableCell align="center">Nearest_point</TableCell>
                  <TableCell align="center">Hostel Id</TableCell>
                  <TableCell align="center">Features</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Tagline</TableCell>

                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Remarks</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hostel?.length > 0 ? (
                  <>
                    {hostel?.map((row, index) => (
                      <TableRow
                        key={row?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          {row?.location === null ? "N/A" : row?.location}
                        </TableCell>
                        <TableCell align="center">
                          {row?.nearest_point === null
                            ? "N/A"
                            : row?.nearest_point}
                        </TableCell>
                        <TableCell align="center">
                          {row?.id === null ? "N/A" : row?.id}
                        </TableCell>
                        <TableCell align="center">
                          {row?.features === null ? "N/A" : row?.features}
                        </TableCell>
                        <TableCell align="center">
                          {row?.description === null ? "N/A" : row?.description}
                        </TableCell>
                        <TableCell align="center">
                          {row?.tagline === null ? "N/A" : row?.tagline}
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
                            onClick={() => handleDelete(row?.id)}
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
              count={hostel.length}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          </>
        )}
      </TableContainer>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Update Hostel" : "Add New Hostel"}
          </Modal.Title>
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
                value={tagline}
                placeholder="Enter tagline"
                onChange={(event) => setTagline(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter location"
                variant="outlined"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter features"
                variant="outlined"
                value={features}
                onChange={(event) => setFeatures(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter description"
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter Nearest Point"
                variant="outlined"
                value={nearestPoint}
                onChange={(event) => setNearestPoint(event.target.value)}
              />
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
            onClick={isEdit ? updateHostel : addHostel}
          >
            {isEdit ? "Update Hostel" : "Add Hostel"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster />
    </div>
  );
};

export default Hostels;
