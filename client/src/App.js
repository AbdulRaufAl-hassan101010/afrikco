import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/client/Home';
import Product from './pages/client/Product';
import Login from './pages/client/Login';


// dashboard
import DashboardHome from './pages/dashboard/Home'
import Cart from './pages/client/Cart';
import Signup from './pages/client/Signup';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/products/:id',
    element: <Product />,
  },
  {
    path: '/cart',
    element: <Cart />,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/Signup',
    element: <Signup/>,
  },
  {
    path: '/dashboard',
    element: <DashboardHome />,
  },
]);

export default router;
