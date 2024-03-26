import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./pages/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";

import { Toaster } from "react-hot-toast";
import Students from "./pages/Students";
import Wallet from "./pages/Wallet";
import Hostels from "./pages/Hostels";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "./service/localstorage";
import NewsPost from "./pages/NewsPost";
import RoomAllocation from "./pages/RoomAllocation";
import StudentProfile from "./pages/StudentProfile";
import RoomAllocationHistory from "./pages/RoomAllocationHistory";
import PaymentOptions from "./pages/PaymentOptions";
import UpdatePassword from "./pages/UpdatePassword";

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = getUserFromLocalStorage();

    setUser(user);
  }, []);
  return (
    <>
      <Router>
        {user ? <SideBar /> : null}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
          {/* <Route path="/advitisors" element={<PrivateRoute Component={Advitisors} />} /> */}
          <Route
            path="/hostels"
            element={<PrivateRoute Component={Hostels} />}
          />
          <Route
            path="/roomallocation"
            element={<PrivateRoute Component={RoomAllocation} />}
          />
          <Route path="/news" element={<PrivateRoute Component={NewsPost} />} />
          {/* <Route path="/offers" element={<PrivateRoute Component={Offers} />} /> */}
          {/* <Route path="/file-manager" element={<PrivateRoute Component={FileManager} />} /> */}
          <Route
            path="/students"
            element={<PrivateRoute Component={Students} />}
          />
          <Route
            path="/roomallocationhistory"
            element={<PrivateRoute Component={RoomAllocationHistory} />}
          />
          <Route
            path="/updatepassword"
            element={<PrivateRoute Component={UpdatePassword} />}
          />
          <Route
            path="/studentprofile/:id"
            element={<PrivateRoute Component={StudentProfile} />}
          />
          <Route path="/payment-option" element={<PrivateRoute Component={PaymentOptions} />} />

          {/* <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} /> */}
          <Route path="/settings" element={<Setting />} />
          <Route path="/register" element={<Register />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
