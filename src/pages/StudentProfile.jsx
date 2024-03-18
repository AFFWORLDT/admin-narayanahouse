import React, { useState, useRef, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Person2Icon from "@mui/icons-material/Person2";
import BadgeIcon from "@mui/icons-material/Badge";
import WcIcon from "@mui/icons-material/Wc";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import userImg from "./../assets/img/admin.webp";
import toast, { Toaster } from "react-hot-toast";

function StudentProfile() {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentDetails, setStudentDetails] = useState({});
  const [order, setOrder] = useState([]);
  const [orderDetails, setOrderDetails] = useState({});
  const URL = process.env.REACT_APP_PROD_ADMIN_API;

  const getStudentdetails = async () => {
    const url = `${URL}/student/${id}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setStudentDetails(res?.data);
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
    order?.forEach((obj) => {
      if (obj?.student_id === id) {
        setOrderDetails(obj);
      }
    });
  }, [order]);

  const updatestatus = async () => {
    const studentId = id;
    const verified = studentDetails?.verified;
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
        getStudentdetails();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStudentdetails();
    getAllocationverification();
  }, []);

  return (
    <Box
      bgcolor={"#EEEEFF"}
      sx={{
        [theme.breakpoints.up("xs")]: {
          marginLeft: "0px",
          padding: "10px 5px",
        },
        [theme.breakpoints.up("md")]: {
          marginLeft: "265px",
          padding: "px",
        },
        [theme.breakpoints.up("sm")]: {
          marginLeft: "265px",
          padding: "10px",
        },
      }}
    >
      <>
        <Box
          sx={{
            bgcolor: "#EEEEFF",
            width: "100%",
            margin: "0",
          }}
          p={2}
        >
          <Box>
            <p
              className="container"
              style={{ fontSize: "20px", fontWeight: "700", color: "#384D6C" }}
            >
              {studentDetails?.name}
            </p>
          </Box>
          <Grid container>
            <Grid item md={4} xs={12}>
              <Box style={{ padding: "10px", bgcolor: "snow-white" }}>
                <Box>
                  <Box sx={{ borderRadius: "50%" }}>
                    <img
                      src={studentDetails?.profile_pic || userImg}
                      alt="Profile"
                      className="d-block mx-auto rounded-circle p-1 bg-black bg- bg-white shadow"
                      style={{
                        height: "150px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              md={8}
              xs={12}
              className="d-flex justify-content-center align-items-center"
            >
              <Box style={{ padding: "10px" }}>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="fullname"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Full Name :
                    </InputLabel>
                    <Input
                      id="fullName"
                      value={
                        studentDetails?.name
                          ? studentDetails?.name
                          : "Name Here"
                      }
                      readOnly
                      placeholder="Enter your full name"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <Person2Icon />
                          </IconButton>
                        </InputAdornment>
                      }
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="bio"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Bio :
                    </InputLabel>
                    <Input
                      id="bio"
                      value={
                        studentDetails?.bio ? studentDetails.bio : "Bio Here"
                      }
                      readOnly
                      placeholder="Enter your bio"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <BadgeIcon sx={{ margin: "0px" }} />
                          </IconButton>
                        </InputAdornment>
                      }
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="gender"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Gender :
                    </InputLabel>
                    <Input
                      id="gender"
                      readOnly
                      value={
                        studentDetails?.gender
                          ? studentDetails.gender
                          : "gender Here"
                      }
                      placeholder="Enter your gender"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <WcIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="phone"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Contact Number :
                    </InputLabel>
                    <Input
                      id="phone"
                      readOnly
                      value={
                        studentDetails?.contact_no
                          ? studentDetails.contact_no
                          : "Phone No."
                      }
                      placeholder="Enter contact number"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <PhoneEnabledIcon sx={{ margin: "0px" }} />
                          </IconButton>
                        </InputAdornment>
                      }
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="email"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Email Address :
                    </InputLabel>
                    <Input
                      id="email"
                      readOnly
                      value={
                        studentDetails?.email
                          ? studentDetails.email
                          : "Email Here"
                      }
                      placeholder="Enter your email address"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <EmailIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="date-of-joinning"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Date of Birth :
                    </InputLabel>
                    <Input
                      id="date-of-joinning"
                      readOnly
                      value={
                        studentDetails?.dob
                          ? new Date(studentDetails?.dob)
                              .toISOString()
                              .substr(0, 10)
                          : null
                      }
                      placeholder="Enter date of joining"
                      type="date"
                      style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",

                        display: "flex",
                        margin: "0 auto",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Box
            container
            sx={{
              border: "1px solid #D0D0D0",
              width: "90%",
              margin: "25px auto",
            }}
          ></Box>
          <Box
            className="additional-info-container  "
            sx={{
              [theme.breakpoints.up("xs")]: {
                width: "100%",
                padding: "0 0px",
              },
              [theme.breakpoints.up("md")]: {
                width: "90%",
                padding: "0 30px",
                bgColor: "red",
                margin: "20px auto",
              },
            }}
          >
            <Box className="d-flex justify-content-between">
              <Box
                className=""
                sx={{
                  fontWeight: "700",
                  fontSize: "20px",
                  [theme.breakpoints.up("xs")]: {
                    fontSize: "18px",
                    marginLeft: "10px",
                  },
                  [theme.breakpoints.up("md")]: {
                    fontSize: "18px",
                    marginLeft: "10px",
                  },
                }}
              >
                Additional Information :{" "}
              </Box>
              <Box className=""></Box>
            </Box>
            <form>
              <Box style={{ padding: "15px" }}>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="building"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Building :
                    </InputLabel>
                    <Input
                      id="building"
                      name="Address_building"
                      value={studentDetails?.address_building}
                      placeholder="Enter your building name"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="institute"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Institute Name :
                    </InputLabel>
                    <Input
                      id="institute"
                      name="Institute_name"
                      placeholder="Enter your institution name"
                      value={studentDetails?.institute_name}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="father_name"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Father’s Name :
                    </InputLabel>
                    <Input
                      id="father_name"
                      name="Fathers_Name"
                      placeholder="Enter your father name"
                      value={studentDetails?.fathers_name}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="father_occupation"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Father’s Occupation :
                    </InputLabel>
                    <Input
                      id="father_occupation"
                      name="Fathers_occupation"
                      placeholder="Enter your father's occupation"
                      value={studentDetails?.fathers_occupation}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="local_guardian_name"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Local Guardian Name :
                    </InputLabel>
                    <Input
                      id="local_guardian_name"
                      name="LocalGuardian_name"
                      placeholder="Enter local guardian name"
                      value={studentDetails?.local_guardian_name}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="local_guardian_occupation"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Local Guardian Occupation :
                    </InputLabel>
                    <Input
                      id="local_guardian_occupation"
                      name="LocalGuardian_Occupation"
                      placeholder="Enter local guardian occupation"
                      value={studentDetails?.local_guardian_occupation}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={2}>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="mother_name"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Mother’s Name :
                    </InputLabel>
                    <Input
                      id="mother_name"
                      name="Mother_Name"
                      placeholder="Enter your father's occupation"
                      value={studentDetails?.mother_name}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="mother_occupation"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Mother’s Occupation :
                    </InputLabel>
                    <Input
                      id="mother_occupation"
                      name="Mothers_occupation"
                      placeholder="Enter mother's occupation"
                      value={studentDetails?.mothers_occupation}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="permanent_address"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Permanent Address :
                    </InputLabel>
                    <Input
                      id="permanent_address"
                      name="Permanet_Address"
                      placeholder="Enter your permanent address"
                      value={studentDetails?.permanent_address}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                </Grid>{" "}
                <Grid container spacing={2} mt={2}>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="local_guardian_relation"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      Relation with Local Guardian :
                    </InputLabel>
                    <Input
                      id="local_guardian_relation"
                      name="Relation_localguardian"
                      placeholder="Enter relation with local guardian"
                      value={studentDetails?.relation_local_guardian}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>

                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="state"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      State :
                    </InputLabel>
                    <Input
                      id="state"
                      name="State"
                      placeholder="Enter your state"
                      value={studentDetails?.state}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <InputLabel
                      htmlFor="city"
                      sx={{ fontWeight: "700", coloe: "#384D6C" }}
                    >
                      City :
                    </InputLabel>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      value={studentDetails?.city}
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "10px",

                        display: "flex",
                        margin: "0 auto",
                        borderRadius: "8px 8px 0px 0px",
                        backgroundColor: "#fff",
                      }}
                      readOnly
                    />
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Box>

          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: {
                  xs: "wrap",
                  sm: "wrap",
                  lg: "nowrap",
                  md: "wrap",
                },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <h2 className="text-center"> Aadhar Front </h2>
                <form className="notes-upload-form">
                  <Avatar
                    src={studentDetails?.aadharfront_pic}
                    alt=""
                    sx={{
                      width: {
                        xs: "350px",
                        sm: "380px",
                        lg: "500px",
                        md: "700px",
                      },
                      height: 280,
                      margin: { xs: "", sm: "20px 0px" },
                      borderRadius: "5px",
                    }}
                  />
                </form>
              </Box>

              <Box>
                <h2 className="text-center"> Aadhar Back </h2>

                <form>
                  <Avatar
                    src={studentDetails?.aadharback_pic}
                    alt=""
                    sx={{
                      width: {
                        xs: "350px",
                        sm: "380px",
                        lg: "500px",
                        md: "700px",
                      },
                      height: { xs: 280, sm: 280, md: 400, lg: 280 },
                      margin: { xs: "", sm: "20px 0px" },
                      borderRadius: "5px",
                    }}
                  />
                </form>
              </Box>
            </Box>
          </>

          <Box
            container
            sx={{
              border: "1px solid #D0D0D0",
              width: "100%",
              margin: "25px auto",
            }}
          ></Box>
          <Grid container justifyContent={"center"} spacing={3}>
            <Grid item md={3} xs={6} className="d-flex justify-content-center">
              <button
                style={{
                  backgroundColor: studentDetails?.verified ? "Red" : "Green",
                  border: "1px solid #D1D5DB",
                  borderRadius: "8px",
                  fontWeight: "700",
                  color: "#ffff",
                  width: "160px",
                  padding: "10px 10px",
                }}
                onClick={updatestatus}
              >
                {studentDetails?.verified ? "Reject" : "Verify"}
              </button>
            </Grid>
          </Grid>
        </Box>
        {studentDetails?.verified === false && (
          <ListItemText sx={{ textAlign: "center", color: "red" }}>
            Application is rejected
          </ListItemText>
        )}
        {studentDetails?.verified === null && (
          <ListItemText sx={{ textAlign: "center", color: "#ff8c1a" }}>
            Application is Pending
          </ListItemText>
        )}
        {studentDetails?.verified === true && (
          <ListItemText sx={{ textAlign: "center", color: "Green" }}>
            Application is Verified
          </ListItemText>
        )}

        <Toaster />
      </>
    </Box>
  );
}

export default StudentProfile;
