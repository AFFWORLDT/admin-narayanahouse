import React, { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const NotificationDrawer = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const getNotification = async () => {
    const url = `${URL}/notification/?page=1`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setNotifications(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getNotification();
  }, []);

 
  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <Badge
          badgeContent={
            notifications.filter((notification) => !notification.read).length
          }
          color="secondary"
        >
          <NotificationsActiveIcon sx={{ color: "white" }} />
        </Badge>
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ style: { width: "300px" } }}
      >
        <List>
          {notifications.map((notification) => (
            <>
              <ListItem
                key={notification.id}
               
                button
              >
                <ListItemText
                  primary={notification.message}
                  primaryTypographyProps={{
                    
                    style: { color: notification.read ? "#000" : "#f00" },
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <hr />
            </>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default NotificationDrawer;
