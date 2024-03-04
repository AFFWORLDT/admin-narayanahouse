import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import avtarAdmin from "../../assets/img/admin.webp";
import InsightsIcon from "@mui/icons-material/Insights";
import { removeUserFromLocalStorage } from "../../service/localstorage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import NotificationDrawer from "./Notification";

const pages = ["Dashboard", "Offers", "Transactions"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // Your logout logic here
    console.log("Logging out...");
    removeUserFromLocalStorage();
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 2000);
  };

  const handleAccount = () => {
    // Your account logic here
    console.log("Navigating to account...");
  };

  const handleSettings = () => {
    // Your settings logic here
    console.log("Opening settings...");
  };
  const handleProfile = () => {
    // Your settings logic here
    console.log("Opening Profile...");
  };

  const handleMenuItemClick = (menuItem) => {
    switch (menuItem) {
      case "Logout":
        handleLogout();
        break;
      case "Account":
        handleAccount();
        break;
      case "Dashboard":
        handleSettings(); // Assuming 'Dashboard' should open settings
        break;
      case "Profile":
        handleProfile(); // Assuming 'Profile' should open settings
        break;
      default:
        break;
    }
    // handleCloseUserMenu();
  };

  return (
    <AppBar position="static " style={{ backgroundColor: "#00073d" }}>
      <Toolbar disableGutters>
        <Box style={{ cursor: "pointer" }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              marginLeft: 7,
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
            onClick={() => navigate("/")}
          >
            Admin Narayana House
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
            margin: "0 10px",
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <InsightsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Admin Narayana House
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <NotificationDrawer />
        <Box sx={{ flexGrow: 0, margin: "10px 15px" }}>
          <Tooltip title="Admin settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
              <Avatar alt="Rahul" src={avtarAdmin} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => handleMenuItemClick(setting)}
              >
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
