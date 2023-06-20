import { Route,Routes } from "react-router-dom";
import RequestPage from "../Pages/Students/RequestPage";


const StudentRoutes = () => {
    return (
      <Routes>
         <Route path='/request/:id' element={<RequestPage/>}></Route> 
      </Routes>
    );
  };
  
  export default StudentRoutes;