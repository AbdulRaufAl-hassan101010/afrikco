import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await axios('/apis/users/auth');
        if (res.data) {
            
        }
        if (!res.data) throw new Error('UNAUTHORIZED');
      } catch (error) {
        navigate('/login');
      }
    };
    verifyAuth();
  }, []);

  return children;
};

export default VerifyRoute;
