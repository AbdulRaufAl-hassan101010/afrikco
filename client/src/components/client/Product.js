import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Rating from '../Rating';

const Styles = styled.article`
  /* background-color: #fff; */
  margin-bottom: 5rem;
  text-align: center;

  &:hover {
  }

  &:hover {
    .icons {
      /* background-color: rgba(255, 255, 255, 0.5); */
      transform: translateY(0);
    }
    p > a {
      text-decoration: underline;
    }
  }

  .img {
    height: 20rem;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
  }

  p > a {
    color: #775757;
    font-weight: thin;
  }

  .price {
    font-weight: bold;
    color: #1e1e1e;
  }
`;

const Product = (props) => {
  const { product_id, image_url, name, price, rating } = props.data;
  return (
    <Styles>
      <div className="img">
        <img loading="lazy" src={image_url} alt="" />
      </div>
      <div>
        <Rating rating={rating} />
      </div>
      <div className="body">
        <p>
          <Link to={`/products/${product_id}`}>{name}</Link>
        </p>
        <p className="price">&#x20B5; {price}</p>
      </div>
    </Styles>
  );
};

export default Product;
