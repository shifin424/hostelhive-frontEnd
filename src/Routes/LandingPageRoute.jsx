import { Route, Routes } from "react-router-dom";
import HostelOverView from '../Pages/Landing/HostelInfo'
import RoomBookings from "../Pages/Landing/RoomBookings";
import SignUpPage from "../Pages/Landing/SignUpPage";
import Landing from "../Pages/Landing/Landing";
import LoginPage from "../Pages/Landing/LoginPage";
import OtpPage from "../Pages/Landing/OtpPage";
import RoomBookingRoutes from "./RoomBooking";
import StudentVerificaion from "../Verification/studentVerification";






const LandingPageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentVerificaion><Landing /></StudentVerificaion>} />
      <Route path="/over-view" element={<StudentVerificaion><HostelOverView /></StudentVerificaion>}></Route>
      <Route path="/signup" element={<StudentVerificaion><SignUpPage /></StudentVerificaion>}></Route>
      <Route path='/login' element={<StudentVerificaion><LoginPage /></StudentVerificaion>}></Route>
      <Route path="/otp-page" element={<StudentVerificaion><OtpPage /></StudentVerificaion>}></Route>
      <Route path="/room-booking" element={<StudentVerificaion><RoomBookings /></StudentVerificaion>}></Route>
      <Route path='/room-booking/*' element={ <StudentVerificaion><RoomBookingRoutes /></StudentVerificaion>}></Route>
    </Routes>
  );
};

export default LandingPageRoutes;