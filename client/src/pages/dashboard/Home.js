import React, { useEffect, useState } from 'react';
import Navbar from '../../components/dashboard/Navbar';
import Card from '../../components/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';

const Styles = styled.div`
  main {
    display: grid;
    grid-template-columns: 2fr 10fr;
    grid-gap: 2rem;
    align-items: start;
  }

  table {
    width: 100%;
    /* border-collapse: collapse; */
    td,
    th {
      text-align: left;
      padding: 0.5rem;
    }

    tbody > tr:nth-child(odd) {
      background-color: #f4f4f4;
    }
  }
`;

const Home = () => {
  const [productsConut, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [products, setProducts] = useState([]);

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

  // GET PRODUCTS
  useEffect(() => {
    fetch(`/apis/products`, setProducts);
  }, []);

  return (
    <Styles>
      <Navbar />
      <main className="container">
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
              <Link to="">Completed Orders</Link>
              <hr />
            </li>
          </ul>
        </Card>
        <section>
          <Card className="mb-1 flex jc-sb align-items-center">
            <Input className="mb-0" />
            <Button className="mb-0">
              <i className="fa-solid fa-plus"></i> Add Product
            </Button>
          </Card>
          <Card>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>name</th>
                  <th>image</th>
                  <th>price</th>
                  <th>quantity</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                  <th>description</th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  ({
                    product_id,
                    name,
                    image_url,
                    price,
                    quantity,
                    created_at,
                    updated_at,
                    description,
                  }) => (
                    <tr key={product_id}>
                      <td>{product_id}</td>
                      <td>{name}</td>
                      <td>
                        <img src={image_url} alt={name} />
                      </td>
                      <td>&#x20B5; {price}</td>
                      <td>{quantity}</td>
                      <td>{created_at}</td>
                      <td>{updated_at}</td>
                      <td>{description}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </Card>
        </section>
      </main>
    </Styles>
  );
};

export default Home;
