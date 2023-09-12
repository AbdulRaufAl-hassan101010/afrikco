import React from 'react';
import { styled } from 'styled-components';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Navbar from '../../components/client/Navbar';
import facebookSvg from '../../assets/svgs/facebook.svg';
import appleSvg from '../../assets/svgs/apple.svg';
import gmailSvg from '../../assets/svgs/gmail.svg';
import { Link } from 'react-router-dom';

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

    .svgs {
      display: grid;
      gap: 1rem;
      justify-content: start;
      grid-template-columns: repeat(3, 1fr);

      .img {
        background-color: #fff;
        padding: 1rem 0.5rem;
        img {
          width: 100%;
        }
        height: 50px;
      }
    }
  }
`;

const Login = () => {
  return (
    <>
      <Navbar />
      <Styles>
        <div className="wrapper">
          <form action="">
            <legend className="mb-1 text-center">Login</legend>
            <fieldset>
              <Input placeholder="Username/email" />
              <Input placeholder="password" type="password" />
              <Button display="block">Login</Button>
            </fieldset>
          </form>

          <div className="other">
            <div className="divider">OR</div>

            <div className="svgs">
              <div className="img">
                <Link to="/">
                  <img src={facebookSvg} alt="" />
                </Link>
              </div>
              <div className="img">
                <Link to="/">
                  <img src={appleSvg} alt="" />
                </Link>
              </div>
              <div className="img">
                <Link to="/">
                  <img src={gmailSvg} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Styles>
    </>
  );
};

export default Login;
