import { Route,Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import Locaion from "../Components/Landing/Location/Locaion";
import OtpPage from "../Pages/Landing/OtpVerificaion";
import Login from '../Pages/HostelAdmin/Login'
import LandingPage from '../Pages/HostelAdmin/Welcome'
import AddHostel from '../Pages/HostelAdmin/AddHostel'



const hostelRoutes = () => {
    return (
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/locaion" element={<Locaion/>}></Route>
        <Route path="/otpVerification" element={<OtpPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/getStarted" element={<LandingPage/>}></Route>
        <Route path="/addHostel" element={<AddHostel/>}></Route>
      </Routes>
    );
  };
  
  export default hostelRoutes;