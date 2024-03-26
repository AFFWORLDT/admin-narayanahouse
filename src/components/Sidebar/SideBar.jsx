import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Link as RouterLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import logo from "./../../assets/img/logonarayana.png";
import { Button } from "@mui/material";
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "../../service/localstorage";
import adminImg from "../../assets/img/logonarayana.png";
import { toast } from "react-hot-toast";
import LockClockIcon from "@mui/icons-material/LockClock";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const drawerWidth = 265;

function SideBar(props) {
  const { window } = props;
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = getUserFromLocalStorage();

    setUser(user);
  }, [user]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opendropdown = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    removeUserFromLocalStorage();
    toast.success("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      path: "/roomallocation",
      name: "Room Allocation",
      icon: <RoomPreferencesIcon />,
    },

    {
      path: "/students",
      name: "Students",
      icon: <AssignmentIndIcon />,
    },
    {
      path: "/roomallocationhistory",
      name: "Allocation History",
      icon: <WorkHistoryIcon />,
    },
    {
      path: "/updatepassword",
      name: "Update Password",
      icon: <LockClockIcon />,
    },
    // {
    //   path: "/news",
    //   name: "News",
    //   icon: <MonetizationOnIcon />,
    // },
    // {
    //   path: "/wallet",
    //   name: "Wallet",
    //   icon: <MonetizationOnIcon />,
    // },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ background: "#fff" }}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>

          <IconButton
            color="inherit"
            aria-label="open menu"
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleClick}
            edge="end"
            sx={{ ml: "auto" }}
          >
            <Avatar src={adminImg} alt="adminImg " />
          </IconButton>
          <Button
            sx={{ marginLeft: "20px" }}
            onClick={handleLogout}
            variant="contained"
            color={user ? "error" : "primary"}
          >
            {user ? "Logout" : "Login"}
          </Button>
          {/* <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={opendropdown}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu> */}
        </Toolbar>
      </AppBar>
      <Drawer
        container={container}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          ...(isMobile && {
            "& .MuiDrawer-paperAnchorLeft": {
              width: drawerWidth,
            },
          }),
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={logo}
          sx={{
            width: 120,
            height: 120,
            margin: "20px auto",
            borderRadius: "10px",
          }}
        />

        <List sx={{ margin: "10px" }}>
          {routes.map((item, index) => (
            <ListItemButton
              key={index}
              component={RouterLink}
              to={item.path}
              onClick={() => handleItemClick(item)}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#EDF6FF" : "transparent",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
              <ListItemIcon
                sx={{
                  background: "#fff",
                  width: 39,
                  height: 46.05,
                  borderRadius: "50%",
                  padding: "15px 15px",
                }}
              >
                <ArrowForwardIosIcon fontSize="sm" />
              </ListItemIcon>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          marginLeft: { sm: open ? `${drawerWidth}px` : 0 },
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default SideBar;
