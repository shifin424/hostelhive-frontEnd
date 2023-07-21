
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminVerification({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin/login');
    } else {
      navigate('/admin/dashboard');
    }
    // eslint-disable-next-line
  }, []); 

  return children;
}
