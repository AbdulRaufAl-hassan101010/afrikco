import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const SignupComplete = () => {
  return (
    <Styles>
      <div>
        <h1 className="text-primary">Successfully created account.</h1>
        <p className="mb-1">
          You have successfully created an account with us. Check your email to
          confirm.
        </p>
        <Link to="/login" className="text-primary">
          Login
        </Link>
      </div>
    </Styles>
  );
};

export default SignupComplete;
