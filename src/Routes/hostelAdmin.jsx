import { Route,Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import Locaion from "../Components/Landing/Location/Locaion";
import OtpPage from "../Pages/Landing/OtpVerificaion";
import Login from '../Pages/HostelAdmin/Login'



const hostelRoutes = () => {
    return (
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/locaion" element={<Locaion/>}></Route>
        <Route path="/otpVerification" element={<OtpPage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    );
  };
  
  export default hostelRoutes;