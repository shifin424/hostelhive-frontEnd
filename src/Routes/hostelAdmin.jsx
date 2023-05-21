import { Route,Routes } from "react-router-dom";
import Register from "../Pages/Landing/Register";
import Locaion from "../Components/Landing/Location/Locaion";



const hostelRoutes = () => {
    return (
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/locaion" element={<Locaion/>}></Route>
      </Routes>
    );
  };
  
  export default hostelRoutes;