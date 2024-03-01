import { Button, Modal } from "bootstrap";
import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import { FormControl } from "react-bootstrap";
import { TextField } from "@mui/material";

const News = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Button
        sx={{ margin: "10px" }}
        onClick={handleShow}
        variant="contained"
        color="success"
      >
        <AddIcon /> Add Hostels
      </Button>
    </div>
  );
};
export default News;
