import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import OtpPage from "../Pages/Landing/OtpVerificaion";
import Login from '../Pages/HostelAdmin/LoginPage'
import AddHostel from '../Pages/HostelAdmin/AddHostel'
import HostelAdmin from '../Verification/hostelAdminVerification'
import DashBoard from "../Pages/HostelAdmin/DashBoard";
import GlobalHostelLayout from "../Components/HostelAdmin/Layouts/GlobalHostelLayout";
import AddHostelButton from "../Components/HostelAdmin/AddHostel/AddHostelButton";
import SingleDashboard from "../Pages/HostelAdmin/SingleDashboard";
import SingleHostelLayouts from "../Components/HostelAdmin/Layouts/SingleHostelLayouts";
import RoomsListing from "../Pages/HostelAdmin/RoomsListing";
import RequestsPage from "../Pages/HostelAdmin/RequestsPage";
import FoodSystem from "../Pages/HostelAdmin/FoodSystem";
import StudentManagmentPage from "../Pages/HostelAdmin/StudentManagmentPage";
import ComplaintsPage from "../Pages/HostelAdmin/ComplaintsPage";
import LeaveLetterPage from "../Pages/HostelAdmin/LeaveLetterPage";
import VacatingDatas from "../Pages/HostelAdmin/vacates/VacatingDatas";
import EditRoomsPage from "../Pages/HostelAdmin/EditRoomsPage";
import ProfilePage from "../Pages/HostelAdmin/ProfilePage";
import EditProfile from "../Components/HostelAdmin/Profile/EditProfile";



const hostelRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<HostelAdmin> <Register /></HostelAdmin>}></Route>
      <Route path="/otpVerification" element={<HostelAdmin><OtpPage /> </HostelAdmin>}></Route>
      <Route path="/login" element={<HostelAdmin><Login /> </HostelAdmin>}></Route>

      <Route element={<GlobalHostelLayout />}>
        <Route path="/hostel-listing" element={<HostelAdmin><AddHostelButton /></HostelAdmin>}></Route>
        <Route path="/add-hostel" element={<HostelAdmin><AddHostel /></HostelAdmin>}></Route>
        <Route path="/dashboard" element={<HostelAdmin><DashBoard /></HostelAdmin>}></Route>
      </Route>

      <Route element={<SingleHostelLayouts />}>
        <Route path="/hostel-listing/dashboard" element={<HostelAdmin><SingleDashboard /></HostelAdmin>}></Route>
        <Route path="/hostel-listing/rooms" element={<HostelAdmin><RoomsListing /></HostelAdmin>}></Route>
        <Route path="/hostel-listing/edit-rooms/:id" element={<HostelAdmin><EditRoomsPage/></HostelAdmin>}></Route>
        <Route path="/hostel-listing/requests" element={<HostelAdmin><RequestsPage /></HostelAdmin>}></Route>
        <Route path='/hostel-listing/food-menu' element={<HostelAdmin><FoodSystem/></HostelAdmin>}></Route>
        <Route path='/hostel-listing/student-managment' element={<HostelAdmin><StudentManagmentPage/></HostelAdmin>}></Route>
        <Route path='/hostel-listing/complaints' element={<HostelAdmin><ComplaintsPage/></HostelAdmin>}></Route> 
        <Route path='/hostel-listing/leave-letter' element={<HostelAdmin><LeaveLetterPage/></HostelAdmin>}></Route>
        <Route path='/hostel-listing/vacate-letters' element={<HostelAdmin><VacatingDatas/></HostelAdmin>}></Route>
        <Route path="/hostel-listing/profile" element={<HostelAdmin><ProfilePage/></HostelAdmin>}></Route>
        <Route path="/hostel-listing/edit-profile" element={<HostelAdmin><EditProfile/></HostelAdmin>}></Route>
      </Route>

    </Routes>
  );
};

export default hostelRoutes;