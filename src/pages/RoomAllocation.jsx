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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import HotelIcon from "@mui/icons-material/Hotel";
import axios from "axios";
function RoomAllocation() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(null);
  const [allHostels, setAllHostels] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;

  const getAllHostels = async () => {
    try {
      const response = await axios.get(`${URL}/hostel/`);
      // console.log(response?.data);
      setAllHostels(response?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

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
            <Typography variant="h6" sx={{ color: "#384D6C" }}>
              Room Allocaton
            </Typography>
          </Box>
          <Box sx={{ px: 5, py: 3 }}>
            {allHostels?.map((hostelObj, i) => {
              const { name, location } = hostelObj;
              return (
                <div key={i} className="mt-3">
                  <Accordion
                    expanded={expanded === i}
                    onChange={() => {
                      setExpanded(expanded === i ? null : i);
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
                      <Typography>body</Typography>
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
