import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import styled from 'styled-components';
import axios from 'axios';
import Layout from './Layout';
import Table from '../Table';

const Styles = styled.div``;

const Users = () => {
  const [products, setUsers] = useState([]);

  const fetch = async (url, updateState) => {
    try {
      const res = await axios(url);
      updateState(res.data);
    } catch (error) {
      console.log(`couldn't fetch products`);
    }
  };

  // search product
  useEffect(() => {
    fetch(`/apis/users`, setUsers);
  }, []);

  return (
    <Layout>
      <Styles>
        <section>
          <h1>Users</h1>
          <Card>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>username</th>
                  <th>email</th>
                  <th>created_at</th>
                  <th>updated_at</th>
                </tr>
              </thead>
              <tbody>
                {products.map(
                  (
                    { user_id, username, email, created_at, updated_at },
                    index
                  ) => (
                    <tr key={user_id}>
                      <td>{index + 1}</td>
                      <td>{username}</td>
                      <td>{email}</td>
                      <td>{created_at}</td>
                      <td>{updated_at}</td>
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

export default Users;
