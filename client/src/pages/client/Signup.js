import React, { useCallback, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Navbar from '../../components/client/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';
import Alert from '../../components/Alert';

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

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const navigation = useNavigate();

  const signupHandler = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        if (username === '' || email === '' || password === '') {
          setMessage({
            message: 'Fields cannot be empty',
            type: 'danger',
            id: Math.random(100),
          });
          return;
        }
        if (password !== confirmPassword) {
          setMessage({ message: 'Password does not match', type: 'danger' });
          return;
        }

        await axios.post('/apis/users', { username, email, password });
        return navigation('/users/success');
      } catch (error) {
        console.log('Invalid credentails', error);
      }
    },
    [confirmPassword, email, password, username]
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null),1000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [message]);

  return (
    <>
      {/* alert */}
      {message && <Alert message={message.message} type={message.type} />}

      <Navbar />
      <Styles>
        <div className="wrapper">
          <form action="">
            <legend className="mb-1 text-center">Signup</legend>
            <fieldset>
              <Input
                placeholder="Username"
                update={setUsername}
                value={username}
              />
              <Input placeholder="email" update={setEmail} value={email} />
              <Input
                placeholder="password"
                type="password"
                update={setPassword}
                value={password}
              />
              <Input
                placeholder="Confirm Password"
                type="password"
                update={setConfirmPassword}
                value={confirmPassword}
              />
              <Button display="block" isButton={'true'} onClick={signupHandler}>
                Signup
              </Button>
            </fieldset>
          </form>

          <div className="other">
            <div className="divider">OR</div>
            <Link to="/login">
              <Card className="svg">
                <div className="text-center">Login</div>
              </Card>
            </Link>
          </div>
        </div>
      </Styles>
    </>
  );
};

export default Signup;
