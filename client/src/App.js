import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './ProtectRoute';
import PrivateAdminRoute from './ProtectAdminRoute';

// client
import Home from './pages/client/Home';
import Product from './pages/client/Product';
import Login from './pages/Login';
import Cart from './pages/client/Cart';
import Signup from './pages/client/Signup';
import UserSuccess from './pages/client/SignupComplete';
import EmailVerification from './pages/client/EmailVerification';
import EmailVerificationMessage from './pages/client/EmailVerificationMessage';
import Orders from './pages/client/Orders';

// dashboard
import DashboardHome from './pages/dashboard/Home';
import PasswordReset from './pages/PasswordReset';
import ChangePassword from './pages/ChangePassword';
import AddProduct from './pages/dashboard/AddProduct';
import DashboardOrders from './pages/dashboard/Orders';
import Users from './pages/dashboard/Users';

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
    element: <Product />,
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
    path: '/password-reset/:token',
    element: <ChangePassword />,
  },
  {
    path: '/users/success',
    element: (
      <PrivateRoute>
        <UserSuccess />
      </PrivateRoute>
    ),
  },
  {
    path: '/users/verify/:token',
    element: <EmailVerification />,
  },
  {
    path: '/users/verification/email',
    element: (
      <PrivateRoute>
        <EmailVerificationMessage />
      </PrivateRoute>
    ),
  },
  {
    path: '/orders',
    element: (
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    ),
  },
  {
    path: '/Signup',
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: (
      <PrivateAdminRoute>
        <DashboardHome />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/dashboard/products/add',
    element: (
      <PrivateAdminRoute>
        <AddProduct />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/dashboard/orders',
    element: (
      <PrivateAdminRoute>
        <DashboardOrders />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/dashboard/users',
    element: (
      <PrivateAdminRoute>
        <Users />
      </PrivateAdminRoute>
    ),
  },
]);

export default router;
