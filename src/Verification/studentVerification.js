import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function StudentVerification({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('StudentToken'));

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
    // eslint-disable-next-line
  }, []);

  return children;
}
