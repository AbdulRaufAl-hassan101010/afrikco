import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AsideNav = () => {
  const [productsConut, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const fetch = async (url, updateState) => {
    try {
      const res = await axios(url);
      updateState(res.data);
    } catch (error) {
      console.log(`couldn't fetch products`);
    }
  };

  // GET PRODUCTS COUNT
  useEffect(() => {
    fetch('/apis/products/count', setProductsCount);
  }, []);

  // GET Orders COUNT
  useEffect(() => {
    fetch('/apis/orders/count', setOrdersCount);
  }, []);

  return (
    <Card>
      <ul>
        <li className="mb-1">
          <div className="flex jc-sb">
            <Link to="">Products</Link>
            <span>{productsConut}</span>
          </div>
          <hr />
        </li>
        <li className="mb-1">
          <div className="flex jc-sb">
            <Link to="">Orders</Link>
            <span>{ordersCount}</span>
          </div>
          <hr />
        </li>
        <li className="mb-1">
          <div className="flex jc-sb">
            <Link to="">Completed Orders</Link>
            <span>{ordersCount}</span>
          </div>
          <hr />
        </li>
        <li className="mb-1">
          <div className="flex jc-sb">
            <Link to="">Users</Link>
            <span>{ordersCount}</span>
          </div>
          <hr />
        </li>
      </ul>
    </Card>
  );
};

export default AsideNav;
