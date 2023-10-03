import styled from 'styled-components';
import Navbar from '../../components/client/Navbar';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../../components/Card';

const Styles = styled.main``;

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const featchOrders = useCallback(async () => {
    try {
      const response = await axios('/apis/orders/me');
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    featchOrders();
  }, [featchOrders]);

  return (
    <>
      <Navbar />
      <Styles className="container">
        <h1 className="mb-1">Orders ({orders.length})</h1>
        {orders.map((data) => {
          return <OrderItem data={data} key={data.order_id} />;
        })}
      </Styles>
    </>
  );
};

export default Orders;

function OrderItem({ data }) {
  const { order_id, created_at, orders, totals, order_status } = data;

  const [toggle, setToggle] = useState(false);

  //toggle order product visibility
  const toggleHandler = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  return (
    <Card className="mb-1">
      <div className="flex jc-sb align-items-center mb-1">
        <h3>{order_id}</h3>
        <div>{created_at}</div>
        <div>{order_status}</div>
        <i
          className={`fa-solid fa-chevron-${!toggle ? 'up' : 'down'}`}
          onClick={toggleHandler}
        ></i>
      </div>
      {toggle ? (
        <>
          <div className="mb-1">
            {orders.map(({ name, product_id, price, quantity }) => {
              return (
                <div key={product_id}>
                  <div className="flex jc-sb align-items-center mb-1">
                    <h4>{name}</h4>
                    <div>Price {price}</div>
                    <div>Qty: {quantity}</div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="text-primary">
            <b>Total: &#x20B5;{totals}</b>
          </div>
        </>
      ) : null}
    </Card>
  );
}
