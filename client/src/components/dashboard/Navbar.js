import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { logoutAsync } from '../../features/userSlice';

const Styles = styled.nav`
  position: sticky;
  top: 0;
  background-color: #fff;
  min-height: 6rem;
  display: flex;
  align-items: center;
  z-index: 1000;
  margin-bottom: 2rem;

  .logo-icons {
    display: none;
  }

  .logo {
    font-size: 2.6rem;
    font-weight: bolder;
  }

  ul {
    li > a {
      display: block;
      font-weight: thin;
      letter-spacing: 0.15rem;
      font-size: 1.4rem;
      color: #757575;
      padding: 0 1rem;
    }
  }

  @media (max-width: 836px) {
    padding: 2rem 0;
    .container,
    ul {
      flex-direction: column;
      align-items: start;
    }

    .logo-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo-icons {
        display: flex;
        align-items: center;
        a,
        i {
          margin-left: 1rem;
        }
      }
    }

    ul {
      li > a {
        padding: 0;
        margin-bottom: 1.5rem;
      }
    }

    .right-links,
    .center-links {
      display: none;
    }

    .link-toggler {
      display: block;
    }
  }
`;

const navbarTogglerHandler = (e) => {
  const $links = document.querySelector('.center-links');
  $links.classList.toggle('link-toggler');
};

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <Styles>
      <div className="container flex jc-sb align-items-center">
        <div className="logo-container">
          <Link to="/dashboard" className="logo">
            Dashboard
          </Link>
          <div className="logo-icons">
            <Link to="/login">Login</Link>
            <Link>
              <i className="fa-solid fa-cart-shopping fa-xl"></i>
            </Link>
            <i
              className="fa-solid fa-bars fa-xl"
              onClick={navbarTogglerHandler}
            ></i>
          </div>
        </div>
        <ul className="flex right-links">
          <li>
            <Link to="/">
              <i className="fa-regular fa-user fa-lg"></i>{' '}
              {user && user.username}
            </Link>
          </li>
          <li onClick={() => dispatch(logoutAsync())}>
            <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>{' '}
            Logout
          </li>
        </ul>
      </div>
    </Styles>
  );
};

export default Navbar;
