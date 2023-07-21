import { Route, Routes } from "react-router-dom";
import Login from "../Pages/SuperAdmin/Login";
import DashBoard from '../Pages/SuperAdmin/Home'
import Request from "../Pages/SuperAdmin/HostelRequests";
import SuperAdminLayout from "../Components/SuperAdmin/Layouts/SuperAdminLayout";
import AdminVerificaton from '../Verification/superAdminVerification'
import HostelManagmentPage from "../Pages/SuperAdmin/HostelManagmentPage";



const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminVerificaton><Login/></AdminVerificaton>}></Route>
      <Route element={<SuperAdminLayout />} >
        <Route path="/dashBoard" element={<AdminVerificaton><DashBoard/></AdminVerificaton>}></Route>
        <Route path="/request" element={<AdminVerificaton> <Request/></AdminVerificaton> }></Route>
        <Route path="/hostel-managment" element={<AdminVerificaton><HostelManagmentPage/></AdminVerificaton>}></Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
