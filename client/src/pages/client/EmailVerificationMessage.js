import styled from 'styled-components';
import Button from '../../components/Button';
import Navbar from '../../components/client/Navbar';
import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '../../components/Alert';

const Styles = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  h1 {
    margin-bottom: 3rem;
  }

  p {
    font-size: 1.8rem;
  }
`;

const EmailVerificationMessage = () => {
  const [message, setMessage] = useState(null);

  const sendVerificationEmailHandler = useCallback(async () => {
    try {
      await axios.post('/apis/users/mail/confirmation');
      setMessage({ message: 'Sent mail', type: 'succcess' });
    } catch (error) {
      setMessage({ message: "Couldn't send mail", type: 'danger' });
    }
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  return (
    <>
      {/* alert */}
      {message && <Alert message={message.message} type={message.type} />}
      <Navbar />
      <Styles>
        <div>
          <h1 className="text-primary">Please verify your email address</h1>
          <p className="mb-1">Verify your email to complete the proccess</p>
          <Button isButton="true" onClick={sendVerificationEmailHandler}>
            Resend email
          </Button>
        </div>
      </Styles>
    </>
  );
};

export default EmailVerificationMessage;
