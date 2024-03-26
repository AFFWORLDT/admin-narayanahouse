import {
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import EmailIcon from "@mui/icons-material/Email";
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
    <Box
      bgcolor={"#fff"}
    
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
      <Box
        component={"div"}
        sx={{
          bgcolor: "#EEEEFF",
          height: 450,
          width: { xs: 400, md: 700 },
          margin: { xs: "0.5rem auto" },
          borderRadius: "15px",
          border: "1px solid black",
          padding: "10px 15px",
        }}
      >
        <Box>
          <p
            className="container"
            style={{ fontSize: "20px", fontWeight: "700", color: "#384D6C" }}
          >
            Update Student Password
          </p>
        </Box>

        <InputLabel
          htmlFor="email"
          sx={{ fontWeight: "700", color: "#384D6C", margin: "5px 15%" }}
        >
          Email
        </InputLabel>
        <Input
          id="email"
          placeholder="Enter Student Email"
          name="email"
          sx={{
            border: "0.5px solid #ccc",
            borderBottom: "none",
            outline: "none",
            borderRadius: "8px",
            padding: "10px",
            margin: "0 15%",
            mb: "20px",
            width: { xs: 250, md: 400 },
            height: "40px",
            backgroundColor: "#fff",
          }}
          onChange={Handelchange}
        />
        <InputLabel
          htmlFor="password"
          sx={{ fontWeight: "700", color: "#384D6C", margin: "5px 15%" }}
        >
          New Password
        </InputLabel>
        <Input
          id="password"
          placeholder="Enter New Password"
          name="password"
          sx={{
            border: "0.5px solid #ccc",
            borderBottom: "none",
            outline: "none",
            borderRadius: "8px",
            padding: "10px",
            margin: "0 15%",
            width: { xs: 250, md: 400 },
            height: "40px",
            backgroundColor: "#fff",
            mb: "20px",
          }}
          onChange={Handelchange}
          type="password"
        />
        <InputLabel
          htmlFor="password"
          sx={{ fontWeight: "700", color: "#384D6C", margin: "5px 15%" }}
        >
          Confirm New Password
        </InputLabel>
        <Input
          id="password"
          placeholder="Confirm New Password"
          name="confirm_password"
          sx={{
            border: "0.5px solid #ccc",
            borderBottom: "none",
            outline: "none",
            borderRadius: "8px",
            padding: "10px",
            margin: "0 15%",
            width: { xs: 250, md: 400 },
            height: "40px",
            backgroundColor: "#fff",
            mb: "20px",
          }}
          type="password"
          value={conf}
          onChange={(e) => setConf(e.target.value)}
        />

        <Button
          sx={{
            backgroundColor: "#384D6C",
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            fontWeight: "700",
            color: "#ffff",
            width: { xs: 250, md: 400 },
            padding: "5px 10px",
            height: 40,
            margin: "20px 15%",
          }}
          onClick={restPassword}
        >
          RESET PASSWORD
        </Button>
      </Box>
      <Toaster />
    </Box>
  );
}

export default UpdatePassword;
