import React, { useEffect, useState } from 'react';
import Navbar from '../../components/client/Navbar';
import HeroSection from '../../components/client/HeroSection';
import Products from '../../components/client/Products';
import data from '../../data';
import axios from 'axios';
import PreventAutomaticScrolling from '../../PreventAutomaticScrolling';

const Home = () => {
  const [bestProducts, setBestProduct] = useState([]);
  const [newProducts, setNewProduct] = useState([]);

  const fetchProducts = async (url, updateState) => {
    try {
      const res = await axios(url);
      updateState(res.data);
    } catch (error) {
      console.log(`couldn't fetch products`);
    }
  };

  // GET BEST SELLING PRODUCTS
  useEffect(() => {
    fetchProducts(
      '/apis/products?order=desc&order_column=rating&limit=6',
      setBestProduct
    );
  }, []);
  // GET NEW PRODUCTS
  useEffect(() => {
    fetchProducts(`/apis/products?limit=6`, setNewProduct);
  }, []);

  return (
    <PreventAutomaticScrolling>
      <div>
        <Navbar />
        <HeroSection />
        <Products header={'Best Sellling Products'} data={bestProducts || []} />
        <Products header={'New Products'} data={newProducts || []} />
      </div>
    </PreventAutomaticScrolling>
  );
};

export default Home;
