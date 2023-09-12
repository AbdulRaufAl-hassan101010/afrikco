import { styled } from 'styled-components';
import Navbar from '../../components/client/Navbar';
import Card from '../../components/Card';
import { useEffect, useState } from 'react';
import data from '../../data';
import { useParams } from 'react-router-dom';
import Products from '../../components/client/Products';

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

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const productData = data.find((product) => product.id === parseInt(id));
    setProduct(productData);
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
            <div className="mb-1">
              <span className="text-grey">Ratings:</span>{' '}
              <i className="fa-solid fa-star fa-lg"></i>
              {}
              <i className="fa-solid fa-star fa-lg"></i>
              <i className="fa-solid fa-star fa-lg"></i>
              <i className="fa-solid fa-star fa-lg"></i>
              <i className="fa-solid fa-star fa-lg"></i>{' '}
              <span className="text-grey">(10 reviews)</span>
            </div>
            <div className="mb-1 text-grey">Price: &#x20B5;{product.price}</div>
            <div className="mb-1 text-grey">Qty: 1</div>
            <div className="type">
              <h3>Type</h3>
              <div>
                <span className="list">sm</span>
                <span className="list">lg</span>
                <span className="list">xl</span>
                <span className="list">xxl</span>
                <span className="list">xxxl</span>
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
          <Card className="mb-1">
            <b>Jon</b>
            <div className="text-grey">Best Yam</div>
          </Card>
          <Card className="mb-1">
            <b>Jon</b>
            <div className="text-grey">Best Yam</div>
          </Card>
        </div>
      </Styles>
    </>
  );
};

export default Product;
