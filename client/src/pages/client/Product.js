import { styled } from 'styled-components';
import Navbar from '../../components/client/Navbar';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import data from '../../data';
import { Link, useParams } from 'react-router-dom';
import Products from '../../components/client/Products';
import axios from 'axios';
import Rating from '../../components/Rating';

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
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);

  // GET PRODUCT BY ID
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios(`/apis/products?id=${id}`);
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

  return (
    <>
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
            <div className="type">
              <h3>Quantity</h3>
              <div>
                <select name="" id="">
                  {generateNumbers(product.quantity).map((quantity) => (
                    <option key={quantity * 3}>{quantity}</option>
                  ))}
                </select>
              </div>
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
