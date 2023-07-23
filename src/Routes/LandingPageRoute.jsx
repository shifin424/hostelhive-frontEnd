import { Route, Routes } from "react-router-dom";
import HostelOverView from '../Pages/Landing/HostelInfo'
import RoomBookings from "../Pages/Landing/RoomBookings";
import SignUpPage from "../Pages/Landing/SignUpPage";
import Landing from "../Pages/Landing/Landing";
import LoginPage from "../Pages/Landing/LoginPage";
import OtpPage from "../Pages/Landing/OtpPage";
import RoomBookingRoutes from "./RoomBooking";



const LandingPageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="over-view" element={<HostelOverView />}></Route>
      <Route path="/signup" element={<SignUpPage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path="/otp-page" element={<OtpPage/>}></Route>
      <Route path="room-booking" element={<RoomBookings/>}></Route>
      <Route path='room-booking/*' element={<RoomBookingRoutes/>}></Route>
    </Routes>
  );
};

export default LandingPageRoutes;