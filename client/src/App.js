import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/client/Home';
import Product from './pages/client/Product';
import Login from './pages/Login';
import Cart from './pages/client/Cart';
import Signup from './pages/client/Signup';
import UserSuccess from './pages/client/SignupComplete';
import EmailVerification from './pages/client/EmailVerification';
import EmailVerificationMessage from './pages/client/EmailVerificationMessage';
import PrivateRoute from './ProtectRoute';

// dashboard
import DashboardHome from './pages/dashboard/Home';
import PasswordReset from './pages/PasswordReset';

// routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: '/products/:id',
    element: (
      <PrivateRoute>
        <Product />
      </PrivateRoute>
    ),
  },
  {
    path: '/cart',
    element: (
      <PrivateRoute>
        <Cart />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/password-reset',
    element: <PasswordReset />,
  },
  {
    path: '/users/success',
    element: <UserSuccess />,
  },
  {
    path: '/users/verify/:token',
    element: <EmailVerification />,
  },
  {
    path: '/users/verification/email',
    element: <EmailVerificationMessage />,
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <DashboardHome />,
  },
]);

export default router;
