import { useEffect } from "react";
import { useLocation, useNavigate} from 'react-router-dom'

export default function StudentVerificaion({children}){
    const navigate = useNavigate();
  const location = useLocation();

   
const token =JSON.parse( localStorage.getItem('StudentToken'))

useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      console.log(token.role);
      if (token.role === 'guest') {
        navigate(`${location.pathname}`);
      } else if (token.role === 'resident') {
        navigate('/student/profile');
      } else {
        navigate('/404');
      }
    }
  }, []);

    return children
}