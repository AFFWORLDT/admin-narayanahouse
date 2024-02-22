
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/auth';
import { useState } from 'react';
import axios from 'axios';
import loginGif from "../../assets/img/login.gif";
import { useAuth } from '../../context/User';
import toast, { Toaster } from 'react-hot-toast';
import adminIcon from "../../assets/img/affworld.ico"




const defaultTheme = createTheme();
const URL = process.env.REACT_APP_ADMIN_NODE_SERVER_URL;


 const adminLogin = async(data) => {
  // console.log("admin data login -->", data);

  try {
      const res = await axios.post(`${URL}/api/v1/auth/login`, data)
      console.log("this is student login data-->", res);
      return res.data;

  } catch (error) {
      console.log("Error  baaackservies Submitting data in frontEnd --> ", error);
  }

}

export default function SignInSide() {

  const [ auth, setAuth ] = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  // const [auth, setAuth] = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    }


    const res = await adminLogin(data);


    // console.log("this is for teahcer ---> " , res);
    if (res?.success === false) {
      // console.log("this is for sjdgfsadfd teahcer ---> ");
      toast.error(res?.message);

      return;
    }
    if (res?.success) {
      toast.success("Login Successfully");
      localStorage.setItem("auth", JSON.stringify(res?.user));
      localStorage.setItem("token", JSON.stringify(res?.token));

      setTimeout(() => {
        navigate("/");
      }, 2000) 
    
      setAuth({
        user: res?.user,
        token: res?.token
      });


    }
  }








  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${loginGif})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              // backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >

              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' , width: 50, height: 50  }} src={adminIcon} />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />


                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* <ToastContainer /> */}
      <Toaster/>
    </>
  );
}

