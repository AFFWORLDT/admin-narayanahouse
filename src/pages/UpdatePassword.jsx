import { Box, Button, Input, Typography, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function UpdatePassword() {
  const [studentDetails, setStudentDetails] = useState({
    email: "",
    password: "",
  });
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const [conf, setConf] = useState("");
  const theme = useTheme();
  const Handelchange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const validation = () => {
    if (!studentDetails?.email) {
      toast.error("Email is Required");
      return false;
    }
    if (!studentDetails?.password) {
      toast.error("Password is Required");
      return false;
    }
    if (!conf) {
      toast.error("conform Password is Required");
      return false;
    }
    if (studentDetails?.password !== conf) {
      toast.error("Both Passwords are not the Same");
      return false;
    }

    return true;
  };

  const restPassword = async () => {
    if (validation() === false) {
      return;
    }
    const url = `${URL}/student/update-password`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.patch(url, studentDetails, config);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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
              Update Password :
            </Typography>
          </Box>

          <Box
            sx={{
              border: "1px solid  #B3B3B3",
              borderRadius: 5,
              padding: 4,
              width: { xs: 340, md: 600 },

              margin: "50px  auto",
            }}
          >
            <Box mb={3}>
              <Typography
                className="container"
                sx={{
                  fontSize: { xs: 16, md: 20 },
                  fontWeight: "700",
                  bgcolor: "#384D6C",
                  textAlign: "center",
                  width: "fit-content",
                  marginX: "auto",
                  color: "#fff",
                  padding: "5px 20px",
                  borderRadius: 3,
                }}
              >
                Update Student Password
              </Typography>
            </Box>

            <Box className="form-container">
              <div className="row gtr-uniform mb-3">
                <InputLabel htmlFor="email" className="mb-2 fw-bold">
                  Email
                </InputLabel>
                <Input
                  id="email"
                  placeholder="Enter Student Email"
                  name="email"
                  className="form-control"
                  onChange={Handelchange}
                />
              </div>

              <div className="row gtr-uniform mb-3">
                <InputLabel htmlFor="password" className="mb-2 fw-bold">
                  New Password
                </InputLabel>
                <Input
                  id="password"
                  placeholder="Enter New Password"
                  name="password"
                  className="form-control"
                  onChange={Handelchange}
                  type="password"
                />
              </div>

              <div className="row gtr-uniform mb-3">
                <InputLabel htmlFor="confirm_password" className="mb-2 fw-bold">
                  Confirm New Password
                </InputLabel>
                <Input
                  id="confirm_password"
                  placeholder="Confirm New Password"
                  name="confirm_password"
                  className="form-control"
                  type="password"
                  value={conf}
                  onChange={(e) => setConf(e.target.value)}
                />
              </div>

              <Button
                sx={{
                  backgroundColor: "#384D6C",
                  border: "1px solid #D1D5DB",
                  color: "white",
                  padding: "5px 20px",
                  borderRadius: 3,
                  margin: "0 auto",
                  display: "block",
                  fontSize: { xs: 16, md: 18 },
                  fontWeight:"bold",
                  '&:hover': { backgroundColor: '#384D6C' }
                }}
                onClick={restPassword}
              >
                RESET PASSWORD
              </Button>
            </Box>
          </Box>
        </Box>
        <Toaster />
      </Box>
    </>
  );
}

export default UpdatePassword;
