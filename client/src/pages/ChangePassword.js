import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/client/Navbar';
import styled from 'styled-components';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../components/Alert';
import axios from 'axios';

const Styles = styled.main`
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  width: 100%;

  .card {
    max-width: 30rem;
    width: 100%;
  }
`;

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const isLoggedIn = useSelector((state) => state.user);

  const navigate = useNavigate();
  
  const { token } = useParams();

  const changePasswordHandler = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        if (!password) {
          return setMessage({ type: 'danger', message: "Can't be empty" });
        }

        console.log(password, confirmPassword)

        if (password !== confirmPassword) {
          return setMessage({ type: 'danger', message: "Password doesn't match" });
        }

        await axios.post(`/apis/users/password-reset/${token}`, { password });

        // if changed successfully navigate to login
        return navigate('/login');
      } catch (error) {
        setMessage({ message: 'Something went wrong try again' , type: 'danger'});
      }
    },
    [confirmPassword, navigate, password, token]
  );

  useEffect(() => {
    if (isLoggedIn) return navigate('/');
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (message && message.type === 'danger') {
      const timer = setTimeout(() => setMessage(null), 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) return navigate('/');
        await axios(`/apis/tokens/${token}`);
      } catch (error) {
        navigate('/');
      }
    };

    verifyToken();
  }, []);

  return (
    <>
      {message ? <Alert type={message.type} message={message.message} /> : null}
      <Navbar checkAuth={false} />
      <Styles>
        <Card className="card">
          <form action="" onSubmit={changePasswordHandler}>
            <legend className="text-center mb-1">New password</legend>
            <fieldset>
              <Input
                placeholder="New password"
                value={password}
                update={setPassword}
                type="password"
              />
              <Input
                placeholder="Confirm password"
                value={confirmPassword}
                update={setConfirmPassword}
                type="password"
              />

              <Button display="block" type="sumbit">
                Change password
              </Button>
            </fieldset>
          </form>
        </Card>
      </Styles>
    </>
  );
};

export default ChangePassword;
