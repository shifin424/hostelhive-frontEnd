import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function StudentVerification({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem('StudentToken'));

  if (!token) {

    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/otp-page') {
      return children
    }
    else {
     return children
    }
  } else {
    if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/otp-page') {
      return <Navigate to={'/'} />
    }
    else {
      const routePattern = /^\/rent-payment\/\d+$/;

      const isMatchingRoute = routePattern.test(location.pathname);
      if (isMatchingRoute) {
        if (token.role === 'guest') {
          return
        }
      }
      return children
    }
  }
  // eslint-disable-next-line
  return children;
}


