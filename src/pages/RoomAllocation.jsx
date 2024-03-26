import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
  Modal,
  LinearProgress,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import "./../styles/FileUpload.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import ImageIcon from "@mui/icons-material/Image";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import swal from "sweetalert";
function RoomAllocation() {
  const inputRef = useRef();
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(null);
  const [allHostels, setAllHostels] = useState([]);
  const [roomByHostelName, setRoomByHostelName] = useState([]);
  const [hostelName, setHostelName] = useState("");
  const [loading, setLoading] = useState(true);
  const [addHostelModel, setAddHostelModel] = useState(false);
  const [addHostelImagesModel, setAddHostelImagesModel] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const [newAddHostelFormData, setNewAddHostelFormData] = useState({
    full_address: "",
    description: "",
  });
  const [currentHostelName, setCurrentHostelName] = useState("");
  const [editHostelInfoModel, setEditHostelInfoModel] = useState(false);
  const [getAllHostelImages, setGetAllHostelImages] = useState([]);

  const [addNewRoomModel, setAddNewRoomModel] = useState(false);
  const [addNewRoomFormData, setAddNewRoomData] = useState({
    hostel_name: "",
    room_name: "",
    room_type: "",
    room_description: "",
    room_rent: 0,
    availibility: true,
    beds: 0,
  });
  const [editRoomInfoModel, setEditRoomInfoModel] = useState(false);
  const [currentRoomName, setCurrentRoomName] = useState("");
  const [addRoomImagesModel, setAddRoomImagesModel] = useState(false);
  const [getAllRoomImages, setGetAllRoomImages] = useState({});

  const deleteHostelByName = async (hostelName) => {
    try {
      const trimmedHostelName = hostelName.trim();
      const response = await axios.delete(`${URL}/hostel/${trimmedHostelName}`);
      if (response) {
        toast("hostel deleted successfully");
        getAllHostels();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCurrentRoomDataByHostelandRoomNameQuery = async (
    hostelName,
    roomName
  ) => {
    try {
      const response = await axios.get(
        `${URL}/room/get_room?hostel_name=${hostelName}&room_name=${roomName}`
      );

      if (response) {
        setAddNewRoomData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deteleRoomImageById = async (id, hostelName, roomName) => {
    try {
      const response = await axios.delete(
        `${URL}/room/delete_room_image?image_id=${id}`
      );
      if (response) {
        toast.success("Image deleted successfully");
        await getAllRooms(hostelName, roomName);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getAllRooms = async (hostelName, roomName) => {
    // alert(`${hostelName} is ${roomName}`);
    try {
      const response = await axios.get(
        `${URL}/room/get_all_room_images?hostel_name=${hostelName}&room_name=${roomName}`
      );
      if (response) {
        setGetAllRoomImages(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangeHandlerForAddNewRoomFormData = (event) => {
    setAddNewRoomData({
      ...addNewRoomFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditRoomSubmit = async (event) => {
    event.preventDefault();
    const { room_description, availibility, room_rent, beds } =
      addNewRoomFormData;

    alert(`room ${currentRoomName} and hostel ${currentHostelName}`);

    try {
      const response = await axios.put(
        `${URL}/room/update_room?room_name=${currentRoomName}&hostel_name=${currentHostelName}`,
        {
          room_description,
          availibility,
          room_rent,
          beds,
        }
      );
      if (response) {
        toast.success("Room updated successfully", 3000);
        setAddNewRoomData({
          hostel_name: "",
          room_name: "",
          room_type: "",
          room_description: "",
          room_rent: 0,
          availibility: true,
          beds: 0,
        });
        await getRoomByHostelName(currentHostelName);
        setEditRoomInfoModel(false);
        setCurrentHostelName("");
        setCurrentRoomName("");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, 3000);
    }
  };

  const handleAddNewRoomSubmit = async (event) => {
    event.preventDefault();
    console.log("...........", currentHostelName);
    let data = { ...addNewRoomFormData, hostel_name: currentHostelName };
    console.log(data);
    try {
      const response = await axios.post(`${URL}/room/add_room`, data);
      if (response) {
        toast.success("Room added successfully", 3000);
        setAddNewRoomData({
          hostel_name: "",
          room_name: "",
          room_type: "",
          room_description: "",
          room_rent: 0,
          availibility: true,
          beds: 0,
        });
        await getRoomByHostelName(currentHostelName);
        setAddNewRoomModel(false);
        setCurrentHostelName("");
      }
    } catch (error) {
      console.log(error.message);
      setCurrentHostelName("");
    }
  };

  const getAllHostelImagesByHostelName = async (name) => {
    try {
      const response = await axios.get(
        `${URL}/hostel/get_images?hostel_name=${name}`
      );
      setCurrentHostelName(name);
      setGetAllHostelImages(response.data);
    } catch (error) {
      console.error("Error fetching hostel images:", error);
      setCurrentHostelName("");
    }
  };

  const deteleHostelImageById = async (id) => {
    try {
      const response = await axios.delete(
        `${URL}/hostel/delete_image?image_id=${id}`
      );
      if (response) {
        toast.success("Image deleted successfully");
        getAllHostelImagesByHostelName(currentHostelName);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onChangeHandlerForAddNewHostelFormData = (event) => {
    const { name, value } = event.target;
    setNewAddHostelFormData({
      ...newAddHostelFormData,
      [name]: value,
    });
  };

  const getHostelByName = async (name) => {
    try {
      const response = await axios.get(`${URL}/hostel/${name}`);
      setNewAddHostelFormData(response?.data);
    } catch (error) {
      console.error("Error fetching hostel:", error);
    }
  };

  const handleEditHostellSubmit = async (e) => {
    e.preventDefault();
    console.log(currentHostelName);
    // Encode the hostel name for the URL
    const encodedHostelName = encodeURIComponent(currentHostelName);

    try {
      const response = await axios.put(
        `${URL}/hostel/${encodedHostelName}`,
        newAddHostelFormData
      );
      if (response) {
        toast.success("Hostel updated successfully", 5000);
        setNewAddHostelFormData({
          full_address: "",
          description: "",
        });
        setCurrentHostelName("");
        setEditHostelInfoModel(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNewAddHostellSubmit = async (event) => {
    event.preventDefault();
    const { name, full_address, description } = newAddHostelFormData;

    // Check if any required field is empty
    if (!name || !full_address || !description) {
      toast.error("Please fill in all the required fields");
      return;
    }

    try {
      const response = await axios.post(`${URL}/hostel`, newAddHostelFormData);
      if (response) {
        setTimeout(() => {
          toast.success("New hostel created successfully 🎉", 3000);
        }, 1000);
        // console.log("new hostel -->",response?.data);
        setAddHostelModel(false);
        setNewAddHostelFormData({
          name: "",
          full_address: "",
          description: "",
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
    // console.log("newAddHostelFormData->", newAddHostelFormData);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();

      return;
    }

    try {
      setUploadStatus("uploading");
      // console.log(currentHostelName);
      const formData = new FormData();
      formData.append("files", selectedFile);
      formData.append("hostel_name", currentHostelName);
      // console.log("dddddd", formData);

      const response = await axios.post(
        `${URL}/hostel/upload_images`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      console.log("api response---", response);
      if (response) {
        toast.success("image uploaded successfully ✅");
        getAllHostelImagesByHostelName(currentHostelName);
      }

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  const handleUploadRoomImages = async () => {
    if (uploadStatus === "done") {
      clearFileInput();

      return;
    }

    try {
      setUploadStatus("uploading");
      console.log(currentRoomName);
      console.log(currentHostelName);
      const formData = new FormData();
      formData.append("files", selectedFile);
      formData.append("hostel_name", currentHostelName);
      formData.append("room_name", currentRoomName);
      console.log("dddddd", formData);

      const response = await axios.post(
        `${URL}/room/upload_room_images`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      console.log("api response---", response);
      if (response) {
        toast.success("room image uploaded successfully ✅");
        await getAllRooms(currentHostelName, currentRoomName);
        currentHostelName("");
        setCurrentRoomName("");
      }

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  const getAllHostels = async () => {
    try {
      const response = await axios.get(`${URL}/hostel/`);
      // console.log(response?.data);
      setAllHostels(response?.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRoomByHostelName = async (name) => {
    try {
      const response = await axios.get(
        `${URL}/room/get_rooms_by_hostel?hostel_name=${name}`
      );

      if (response && response.data.length > 0) {
        setRoomByHostelName(response.data);
        setHostelName("");
      } else {
        setRoomByHostelName([]);
      }
    } catch (error) {
      console.log(error.message);
      setRoomByHostelName([]);
    }
  };

  const sortedRoomData = [...roomByHostelName].sort((a, b) => {
    const roomNameA = a.room_name.toUpperCase();
    const roomNameB = b.room_name.toUpperCase();

    if (roomNameA < roomNameB) {
      return -1;
    }
    if (roomNameA > roomNameB) {
      return 1;
    }
    return 0;
  });

  const HandleAddHostell = () => {
    setAddHostelModel(true);
    setNewAddHostelFormData({
      name: "",
      full_address: "",
      description: "",
    });
  };

  // useEffect(() => {
  //   getRoomByHostelName();
  // }, [expanded]);
  useEffect(() => {
    getAllHostels();
  }, [addHostelModel, editHostelInfoModel]);

  return (
    <>
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
          <Box>
            <Typography
              variant="h6"
              className="mt-3"
              sx={{ color: "#384D6C", marginLeft: { xs: "20px", md: "20px" } }}
            >
              Room Allocation
            </Typography>
          </Box>
          <Box sx={{ px: 2, py: 1 }}>
            {loading && <LinearProgress color="primary" />}

            {allHostels?.map((hostelObj, i) => {
              const { name, full_address } = hostelObj;
              return (
                <div key={i} className="mt-3">
                  <Accordion
                    expanded={expanded === i}
                    onChange={() => {
                      setExpanded(expanded === i ? null : i);
                      setHostelName(name);
                      getRoomByHostelName(name);
                    }}
                    sx={{
                      backgroundColor: expanded === i ? "#F5F5F5" : "#EEEEFF",
                      border: "1px solid black",
                      borderRadius: "10px",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id={i}
                    >
                      <Box
                        sx={{
                          [theme.breakpoints.up("xs")]: {
                            width: "100%",
                            padding: "1px",
                          },
                          [theme.breakpoints.up("md")]: {
                            width: "100%",
                            padding: "1px",
                          },
                        }}
                      >
                        <Grid container spacing={1}>
                          {/* First Box */}
                          <Grid item xs={12} md={4} className="d-flex ">
                            <Box
                              sx={{
                                padding: "0px",
                                textAlign: "",
                                width: "100%",
                              }}
                            >
                              <Box className="mx-auto">
                                <Typography
                                  variant="body2"
                                  sx={{
                                    [theme.breakpoints.up("xs")]: {
                                      fontSize: "16px",
                                      color: "#384D6C",
                                      fontWeight: "700",
                                    },
                                  }}
                                >
                                  {name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    [theme.breakpoints.up("xs")]: {
                                      fontSize: "13px",
                                      color: "#989696",
                                      marginTop: "1px",
                                    },
                                  }}
                                >
                                  <LocationOnIcon fontSize="13px" />{" "}
                                  {full_address}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          {/* Second Box */}
                          {/* <Grid
                      item
                      xs={12}
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Box
                        className=""
                        sx={{
                          padding: "10px",
                          width: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "500",
                            color: "#384D6C",
                            fontSize: "14px",
                            lineHeight: "21px",
                            textAlign: "start",
                          }}
                        >
                          <HotelIcon style={{ fontSize: "17px" }} /> Occupancy
                          Statistics
                        </Typography>
                        <Grid container spacing={0.5} mt={1}>
                          <Grid item xs={6} md={6}>
                            <Box className="statitix-container d-flex align-items-center gap-2">
                              <div
                                style={{
                                  height: "12px",
                                  width: "12px",
                                  backgroundColor: "#AFFCA3",
                                }}
                              ></div>{" "}
                              <div
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "400",
                                  color: "#384D6C",
                                }}
                              >
                                Available
                              </div>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box className="statitix-container d-flex align-items-center gap-2">
                              <div
                                style={{
                                  height: "12px",
                                  width: "12px",
                                  backgroundColor: "#DADADA",
                                }}
                              ></div>{" "}
                              <div
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "400",
                                  color: "#384D6C",
                                }}
                              >
                                Under Maintainance{" "}
                              </div>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box className="statitix-container d-flex align-items-center gap-2">
                              <div
                                style={{
                                  height: "12px",
                                  width: "12px",
                                  backgroundColor: "#FF9BAD",
                                }}
                              ></div>{" "}
                              <div
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "400",
                                  color: "#384D6C",
                                }}
                              >
                                Occupied
                              </div>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid> */}

                          {/* Third Box */}
                          {/* <Grid
                      item
                      xs={12}
                      md={4}
                      className="d-flex justify-content-center align-items-center "
                    >
                      <div
                        style={{
                          height: "80px",
                          width: "80px",
                          backgroundColor: "#AfFCA3", // Assuming "AwFCA3" is a valid color code
                          margin: "10px auto", // Center the box horizontally
                        }}
                      ></div>
                    </Grid> */}
                        </Grid>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box sx={{ borderBottom: "3px solid #CFCDCD" }}></Box>
                      <Box className="d-flex justify-content-between my-2 gap-2">
                        <Box className=" w-100"></Box>
                        <Box className=" w-100 px-3">
                          <Box className="d-flex justify-content-end gap-4  align-items-center">
                            <Box className="">
                              <BorderColorIcon
                                className=" d-block mx-auto"
                                style={{ cursor: "pointer", color: "#1466b7" }}
                                onClick={() => {
                                  setEditHostelInfoModel(true);
                                  setCurrentHostelName(hostelObj.name);
                                  getHostelByName(name);
                                }}
                              />
                            </Box>

                            <Box className="">
                              <ImageIcon
                                className=" d-block mx-auto"
                                style={{ cursor: "pointer ", color: "#1466b7" }}
                                onClick={() => {
                                  setAddHostelImagesModel(true);
                                  setCurrentHostelName(hostelObj.name);
                                  getAllHostelImagesByHostelName(name);
                                }}
                              />
                            </Box>
                            <Box className="">
                              <DeleteForeverIcon
                                className=" d-block mx-auto"
                                style={{ cursor: "pointer ", color: "#1466b7" }}
                                onClick={() => {
                                  swal({
                                    title: "Are you sure?",
                                    text: "Once deleted, you will not be able to recover this hostel and its images. Student room will also be deleted!",
                                    buttons: true,
                                    dangerMode: true,
                                  }).then((willDelete) => {
                                    if (willDelete) {
                                      deleteHostelByName(hostelObj.name);
                                    } else {
                                      swal("Your Record is safe");
                                    }
                                  });
                                }}
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        className="mb-2"
                        sx={{ borderBottom: "3px solid #CFCDCD" }}
                      ></Box>

                      <Box sx={{ p: { xs: "0px", md: "10px" } }}>
                        <Grid container spacing={2}>
                          {sortedRoomData.map((data, i) => (
                            <Grid
                              item
                              key={i}
                              xs={12}
                              sm={6}
                              md={4}
                              lg={3}
                              display={"flex"}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Paper
                                elevation={3}
                                sx={{
                                  width: { xs: "280px", md: "260px" },
                                  height: "199px",
                                  padding: "20px 20px",
                                  margin: "5px",
                                  bgcolor: "#EFEFEF",
                                  color: "dark",
                                }}
                              >
                                <Box
                                  component={"div"}
                                  className="d-flex justify-content-between"
                                >
                                  <Box component={"div"}>
                                    <Typography
                                      component={"span"}
                                      fontSize="15px"
                                      color={"primary"}
                                    >
                                      {" "}
                                      <AcUnitIcon fontSize="15px" /> AC
                                    </Typography>
                                  </Box>
                                  <Box
                                    component={"div"}
                                    className="d-flex justify-content-evenly  gap-3"
                                  >
                                    <Box>
                                      {" "}
                                      <BorderColorIcon
                                        fontSize="15px"
                                        color={"primary"}
                                        style={{
                                          cursor: "pointer",
                                        }}
                                        onClick={() => {
                                          setEditRoomInfoModel(true);
                                          setCurrentHostelName(name);
                                          setCurrentRoomName(data.room_name);
                                          getCurrentRoomDataByHostelandRoomNameQuery(
                                            name,
                                            data.room_name
                                          );
                                        }}
                                      />{" "}
                                    </Box>
                                    <Box>
                                      <ImageIcon
                                        fontSize="20px"
                                        color={"primary"}
                                        onClick={() => {
                                          setAddRoomImagesModel(true);
                                          setCurrentRoomName(data.room_name);
                                          setCurrentHostelName(name);
                                          getAllRooms(name, data.room_name);
                                        }}
                                      />
                                    </Box>
                                    <Box>
                                      <Typography
                                        fontSize="15px"
                                        color={"primary"}
                                      >
                                        {" "}
                                        {data.room_name}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Box>

                                {data.availibility ? (
                                  <Box component={"div"} className="mt-3 ">
                                    <Grid container spacing={1}>
                                      {data.allotted_students.map(
                                        (allottedStudentObj, i) => {
                                          const { student_name } =
                                            allottedStudentObj;
                                          return (
                                            <Grid item xs={12} md={12} key={i}>
                                              <Box
                                                sx={{
                                                  height: "35px",
                                                  width: "100%",
                                                  bgcolor:
                                                    student_name === "Vacant"
                                                      ? "#d9ffb3"
                                                      : "#bfbfbf",
                                                  borderRadius: "5px",
                                                  display: "flex",
                                                  justifyContent: "start",
                                                  padding: "5px",
                                                }}
                                              >
                                                <Typography
                                                  component={"span"}
                                                  fontSize="15px"
                                                  color={"primary"}
                                                >
                                                  {student_name === "Vacant" ? (
                                                    <>
                                                      <HotelIcon
                                                        fontSize="15px"
                                                        style={{
                                                          marginRight: "5px",
                                                        }}
                                                      />
                                                      <span
                                                        className=""
                                                        style={{
                                                          fontSize: "12px",
                                                        }}
                                                      >
                                                        {" "}
                                                        Vacant
                                                      </span>
                                                    </>
                                                  ) : (
                                                    <>
                                                      <PersonIcon
                                                        fontSize="15px"
                                                        style={{
                                                          marginRight: "5px",
                                                        }}
                                                      />
                                                      <span
                                                        className=""
                                                        style={{
                                                          fontSize: "12px",
                                                        }}
                                                      >
                                                        {" "}
                                                        {student_name}
                                                      </span>
                                                    </>
                                                  )}
                                                </Typography>
                                              </Box>
                                            </Grid>
                                          );
                                        }
                                      )}
                                    </Grid>
                                  </Box>
                                ) : (
                                  <div
                                    className="d-flex justify-content-center  h-75 mt-2 align-items-center fw-bold"
                                    style={{ color: "#384D6C" }}
                                  >
                                    Not Available
                                  </div>
                                )}
                              </Paper>
                            </Grid>
                          ))}

                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            display={"flex"}
                            justifyContent="center"
                            alignItems="center"
                          >
                            <Paper
                              elevation={3}
                              sx={{
                                width: { xs: "280px", md: "260px" },
                                height: "199px",
                                padding: "20px",
                                margin: "5px",
                                bgcolor: "#EFEFEF",
                                color: "dark",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                              onClick={() => {
                                setAddNewRoomModel(true);
                                setCurrentHostelName(name);
                                setAddNewRoomData({
                                  hostel_name: "",
                                  room_name: "",
                                  room_type: "",
                                  room_description: "",
                                  room_rent: 0,
                                  availibility: true,
                                  beds: 0,
                                });
                              }}
                            >
                              <AddIcon
                                style={{ fontSize: "80px", color: "#1976d2" }}
                              />
                            </Paper>
                          </Grid>
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}

            <Box
              className="mt-3"
              component={"div"}
              onClick={HandleAddHostell}
              sx={{
                [theme.breakpoints.up("xs")]: {
                  width: "100%",
                  padding: "10px",
                  border: "1px solid black",
                  bgcolor: "transparent",
                  cursor: "pointer",
                  borderRadius: "5px",
                  boxShadow: " 1px 1px 3px gray ",
                },
                [theme.breakpoints.up("md")]: {
                  width: "100%",
                  padding: "10px",
                  border: "1px solid black",
                  bgcolor: "transparent",
                  cursor: "pointer",
                },
              }}
            >
              <Grid container spacing={1}>
                {/* First Box */}
                <Grid item xs={12} md={2} className="">
                  <Box
                    sx={{
                      padding: "0px",
                      textAlign: "",
                      widthl: "100%",
                    }}
                  >
                    <Box className=" mx-auto">
                      <Typography
                        variant="body2"
                        sx={{
                          [theme.breakpoints.up("xs")]: {
                            fontSize: "16px",
                            color: "#384D6C",
                            fontWeight: "700",
                            padding: "10px",
                          },
                          [theme.breakpoints.up("md")]: {
                            fontSize: "16px",
                            color: "#384D6C",
                            fontWeight: "700",
                          },
                        }}
                      >
                        Add Hostel <AddIcon />
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal onClose={() => setAddHostelModel(false)} open={addHostelModel}>
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "80%",
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up("xs")]: {
                marginY: "10px",
                marginX: "20px",
              },
              [theme.breakpoints.up("md")]: {},
            }}
          >
            <Typography variant="h5"></Typography>
          </Box>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              className={`justify-content-center d-flex align-items-center `}
            >
              <Box
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "100%",
                    padding: "10px 20px",
                    margin: "10px",
                    height: "auto ",
                    cursor: "pointer",
                  },
                }}
              >
                <form onSubmit={handleNewAddHostellSubmit}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      <div className="m-2">
                        <label
                          htmlFor="hostel_name"
                          className="form-label fw-bold mb-2"
                          style={{ color: "#384D6C", fontSize: "20px" }}
                        >
                          Hostel Name
                        </label>
                        <input
                          type="text"
                          className="form-control shadow-sm py-2"
                          id="hostel_name"
                          placeholder="Enter hostel name"
                          name="name"
                          value={newAddHostelFormData.name}
                          onChange={onChangeHandlerForAddNewHostelFormData}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="m-2">
                        <label
                          htmlFor="hostel_address"
                          className="form-label fw-bold -mb-2"
                          style={{ color: "#384D6C", fontSize: "20px" }}
                        >
                          Hostel Address
                        </label>
                        <input
                          type="text"
                          className="form-control py-2 shadow-sm"
                          id="hostel_address"
                          placeholder="Enter hostel address"
                          name="full_address"
                          value={newAddHostelFormData.full_address}
                          onChange={onChangeHandlerForAddNewHostelFormData}
                        />
                      </div>
                    </Grid>{" "}
                    <Grid item xs={12} md={12}>
                      <div className="m-2">
                        <label
                          htmlFor="floatingTextarea"
                          className="form-label fw-bold mb-2"
                          style={{ color: "#384D6C", fontSize: "20px" }}
                        >
                          Description
                        </label>
                        <div className="form-floating">
                          <textarea
                            className="form-control shadow-sm"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                            name="description"
                            value={newAddHostelFormData.description}
                            onChange={onChangeHandlerForAddNewHostelFormData}
                          ></textarea>
                          <label htmlFor="floatingTextarea">Description</label>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="m-2 py-3">
                        <div className="d-flex gap-3 justify-content-evenly  align-items-center">
                          <button
                            onClick={() => {
                              setAddHostelModel(false);
                              setNewAddHostelFormData({
                                name: "",
                                full_address: "",
                                description: "",
                              });
                            }}
                            className="btn"
                            variant="outlined"
                            style={{
                              background: "#ffff",
                              color: "black",
                              width: "180px",
                              fontWeight: "400",
                              border: "1px solid #384D6C",
                            }}
                          >
                            Cancle
                          </button>
                          <button
                            className="btn"
                            variant="outlined"
                            style={{
                              background: "#384D6C",
                              color: "#fff",
                              width: "180px",
                              fontWeight: "bold",
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        onClose={() => setAddHostelImagesModel(false)}
        open={addHostelImagesModel}
      >
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "80%",
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up("xs")]: {
                marginY: "10px",
                marginX: "20px",
              },
              [theme.breakpoints.up("md")]: {},
            }}
          >
            <Typography variant="h5">Add Hostel Images</Typography>
          </Box>
          <Grid
            container
            spacing={2}
            mt={2}
            sx={{ height: { xs: "300px", md: "400px" }, overflowY: "scroll" }}
          >
            {getAllHostelImages.map((imgObj, i) => {
              const { image_url, image_id } = imgObj;
              return (
                <Grid
                  key={i}
                  item
                  md={3}
                  xs={12}
                  className="d-flex justify-content-center"
                >
                  <Paper
                    component={"div"}
                    sx={{
                      width: "220px",
                      height: "160px",
                      margin: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <img
                      src={image_url}
                      alt={image_url}
                      className=" rounded-md"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                    <DeleteIcon
                      style={{
                        position: "absolute",
                        borderRadius: "50%",
                        fontSize: "40px",
                        color: "red",
                        backgroundColor: "#c4a9e9d1",
                        padding: "5px",
                        top: "8px",
                        right: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deteleHostelImageById(image_id);
                      }}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              className={`justify-content-center d-flex  
              `}
            >
              <div className="m-3">
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {!selectedFile && (
                  <button className="file-btn" onClick={onChooseFile}>
                    <span className="material-symbols-outlined">
                      <CloudUploadIcon />
                    </span>{" "}
                  </button>
                )}

                {selectedFile && (
                  <>
                    <div className="file-card">
                      <span className="material-symbols-outlined icon">
                        <DescriptionIcon />
                      </span>

                      <div className="file-info">
                        <div style={{ flex: 1 }}>
                          <h6>{selectedFile?.name}</h6>

                          <div className="progress-bg">
                            <div
                              className="progress"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {uploadStatus === "select" ? (
                          <button onClick={clearFileInput}>
                            <span className="material-symbols-outlined close-icon">
                              <CloseIcon />
                            </span>
                          </button>
                        ) : (
                          <div className="check-circle">
                            {uploadStatus === "uploading" ? (
                              `${progress}%`
                            ) : uploadStatus === "done" ? (
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "20px" }}
                              >
                                <CheckIcon />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="upload-btn" onClick={handleUpload}>
                      {uploadStatus === "select" || uploadStatus === "uploading"
                        ? "Upload"
                        : "Done"}
                    </button>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        onClose={() => setEditHostelInfoModel(false)}
        open={editHostelInfoModel}
      >
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "80%",
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up("xs")]: {
                marginY: "10px",
                marginX: "20px",
              },
              [theme.breakpoints.up("md")]: {},
            }}
          >
            <Typography variant="h5">Edit Hostel Information</Typography>
          </Box>
          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              className={`justify-content-center d-flex align-items-center `}
            >
              <Box
                sx={{
                  [theme.breakpoints.up("xs")]: {
                    width: "100%",
                    padding: "10px 20px",
                    margin: "10px",
                    height: "auto ",
                    cursor: "pointer",
                  },
                }}
              >
                <form onSubmit={handleEditHostellSubmit}>
                  <Grid container spacing={0}>
                    <Grid item xs={12} md={12}>
                      <div className="m-2">
                        <label
                          htmlFor="hostel_address"
                          className="form-label fw-bold -mb-2"
                          style={{ color: "#384D6C", fontSize: "20px" }}
                        >
                          Hostel Address
                        </label>
                        <input
                          type="text"
                          className="form-control py-2 shadow-sm"
                          id="hostel_address"
                          placeholder="Enter hostel address"
                          name="full_address"
                          value={newAddHostelFormData.full_address}
                          onChange={onChangeHandlerForAddNewHostelFormData}
                        />
                      </div>
                    </Grid>{" "}
                    <Grid item xs={12} md={12}>
                      <div className="m-2">
                        <label
                          htmlFor="floatingTextarea"
                          className="form-label fw-bold mb-2"
                          style={{ color: "#384D6C", fontSize: "20px" }}
                        >
                          Description
                        </label>
                        <div className="form-floating">
                          <textarea
                            className="form-control shadow-sm"
                            placeholder="Leave a comment here"
                            id="floatingTextarea"
                            name="description"
                            value={newAddHostelFormData.description}
                            onChange={onChangeHandlerForAddNewHostelFormData}
                          ></textarea>
                          <label htmlFor="floatingTextarea">Description</label>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="m-2 py-3">
                        <div className="d-flex gap-3 justify-content-evenly  align-items-center">
                          <button
                            onClick={() => {
                              setEditHostelInfoModel(false);
                              setNewAddHostelFormData({
                                name: "",
                                full_address: "",
                                description: "",
                              });
                            }}
                            className="btn"
                            variant="outlined"
                            style={{
                              background: "#ffff",
                              color: "black",
                              width: "180px",
                              fontWeight: "400",
                              border: "1px solid #384D6C",
                            }}
                          >
                            Cancle
                          </button>
                          <button
                            className="btn"
                            variant="outlined"
                            style={{
                              background: "#384D6C",
                              color: "#fff",
                              width: "180px",
                              fontWeight: "bold",
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal onClose={() => setAddNewRoomModel(false)} open={addNewRoomModel}>
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "60%",
            },
          }}
        >
          <Typography variant="h6" className="my-1">
            Add new Room for
          </Typography>

          <form onSubmit={handleAddNewRoomSubmit}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="room_name"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm py-2"
                    id="room_name"
                    placeholder="Enter room name"
                    name="room_name"
                    value={addNewRoomFormData.room_name}
                    onChange={onChangeHandlerForAddNewRoomFormData}
                  />
                </div>
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="availability"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Availability
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="availability"
                      name="availability"
                      checked={addNewRoomFormData.availibility}
                      onChange={(event) =>
                        setAddNewRoomData({
                          ...addNewRoomFormData,
                          availibility: event.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="availability">
                      Available
                    </label>
                  </div>
                </div>
              </Grid>{" "}
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="room_rent"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Rent
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm py-2"
                    id="room_rent"
                    placeholder="Enter room rent"
                    name="room_rent"
                    value={addNewRoomFormData.room_rent}
                    onChange={onChangeHandlerForAddNewRoomFormData}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="beds"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Beds
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm py-2"
                    id="beds"
                    placeholder="Enter number of beds"
                    name="beds"
                    value={addNewRoomFormData.beds}
                    onChange={onChangeHandlerForAddNewRoomFormData}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className="m-2">
                  <label
                    htmlFor="floatingTextarea"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Description
                  </label>
                  <div className="form-floating">
                    <textarea
                      className="form-control shadow-sm"
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                      name="room_description"
                      value={addNewRoomFormData.room_description}
                      onChange={onChangeHandlerForAddNewRoomFormData}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Description</label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={12}>
                <div className="m-2 py-3">
                  <div className="d-flex gap-3 justify-content-evenly  align-items-center">
                    <button
                      onClick={() => {
                        setAddNewRoomModel(false);
                        setCurrentHostelName("");
                        setAddNewRoomData({
                          room_name: "",
                          availibility: false,
                          room_rent: 0,
                          beds: 0,
                          room_description: "",
                        });
                      }}
                      className="btn"
                      variant="outlined"
                      style={{
                        background: "#ffff",
                        color: "black",
                        width: "180px",
                        fontWeight: "400",
                        border: "1px solid #384D6C",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn"
                      variant="outlined"
                      style={{
                        background: "#384D6C",
                        color: "#fff",
                        width: "180px",
                        fontWeight: "bold",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Modal
        onClose={() => setEditRoomInfoModel(false)}
        open={editRoomInfoModel}
      >
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "60%",
            },
          }}
        >
          <Typography variant="h6" className="my-1">
            Edit Room Information
          </Typography>

          <form onSubmit={handleEditRoomSubmit}>
            <Grid container>
              {/* <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="room_name"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Name
                  </label>
                  <input
                    type="text"
                    className="form-control shadow-sm py-2"
                    id="room_name"
                    placeholder="Enter room name"
                    name="room_name"
                    value={addNewRoomFormData.room_name}
                    onChange={onChangeHandlerForAddNewRoomFormData}
                  />
                </div>
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                  <div className="m-2">
                    <label
                      htmlFor="room_type"
                      className="form-label fw-bold mb-2"
                      style={{ color: "#384D6C", fontSize: "20px" }}
                    >
                      Room Type
                    </label>
                    <input
                      type="text"
                      className="form-control shadow-sm py-2"
                      id="room_type"
                      placeholder="Enter Room Type"
                      name="room_type"
                      value={addNewRoomFormData.room_type}
                      onChange={onChangeHandlerForAddNewRoomFormData}
                    />
                  </div>
                </Grid> */}
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="room_rent"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Rent
                  </label>
                  <input
                    min={0}
                    type="number"
                    className="form-control shadow-sm py-2"
                    id="room_rent"
                    placeholder="Enter room rent"
                    name="room_rent"
                    value={addNewRoomFormData.room_rent}
                    onChange={onChangeHandlerForAddNewRoomFormData}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="beds"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Beds
                  </label>
                  <input
                    min={0}
                    max={3}
                    type="number"
                    className="form-control shadow-sm py-2"
                    id="beds"
                    placeholder="Enter number of beds"
                    name="beds"
                    value={addNewRoomFormData.beds}
                    onChange={onChangeHandlerForAddNewRoomFormData}
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="floatingTextarea"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Description
                  </label>
                  <div className="form-floating">
                    <textarea
                      className="form-control shadow-sm"
                      placeholder="Leave a comment here"
                      id="floatingTextarea"
                      name="room_description"
                      value={addNewRoomFormData.room_description}
                      onChange={onChangeHandlerForAddNewRoomFormData}
                    ></textarea>
                    <label htmlFor="floatingTextarea">Description</label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="m-2">
                  <label
                    htmlFor="availability"
                    className="form-label fw-bold mb-2"
                    style={{ color: "#384D6C", fontSize: "20px" }}
                  >
                    Room Availability
                  </label>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="availability"
                      name="availability"
                      checked={addNewRoomFormData.availibility}
                      onChange={(event) =>
                        setAddNewRoomData({
                          ...addNewRoomFormData,
                          availibility: event.target.checked,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="availability">
                      Available
                    </label>
                  </div>
                </div>
              </Grid>{" "}
              <Grid item xs={12} md={12}>
                <div className="m-2 py-3">
                  <div className="d-flex gap-3 justify-content-evenly  align-items-center">
                    <button
                      onClick={() => {
                        setEditRoomInfoModel(false);
                        setCurrentHostelName("");
                        setAddNewRoomData({
                          room_name: "",
                          availibility: false,
                          room_rent: 0,
                          beds: 0,
                          room_description: "",
                        });
                      }}
                      className="btn"
                      variant="outlined"
                      style={{
                        background: "#ffff",
                        color: "black",
                        width: "180px",
                        fontWeight: "400",
                        border: "1px solid #384D6C",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn"
                      variant="outlined"
                      style={{
                        background: "#384D6C",
                        color: "#fff",
                        width: "180px",
                        fontWeight: "bold",
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>

      <Modal
        onClose={() => setAddRoomImagesModel(false)}
        open={addRoomImagesModel}
      >
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 1,
              borderRadius: "8px",
              width: "95%",
            },
            [theme.breakpoints.up("md")]: {
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#EEEEFF",
              boxShadow: 24,
              p: 2,
              borderRadius: "8px",
              width: "60%",
            },
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up("xs")]: {
                marginY: "10px",
                marginX: "20px",
              },
              [theme.breakpoints.up("md")]: {},
            }}
          >
            <Typography variant="h5">Add Room Images</Typography>
          </Box>
          <Grid
            container
            spacing={2}
            mt={2}
            sx={{ height: { xs: "300px", md: "400px" }, overflowY: "scroll" }}
          >
            {getAllRoomImages.room_pictures?.map((imgObj, i) => {
              const { image_url, image_id, hostel_name, room_name } = imgObj;
              return (
                <Grid
                  key={i}
                  item
                  md={3}
                  xs={12}
                  className="d-flex justify-content-center"
                >
                  <Paper
                    component={"div"}
                    sx={{
                      width: "220px",
                      height: "160px",
                      margin: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                    }}
                  >
                    <img
                      src={image_url}
                      alt={image_url}
                      className=" rounded-md"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        width: "auto",
                        height: "auto",
                        borderRadius: "5px",
                      }}
                    />
                    <DeleteIcon
                      style={{
                        position: "absolute",
                        borderRadius: "50%",
                        fontSize: "40px",
                        color: "red",
                        backgroundColor: "#c4a9e9d1",
                        padding: "5px",
                        top: "8px",
                        right: "8px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deteleRoomImageById(image_id, hostel_name, room_name);
                      }}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>

          <Grid container>
            <Grid
              item
              xs={12}
              md={12}
              className={`justify-content-center d-flex  
              `}
            >
              <div className="m-3">
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                {!selectedFile && (
                  <button className="file-btn" onClick={onChooseFile}>
                    <span className="material-symbols-outlined">
                      <CloudUploadIcon />
                    </span>{" "}
                  </button>
                )}

                {selectedFile && (
                  <>
                    <div className="file-card">
                      <span className="material-symbols-outlined icon">
                        <DescriptionIcon />
                      </span>

                      <div className="file-info">
                        <div style={{ flex: 1 }}>
                          <h6>{selectedFile?.name}</h6>

                          <div className="progress-bg">
                            <div
                              className="progress"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>

                        {uploadStatus === "select" ? (
                          <button onClick={clearFileInput}>
                            <span className="material-symbols-outlined close-icon">
                              <CloseIcon />
                            </span>
                          </button>
                        ) : (
                          <div className="check-circle">
                            {uploadStatus === "uploading" ? (
                              `${progress}%`
                            ) : uploadStatus === "done" ? (
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "20px" }}
                              >
                                <CheckIcon />
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      className="upload-btn"
                      onClick={handleUploadRoomImages}
                    >
                      {uploadStatus === "select" || uploadStatus === "uploading"
                        ? "Upload"
                        : "Done"}
                    </button>
                  </>
                )}
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default RoomAllocation;
