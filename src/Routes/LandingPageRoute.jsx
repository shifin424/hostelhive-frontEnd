import { Route,Routes } from "react-router-dom";
import HostelOverView from '../Pages/Landing/HostelInfo'




const LandingPageRoutes = () => {
    return (
      <Routes>
        <Route path="/over-view" element={<HostelOverView/>}></Route>  
      </Routes>
    );
  };
  
  export default LandingPageRoutes;