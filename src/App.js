import React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from './Redux/Store';

import Landing from "./Pages/Landing/Landing";
import LandingPageRoutes from './Routes/LandingPageRoute'
import AdminRoutes from "./Routes/superAdmin";
import HostelRoutes from './Routes/hostelAdmin';



function App() {
  return (
    <div>
      {/* <Provider store={store}> */}
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/hostel-details/*" element={<LandingPageRoutes/>} />
            <Route path="/superAdmin/*" element={<AdminRoutes />} />
            <Route path="/hostelAdmin/*" element={<HostelRoutes />} />
          </Routes>
        </Router>
      {/* </Provider> */}
    </div>
  );
}

export default App;
