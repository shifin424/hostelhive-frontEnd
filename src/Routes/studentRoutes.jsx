import { Route, Routes } from "react-router-dom";
import StudentVerificaion from "../Verification/studentVerification";
import ProfilePage from "../Pages/Students/ProfilePage";
import StudentLayout from "../Components/Student/Layouts/StudentLayout";
import ComplaintPage from "../Pages/Students/ComplaintPage";
import FoodMenuPage from "../Pages/Students/FoodMenuPage";
import LeaveLetterPage from "../Pages/Students/LeaveLetterPage";
import RentHistoryPage from "../Pages/Students/RentHistoryPage";
import RentDuePage from "../Pages/Students/RentDuePage";
import VacatingPage from "../Pages/Students/VacatingPage";
import ReviewPage from "../Pages/Students/ReviewPage";
import EditProfilePage from "../Pages/Students/EditProfilePage";



const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={<StudentLayout/>}>
      <Route path='/profile' element={<StudentVerificaion><ProfilePage /></StudentVerificaion> }></Route>
      <Route path='/complaints' element={<StudentVerificaion><ComplaintPage/></StudentVerificaion>}></Route>
      <Route path="/menu" element={<StudentVerificaion><FoodMenuPage/></StudentVerificaion>}></Route>
      <Route path='/leave-letter' element={<StudentVerificaion><LeaveLetterPage/></StudentVerificaion>}></Route>
      <Route path='/rent-history' element={<StudentVerificaion><RentHistoryPage/></StudentVerificaion>}></Route>
      <Route path='/rent-due' element={<StudentVerificaion><RentDuePage/></StudentVerificaion>}></Route>
      <Route path='/vacating-letter' element={<StudentVerificaion><VacatingPage/></StudentVerificaion>}></Route>
      <Route path='/review' element={<StudentVerificaion><ReviewPage/></StudentVerificaion>}></Route>
      <Route path='/edit-profile' element={<StudentVerificaion><EditProfilePage/></StudentVerificaion>}></Route>
      </Route>
    </Routes>
  );
};

export default StudentRoutes;