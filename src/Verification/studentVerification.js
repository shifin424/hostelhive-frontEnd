import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function StudentVerification({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem('StudentToken'));

  if (!token) {
    navigate('/login');
  } else {
    console.log(token, "token<<<<<<");
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/otp-page') {
      return <Navigate to={'/'} />
    }
    else {
      const routePattern = /^\/rent-payment\/\d+$/;

      const isMatchingRoute = routePattern.test(location.pathname);
      if(isMatchingRoute){
        if(token.role === 'guest'){
          return 
        }
      }
      return children
    }
    // console.log(token.role);
    // if (token.role === 'guest') {
    //   navigate(`${location.pathname}`);
    // } else if (token.role === 'resident') {
    //   navigate('/student/profile');
    // } else {
    //   navigate('/404');
    // }
  }
  // eslint-disable-next-line

  return children;
}
