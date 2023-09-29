import styled from 'styled-components';
import Button from '../../components/Button';
import Navbar from '../../components/client/Navbar';

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

  return (
    <>
      <Navbar />
      <Styles>
        <div>
          <h1 className="text-primary">Please verify your email address</h1>
          <p className="mb-1">Verify your email to complete the proccess</p>
          <Button isButton="true">Resend email</Button>
        </div>
      </Styles>
    </>
  );
};

export default EmailVerificationMessage;
