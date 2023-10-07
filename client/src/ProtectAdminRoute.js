import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { isLoggedInAsAdminAsync } from './features/userSlice';

const PrivateAdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const location = useLocation();

  // useEffect(() => {
  //   window.scrollTo(0, 0); // Scroll to the top on each route change
  // }, [location.pathname]);

  // useEffect(() => {
  //   dispatch(isLoggedInAsAdminAsync());
  // }, [dispatch]);

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
