import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Navbar from '../../components/client/Navbar';
import facebookSvg from '../../assets/svgs/facebook.svg';
import appleSvg from '../../assets/svgs/apple.svg';
import gmailSvg from '../../assets/svgs/gmail.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = useNavigate();
  const location = useLocation();

  // Get the previous URL
  const { previousUrl, prevQuantity } =
    location.state !== null ? location.state : {};

  useEffect(() => {
    (async () => {
      try {
        await axios('apis/users/auth');
        setIsLoggedIn(true);
        isLoggedIn && navigation(previousUrl || '/');
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isLoggedIn, navigation, previousUrl]);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/apis/users/login', { email, password });

      if (previousUrl) {
        return navigation(previousUrl || '/', {
          state: {
            prevQuantity: prevQuantity,
          },
        });
      }
      return navigation('/');
    } catch (error) {
      console.log('Invalid credentails', error);
    }
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
            <Link>
              <Card className="svg">
                <div>
                  <img src={gmailSvg} alt="" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </Styles>
    </>
  );
};

export default Login;
