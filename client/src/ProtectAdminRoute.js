import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedInAsAdminAsync } from './features/userSlice';

const PrivateAdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedInAsAdminAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user === false) {
      navigate('/login');
    }

    if (user) {
      !user.verified && navigate('/users/verification/email');
    }
  }, [navigate, user]);

  return children;
};

export default PrivateAdminRoute;
