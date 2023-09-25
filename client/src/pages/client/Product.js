import { styled } from 'styled-components';
import Navbar from '../../components/client/Navbar';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import data from '../../data';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Products from '../../components/client/Products';
import axios from 'axios';
import Rating from '../../components/Rating';
import Button from '../../components/Button';
import Alert from '../../components/Alert';

const Styles = styled.div`
  .top {
    display: grid;
    grid-template-columns: 4fr 8fr;
    gap: 1rem;
    margin-bottom: 5rem;

    .img {
      display: grid;
      gap: 1rem;
      align-items: start;

      .selected-img {
        border: 0.1rem solid #ccc;
        height: 30rem;
      }

      .img-selector-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        .img-selector {
          border: 0.1rem solid #ccc;
          height: 7rem;
        }
      }
    }

    .type {
      & > div {
        background: #f3f3f3;
        padding: 1rem;

        .list {
          padding: 1rem;
          margin-left: 1rem;
          background-color: #fff;
          cursor: pointer;
        }
      }
    }
  }

  .description {
    margin-bottom: 10rem;
  }

  @media (max-width: 996px) {
    .top {
      grid-template-columns: 1fr;

      .img {
        .selected-img {
          height: 40rem;
        }
      }
    }
  }
`;

function generateNumbers(limit) {
  return Array.from({ length: limit }, (_, index) => index + 1);
}

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { prevQuantity } = location.state !== null ? location.state : {};

  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [selectedQuantity, setSelectedQuanity] = useState(prevQuantity || 1);
  const [message, setMessage] = useState(null);

  // GET PRODUCT BY ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios(`/apis/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.log(`couldn't featch products`);
      }
    };

    fetchProducts();
  }, [id]);

  // GET PRODUCT COMMENTS
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios(`/apis/ratings/${id}`);
        setComments(res.data);
      } catch (error) {
        console.log(`couldn't featch comments`);
      }
    };

    fetchComments();
  }, [id]);

  // GET PRODUCT BY ID
  useEffect(() => {
    if (product) {
      if (product.in_cart === 1) {
        setSelectedQuanity(product.in_cart_qty);
      }
    }
  }, [id, product, product.in_cart, product.quantity]);


  const addToCartHandler = async () => {
    setMessage(null);
    try {
      const data = {
        product_id: parseInt(id),
        quantity: parseInt(selectedQuantity),
      };
      await axios.post(`/apis/carts`, data);
      // display success message
      setMessage({ message: 'Added to Cart' });
    } catch (error) {
      // display error message
      setMessage({
        message: "Couldn't add to cart something went wrong",
        type: 'danger',
      });

      // redirect to login if not logged in
      if (error.response.status === 401) {
        navigate('/login', {
          state: {
            previousUrl: `/products/${id}`,
            prevQuantity: selectedQuantity,
          },
        });
      }

      // redirect to login if not logged in
      if (error.response.status === 400) {
        // display duplicate error message
        setMessage({
          message: 'Product already exists',
          type: 'danger',
        });
      }

      console.log(error);
    }
  };

  return (
    <>
      {message && <Alert message={message.message} type={message.type} />}
      <Navbar />
      <Styles>
        <div className="top container">
          <div className="img">
            <div className="selected-img">
              <img src={product.image} alt="" />
            </div>
            <div className="img-selector-wrapper">
              {product.images &&
                product.images.map((image) => (
                  <div className="img-selector">
                    <img src={image} alt="" />
                  </div>
                ))}
            </div>
          </div>
          <Card>
            <div className="flex jc-sb align-items-center mb-1">
              <h1>{product.name}</h1>
              <i className="fa-solid fa-heart fa-xl"></i>
            </div>
            <div className="mb-1 text-grey">
              Category: <Link to="/">{product.category}</Link>{' '}
            </div>
            <div className="mb-1">
              <span className="text-grey">Ratings:</span>{' '}
              {<Rating rating={product.rating} />}
              <span className="text-grey"> ({comments.length} reviews)</span>
            </div>
            <div className="mb-1 text-grey">Price: &#x20B5;{product.price}</div>
            <div className="type mb-1">
              <h3>Quantity</h3>
              <div>
                <select
                  name=""
                  id=""
                  value={selectedQuantity}
                  onChange={(event) => setSelectedQuanity(event.target.value)}
                  disabled={product.in_cart === 1 ? true : false}
                >
                  {generateNumbers(product.quantity).map((quantity) => (
                    <option key={quantity * 3} value={quantity}>
                      {quantity}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <Button
              className={product.in_cart === 1 ? 'bg-grey' : 'Add to cart'}
                isButton="true"
                onClick={addToCartHandler}
                disabled={product.in_cart === 1 ? true : false}
              >
                {product.in_cart === 1 ? 'In cart' : 'Add to cart'}
              </Button>
            </div>
          </Card>
        </div>

        <div className="container description">
          <h2>Description</h2>
          <p className="text-grey">{product.description}</p>
        </div>

        <Products data={data} header="Related Products" />

        {/* comments */}
        <div className="container">
          <h3 className="mb-1">Comments</h3>
          {/* display comments */}
          {comments.map(({ text, username, comment, score }, index) => (
            <Card className="mb-1" key={index * 100}>
              <b>{username}</b>
              <div className="text-grey">{comment}</div>
              <div>{<Rating rating={score} />}</div>
            </Card>
          ))}
        </div>
      </Styles>
    </>
  );
};

export default Product;
