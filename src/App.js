import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './Redux/Store';
import StudentRoutes from "./Routes/studentRoutes";
import Landing from "./Pages/Landing/Landing";
import LandingPageRoutes from './Routes/LandingPageRoute'
import AdminRoutes from "./Routes/superAdmin";
import HostelRoutes from './Routes/hostelAdmin';



function App() {
  return (
    <div>
        <Router>
          <Routes>
            <Route path="/*" element={<LandingPageRoutes/>} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/hostel/*" element={<HostelRoutes />} />
            <Route path="/student/*" element={<StudentRoutes/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
