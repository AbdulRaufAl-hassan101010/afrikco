import { styled } from 'styled-components';
import Product from './Product';
const Styles = styled.section`
  margin-bottom: 5rem;
  .header {
    font-size: 2.6rem;
    margin-bottom: 5rem;

    span {
      padding: 0.5rem 0.5rem 0.5rem 0;
      border-bottom: 0.3rem solid #dc3545;
    }
  }

  .products {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }

  @media (max-width: 996px) {
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 596px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 280px) {
    .products {
      grid-template-columns: 1fr;
    }
  }
`;

const Products = ({ header, data }) => {
  return (
    <Styles className="container">
      <h3 className="header">
        <span>{header}</span>
      </h3>
      <div className="products">
        {data.map((product) => (
          <Product
            key={product.product_id || product.id}
            data={product}
          />
        ))}
      </div>
    </Styles>
  );
};

export default Products;
