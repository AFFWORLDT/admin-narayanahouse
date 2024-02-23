import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Advitisors";
import FileManager from "./pages/FileManager";
import Analytics from "./pages/Offers";
import Order from "./pages/Order";
import Saved from "./pages/Saved";
import Setting from "./pages/Setting";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./pages/Layout/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Advitisors from "./pages/Advitisors";
import Offers from "./pages/Offers";
import TransactionDeatil from "./pages/TransactionDeatil";
import { Toaster } from "react-hot-toast";
import Students from "./pages/Students";
import Wallet from "./pages/Wallet";
import Hostels from "./pages/Hostels";

function App() {
  return (
    <>
      <Router>
        <Header />
        <SideBar />
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
          <Route path="/advitisors" element={<PrivateRoute Component={Advitisors} />} />
          <Route path="/hostels" element={<PrivateRoute Component={Hostels} />} />
          <Route path="/transactionDeatil" element={<PrivateRoute Component={TransactionDeatil} />} />
          <Route path="/offers" element={<PrivateRoute Component={Offers} />} />
          <Route path="/file-manager" element={<PrivateRoute Component={FileManager} />} />
          <Route path="/students" element={<PrivateRoute Component={Students} />} />
          <Route path="/wallet" element={<PrivateRoute Component={Wallet} />} />



          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
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



