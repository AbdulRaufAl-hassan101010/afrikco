import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Navbar from '../../components/client/Navbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card from '../../components/Card';

import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../features/userSlice';

const Styles = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .wrapper {
    max-width: 35rem;
    width: 100%;
  }

  form {
    background-color: #fff;
    padding: 1rem;
    width: 100%;
    margin-top: -10rem;
  }

  .other {
    .divider {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 1rem;
      align-items: center;
      margin: 2rem 0;

      &:after,
      &:before {
        height: 0.2rem;
        background-color: #dc3545;
        content: '';
      }
    }

    .svg {
      img {
        height: 4rem;
      }
      display: grid;
      background-color: #fff;
      align-items: center;
      justify-content: center;

      height: 6rem;
      gap: 1rem;
    }
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user );

  const navigate = useNavigate();
  const location = useLocation();

  // Get the previous URL
  const { previousUrl, prevQuantity } =
    location.state !== null ? location.state : {};

  useEffect(() => {
    isLoggedIn && navigate('/');
  }, [isLoggedIn, navigate])
  


  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await axios('apis/users/auth');
  //       setIsLoggedIn(true);
  //       isLoggedIn && navigation(previousUrl || '/');
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [isLoggedIn, navigation, previousUrl]);

  const loginHandler = async (e) => {
    e.preventDefault();
    // Dispatch the loginAsync action with the form data
    dispatch(loginAsync({ email, password }));
    
  };

  return (
    <>
      <Navbar />
      <Styles>
        <div className="wrapper">
          <form action="">
            <legend className="mb-1 text-center">Login</legend>
            <fieldset>
              <Input
                placeholder="Username/email"
                update={setEmail}
                value={email}
              />
              <Input
                placeholder="password"
                type="password"
                update={setPassword}
                value={password}
              />
              <Button display="block" isButton={'true'} onClick={loginHandler}>
                Login
              </Button>
            </fieldset>
          </form>

          <div className="other">
            <div className="divider">OR</div>
            <Link to="/signup">
              <Card className="svg">
                <div className="text-center">sign up</div>
              </Card>
            </Link>
          </div>
        </div>
      </Styles>
    </>
  );
};

export default Login;
