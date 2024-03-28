import { Box, FormControl, NativeSelect, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EnquiryCard from "../components/EnquiryCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Request() {
  const theme = useTheme();
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const [Quotes, setQuotes] = useState([]);
  const [search, setSearch] = useState("");
  const [filterdata, setFilterData] = useState([]);
  const [status, setStatus] = useState("all");
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

  const handelSeen = async (data) => {
    const Quote_id = data?.quote_id;
    const seen = data?.seen;
    const url = `${URL}/admin/${Quote_id}/seen?seen=${
      seen === true ? false : true
    }`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.put(url, config);
      if (res?.status === 200) {
        toast.success(res?.data?.message);
        getQuotes();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

   useEffect(() => {
     const filterData = Quotes?.filter((quotes) => {
       if (
         !quotes ||
         (!quotes.full_name && !quotes.contact_no && !quotes.hostel_location && !quotes.email)
       ) {
         return false;
       }

       if (!search || search === "") {
         return true;
       }

       const name = quotes.name?.toLowerCase() || "";
       const hostel = quotes.hostel_location
         ? quotes.hostel_location.toLowerCase()
         : "";
       const contactNo = quotes.contact_no
         ? quotes.contact_no.toLowerCase()
         : "";
       const email = quotes.email ? quotes.email.toLowerCase() : "";
       const query = search.toLowerCase();

       return (
         name.includes(query) ||
         hostel.includes(query) ||
         contactNo.includes(query) ||
         email.includes(query)
       );
     });
     setFilterData(filterData);
   }, [search, Quotes]);

   useEffect(() => {
     const filterData = Quotes?.filter((quotes) => {
       if (status === "all") {
         return quotes;
       }
       if (status === "pending") {
         return quotes?.seen === null;
       }
       if (status === "verify") {
         return quotes?.seen === true;
       }
       if (status === "pending") {
         return quotes?.seen === false;
       }
     });
     setFilterData(filterData);
   }, [status, Quotes]);

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
          onChange={(e) => setSearch(e.target.value)}
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

        <FormControl sx={{ margin: "0 20px" }}>
          <NativeSelect
            onChange={(e) => setStatus(e.target.value)}
            sx={{
              color: "#384D6C",
              fontSize: "16px",
              fontWeight: "500",
            }}
            align="center"
          >
            <option
              value={"all"}
              style={{ color: "#384D6C", fontSize: "16px" }}
              align="center"
            >
              All
            </option>
            <option
              value={"pending"}
              style={{ color: "#384D6C", fontSize: "16px" }}
              align="center"
            >
              unseen
            </option>
            <option
              value={"verify"}
              style={{ color: "#384D6C", fontSize: "16px" }}
              align="center"
            >
              seen
            </option>
          </NativeSelect>
        </FormControl>
      </div>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          flexWrap: { xs: "wrap", md: "wrap", sm: "wrap" },
        }}
      >
        {filterdata?.map((obj, i) => {
          const {
            contact_no,
            created_at,
            email,
            full_name,
            hostel_location,
            message,
            seen,
            quote_id,
          } = obj;
          return (
            <EnquiryCard
              key={quote_id}
              contact_no={contact_no}
              email={email}
              full_name={full_name}
              message={message}
              hostel_location={hostel_location}
              seen={seen}
              created_at={new Date(created_at).toLocaleString()}
              handelSeen={() => {
                handelSeen(obj);
              }}
            />
          );
        })}
      </Box>
      <Toaster />
    </Box>
  );
}

export default Request;
