import { Route, Routes } from "react-router-dom";
import HostelOverView from '../Pages/Landing/HostelInfo'
import RoomBookings from "../Pages/Landing/RoomBookings";
import SignUpPage from "../Pages/Landing/SignUpPage";
import Landing from "../Pages/Landing/Landing";
import LoginPage from "../Pages/Landing/LoginPage";
import OtpPage from "../Pages/Landing/OtpPage";
import RequestPage from "../Pages/Students/RequestPage";
import PaymentPage from "../Pages/Students/PaymentPage";
import StudentVerificaion from "../Verification/studentVerification";






const RoomBookingRoutes = () => {
  return (
    <Routes>
     <Route path='/request/:id' element={<StudentVerificaion><RequestPage /></StudentVerificaion>}></Route>
     <Route path='/rent-payment' element={<StudentVerificaion><PaymentPage /></StudentVerificaion>}></Route>
    </Routes>
  );
};

export default RoomBookingRoutes;

