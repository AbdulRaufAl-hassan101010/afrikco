import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLoggedInAsync } from './features/userSlice';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedInAsync());
  }, [dispatch]);

  useEffect(() => {    
    if (user) {
      !user.verified && navigate('/users/verification/email');
    }
  }, [navigate, user]);

  return children;
};

export default PrivateRoute;
