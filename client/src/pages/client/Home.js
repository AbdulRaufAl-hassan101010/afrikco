import React from 'react';
import Navbar from '../../components/client/Navbar';
import HeroSection from '../../components/client/HeroSection';
import Products from '../../components/client/Products';
import data from '../../data';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Products header={'Best Sellling Products'} data={data || []} />
      <Products header={'New Products'} data={data || []} />
      <Products header={'Recommended Products'} data={data || []} />
    </div>
  );
};

export default Home;
