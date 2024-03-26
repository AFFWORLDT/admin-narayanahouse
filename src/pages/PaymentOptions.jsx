import { Box, Paper, useTheme, Typography, Grid, Button } from "@mui/material";
import React, { useState, useRef } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import axios from "axios";

function PaymentOptions() {
  const [qrImage, setQrImage] = useState("");
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fileInputRef = useRef(null);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const [previewImage, setPreviewImage] = useState(null);

  const clearImage = () => {
    setPreviewImage(null);
    setQrImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const handlClick = () => {
    if (!fileInputRef.current) return null;
    fileInputRef.current.click();
  };
  function qrFileHandler(e) {
    const file = e.target.files[0];
    setQrImage(file);

    const reader = new FileReader();
    reader.onload = function (event) {
      setPreviewImage(event.target.result);
    };
    reader.readAsDataURL(file);
  }

  const UploadQrImage = async () => {
    if (!qrImage) {
      toast.error("Please select a file first!", 3000);
      return;
    }
    if (!upiId) {
      toast.error("Please select upi id!", 3000);
      return;
    }

    const formData = new FormData();
    formData.append("file", qrImage);
    formData.append("upi_id", upiId.trim());
    try {
      const response = await axios.post(`${URL}/admin/qrcode`, formData);
      if (response) {
        toast.success("Payment details uploaded successfully", 3000);
        setPreviewImage(null);
        setQrImage("");
        setUpiId("");
      }
    } catch (error) {
      console.error("Error uploading QR image:", error);
      toast.error("Failed to upload payment details", 3000);
    } finally {
      setLoading(false);
      setPreviewImage(null);
      setQrImage("");
      setUpiId("");
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
              padding: "10px 20px",
            },
          }}
        >
          <Paper
            sx={{
              margin: "0 auto",
              backgroundColor: "#F6F6F6",
              marginTop: "40px",
              padding: "20px",
              [theme.breakpoints.up("xs")]: {
                width: "310px",
              },
              [theme.breakpoints.up("md")]: {
                width: "700px",
              },
            }}
          >
            <Typography
              sx={{
                [theme.breakpoints.up("xs")]: {
                  color: "#384D6C",
                  fontWeight: "bold",
                  fontSize: "18px",
                },
                [theme.breakpoints.up("md")]: {
                  color: "#384D6C",
                  fontWeight: "bold",
                  fontSize: "22px",
                },
              }}
            >
              Update Payment Details
            </Typography>

            <Box className="payment-info-container mt-5 ">
              <Box className="box-1 mb-5  ">
                <Grid container spacing={{ xs: 2 }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    className=" justify-content-center d-flex align-items-center "
                  >
                    <Typography
                      sx={{
                        [theme.breakpoints.up("xs")]: {
                          color: "#384D6C",
                          fontWeight: "bold",
                          fontSize: "18px",
                        },
                      }}
                    >
                      QR :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Paper
                      onClick={handlClick}
                      sx={{
                        backgroundColor: "#DEDEDE",
                        borderRadius: "10px",
                        cursor: "pointer",
                        position: "relative",
                        [theme.breakpoints.up("md")]: {
                          margin: "0 auto",
                          height: "250px",
                          width: "300px",
                        },
                        [theme.breakpoints.up("xs")]: {
                          width: "250px",
                          height: "210px",

                          margin: "5px",
                          margin: "0 auto",
                        },
                      }}
                    >
                      <Box className="w-100  h-100 d-flex justify-content-center align-items-center flex-column">
                        {previewImage ? (
                          <>
                            <DeleteIcon
                              onClick={clearImage}
                              fontSize="large"
                              style={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                color: "red",
                              }}
                            />

                            <img
                              src={previewImage}
                              alt="Preview"
                              style={{ maxWidth: "100%", maxHeight: "100%" }}
                            />
                          </>
                        ) : (
                          <>
                            <CloudUploadIcon fontSize="large" color="#384D6C" />
                            <input
                              type="file"
                              name="file"
                              onChange={qrFileHandler}
                              ref={fileInputRef}
                              style={{ display: "none" }}
                            />
                          </>
                        )}
                      </Box>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              <Box className="box-2 mb-5">
                <Grid container spacing={{ xs: 2 }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    className=" justify-content-center d-flex align-items-center"
                  >
                    <Typography
                      sx={{
                        [theme.breakpoints.up("xs")]: {
                          color: "#384D6C",
                          fontWeight: "bold",
                          fontSize: "18px",
                        },
                      }}
                    >
                      UPI ID :
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Box
                      className="d-flex  justify-content-center align-items-center"
                      sx={{
                        width: "300px",
                        margin: "0 auto",
                        backgroundColor: "#DEDEDE",
                        borderRadius: "10px",
                        cursor: "pointer",
                        [theme.breakpoints.up("md")]: {
                          width: "300px",
                        },
                        [theme.breakpoints.up("xs")]: {
                          width: "250px",
                        },
                      }}
                    >
                      <input
                        type="text"
                        className="form-control py-2"
                        placeholder="Enter upi id"
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>

              <Box className="box-2">
                <Grid container>
                  <Grid item xs={0} md={4}></Grid>
                  <Grid item xs={12} md={8}>
                    <Box
                      className="d-flex  justify-content-center align-items-center"
                      sx={{
                        [theme.breakpoints.up("md")]: {
                          width: "300px",
                          margin: "0 auto",
                          cursor: "pointer",
                          padding: "0 5px",
                        },
                        [theme.breakpoints.up("xs")]: {
                          width: "260px",
                          margin: "0 auto",
                          cursor: "pointer",
                          padding: "0 5px",
                        },
                      }}
                    >
                      <Button
                        onClick={UploadQrImage}
                        sx={{
                          [theme.breakpoints.up("xs")]: {
                            backgroundColor: "#384D6C",
                            color: "white",
                            width: "100%",
                            "&:hover": {
                              backgroundColor: "#384D6C",
                            },
                          },
                        }}
                      >
                        {loading ? "Uploading..." : "Upload"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  );
}

export default PaymentOptions;
