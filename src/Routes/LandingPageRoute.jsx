import { Route,Routes } from "react-router-dom";
import HostelOverView from '../Pages/Landing/HostelInfo'
import RoomBookings from "../Pages/Landing/RoomBookings";
import SignUpPage from "../Pages/Landing/SignUpPage";




const LandingPageRoutes = () => {
    return (
      <Routes>
        <Route path="/over-view" element={<HostelOverView/>}></Route>  
        <Route path="/room-booking" element={<RoomBookings/>}></Route>
        <Route path="/signup" element={<SignUpPage/>}></Route>
      </Routes>
    );
  };
  
  export default LandingPageRoutes;