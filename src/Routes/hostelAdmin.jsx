import { Route,Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";



const hostelRoutes = () => {
    return (
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
    );
  };
  
  export default hostelRoutes;