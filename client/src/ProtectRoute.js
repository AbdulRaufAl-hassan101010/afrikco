import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios('/apis/user/auth');
        const data = await res.data;
        if (!data) throw new Error('UNAUTHORIZED');
      } catch (error) {
        navigate('/login');
      }
    };
    verifyAuth();
  }, []);

  return children;
};

export default PrivateRoute;
