import { Route, Routes } from "react-router-dom";
import HostelOverView from '../Pages/Landing/HostelInfo'
import RoomBookings from "../Pages/Landing/RoomBookings";
import SignUpPage from "../Pages/Landing/SignUpPage";
import Landing from "../Pages/Landing/Landing";
import LoginPage from "../Pages/Landing/LoginPage";
import OtpPage from "../Pages/Landing/OtpPage";
import RoomBookingRoutes from "./RoomBooking";
import StudentVerification from "../Verification/studentVerification";
import NotFoundPage from "../Pages/Landing/NotFoundPage";




const LandingPageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentVerification><Landing /></StudentVerification> }/>
      <Route path="over-view" element={<HostelOverView />}></Route>
      <Route path="/signup" element={<StudentVerification><SignUpPage/></StudentVerification>}></Route>
      <Route path='/login' element={<StudentVerification><LoginPage/></StudentVerification>}></Route>
      <Route path="/otp-page" element={<StudentVerification><OtpPage/></StudentVerification>}></Route>
      <Route path="room-booking" element={<RoomBookings/>}></Route>
      <Route path='room-booking/*' element={<RoomBookingRoutes/>}></Route>

      <Route path='/*' element={<NotFoundPage/>}></Route>
    </Routes>
  
  
  );
};

export default LandingPageRoutes;