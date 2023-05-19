import { Route, Routes } from "react-router-dom";
import Login from "../Pages/SuperAdmin/Login";
import DashBoard from '../Pages/SuperAdmin/Home'
import Request from "../Pages/SuperAdmin/Request";
import SuperAdminLayout from "../Components/SuperAdmin/SuperAdminLayout";



const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<SuperAdminLayout />} >
        <Route path="/dashBoard" element={<DashBoard />}></Route>
        <Route path="/request" element={<Request/>}></Route>
        <Route path="/host" element={<Request/>}></Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
