import { Box } from "@mui/material";
import React from "react";

function EnquiryCard({
  contact_no,
  created_at,
  email,
  full_name,
  hostel_location,
  message,
  seen,
  quote_id,
  handelSeen,
}) {
 
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        width: 550,
        height: 350,
        bgcolor: "#fff",
        padding: "10px 15px",
        border: "1px solid black",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Box>
        <Box sx={{ fontWeight: "600", fontSize: "16px", color: "#384D6C" }}>
          {" "}
          {created_at}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box
            component={"p"}
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#989696",
            }}
          >
            Name
          </Box>
          <Box
            component={"p"}
            sx={{
              fontSize: "15px",
              color: "#384D6C",
              margin: "-18px 0",
              fontWeight: "600",
            }}
          >
            {full_name}
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Box
            component={"p"}
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#989696",
            }}
          >
            Contact
          </Box>
          <Box
            component={"p"}
            sx={{
              fontSize: "15px",
              color: "#384D6C",
              margin: "-18px 0",
              fontWeight: "600",
            }}
          >
            {contact_no}
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Box
            component={"p"}
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#989696",
            }}
          >
            Email
          </Box>
          <Box
            component={"p"}
            sx={{
              fontSize: "15px",
              color: "#384D6C",
              margin: "-18px 0",
              fontWeight: "600",
            }}
          >
            {email}
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Box
            component={"p"}
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              color: "#989696",
            }}
          >
            Hostel
          </Box>
          <Box
            component={"p"}
            sx={{
              fontSize: "15px",
              color: "#384D6C",
              margin: "-18px 0",
              fontWeight: "600",
            }}
          >
            {hostel_location}
          </Box>
        </Box>

        <Box sx={{ margin: "40px 50%" }}>
          {seen == null && (
            <button
              style={{
                width: 280,
                height: 35,
                backgroundColor: "#384D6C",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "650",
              }}
              onClick={handelSeen}
              type="button"
            >
              UNSEEN
            </button>
          )}
          {seen == false && (
            <button
              style={{
                width: 280,
                height: 35,
                backgroundColor: "#384D6C",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "650",
              }}
              onClick={handelSeen}
              type="button"
            >
              UNSEEN
            </button>
          )}
          {seen == true && (
            <button
              style={{
                width: 280,
                height: 35,
                backgroundColor: "#3F6C38",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "15px",
                fontWeight: "650",
              }}
              onClick={handelSeen}
              type="button"
            >
              SEEN
            </button>
          )}
        </Box>
      </Box>

      <Box
        component={"div"}
        sx={{ position: "absolute", left: "14.5rem", top: "3.4rem" }}
      >
        <Box
          component={"p"}
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#989696",
          }}
        >
          Message
        </Box>
        <Box
          sx={{
            paddingRight: "20px",
            textAlign: "justify",
            fontSize: "15px",
            fontWeight: "600",
            color: "#384D6C",
          }}
        >
          {message}
        </Box>
      </Box>
    </Box>
  );
}

export default EnquiryCard;
