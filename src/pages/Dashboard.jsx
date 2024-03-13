import { Box, Card, Stack } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useState } from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import axios from "axios";
const Dashboard = () => {
  const [Student, setStudent] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [hostel, setHostel] = useState([]);
  const [news, setNews] = useState([]);
  const URL = process.env.REACT_APP_PROD_ADMIN_API;
  const getStudents = async () => {
    const url = `${URL}/student/?page=${pageNo}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setStudent(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getHostal = async () => {
    const url = `${URL}/hostel/?page=${pageNo}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setHostel(res?.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getnews = async () => {
    const url = `${URL}/news/?page=${pageNo}`;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.get(url, config);
      setNews(res?.data);
    } catch (error) {
      console.log(error.message);
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
    getStudents();
    getHostal();
    getnews();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#F9FAFB",
       marginLeft:"265px",
          height: "auto",
          padding: "30px 50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <Card
            sx={{
              height: "300px",
              width: "300px",
              background: "#E9FCD4",
              border: "none",
              boxShadow: "none",
              borderRadius: "20px",
              margin: "10px 0px",
            }}
          >
            <Box
              sx={{
                width: "100px",
                margin: "30px auto",
                height: "100px",
                borderRadius: "70%",
                background: "#D1F0BC",
                padding: "20px",
              }}
            >
              {" "}
              <GroupsIcon sx={{ color: "#229A16", fontSize: "50px" }} />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                fontSize: "25px",
                display: "block",
                fontWeight: "600",
                color: "#229A16",
              }}
            >
              {" "}
              {Student.length}
            </Box>
            <p
              style={{
                textAlign: "center",
                color: "#229A16",
                fontWeight: "600",
              }}
            >
              {" "}
              Total Students
            </p>
          </Card>
          <Card
            sx={{
              height: "300px",
              width: "300px",
              background: "#E9FCD4",
              border: "none",
              boxShadow: "none",
              borderRadius: "20px",
              margin: "10px 0px",
            }}
          >
            <Box
              sx={{
                width: "100px",
                margin: "30px auto",
                height: "100px",
                borderRadius: "70%",
                background: "#D1F0BC",
                padding: "20px",
              }}
            >
              {" "}
              <ApartmentIcon sx={{ color: "#229A16", fontSize: "50px" }} />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                fontSize: "25px",
                display: "block",
                fontWeight: "600",
                color: "#229A16",
              }}
            >
              {" "}
              {hostel.length}
            </Box>
            <p
              style={{
                textAlign: "center",
                color: "#229A16",
                fontWeight: "600",
              }}
            >
              {" "}
              Total Hostel
            </p>
          </Card>
          <Card
            sx={{
              height: "300px",
              width: "300px",
              background: "#E9FCD4",
              border: "none",
              boxShadow: "none",
              borderRadius: "20px",
              margin: "10px 0px",
            }}
          >
            <Box
              sx={{
                width: "100px",
                margin: "30px auto",
                height: "100px",
                borderRadius: "70%",
                background: "#D1F0BC",
                padding: "20px",
              }}
            >
              {" "}
              <GroupsIcon sx={{ color: "#229A16", fontSize: "50px" }} />
            </Box>
            <Box
              sx={{
                textAlign: "center",
                fontSize: "25px",
                display: "block",
                fontWeight: "600",
                color: "#229A16",
              }}
            >
              {" "}
              {Student.length}
            </Box>
            <p
              style={{
                textAlign: "center",
                color: "#229A16",
                fontWeight: "600",
              }}
            >
              {" "}
              Total Students
            </p>
          </Card>
        </Box>
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
      </div>
    </>
  );
};

export default Dashboard;
