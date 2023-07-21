import { useLocation, Navigate } from 'react-router-dom';

export default function StudentVerification({ children }) {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem('StudentToken'));

  if (!token) {
    if (
      location.pathname === '/' ||
      location.pathname === '/over-view' ||
      location.pathname === '/signup' ||
      location.pathname === '/login'
    ) {
      return <Navigate to={'/login'} />;
    }
  } else {
    if (token.role === 'guest') {
      console.log('reached in guest');
      if (
        location.pathname === '/' ||
        location.pathname === '/over-view' ||
        location.pathname === '/room-booking' ||
        location.pathname === '/request' ||
        location.pathname === '/room-booking/rent-payment'
      ) {
        return children;
      }
    } else if (token.role === 'resident') {
      if(  location.pathname === '/' ||
      location.pathname === '/over-view' ||
      location.pathname === '/room-booking' ){
        return children
      }
    } else {
      return <Navigate to={'/404'} />;
    }
  }
  return children;
}
