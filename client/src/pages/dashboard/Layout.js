import React, { useEffect, useState } from 'react';
import Navbar from '../../components/dashboard/Navbar';
import Card from '../../components/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AsideNav from './AsideNav';

const Styles = styled.div`
  main {
    display: grid;
    grid-template-columns: 2fr 10fr;
    grid-gap: 2rem;
    align-items: start;
  }
`;

const Layout = ({ children }) => {
  return (
    <Styles>
      <Navbar />
      <main className="container">
        {/* aside nav */}
        <AsideNav />
        <div>{children}</div>
      </main>
    </Styles>
  );
};

export default Layout;
