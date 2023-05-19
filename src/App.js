import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import AdminRoutes from "./Routes/superAdmin";
import HostelRoutes from './Routes/hostelAdmin';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/superAdmin/*" element={<AdminRoutes />} />
          <Route path="/hostelAdmin/*" element={<HostelRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
