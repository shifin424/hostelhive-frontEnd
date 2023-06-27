import { Route, Routes } from "react-router-dom";
import RequestPage from "../Pages/Students/RequestPage";
import PaymentPage from "../Pages/Students/PaymentPage";
import Student from '../Verification/studentVerification'
import StudentVerificaion from "../Verification/studentVerification";
import ProfilePage from "../Pages/Students/ProfilePage";


const StudentRoutes = () => {
  return (
    <Routes>

      <Route path='/profile' element={<StudentVerificaion><ProfilePage /></StudentVerificaion> }></Route>
    </Routes>
  );
};

export default StudentRoutes;