import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/client/Navbar';
import styled from 'styled-components';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { passwordResetAsync } from '../features/userSlice';
import Alert from '../components/Alert';

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

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const isLoggedIn = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordResetHandler = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(passwordResetAsync(email))
        .then((data) => {
          if (data.payload === true) {
            setMessage({ message: 'Link has been sent to email.' });
          }
          if (data.payload.error) {
            return setMessage(data.payload.error.message);
          }
        })
        .catch((err) => setMessage({ message: err.message, type: 'danger' }));
    },
    [dispatch, email]
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

  const view = () => {
    if (message === null || message.type === 'danger') {
      return (
        <Card className="card">
          <form action="" onSubmit={passwordResetHandler}>
            <legend className="text-center mb-1">Password reset</legend>
            <fieldset>
              <Input placeholder="email" value={email} update={setEmail} />

              <Button display="block">Reset</Button>
            </fieldset>
          </form>
        </Card>
      );
    } else {
      return <div>{message.message}</div>;
    }
  };

  return (
    <>
      {message ? <Alert type={message.type} message={message.message} /> : null}
      <Navbar checkAuth={false} />
      <Styles>{view(message)}</Styles>
    </>
  );
};

export default PasswordReset;
