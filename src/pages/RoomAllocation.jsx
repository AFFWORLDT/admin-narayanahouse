import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Grid,
  LinearProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PersonIcon from "@mui/icons-material/Person";
import HotelIcon from "@mui/icons-material/Hotel";
import axios from "axios";
function RoomAllocation() {
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const theme = useTheme();
  const [expanded, setExpanded] = useState(null);
  const [allHostels, setAllHostels] = useState([]);
  const [roomByHostelName, setRoomByHostelName] = useState([]);
  const [hostelName, setHostelName] = useState("");
  const [loading, setLoading] = useState(true);

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
    try {
      const response = await axios.get(
        `${URL}/room/get_rooms_by_hostel?hostel_name=${hostelName}`
      );
      console.log("rooms", response?.data);
      setRoomByHostelName(response?.data);
      setLoading(false);
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

  useEffect(() => {
    getRoomByHostelName();
  }, [expanded, loading]);
  useEffect(() => {
    getAllHostels();
  }, []);
  return (
    <>
      <Box bgcolor={"#EEEEFF"} height={"100vh"}>
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
              Room Allocaton
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
                      {loading && <LinearProgress color="primary" />}

                      <Box sx={{ p: { xs: "0px", md: "10px" } }}>
                        <Grid
                          container
                          spacing={2}
                          justifyContent="center"
                          alignItems="center"
                        >
                          {sortedRoomData?.map((data, i) => (
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
                                              {student_name ? (
                                                <Typography
                                                  component={"span"}
                                                  fontSize="15px"
                                                  color={"primary"}
                                                >
                                                  {" "}
                                                  <PersonIcon fontSize="15px" />{" "}
                                                  {student_name}
                                                </Typography>
                                              ) : (
                                                <Typography
                                                  component={"span"}
                                                  fontSize="15px"
                                                  color={"primary"}
                                                >
                                                  {" "}
                                                  <HotelIcon fontSize="15px" />{" "}
                                                  {student_name === null
                                                    ? "Unkwon"
                                                    : student_name}
                                                </Typography>
                                              )}
                                            </Box>
                                          </Grid>
                                        );
                                      }
                                    )}
                                  </Grid>
                                </Box>
                              </Paper>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </div>
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default RoomAllocation;
