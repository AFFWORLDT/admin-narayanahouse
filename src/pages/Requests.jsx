import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EnquiryCard from "../components/EnquiryCard";
import axios from "axios";

function Request() {
  const theme = useTheme();
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const [Quotes, setQuotes] = useState([]);
  const getQuotes = async () => {
    const url = `${URL}/admin/`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setQuotes(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);
  return (
    <Box
      bgcolor={"#EEEEFF"}
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
      <Box>
        <p
          className="container"
          style={{ fontSize: "20px", fontWeight: "700", color: "#384D6C" }}
        >
          Enquiry
        </p>
      </Box>
      <div className="w-100" style={{ position: "relative", margin: "50px 0" }}>
        <input
          className="p-2 ms-4 ps-3 input-searchfield"
          style={{
            border: "2px solid black",
            borderRadius: "25px",
            color: "black",
            fontWeight: "bold",
          }}
          type="text"
          placeholder="Search"
        />
        <span
          className="serchicon"
          style={{
            position: "absolute",
            top: "50%",
            right: "965px",
            transform: "translateY(-50%)",
            color: "#888",
          }}
        >
          <SearchIcon />
        </span>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: { xs: "wrap", md: "wrap", sm: "wrap" },
        }}
      >
        {Quotes?.map((obj, i) => {
          const {
            contact_no,
            created_at,
            email,
            full_name,
            hostel_location,
            message,
            seen,
          } = obj;
          return (
            <EnquiryCard
              contact_no={contact_no}
              email={email}
              full_name={full_name}
              message={message}
              hostel_location={hostel_location}
              seen={seen}
              created_at={new Date(created_at).toLocaleString()}
            />
          );
        })}
      </Box>
    </Box>
  );
}

export default Request;
