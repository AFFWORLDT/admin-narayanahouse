import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  FormLabel,
  Input,
} from "@mui/material";
import Modal from "react-bootstrap/Modal";

import  { Toaster } from "react-hot-toast";

import AddIcon from "@mui/icons-material/Add";

import TextField from "@mui/material/TextField";

const News = () => {
  const [news, setNews] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  
  const [description, setDescription] = useState("");
  const [headline, setHeadline] = useState("");
  const [subject, setSubject] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getNews = async () => {
    const url = `${URL}/news/?page=${pageNo}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setNews(res?.data);
    } catch (error) {}
  };

  const addNews = async () => {
    const url = `${URL}/news/?api_key=${process.env.REACT_APP_API_KEY}`;
    const data = {
      subject: subject,
      headline: headline,
      description: description,
      icon:""
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post(url, data, config);
      if (res?.status === 200) {
        alert("News Add Successfully");
      }
      handleClose();
      getNews();
    } catch (error) {
      console.log(error.message);
      handleClose();
    }
  };

  const currentDate = new Date();
  const sortedNews = news.sort((a, b) => {
    const aDate = new Date(a.timestamp);
    const bDate = new Date(b.timestamp);
    const aMonthsAgo =
      currentDate.getMonth() -
      aDate.getMonth() +
      12 * (currentDate.getFullYear() - aDate.getFullYear());
    const bMonthsAgo =
      currentDate.getMonth() -
      bDate.getMonth() +
      12 * (currentDate.getFullYear() - bDate.getFullYear());
    if (aMonthsAgo === bMonthsAgo) {
      return new Date(a.timestamp) - new Date(b.timestamp);
    }
    return aMonthsAgo - bMonthsAgo;
  });

  useEffect(() => {
    getNews();
  }, []);

  return (
    <div className=" h-100 p-3 " style={{ marginLeft: "2%" }}>
      <h2 className="text-center">News </h2>

      <div className="d-flex justify-content-end"></div>
      <div className="d-flex justify-content-between mb-3 ">
        <Button
          sx={{ margin: "10px" }}
          onClick={handleShow}
          variant="contained"
          color="success"
        >
          <AddIcon />
          Create News
        </Button>
      </div>
      {/* </div> */}
      <Stack
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            background: "#fff",
            height: "auto",
            borderRadius: "20px",
            margin: "20px 30px",
            padding: "10px 5px",
          }}
        >
          <h2 style={{ margin: "20px 30px" }}>News Update</h2>

          {sortedNews?.map((item, i) => {
            return (
              <>
                <Box
                  key={item.news_id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    background: "#ccc",
                    padding: "10px 10px",
                    borderRadius: "10px",
                    margin: "5px 0",
                  }}
                >
                  <h2>{item.headline}</h2>
                  <p>{item.description}</p>
                  <p>{new Date(item.timestamp).toLocaleDateString()}</p>
                </Box>
              </>
            );
          })}
        </Box>
      </Stack>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="scroll-bar">
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter Name"
                value={headline}
                onChange={(e) => {
                  setHeadline(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Enter tagline"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField
                fullWidth
                placeholder="Enter location"
                variant="outlined"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
            {/* <FormControl id="pic">
              <FormLabel></FormLabel>
              <Input
                type="file"
                p={1.5}
                accept="image/*"
                // onChange={(e) => {
                //   postDetails(e.target.files[0]);
                // }}
              />
            </FormControl> */}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button
            sx={{ margin: "10px" }}
            variant="contained"
            color="success"
            onClick={addNews}
          >
            Add News
          </Button>
        </Modal.Footer>
      </Modal>

      <Toaster />
    </div>
  );
};
export default News;
