import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/client/Navbar';
import axios from 'axios';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';

const Styles = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 9fr 3fr;
    gap: 1rem;
  }

  .cart {
    display: grid;
    grid-template-columns: 10rem auto;
    gap: 1rem;
  }
`;

function generateNumbers(limit) {
  return Array.from({ length: limit }, (_, index) => index + 1);
}

const Quantity = ({ quantity, product }) => {
  const [selectedQuantity, setSelectedQuanity] = useState(quantity);
  return (
    <div className="type mb-1">
      <h3>Quantity</h3>
      <div>
        <select
          name=""
          id=""
          value={selectedQuantity}
          onChange={(event) => setSelectedQuanity(event.target.value)}
        >
          {generateNumbers(product.quantity).map((quantity) => (
            <option key={quantity * 3} value={quantity}>
              {quantity}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const Cart = () => {
  const [cart, setCart] = useState([]);

  // GET CART PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios(`/apis/carts`);
        setCart(res.data);
      } catch (error) {
        console.log(`couldn't featch products`);
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <Navbar />
      <Styles className="container">
        <div className="grid">
          <div>
            <h1 className="mb-5">Cart ({cart.length})</h1>
            {cart.map((product, index) => {
              const { image_url, name, price } = product.product_info;
              return (
                <Card className="mb-1" key={index}>
                  <div className="cart">
                    <div>
                      <img src={image_url} alt={name} />
                    </div>
                    <div>
                      <Link>{name}</Link>

                      {/* qty */}
                      <Quantity
                        product={product.product_info}
                        quantity={product.quantity}
                      />

                      {/* price */}
                      <div className="flex jc-sb">
                        <div>price: &#x20B5;{price}</div>
                        <div>
                          Total: {(price * product.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
          <div>a</div>
        </div>
      </Styles>
    </>
  );
};

export default Cart;
