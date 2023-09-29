import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Input from '../Input';

import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInAsync, logoutAsync } from '../../features/userSlice';

const Styles = styled.nav`
  position: sticky;
  top: 0;
  background-color: #fff;
  min-height: 6rem;
  display: flex;
  align-items: center;
  z-index: 100;
  margin-bottom: 1rem;

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

  li {
    position: relative;
  }
  li:hover > ul {
    display: block;
  }
  li > ul {
    display: none;
    position: absolute;
    top: 2rem;
    right: 0;
    min-width: 10rem;
    width: 100%;
    padding: 1rem;
    background-color: #fff;

    li {
      cursor: pointer;
    }
  }

  .search {
    width: 40rem;
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

const navbarTogglerHandler = () => {
  const $links = document.querySelector('.center-links');
  $links.classList.toggle('link-toggler');
};

const getSearchedData = async (searchInput, setSearchedData) => {
  try {
    const res = await axios(`/apis/products?search=${searchInput}`);
    setSearchedData(res.data);
  } catch (error) {
    console.log(error);
  }
};

const Navbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  const loggOutHandler = useCallback(() => {
    dispatch(logoutAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(isLoggedInAsync());
  }, [dispatch]);

  useEffect(() => {
    getSearchedData(searchInput, setSearchedData);
  }, [searchInput]);

  return (
    <Styles>
      <div className="container flex jc-sb align-items-center">
        <div className="logo-container">
          <Link to="/" className="logo">
            Afrikco
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
        <ul className="flex center-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">Men</Link>
          </li>
          <li>
            <Link to="/">Women</Link>
          </li>
          <li>
            <Link to="/">Categories</Link>
          </li>
        </ul>
        <ul className="flex right-links">
          <li>
            <Link to="/">
              <i className="fa-solid fa-magnifying-glass fa-lg"></i>
            </Link>
            <ul className="sub-links search">
              <li>
                <Input
                  placeholder="search"
                  value={searchInput}
                  update={setSearchInput}
                />
              </li>
              {searchedData.map(({ name, product_id, category }) => (
                <li className="mb-1">
                  <Link to={`/products/${product_id}`}>
                    {name} in {category}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <Link to="/cart">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </Link>
          </li>
          <li>
            {userData ? (
              <>
                {userData.username}
                <ul className="sub-links">
                  <li onClick={loggOutHandler}>logout</li>
                </ul>
              </>
            ) : (
              <Link to="/login">login</Link>
            )}
          </li>
        </ul>
      </div>
    </Styles>
  );
};

export default Navbar;
