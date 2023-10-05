import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import styled from 'styled-components';
import axios from 'axios';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from './Layout';
import Table from '../Table';

const Styles = styled.div``;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState();

  const fetch = async (url, updateState) => {
    try {
      const res = await axios(url);
      updateState(res.data);
    } catch (error) {
      console.log(`couldn't fetch products`);
    }
  };

  // GET PRODUCTS
  useEffect(() => {
    fetch(`/apis/products`, setProducts);
  }, []);

  // search product
  useEffect(() => {
    console.log(search);
    if (search === '' || search === undefined) {
      fetch(`/apis/products`, setProducts);
    } else {
      fetch(`/apis/products?search=${search}`, setProducts);
    }
  }, [search]);

  return (
    <Layout>
      <Styles>
        <section>
          <Card className="mb-1 flex jc-sb align-items-center">
            <Input className="mb-0" value={search} update={setSearch} />
            <Button
              className="mb-0"
              to="/dashboard/products/add"
              isButton={false}
            >
              <i className="fa-solid fa-plus"></i> Add Product
            </Button>
          </Card>
          <Card>
            <Table>
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
                  (
                    {
                      product_id,
                      name,
                      image_url,
                      price,
                      quantity,
                      created_at,
                      updated_at,
                      description,
                    },
                    index
                  ) => (
                    <tr key={product_id}>
                      <td>{index + 1}</td>
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
            </Table>
          </Card>
        </section>
      </Styles>
    </Layout>
  );
};

export default Home;
