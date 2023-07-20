import { Route, Routes } from "react-router-dom";
import RequestPage from "../Pages/Students/RequestPage";
import PaymentPage from "../Pages/Students/PaymentPage";
import StudentVerificaion from "../Verification/studentVerification";



const RoomBookingRoutes = () => {
  return (
    <Routes>
     <Route path='/request/:id' element={<StudentVerificaion><RequestPage /></StudentVerificaion>}></Route>
     <Route path='/rent-payment/:id' element={<StudentVerificaion><PaymentPage /></StudentVerificaion>}></Route>
    </Routes>
  );
};

export default RoomBookingRoutes;

