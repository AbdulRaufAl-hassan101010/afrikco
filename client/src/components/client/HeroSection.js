import { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Styles = styled.header`
  width: 100%;
  margin: 0.5rem 0;
  margin-bottom: 10rem;

  .button {
  }

  &,
  .right {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-item {
    min-height: 25rem;
    display: flex;
    align-items: center;
    padding: 2rem;

    h1,
    h2,
    h3 {
      font-size: 2.6rem;
      font-weight: bolder;
    }

    p {
      font-weight: thin;
      color: #757575;
      letter-spacing: 0.25rem;
      margin-bottom: 2rem;
    }

    .button {
      margin-bottom: 2rem;
      font-weight: bold;
      letter-spacing: 0.1rem;
      border-bottom: 0.3rem solid #dc3545;
      padding: 0.5rem 0.5rem 0.5rem 0;

      &:hover {
        color: #757575;
      }
    }
  }

  .main {
    h1 {
      font-size: 4.8rem;
      margin-bottom: 4rem;
    }

    p {
      font-weight: thin;
      color: #757575;
      letter-spacing: 0.25rem;
      margin-bottom: 2rem;
    }
  }

  .a {
    background: rgba(249, 165, 179, 0.3);
    background-size: cover;
    padding-left: ${(props) => props.navbarmarginleft || 0};
  }
  .b {
    background: rgba(0, 128, 128, 0.3);
  }
  .c {
    background: rgba(249, 165, 179, 0.3);
  }
  .d {
    background: rgba(111, 111, 253, 0.3);
  }
  .e {
    background: rgba(255, 36, 255, 0.3);
  }

  @media (max-width: 996px) {
    & {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 1fr;
    }

    .a {
      min-height: 40rem;
    }
  }

  @media (max-width: 500px) {
    &,
    .right {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: 1fr;
    }

    .a {
      min-height: 20rem;
    }
  }
`;

const HeroSection = () => {
  const [navbarMarginLeft, setNavbarMarginLeft] = useState(0);

  useLayoutEffect(() => {
    // Get the <nav> element with class "container"
    const navContainer = document.querySelector('nav .container');

    // Check if the element exists
    if (navContainer) {
      // Get its computed style
      const navStyles = window.getComputedStyle(navContainer);

      // Get the left Margin and convert it to a number
      const leftMargin = navStyles.margin.split(' ').pop();

      // Set the left Margin in the state variable
      setNavbarMarginLeft(leftMargin);
    }
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <Styles navbarmarginleft={navbarMarginLeft || 0}>
      <div className="hero-item a left main">
        <div>
          <h1>Africa No. Best Shop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia unde
            eaque neque maxime quos consectetur vel laboriosam tempora
            quibusdam.
          </p>
          <div>
            <Link className="button">SHOP NOW</Link>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="hero-item b">
          <div>
            <h3>Best Afrik Species</h3>
            <p>300+</p>
            <div>
              <Link className="button">SHOP NOW</Link>
            </div>
          </div>
        </div>
        <div className="hero-item c">
          <div>
            <h3>Best Afrik Fashion</h3>
            <p>1,500+</p>
            <div>
              <Link className="button">SHOP NOW</Link>
            </div>
          </div>
        </div>
        <div className="hero-item d">
          <div>
            <h3>Best Afrik Veggies</h3>
            <p>300+</p>
            <div>
              <Link className="button">SHOP NOW</Link>
            </div>
          </div>
        </div>
        <div className="hero-item e">
          <div>
            <h3>Best Afrik Species</h3>
            <p>300+</p>
            <div>
              <Link className="button">SHOP NOW</Link>
            </div>
          </div>
        </div>
      </div>
    </Styles>
  );
};

export default HeroSection;
