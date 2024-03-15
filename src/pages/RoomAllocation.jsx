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
    name: "",
    location: "",
    description: "",
  });
  const [currentHostelName, setCurrentHostelName] = useState("");

  const onChangeHandlerForAddNewHostelFormData = (event) => {
    const { name, value } = event.target;
    setNewAddHostelFormData({
      ...newAddHostelFormData,
      [name]: value,
    });
  };

  const handleNewAddHostellSubmit = async (event) => {
    event.preventDefault();

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
          location: "",
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
      console.log(currentHostelName);
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

  const getRoomByHostelName = async () => {
    // console.log("hostel name--->", hostelName);
    try {
      const response = await axios.get(
        `${URL}/room/get_rooms_by_hostel?hostel_name=${hostelName}`
      );
      if (response) {
        console.log("rooms", response?.data);
        if (response.data.length === 0) {
          setRoomByHostelName([]);
        } else {
          setRoomByHostelName(response?.data);
        }
        setHostelName("");
      }
    } catch (error) {
      console.log(error.message);
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
  };

  const HandleAddHostellImages = () => {
    setAddHostelImagesModel(true);
  };

  useEffect(() => {
    getRoomByHostelName();
  }, [expanded]);
  useEffect(() => {
    getAllHostels();
  }, []);
  return (
    <>
      <Box bgcolor={"#EEEEFF"}>
        <Box
          sx={{
            [theme.breakpoints.up("xs")]: {
              marginLeft: "0px",
              padding: "10px",
            },
            [theme.breakpoints.up("md")]: {
              marginLeft: "265px",
              padding: "10px",
            },
          }}
        >
          <Box>
            <Typography
              variant="h6"
              className="mt-3"
              sx={{ color: "#384D6C", marginLeft: { xs: "20px", md: "40px" } }}
            >
              Room Allocation
            </Typography>
          </Box>
          <Box sx={{ px: 5, py: 3 }}>
            {loading && <LinearProgress color="primary" />}

            {allHostels?.map((hostelObj, i) => {
              const { name, location } = hostelObj;
              return (
                <div key={i} className="mt-3">
                  <Accordion
                    expanded={expanded === i}
                    onChange={() => {
                      setExpanded(expanded === i ? null : i);
                      setHostelName(name);
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
                            padding: "10px",
                          },
                          [theme.breakpoints.up("md")]: {
                            width: "100%",
                            padding: "10px",
                          },
                        }}
                      >
                        <Grid container spacing={1}>
                          {/* First Box */}
                          <Grid
                            item
                            xs={12}
                            md={4}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <Box
                              sx={{
                                padding: "10px",
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
                                  <LocationOnIcon fontSize="13px" /> {location}
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
                              />
                            </Box>
                            <Box className="">
                              <ImageIcon
                                className=" d-block mx-auto"
                                style={{ cursor: "pointer ", color: "#1466b7" }}
                                onClick={() => {
                                  setAddHostelImagesModel(true);
                                  setCurrentHostelName(hostelObj.name);
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
                                  <Box component={"div"}>
                                    <Typography
                                      fontSize="15px"
                                      color={"primary"}
                                    >
                                      {" "}
                                      <BorderColorIcon
                                        fontSize="15px"
                                        color={"primary"}
                                      />{" "}
                                      {data.room_name}
                                    </Typography>
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
                  height: "100px ",
                  border: "1px solid black",
                  bgcolor: "transparent",
                  cursor: "pointer",
                },
                [theme.breakpoints.up("md")]: {
                  width: "100%",
                  padding: "10px",
                  height: "100px ",
                  border: "1px solid black",
                  bgcolor: "transparent",
                  cursor: "pointer",
                },
              }}
            >
              <Grid container spacing={1}>
                {/* First Box */}
                <Grid
                  item
                  xs={12}
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Box
                    sx={{
                      padding: "10px",
                      textAlign: "",
                      widthl: "100%",
                      justifyContent: "center",
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
                            marginLeft: "10px",
                            textAlign: "center",
                            marginTop: "10px",
                          },
                          [theme.breakpoints.up("md")]: {
                            fontSize: "16px",
                            color: "#384D6C",
                            fontWeight: "700",
                            marginLeft: "40px",
                            textAlign: "center",
                            marginTop: "20px",
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
            <Typography variant="h5">
              {/* {!canUploadImage ? (
                "Add Hostel Name"
              ) : (
                <div>
                  Add <span style={{ fontWeight: "bold" }}>Images</span> for{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {newAddHostelFormData.name}
                  </span>
                </div>
              )} */}
            </Typography>
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
                          name="location"
                          value={newAddHostelFormData.location}
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
            {/* <Grid
              item
              xs={12}
              md={12}
              className={`justify-content-center d-flex align-items-center 
              `}
            >
              <div className="m-3">
                <input
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <input
                  type="text"
                  placeholder="Enter hostel name"
                  value={hostelName}
                  onChange={(e) => setHostelName(e.target.value)}
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
            </Grid> */}
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
    </>
  );
}

export default RoomAllocation;
