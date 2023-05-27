import { Route,Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import Locaion from "../Components/Landing/Location/Locaion";
import OtpPage from "../Pages/Landing/OtpVerificaion";
import Login from '../Pages/HostelAdmin/Login'
import LandingPage from '../Pages/HostelAdmin/Welcome'
import AddHostel from '../Pages/HostelAdmin/AddHostel'
import HostelAdmin from '../Verification/hostelAdminVerification'



const hostelRoutes = () => {
    return (
      <Routes>
        <Route path="/register" element={<HostelAdmin> <Register/></HostelAdmin>}></Route>
        <Route path="/otpVerification" element={ <HostelAdmin><OtpPage/> </HostelAdmin>}></Route>
        <Route path="/login" element={<HostelAdmin><Login/> </HostelAdmin>}></Route>
        <Route path="/getStarted" element={<HostelAdmin><LandingPage/> </HostelAdmin>}></Route>
        <Route path="/addHostel" element={<HostelAdmin><AddHostel/> </HostelAdmin>}></Route>
      </Routes>
    );
  };
  
  export default hostelRoutes;