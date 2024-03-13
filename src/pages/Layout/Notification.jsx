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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "bootstrap";
const NotificationDrawer = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState({});
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
    getNotification();
  };

  const handelMessage = (id) => {
    notifications.forEach((obj) => {
      if (obj.notification_id === id) {
        setMessage(obj);
      }
    });
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

  const readNotifi = (id) => {
    let index;
    notifications.forEach((obj, i) => {
      if (obj.notification_id === id) {
        index = i;
      }
    });
    const newArr = notifications.filter((item) => item.notification_id !== id);
    newArr.splice(index, 1);
    setNotifications([...newArr]);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <Badge
          badgeContent={
            notifications.filter((notifications) => !notifications.read).length
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
        PaperProps={{
          style: {
            width: "300px",
            height: "400px",
            borderRadius: "20px",
            margin: "40px 0px",
          },
        }}
      >
        <List>
          {notifications.map((notification) => (
            <>
              <ListItem
                key={notification.notification_id}
                button
                onClick={() => {
                  setShow(true);
                  handelMessage(notification.notification_id);
                }}
              >
                <ListItemText
                  primary={notification.message}
                  primaryTypographyProps={{
                    style: { color: notification.read ? "#000" : "#f00" },
                  }}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      readNotifi(notification.notification_id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <hr />
            </>
          ))}
        </List>
      </Drawer>

      <div>
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {message?.subject}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {message?.message}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default NotificationDrawer;
