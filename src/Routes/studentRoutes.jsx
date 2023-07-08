import { Route, Routes } from "react-router-dom";
import RequestPage from "../Pages/Students/RequestPage";
import PaymentPage from "../Pages/Students/PaymentPage";
import Student from '../Verification/studentVerification'
import StudentVerificaion from "../Verification/studentVerification";
import ProfilePage from "../Pages/Students/ProfilePage";
import StudentLayout from "../Components/Student/StudentLayout";
import ComplaintPage from "../Pages/Students/ComplaintPage";
import FoodMenuPage from "../Pages/Students/FoodMenuPage";
import LeaveLetterPage from "../Pages/Students/LeaveLetterPage";



const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<StudentLayout/>}>
      <Route path='/profile' element={<StudentVerificaion><ProfilePage /></StudentVerificaion> }></Route>
      <Route path='/complaints' element={<StudentVerificaion><ComplaintPage/></StudentVerificaion>}></Route>
      <Route path="/menu" element={<StudentVerificaion><FoodMenuPage/></StudentVerificaion>}></Route>
      <Route path='/leave-letter' element={<StudentVerificaion><LeaveLetterPage/></StudentVerificaion>}></Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;