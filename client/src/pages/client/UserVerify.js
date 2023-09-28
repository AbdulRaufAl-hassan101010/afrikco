import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const UserVerify = () => {
  const [verified, setVerified] = useState(null);

  const { token } = useParams();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.put(`/apis/users/verify/${token}`);
        setVerified(true);
      } catch (error) {
        setVerified(false);
        console.log(error);
      }
    };

    verifyUser();
  }, [token]);

  if (verified === null) {
    return null;
  }

  return (
    <Styles>
      {' '}
      {verified ? (
        <div>
          <h1 className="text-primary">Account has been Verified</h1>
          <p className="mb-1">Your Account has successfully been verified.</p>
          <Link to="/" className="text-primary">
            Home
          </Link>
        </div>
      ) : (
        <div>
          <h1 className="text-primary">Ooooops!!! something went wrong</h1>
          <p className="mb-1">Try again later</p>
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </div>
      )}
    </Styles>
  );
};

export default UserVerify;
