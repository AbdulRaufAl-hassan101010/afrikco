import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../../components/client/Navbar';
import axios from 'axios';
import Card from '../../components/Card';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

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

const fetchCartProducts = async (setCart) => {
  try {
    const res = await axios(`/apis/carts`);
    setCart(res.data);
  } catch (error) {
    console.log(`couldn't featch products`);
  }
};

function generateNumbers(limit) {
  return Array.from({ length: limit }, (_, index) => index + 1);
}

const Quantity = ({ quantity, product, setCart }) => {
  const [selectedQuantity, setSelectedQuanity] = useState(quantity);

  // UPDATE PRODUCT QUANTITY
  useEffect(() => {
    const updateProductFromCartHandler = async (product_id) => {
      try {
        await axios.put(`/apis/carts/${product_id}`, {
          quantity: selectedQuantity,
        });
        await fetchCartProducts(setCart);
      } catch (error) {
        console.log(error);
        console.log(`couldn't featch products`);
      }
    };

    updateProductFromCartHandler(product.product_id);
  }, [product.product_id, selectedQuantity, setCart]);

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
  const [itemsCount, setItemsCount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // GET CART PRODUCTS
  useEffect(() => {
    fetchCartProducts(setCart);
  }, []);

  const removeProductFromCartHandler = async (product_id) => {
    try {
      await axios.delete(`/apis/carts/${product_id}`);
      await fetchCartProducts(setCart);
    } catch (error) {
      console.log(error);
      console.log(`couldn't featch products`);
    }
  };

  useEffect(() => {
    let items = 0;
    let total = 0;
    cart.map(({ quantity, product_info }) => {
      const { price } = product_info;
      items += quantity;
      total += price * quantity;
    });

    setItemsCount(items);
    setGrandTotal(total.toFixed(2));
  }, [cart]);

  return (
    <>
      <Navbar />
      <Styles className="container">
        <div className="grid">
          <div>
            <h1 className="mb-1">Cart ({cart.length})</h1>
            {cart.map((product, index) => {
              const { image_url, name, price, product_id } =
                product.product_info;
              return (
                <Card className="mb-1" key={index}>
                  <div className="cart">
                    <div>
                      <img src={image_url} alt={name} />
                    </div>
                    <div>
                      <div className="flex jc-sb">
                        <Link to={`/products/${product_id}`}>{name}</Link>
                        <Button
                          isButton="true"
                          onClick={removeProductFromCartHandler.bind(
                            this,
                            product_id
                          )}
                        >
                          x
                        </Button>
                      </div>

                      {/* qty */}
                      <Quantity
                        product={product.product_info}
                        quantity={product.quantity}
                        setCart={setCart}
                      />

                      {/* price */}
                      <div className="flex jc-sb">
                        <div>price: &#x20B5;{price}</div>
                        <div>
                          Total: {(price * product.quantity).toFixed(2)}
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div>
            <h1 className="mb-1">Grand Total</h1>
            <Card>
              <div className="mb-1">items x {itemsCount}</div>
              <div className="mb-1">
                <b>Totals:</b> {grandTotal}
              </div>
              <div>
                <Button display={'block'}>Checkout</Button>
              </div>
            </Card>
          </div>
        </div>
      </Styles>
    </>
  );
};

export default Cart;
