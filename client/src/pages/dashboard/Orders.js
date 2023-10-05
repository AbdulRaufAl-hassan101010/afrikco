import React, { useCallback, useEffect, useState } from 'react';
import Layout from './Layout';
import axios from 'axios';
import Card from '../../components/Card';
import styled from 'styled-components';
import Button from '../../components/Button';
import Table from '../Table';
import Input from '../../components/Input';

const Styles = styled.div`
  width: 100%;
  .tabs {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }
`;

const URL = '/apis/orders';

const UpdateOrderStatus = ({ orderStatusId, orderId }) => {
  const [statusId, setStatusId] = useState(orderStatusId);

  const updateStatusHandler = async (e) => {
    const value = e.target.value;
    console.log(value);

    try {
      const response = await axios.put(`${URL}\\${orderId}`, {
        order_status_id: parseInt(value),
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

    setStatusId(value);
  };

  return (
    <select defaultValue={{ statusId }} onChange={updateStatusHandler}>
      {['pending', 'accepted', 'delivered'].map((status, i) => {
        i = i + 1;
        if (i >= statusId) {
          return (
            <option key={i} value={i}>
              {status}
            </option>
          );
        }

        return null;
      })}
    </select>
  );
};

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async (url) => {
    try {
      const response = await axios(`${url}`);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const tabHandler = (url) => {
    fetchOrders(url);
  };

  useEffect(() => {
    fetchOrders(URL);
  }, [fetchOrders]);

  return (
    <Layout>
      <Styles>
        <h1 className="mb-1">Orders</h1>
        <Card>
          <div className="tabs">
            <Button display={'block'} onClick={tabHandler.bind(this, `${URL}`)}>All</Button>
            <Button display={'block'} onClick={tabHandler.bind(this, `${URL}?order_status_id=1`)}>Pending</Button>
            <Button display={'block'} onClick={tabHandler.bind(this, `${URL}?order_status_id=2`)}>Accepted</Button>
            <Button display={'block'} onClick={tabHandler.bind(this, `${URL}?order_status_id=3`)}>Delivered</Button>
          </div>

          <Table>
            <thead>
              <tr>
                <th>
                  <Input type="checkbox" />
                </th>
                <th>ID</th>
                <th>Totals</th>
                <th>Status</th>
                <th>Items</th>
                <th>email</th>
                <th>Created_at</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(
                ({
                  order_id,
                  totals,
                  order_status_id,
                  orders,
                  created_at,
                  user,
                }) => {
                  const { email } = user;
                  return (
                    <tr key={order_id}>
                      <td>
                        <Input type="checkbox" />
                      </td>
                      <td>{order_id}</td>
                      <td>{totals}</td>
                      <td>
                        <UpdateOrderStatus
                          orderStatusId={order_status_id}
                          orderId={order_id}
                        />
                      </td>
                      <td>{orders.length}</td>
                      <td>{email}</td>
                      <td>{created_at}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </Table>
        </Card>
      </Styles>
    </Layout>
  );
};

export default Orders;
