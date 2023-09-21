import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

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

  .icons {
    /* background-color: rgba(255, 255, 255, 0.5); */
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem 2rem;
    transform: translateY(100%);
    transition: all 0.2s linear;

    a {
      display: flex;
      align-items: center;
      height: 5rem;
      width: 5rem;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 50%;

      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }
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
  const { product_id, image_url, name, price } = props.data;
  return (
    <Styles>
      <div className="img">
        <img loading="lazy" src={image_url} alt="" />
        <div className="icons">
          <ul className="flex jc-sb">
            <li>
              <Link to="/">
                <i className="fa-regular fa-heart fa-lg"></i>
              </Link>
            </li>
            <li>
              <Link to="/">
                <i className="fa-solid fa-cart-shopping fa-lg"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="body">
        <p>
          <Link to={`/product/${product_id}`}>{name}</Link>
        </p>
        <p className="price">&#x20B5; {price}</p>
      </div>
    </Styles>
  );
};

export default Product;
