import { Route, Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import OtpPage from "../Pages/Landing/OtpVerificaion";
import Login from '../Pages/HostelAdmin/LoginPage'
import AddHostel from '../Pages/HostelAdmin/AddHostel'
import HostelAdmin from '../Verification/hostelAdminVerification'
import DashBoard from "../Pages/HostelAdmin/DashBoard";
import GlobalHostelLayout from "../Components/HostelAdmin/GlobalHostelLayout";
import AddHostelButton from "../Components/HostelAdmin/AddHostelButton";
import SingleDashboard from "../Pages/HostelAdmin/SingleDashboard";
import SingleHostelLayouts from "../Components/HostelAdmin/SingleHostelLayouts";
import RoomsListing from "../Pages/HostelAdmin/RoomsListing";
import RequestsPage from "../Pages/HostelAdmin/RequestsPage";
import FoodSystem from "../Pages/HostelAdmin/FoodSystem";
import StudentManagmentPage from "../Pages/HostelAdmin/StudentManagmentPage";
import ComplaintsPage from "../Pages/HostelAdmin/ComplaintsPage";


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
        <Route path="/hostel-listing/dashboard" element={<SingleDashboard />}></Route>
        <Route path="/hostel-listing/rooms" element={<RoomsListing />}></Route>
        <Route path="/hostel-listing/requests" element={<RequestsPage />}></Route>
        <Route path='/hostel-listing/food-menu' element={<FoodSystem/>}></Route>
        <Route path='/hostel-listing/student-managment' element={<StudentManagmentPage/>}></Route>
        <Route path='/hostel-listing/complaints' element={<ComplaintsPage/>}></Route> 
      </Route>

    </Routes>
  );
};

export default hostelRoutes;