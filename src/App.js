import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentRoutes from "./Routes/studentRoutes";
import LandingPageRoutes from './Routes/LandingPageRoute'
import AdminRoutes from "./Routes/superAdmin";
import HostelRoutes from './Routes/hostelAdmin';
import './App.css'
import { ToastContainer } from "react-toastify";
import Theme from "./Components/Landing/Theme/Theme";



function App() {
  return (
    <div>
      <Theme/>
      <Router>
        <Routes>
          <Route path="/*" element={<LandingPageRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/hostel/*" element={<HostelRoutes />} />
          <Route path="/student/*" element={<StudentRoutes />} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" />

    </div>
  );
}

export default App;
